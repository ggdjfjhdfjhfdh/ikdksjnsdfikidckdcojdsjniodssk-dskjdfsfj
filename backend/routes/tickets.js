import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ticketRepository, initializeDatabase } from '../services/database.js';
import multer from 'multer';
import path from 'path';
import { sendTicketEmail, sendCommunicationNotification } from '../services/email-notifier.js';
import MetadataCollector from '../services/metadata-collector.js';
import MetadataValidator from '../services/metadata-validator.js';

// Definición de transiciones válidas de estado
const validTransitions = {
  'RECEIVED': ['TRIAGE'],
  'TRIAGE': ['MITIGATING', 'CONTAINING'],
  'MITIGATING': ['MONITORING'],
  'CONTAINING': ['MONITORING'],
  'MONITORING': ['RESOLVED'],
  'RESOLVED': ['POSTMORTEM'],
  'POSTMORTEM': []
};

// Obtener transiciones válidas para un estado
function getValidTransitions(currentStatus) {
  return validTransitions[currentStatus] || [];
}

const router = express.Router();

// Inicializar base de datos al cargar el módulo
initializeDatabase().catch(console.error);
const incidentTypes = [
  'Ataque DDoS',
  'Brecha de datos',
  'Malware/Ransomware',
  'Phishing',
  'Acceso no autorizado',
  'Vulnerabilidad crítica',
  'Otro incidente'
];

// Sistema de notificaciones
const sendEmergencyNotification = (ticket) => {
  console.log(`🔔 NOTIFICACIÓN URGENTE: Ticket ${ticket.id}`);
 
};

// Simular envío de WhatsApp (para desarrollo)
// (Función de WhatsApp simulado eliminada)


// Validar token de emergencia
const validateEmergencyToken = (req) => {
  const token = req.headers['x-emergency-token'];
  const expected = process.env.EMERGENCY_SHARED_SECRET || '89ae197c406d9683548b2a55a8bc6260f2733dfc4941acfcbe39efdf0d56df25';
  console.log('[TOKEN DEBUG] Token recibido:', token);
  console.log('[TOKEN DEBUG] Token esperado:', expected);
  return token === expected;
};

// Middleware de autenticación para tickets
const authenticateTicketRequest = (req, res, next) => {
  if (!validateEmergencyToken(req)) {
    return res.status(401).json({
      success: false,
      error: 'Token de emergencia inválido',
      message: 'Acceso no autorizado al sistema de tickets'
    });
  }
  next();
};

// Configuración de almacenamiento para archivos adjuntos (disco temporal)
const upload = multer({ dest: 'uploads/' });

// Iniciar nuevo ticket (Paso 1)
router.post('/security-incidents/init', authenticateTicketRequest, async (req, res) => {
  try {
    const {
      organization,
      contact_name,
      contact_email,
      contact_phone,
      incident_type,
      affected_assets,
      incident_start,
      impact_level,
      authorized_actions,
      war_room_channel
    } = req.body;

    // Validar campos obligatorios del Paso 1
    const requiredFields = [
      'organization',
      'contact_name',
      'contact_email',
      'contact_phone',
      'incident_type',
      'affected_assets',
      'incident_start',
      'impact_level',
      'authorized_actions',
      'war_room_channel'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Campos obligatorios faltantes',
        missingFields
      });
    }

    // Validar formato de campos
    if (!validateEmail(contact_email)) {
      return res.status(400).json({
        success: false,
        error: 'Formato de email inválido'
      });
    }

    if (!Array.isArray(affected_assets) || affected_assets.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'La lista de activos afectados es requerida'
      });
    }

    if (!Array.isArray(authorized_actions) || authorized_actions.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'La lista de acciones autorizadas es requerida'
      });
    }

    // Crear el ticket inicial
    const ticketId = uuidv4();
    const ticket = {
      id: ticketId,
      organization,
      contact_name,
      contact_email,
      contact_phone,
      incident_type,
      affected_assets,
      incident_start: new Date(incident_start),
      impact_level,
      authorized_actions,
      war_room_channel,
      status: 'RECEIVED',
      created_at: new Date(),
      updated_at: new Date(),
      incident_details: {},
      enrichment_data: {},
      technical_metadata: {},
      timeline: [{
        timestamp: new Date(),
        action: 'CREATED',
        details: 'Ticket creado - Paso 1 completado'
      }]
    };

    await ticketRepository.create(ticket);

    // Enviar respuesta
    res.status(201).json({
      success: true,
      ticketId,
      message: 'Ticket iniciado correctamente'
    });

  } catch (error) {
    console.error('Error al crear ticket:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: error.message
    });
  }
});

// Completar ticket (Paso 2)
router.post('/security-incidents/:ticketId/complete', authenticateTicketRequest, upload.array('attachments', 5), async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { incident_details } = req.body;

    // Obtener ticket existente
    const ticket = await ticketRepository.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'Ticket no encontrado'
      });
    }

    if (ticket.status !== 'RECEIVED') {
      return res.status(400).json({
        success: false,
        error: 'El ticket ya fue completado'
      });
    }

    // Validar detalles específicos según el tipo de incidente
    const validationResult = await MetadataValidator.validateIncidentDetails(ticket.incident_type, incident_details);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        error: 'Detalles del incidente inválidos',
        details: validationResult.errors
      });
    }

    // Procesar archivos adjuntos
    const attachments = req.files ? await Promise.all(req.files.map(async file => {
      // TODO: Implementar lógica de almacenamiento permanente
      return {
        filename: file.originalname,
        path: file.path,
        type: file.mimetype,
        size: file.size,
        uploadedAt: new Date()
      };
    })) : [];

    // Actualizar ticket con detalles y archivos
    ticket.incident_details = incident_details;
    ticket.attachments = attachments;
    ticket.status = 'TRIAGE';
    ticket.updated_at = new Date();
    ticket.timeline.push({
      timestamp: new Date(),
      action: 'COMPLETED',
      details: 'Ticket completado - Paso 2 finalizado'
    });

    // Enriquecer datos técnicos
    const enrichmentData = await MetadataCollector.collectMetadata({
      incidentType: ticket.incident_type,
      details: incident_details
    });
    ticket.enrichment_data = enrichmentData;

    await ticketRepository.update(ticketId, ticket);

    // Enviar notificaciones
    sendTicketEmail(ticket);
    sendEmergencyNotification(ticket);
    simulateWhatsAppNotification(ticket);

    res.json({
      success: true,
      ticketId,
      message: 'Ticket completado correctamente'
    });

  } catch (error) {
    console.error('Error al completar ticket:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: error.message
    });
  }
});

// Actualizar estado del ticket
router.put('/security-incidents/:ticketId/status', authenticateTicketRequest, async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { status, notes } = req.body;

    // Obtener ticket existente
    const ticket = await ticketRepository.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'Ticket no encontrado'
      });
    }

    // Validar transición de estado
    const validStates = {
      'RECEIVED': ['TRIAGE'],
      'TRIAGE': ['MITIGATING', 'CONTAINING'],
      'MITIGATING': ['MONITORING'],
      'CONTAINING': ['MONITORING'],
      'MONITORING': ['RESOLVED'],
      'RESOLVED': ['POSTMORTEM'],
      'POSTMORTEM': []
    };

    if (!validStates[ticket.status].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Transición de estado inválida',
        currentState: ticket.status,
        validTransitions: validStates[ticket.status]
      });
    }

    // Actualizar estado
    ticket.status = status;
    ticket.updated_at = new Date();
    if (status === 'RESOLVED') {
      ticket.resolved_at = new Date();
    }

    // Agregar entrada en la línea de tiempo
    ticket.timeline.push({
      timestamp: new Date(),
      action: 'STATUS_CHANGED',
      details: `Estado actualizado a ${status}`,
      notes: notes || undefined
    });

    await ticketRepository.update(ticketId, ticket);

    // Enviar notificación de cambio de estado
    sendTicketEmail({
      ...ticket,
      subject: `[Actualización] Estado del ticket actualizado a ${status}`,
      template: 'status-change'
    });

    res.json({
      success: true,
      ticketId,
      status,
      message: 'Estado actualizado correctamente'
    });

  } catch (error) {
    console.error('Error al actualizar estado:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: error.message
    });
  }
});

// Consultar estado actual del ticket
router.get('/security-incidents/:ticketId/status', authenticateTicketRequest, async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await ticketRepository.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'Ticket no encontrado'
      });
    }

    res.json({
      success: true,
      ticketId,
      status: ticket.status,
      timeline: ticket.timeline,
      currentState: {
        status: ticket.status,
        updatedAt: ticket.updated_at,
        resolvedAt: ticket.resolved_at
      },
      validTransitions: getValidTransitions(ticket.status)
    });

  } catch (error) {
    console.error('Error al consultar estado:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: error.message
    });
  }
});

// Obtener historial de cambios del ticket
router.get('/security-incidents/:ticketId/history', authenticateTicketRequest, async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await ticketRepository.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'Ticket no encontrado'
      });
    }

    const history = {
      timeline: ticket.timeline,
      statusChanges: ticket.timeline.filter(entry => entry.action === 'STATUS_CHANGED'),
      actions: ticket.timeline.filter(entry => entry.action !== 'STATUS_CHANGED'),
      createdAt: ticket.created_at,
      updatedAt: ticket.updated_at,
      resolvedAt: ticket.resolved_at
    };

    res.json({
      success: true,
      ticketId,
      history
    });

  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: error.message
    });
  }
});

// Gestionar acciones autorizadas
router.put('/security-incidents/:ticketId/actions', authenticateTicketRequest, async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { action, details } = req.body;

    const ticket = await ticketRepository.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'Ticket no encontrado'
      });
    }

    // Validar que la acción esté autorizada
    if (!ticket.authorized_actions.includes(action)) {
      return res.status(403).json({
        success: false,
        error: 'Acción no autorizada',
        authorizedActions: ticket.authorized_actions
      });
    }

    // Registrar la acción en la línea de tiempo
    ticket.timeline.push({
      timestamp: new Date(),
      action: 'ACTION_EXECUTED',
      details: `Acción ejecutada: ${action}`,
      actionDetails: details
    });

    await ticketRepository.update(ticketId, ticket);

    // Notificar la acción
    sendTicketEmail({
      ...ticket,
      subject: `[Acción] ${action} ejecutada en ticket ${ticketId}`,
      template: 'action-notification'
    });

    res.json({
      success: true,
      ticketId,
      message: 'Acción registrada correctamente',
      action,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Error al registrar acción:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: error.message
    });
  }
});

// Crear ticket de incidente
router.post('/security-incidents', authenticateTicketRequest, upload.array('attachments', 5), async (req, res) => {
  try {
    console.log('=== NUEVO TICKET DE EMERGENCIA ===');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    
    let { incident_type } = req.body;
    const type = 'security_incident';
    const priority = 'critical';
    const response_time = 'immediate';

    // Validaciones básicas
    if (!incident_type) {
      return res.status(400).json({
        success: false,
        error: 'Tipo de incidente requerido',
        message: 'El campo incident_type es obligatorio'
      });
    }

    if (!incidentTypes.includes(incident_type)) {
      console.warn(`Tipo de incidente no reconocido: ${incident_type}. Usando 'Otro incidente' como fallback.`);
      incident_type = 'Otro incidente';
    }

    // Crear ticket
    const ticketId = uuidv4();

    // Recolectar metadatos detallados
    const metadataCollector = new MetadataCollector(req);
    const metadata = await metadataCollector.collectAllMetadata();

    // Validar y sanitizar metadatos
    const { isValid, errors, warnings, sanitizedMetadata } = MetadataValidator.validateTicketMetadata(metadata);

    if (warnings.length > 0) {
      console.warn('⚠️ Advertencias en los metadatos:', warnings);
    }

    // En desarrollo, permitimos continuar incluso con errores
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (!isValid && !isDevelopment) {
      console.error('❌ Errores en los metadatos:', errors);
      return res.status(400).json({
        success: false,
        error: 'Metadatos inválidos',
        details: errors,
        warnings,
        environment: process.env.NODE_ENV
      });
    }

    // Extraer datos de contacto y organización
    const contactInfo = {
      organization: req.body.organization,
      contact_name: req.body.contact_name,
      contact_email: req.body.contact_email,
      contact_phone: req.body.contact_phone
    };

    // Extraer datos específicos del incidente según el tipo
    const incidentDetails = {};
    const formFields = Object.keys(req.body);
    
    // Campos específicos por tipo de incidente
    const incidentSpecificFields = [
      // Malware
      'malware_type', 'infection_vector', 'infection_time', 'affected_systems', 'observed_impact',
      // Phishing
      'phishing_channel', 'phishing_target', 'detection_time', 'affected_users', 'phishing_content',
      // DDoS
      'attack_start', 'affected_services', 'attack_type', 'traffic_volume', 'mitigation_status',
      // Ransomware
      'ransomware_family', 'encrypted_systems', 'backup_status', 'ransom_amount', 'ransom_note', 'business_impact',
      // Brecha de datos
      'breach_type', 'data_location', 'records_affected', 'breach_vector', 'containment_status', 'data_exposure',
      // Otros incidentes
      'incident_time', 'incident_category', 'incident_description', 'affected_assets', 'current_status'
    ];

    // Guardar campos específicos del incidente
    incidentSpecificFields.forEach(field => {
      if (req.body[field]) {
        incidentDetails[field] = req.body[field];
      }
    });

    const ticket = {
      id: ticketId,
      type,
      incident_type,
      priority,
      response_time,
      description: req.body.description || 'Ticket de emergencia',
      status: 'received',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      // Información de contacto y organización
      contact_info: contactInfo,
      // Detalles específicos del incidente
      incident_details: incidentDetails,
      metadata: {
        ip: metadata.network_metadata?.ip?.address,
        city: metadata.network_metadata?.geo?.city,
        country: metadata.network_metadata?.geo?.country || 'ES',
        browser: `${metadata.client_metadata?.browser?.name || ''} ${metadata.client_metadata?.browser?.version || ''}`.trim(),
        os: `${metadata.client_metadata?.os?.name || ''} ${metadata.client_metadata?.os?.version || ''}`.trim(),
        device: metadata.client_metadata?.device?.type,
        platform: metadata.technical_metadata?.platform,
        screen: metadata.technical_metadata?.screen,
        headers: metadata.technical_metadata?.headers,
        connection: metadata.network_metadata?.connection
      },
      // Datos para respuesta rápida
      response: {
        estimated_time: '2min',
        contact_method: 'WhatsApp/Email',
        emergency_level: 'critical'
      }
    };

    // Guardar en memoria
    await ticketRepository.create(ticket);
    console.log(`Ticket ${ticketId} almacenado en memoria`);

    // Preparar adjuntos para email, si existen
    const emailAttachments = (req.files || []).map((file) => ({
      path: file.path,
      filename: file.originalname || path.basename(file.path),
    }));

    // Enviar notificaciones de emergencia
    try {
      sendEmergencyNotification(ticket);
      console.log(`Notificaciones de emergencia enviadas para ticket ${ticketId}`);
    } catch (error) {
      console.error('Error enviando notificaciones de emergencia:', error);
    }
    
    // Enviar email de confirmación
    try {
      await sendTicketEmail(ticket, emailAttachments);
      console.log(`Email de confirmación enviado para ticket ${ticketId}`);
    } catch (error) {
      console.error('Error enviando email de confirmación:', error);
    }

    // Limpiar tickets antiguos (más de 24 horas)
    await cleanupOldTickets();

    console.log(`=== TICKET ${ticketId} CREADO EXITOSAMENTE ===`);
    console.log(`🚨 NUEVO TICKET: ${ticketId} - ${incident_type} desde ${ticket.metadata?.ip || 'IP desconocida'}`);

    res.status(201).json({
      success: true,
      ticket_id: ticketId,
      message: 'Ticket de emergencia creado exitosamente',
      ticket: {
        id: ticketId,
        incident_type,
        priority,
        response_time,
        status: ticket.status,
        created_at: ticket.created_at,
        response: ticket.response
      },
      instructions: 'Nuestro equipo de respuesta ha sido notificado y se pondrá en contacto contigo en los próximos 2 minutos.',
      estimated_response: '2 minutos',
      contact_methods: ['WhatsApp', 'Email', 'Teléfono'],
      emergency_contact: 'https://wa.me/34614420875'
    });

  } catch (error) {
    console.error('❌ Error creando ticket:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: 'No se pudo crear el ticket de incidente'
    });
  }
});

// Obtener ticket por ID
router.get('/security-incidents/:id', authenticateTicketRequest, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`[DEBUG] Buscando ticket con ID: ${id}`);

    const ticket = await ticketRepository.findById(id);
    console.log(`[DEBUG] Resultado de búsqueda:`, ticket ? 'Ticket encontrado' : 'Ticket no encontrado');

    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'Ticket no encontrado',
        message: `El ticket con ID ${id} no existe`
      });
    }

    // Transformar metadatos al nuevo formato si es necesario
    if (ticket.network_metadata || ticket.client_metadata || ticket.technical_metadata) {
      ticket.metadata = {
        ip: ticket.network_metadata?.ip?.address,
        city: ticket.network_metadata?.geo?.city,
        country: ticket.network_metadata?.geo?.country,
        browser: `${ticket.client_metadata?.browser?.name || ''} ${ticket.client_metadata?.browser?.version || ''}`.trim(),
        os: `${ticket.client_metadata?.os?.name || ''} ${ticket.client_metadata?.os?.version || ''}`.trim(),
        device: ticket.client_metadata?.device?.type,
        platform: ticket.technical_metadata?.platform,
        screen: ticket.technical_metadata?.screen,
        headers: ticket.technical_metadata?.headers,
        additional_info: {
          ...ticket.technical_metadata?.performance,
          connection: ticket.network_metadata?.connection
        }
      };
    }

    console.log('Ticket enviado al frontend:', ticket);
    res.json({
      success: true,
      ticket
    });

  } catch (error) {
    console.error('❌ Error obteniendo ticket:', error);
    console.error('❌ Stack trace:', error.stack);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: 'No se pudo obtener el ticket'
    });
  }
});

// Listar todos los tickets (solo para administración)
router.get('/security-incidents', authenticateTicketRequest, async (req, res) => {
  try {
    const tickets = await ticketRepository.findAll();

    // Ordenar por fecha de creación (más recientes primero)
    tickets.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    res.json({
      success: true,
      count: tickets.length,
      tickets
    });

  } catch (error) {
    console.error('❌ Error listando tickets:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: 'No se pudieron listar los tickets'
    });
  }
});

// Actualizar estado de ticket
router.patch('/security-incidents/:id/status', authenticateTicketRequest, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['received', 'in_progress', 'resolved', 'closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Estado no válido',
        message: 'Los estados válidos son: received, in_progress, resolved, closed'
      });
    }

    const ticket = await ticketRepository.findById(id);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'Ticket no encontrado',
        message: `El ticket con ID ${id} no existe`
      });
    }

    ticket.status = status;
    ticket.updated_at = new Date().toISOString();
    await ticketRepository.update(id, ticket);

    res.json({
      success: true,
      message: 'Estado del ticket actualizado',
      ticket: {
        id: ticket.id,
        status: ticket.status,
        updated_at: ticket.updated_at
      }
    });

  } catch (error) {
    console.error('❌ Error actualizando ticket:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor',
      message: 'No se pudo actualizar el ticket'
    });
  }
});

// Función para limpiar tickets antiguos
const cleanupOldTickets = async () => {
  try {
    await ticketRepository.cleanupOldTickets();
    console.log('🧹 Limpieza de tickets antiguos completada');
  } catch (error) {
    console.error('❌ Error en limpieza de tickets:', error);
  }
};

// Ejecutar limpieza cada hora
setInterval(cleanupOldTickets, 60 * 60 * 1000);

// ========================================
// ENDPOINTS DEL WIDGET DE COMUNICACIÓN
// ========================================

// Solicitar llamada de emergencia
router.post('/communication/emergency-call', authenticateTicketRequest, async (req, res) => {
  try {
    const { ticketId } = req.body;
    
    if (!ticketId) {
      return res.status(400).json({
        success: false,
        error: 'ID de ticket requerido'
      });
    }

    // Buscar el ticket
    const ticket = await ticketRepository.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'Ticket no encontrado'
      });
    }

    // Registrar la solicitud de llamada de emergencia
    const callRequest = {
      id: uuidv4(),
      ticketId: ticketId,
      type: 'emergency_call',
      requestedAt: new Date().toISOString(),
      status: 'pending',
      priority: 'critical',
      contactInfo: ticket.contact_info,
      estimatedCallTime: '2 minutos'
    };

    // Simular notificación al equipo de emergencia
    console.log(`🚨 LLAMADA DE EMERGENCIA SOLICITADA`);
    console.log(`📞 Ticket: ${ticketId}`);
    console.log(`👤 Cliente: ${ticket.contact_info?.name || 'No especificado'}`);
    console.log(`📱 Teléfono: ${ticket.contact_info?.phone || 'No especificado'}`);
    console.log(`⏰ Tiempo estimado: 2 minutos`);
    console.log(`🚨 Prioridad: CRÍTICA`);

    // Actualizar el ticket con la solicitud de llamada
    await ticketRepository.update(ticketId, {
      communication_requests: [
        ...(ticket.communication_requests || []),
        callRequest
      ],
      updated_at: new Date().toISOString()
    });

    // Enviar notificación por email al administrador
    try {
      await sendCommunicationNotification(ticket, 'emergency-call', {
        estimatedTime: '2 minutos',
        urgency: 'CRÍTICA'
      });
      console.log('✅ Notificación por email enviada al administrador');
    } catch (emailError) {
      console.error('❌ Error al enviar notificación por email:', emailError);
      // No fallar la respuesta por error de email
    }

    res.json({
      success: true,
      message: 'Llamada de emergencia solicitada exitosamente',
      callRequest: callRequest,
      estimatedTime: '2 minutos'
    });

  } catch (error) {
    console.error('Error al solicitar llamada de emergencia:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// Solicitar respuesta por email
router.post('/communication/request-email', authenticateTicketRequest, async (req, res) => {
  try {
    const { ticketId } = req.body;
    
    if (!ticketId) {
      return res.status(400).json({
        success: false,
        error: 'ID de ticket requerido'
      });
    }

    const ticket = await ticketRepository.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'Ticket no encontrado'
      });
    }

    // Crear solicitud de email detallado
    const emailRequest = {
      id: uuidv4(),
      ticketId: ticketId,
      type: 'detailed_email',
      requestedAt: new Date().toISOString(),
      status: 'processing',
      estimatedTime: '30 minutos',
      emailAddress: ticket.contact_info?.email
    };

    // Enviar email detallado
    try {
      await sendTicketEmail(ticket, 'detailed_response');
      emailRequest.status = 'sent';
      emailRequest.sentAt = new Date().toISOString();
      
      console.log(`📧 EMAIL DETALLADO ENVIADO`);
      console.log(`📋 Ticket: ${ticketId}`);
      console.log(`📧 Email: ${ticket.contact_info?.email}`);
      console.log(`⏰ Enviado: ${emailRequest.sentAt}`);
      
    } catch (emailError) {
      console.error('Error al enviar email:', emailError);
      emailRequest.status = 'failed';
      emailRequest.error = emailError.message;
    }

    // Actualizar el ticket
    await ticketRepository.update(ticketId, {
      communication_requests: [
        ...(ticket.communication_requests || []),
        emailRequest
      ],
      updated_at: new Date().toISOString()
    });

    // Enviar notificación por email al administrador
    try {
      await sendCommunicationNotification(ticket, 'request-email', {
        emailAddress: ticket.contact_info?.email,
        estimatedTime: '30 minutos'
      });
      console.log('✅ Notificación por email enviada al administrador');
    } catch (emailError) {
      console.error('❌ Error al enviar notificación por email:', emailError);
    }

    res.json({
      success: true,
      message: 'Email detallado enviado exitosamente',
      emailRequest: emailRequest
    });

  } catch (error) {
    console.error('Error al solicitar email:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// Programar llamada
router.post('/communication/schedule-call', authenticateTicketRequest, async (req, res) => {
  try {
    const { ticketId, scheduledTime } = req.body;
    
    if (!ticketId || !scheduledTime) {
      return res.status(400).json({
        success: false,
        error: 'ID de ticket y hora programada requeridos'
      });
    }

    const ticket = await ticketRepository.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'Ticket no encontrado'
      });
    }

    // Crear solicitud de llamada programada
    const scheduledCall = {
      id: uuidv4(),
      ticketId: ticketId,
      type: 'scheduled_call',
      requestedAt: new Date().toISOString(),
      scheduledTime: scheduledTime,
      status: 'scheduled',
      contactInfo: ticket.contact_info
    };

    console.log(`📅 LLAMADA PROGRAMADA`);
    console.log(`📞 Ticket: ${ticketId}`);
    console.log(`👤 Cliente: ${ticket.contact_info?.name || 'No especificado'}`);
    console.log(`📱 Teléfono: ${ticket.contact_info?.phone || 'No especificado'}`);
    console.log(`⏰ Hora programada: ${scheduledTime}`);

    // Actualizar el ticket
    await ticketRepository.update(ticketId, {
      communication_requests: [
        ...(ticket.communication_requests || []),
        scheduledCall
      ],
      updated_at: new Date().toISOString()
    });

    // Enviar notificación por email al administrador
    try {
      await sendCommunicationNotification(ticket, 'schedule-call', {
        scheduledTime: scheduledTime,
        contactInfo: ticket.contact_info
      });
      console.log('✅ Notificación por email enviada al administrador');
    } catch (emailError) {
      console.error('❌ Error al enviar notificación por email:', emailError);
    }

    res.json({
      success: true,
      message: 'Llamada programada exitosamente',
      scheduledCall: scheduledCall
    });

  } catch (error) {
    console.error('Error al programar llamada:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// Solicitar callback
router.post('/communication/request-callback', authenticateTicketRequest, async (req, res) => {
  try {
    const { ticketId } = req.body;
    
    if (!ticketId) {
      return res.status(400).json({
        success: false,
        error: 'ID de ticket requerido'
      });
    }

    const ticket = await ticketRepository.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'Ticket no encontrado'
      });
    }

    // Crear solicitud de callback
    const callbackRequest = {
      id: uuidv4(),
      ticketId: ticketId,
      type: 'callback_request',
      requestedAt: new Date().toISOString(),
      status: 'pending',
      contactInfo: ticket.contact_info,
      triggerCondition: 'important_update'
    };

    console.log(`📞 CALLBACK SOLICITADO`);
    console.log(`📋 Ticket: ${ticketId}`);
    console.log(`👤 Cliente: ${ticket.contact_info?.name || 'No especificado'}`);
    console.log(`📱 Teléfono: ${ticket.contact_info?.phone || 'No especificado'}`);
    console.log(`🔔 Condición: Actualización importante`);

    // Actualizar el ticket
    await ticketRepository.update(ticketId, {
      communication_requests: [
        ...(ticket.communication_requests || []),
        callbackRequest
      ],
      updated_at: new Date().toISOString()
    });

    // Enviar notificación por email al administrador
    try {
      await sendCommunicationNotification(ticket, 'request-callback', {
        triggerCondition: 'important_update',
        contactInfo: ticket.contact_info
      });
      console.log('✅ Notificación por email enviada al administrador');
    } catch (emailError) {
      console.error('❌ Error al enviar notificación por email:', emailError);
    }

    res.json({
      success: true,
      message: 'Callback solicitado exitosamente',
      callbackRequest: callbackRequest
    });

  } catch (error) {
    console.error('Error al solicitar callback:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// Obtener estado de comunicaciones de un ticket
router.get('/communication/status/:ticketId', authenticateTicketRequest, async (req, res) => {
  try {
    const { ticketId } = req.params;
    
    const ticket = await ticketRepository.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'Ticket no encontrado'
      });
    }

    const communicationRequests = ticket.communication_requests || [];
    
    // Calcular próxima actualización basada en la prioridad
    const getNextUpdateTime = (priority) => {
      const now = new Date();
      let minutes;
      
      switch(priority?.toLowerCase()) {
        case 'critical':
        case 'high':
          minutes = 5;
          break;
        case 'medium':
          minutes = 15;
          break;
        default:
          minutes = 30;
      }
      
      return new Date(now.getTime() + minutes * 60000).toISOString();
    };

    res.json({
      success: true,
      ticketId: ticketId,
      priority: ticket.priority,
      communicationRequests: communicationRequests,
      nextUpdate: getNextUpdateTime(ticket.priority),
      contactInfo: ticket.contact_info
    });

  } catch (error) {
    console.error('Error al obtener estado de comunicaciones:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

export default router;