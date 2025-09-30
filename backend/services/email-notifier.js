import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Crea el transporter usando Gmail SMTP
// Es necesario habilitar "2-Step Verification" y crear una "App Password" en la cuenta de Gmail
// https://support.google.com/accounts/answer/185833

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true', // true para puerto 465, false para STARTTLS 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 * Envía un correo electrónico con los detalles del ticket.
 * @param {Object} ticket - Objeto con los datos del ticket
 * @param {Array<{path: string, filename?: string}>} attachments - Lista de adjuntos opcionales
 */
export async function sendTicketEmail(ticket, attachments = []) {
  const mailOptions = {
    from: `SESECPRO Incidentes <${process.env.SMTP_USER}>`,
    to: process.env.INCIDENT_EMAIL_RECIPIENT || process.env.SMTP_USER,
    subject: `🚨 Nuevo ticket: ${ticket.incident_type} (Prioridad: ${ticket.priority})`,
    text: generatePlainText(ticket),
    html: generateHtml(ticket),
    attachments,
  };

  await transporter.sendMail(mailOptions);
}

/**
 * Envía notificación al administrador sobre solicitud de comunicación del cliente
 * @param {Object} ticket - Objeto con los datos del ticket
 * @param {string} communicationType - Tipo de comunicación solicitada
 * @param {Object} communicationData - Datos adicionales de la comunicación
 */
export async function sendCommunicationNotification(ticket, communicationType, communicationData = {}) {
  const urgencyLevel = getUrgencyLevel(ticket.priority);
  const contactMethod = getCommunicationMethodDetails(communicationType, communicationData);
  
  const mailOptions = {
    from: `SESEC Comunicaciones <${process.env.SMTP_USER}>`,
    to: process.env.INCIDENT_EMAIL_RECIPIENT || process.env.SMTP_USER,
    subject: `${urgencyLevel.icon} ACCIÓN REQUERIDA: ${contactMethod.title} - Ticket #${ticket.id}`,
    text: generateCommunicationPlainText(ticket, communicationType, communicationData, urgencyLevel, contactMethod),
    html: generateCommunicationHtml(ticket, communicationType, communicationData, urgencyLevel, contactMethod),
  };

  await transporter.sendMail(mailOptions);
}

function getIncidentTypeIcon(type) {
  const icons = {
    'Ataque DDoS': '🌊',
    'Brecha de datos': '🔓',
    'Malware/Ransomware': '🦠',
    'Phishing': '🎣',
    'Acceso no autorizado': '🔑',
    'Vulnerabilidad crítica': '🎯',
    'Otro incidente': '⚠️'
  };
  return icons[type] || '⚠️';
}

function generateStatusBadge(status) {
  const badges = {
    'RECEIVED': '📥 RECIBIDO',
    'TRIAGE': '🔍 EN TRIAJE',
    'MITIGATING': '🛡️ MITIGANDO',
    'CONTAINING': '🔒 CONTENIENDO',
    'MONITORING': '👀 MONITORIZANDO',
    'RESOLVED': '✅ RESUELTO',
    'POSTMORTEM': '📊 POSTMORTEM'
  };
  return badges[status] || status;
}

function generateTypeSpecificDetails(ticket) {
  const details = ticket.incident_details;
  if (!details) return '';

  switch (ticket.incident_type) {
    case 'Ataque DDoS':
      return `📊 DETALLES DEL ATAQUE:\n` +
        `Objetivo: ${details.target_domain || details.target_ip || 'No especificado'}\n` +
        `Vector: ${details.attack_vector || 'No especificado'}\n` +
        `Pico BPS: ${details.peak_bps || 'No especificado'}\n` +
        `Pico PPS: ${details.peak_pps || 'No especificado'}\n` +
        `Duración: ${details.duration || 'No especificado'}\n`;

    case 'Brecha de datos':
      return `🔐 DETALLES DE LA BRECHA:\n` +
        `Sistemas afectados: ${details.affected_systems && Array.isArray(details.affected_systems) ? details.affected_systems.join(', ') : 'No especificado'}\n` +
        `Tipos de datos: ${details.data_types && Array.isArray(details.data_types) ? details.data_types.join(', ') : 'No especificado'}\n` +
        `Registros estimados: ${details.estimated_records || 'No especificado'}\n` +
        `Método de exfiltración: ${details.exfiltration_method || 'Desconocido'}\n`;

    case 'Malware/Ransomware':
      return `🦠 DETALLES DE LA INFECCIÓN:\n` +
        `Sistemas infectados: ${details.infected_systems && Array.isArray(details.infected_systems) ? details.infected_systems.join(', ') : 'No especificado'}\n` +
        `Tipo de malware: ${details.malware_type || 'No especificado'}\n` +
        `Vector de infección: ${details.infection_vector || 'No especificado'}\n` +
        (details.ransom_amount ? `Rescate: ${details.ransom_amount} ${details.ransom_currency || ''}\n` : '');

    case 'Phishing':
      return `🎣 DETALLES DEL PHISHING:\n` +
        `URL: ${details.phishing_url || 'No especificado'}\n` +
        `Tipo de campaña: ${details.campaign_type || 'No especificado'}\n` +
        `Grupo objetivo: ${details.target_group || 'No especificado'}\n` +
        (details.email_subjects && Array.isArray(details.email_subjects) ? `Asuntos: ${details.email_subjects.join(', ')}\n` : '');

    default:
      return '';
  }
}

function generatePlainText(ticket) {
  const icon = getIncidentTypeIcon(ticket.incident_type);
  
  return `${icon} INCIDENTE DE SEGURIDAD\n` +
    `Ticket #${ticket.id} | Creado: ${new Date(ticket.created_at).toLocaleString('es-ES')}\n\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `📋 INFORMACIÓN DEL INCIDENTE\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
    `Tipo: ${ticket.incident_type || 'No especificado'}\n` +
    `Estado: ${generateStatusBadge(ticket.status)}\n` +
    `Prioridad: ${ticket.priority || 'No especificada'}\n` +
    `Impacto: ${ticket.impact_level || 'No especificado'}\n\n` +
    `🏢 ORGANIZACIÓN:\n` +
    `Nombre: ${ticket.organization || 'No especificado'}\n` +
    `Contacto: ${ticket.contact_name || 'No especificado'}\n` +
    `Email: ${ticket.contact_email || 'No especificado'}\n` +
    `Teléfono: ${ticket.contact_phone || 'No especificado'}\n\n` +
    `🎯 ACTIVOS AFECTADOS:\n` +
    (ticket.affected_assets && ticket.affected_assets.length > 0 ? 
      ticket.affected_assets.map(asset => `• ${asset}`).join('\n') : 
      'No se han especificado activos afectados') + '\n\n' +
    `⚡ ACCIONES AUTORIZADAS:\n` +
    (ticket.authorized_actions && ticket.authorized_actions.length > 0 ? 
      ticket.authorized_actions.map(action => `• ${action}`).join('\n') : 
      'No se han especificado acciones autorizadas') + '\n\n' +
    `${icon} DETALLES ESPECÍFICOS:\n` +
    generateTypeSpecificDetails(ticket) + '\n\n' +
    `📅 CRONOLOGÍA DEL INCIDENTE:\n` +
    (ticket.timeline && ticket.timeline.length > 0 ? 
      ticket.timeline.map(entry =>
        `[${new Date(entry.timestamp).toLocaleString('es-ES')}] ${entry.action}\n${entry.details}`
      ).join('\n\n') : 
      'No hay cronología disponible') + '\n\n' +
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
    `🔗 ACCIONES RÁPIDAS\n` +
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
    generateDynamicQuickActions(ticket).map(action => {
      let prefix = '';
      if (action.priority === 'critical') prefix = '🚨 ';
      else if (action.priority === 'escalation') prefix = '⚠️ ';
      return `${prefix}${action.icon} ${action.text}: ${action.url}`;
    }).join('\n') + '\n\n' +
    `ID del Ticket: ${ticket.id}\n`;
}

function generateHtml(ticket) {
  const icon = getIncidentTypeIcon(ticket.incident_type);
  const priorityColor = ticket.priority === 'critical' ? '#ff0000' : 
                       ticket.priority === 'high' ? '#ff6600' : 
                       ticket.priority === 'medium' ? '#ffaa00' : '#0066cc';
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px; 
            background-color: #f8f9fa;
          }
          .container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .header-banner { 
            background: linear-gradient(135deg, ${priorityColor} 0%, ${priorityColor}dd 100%); 
            color: white; 
            padding: 25px; 
            text-align: center; 
          }
          .header-banner h1 {
            margin: 0 0 10px 0;
            font-size: 1.8em;
            font-weight: 600;
          }
          .header-banner p {
            margin: 0;
            opacity: 0.9;
            font-size: 1.1em;
          }
          .content {
            padding: 25px;
          }
          .priority-badge {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 0.9em;
            text-transform: uppercase;
            background: ${priorityColor};
            color: white;
            margin: 5px 0;
          }
          .status-badge {
            display: inline-block;
            padding: 6px 12px;
            border-radius: 15px;
            font-weight: 500;
            background: #e9ecef;
            color: #495057;
            font-size: 0.9em;
            text-transform: capitalize;
          }
          .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 25px 0;
          }
          .info-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid ${priorityColor};
          }
          .info-card h3 {
            margin: 0 0 15px 0;
            color: #495057;
            font-size: 1.1em;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .info-card p {
            margin: 8px 0;
            color: #6c757d;
          }
          .info-card strong {
            color: #212529;
          }
          .section {
            margin: 30px 0;
            padding: 20px;
            background: #ffffff;
            border-radius: 8px;
            border: 1px solid #e9ecef;
          }
          .section h2 {
            margin: 0 0 15px 0;
            color: #495057;
            font-size: 1.3em;
            display: flex;
            align-items: center;
            gap: 10px;
            border-bottom: 2px solid #e9ecef;
            padding-bottom: 10px;
          }
          .list-clean {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .list-clean li {
            padding: 10px 0;
            border-bottom: 1px solid #e9ecef;
            color: #6c757d;
          }
          .list-clean li:last-child {
            border-bottom: none;
          }
          .timeline {
            border-left: 3px solid ${priorityColor};
            padding-left: 25px;
            margin: 20px 0;
          }
          .timeline-entry {
            margin: 20px 0;
            position: relative;
          }
          .timeline-entry::before {
            content: '';
            width: 12px;
            height: 12px;
            background: ${priorityColor};
            border: 3px solid white;
            border-radius: 50%;
            position: absolute;
            left: -31px;
            top: 5px;
            box-shadow: 0 0 0 2px ${priorityColor};
          }
          .timeline-time {
            color: #6c757d;
            font-size: 0.9em;
            font-weight: 500;
          }
          .timeline-action {
            font-weight: 600;
            color: #495057;
            margin: 5px 0;
          }
          .timeline-details {
            color: #6c757d;
            margin: 5px 0;
          }
          .quick-actions {
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            padding: 25px;
            border-radius: 8px;
            margin: 25px 0;
            text-align: center;
          }
          .quick-actions h2 {
            color: white;
            margin: 0 0 20px 0;
            border: none;
            padding: 0;
          }
          .quick-actions a {
            display: inline-block;
            background: rgba(255,255,255,0.2);
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 25px;
            margin: 5px 10px;
            font-weight: 600;
            border: 2px solid rgba(255,255,255,0.3);
            transition: all 0.3s ease;
          }
          .quick-actions a:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-2px);
          }
          
          .quick-actions a[style*="rgba(255,0,0"] {
            background: rgba(255, 0, 0, 0.15) !important;
            border-color: rgba(255, 0, 0, 0.4) !important;
            color: #dc3545 !important;
            font-weight: 700 !important;
            animation: pulse 2s infinite;
          }
          
          .quick-actions a[style*="rgba(255,165,0"] {
            background: rgba(255, 165, 0, 0.15) !important;
            border-color: rgba(255, 165, 0, 0.4) !important;
            color: #fd7e14 !important;
            font-weight: 700 !important;
          }
          
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(255, 0, 0, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 0, 0, 0); }
          }
          .war-room {
            background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin: 25px 0;
            text-align: center;
          }
          .war-room h2 {
            color: white;
            margin: 0 0 10px 0;
            border: none;
            padding: 0;
          }
          .empty-state {
            color: #6c757d;
            font-style: italic;
            text-align: center;
            padding: 20px;
          }
          @media (max-width: 600px) {
            .info-grid {
              grid-template-columns: 1fr;
            }
            .quick-actions a {
              display: block;
              margin: 10px 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header-banner">
            <h1>${icon} INCIDENTE DE SEGURIDAD</h1>
            <p>Ticket #${ticket.id} | ${new Date(ticket.created_at).toLocaleString('es-ES')}</p>
          </div>

          <div class="content">
            <div class="info-grid">
              <div class="info-card">
                <h3>📋 Información del Incidente</h3>
                <p><strong>Tipo:</strong> ${ticket.incident_type || 'No especificado'}</p>
                <p><strong>Estado:</strong> <span class="status-badge">${generateStatusBadge(ticket.status)}</span></p>
                <p><strong>Prioridad:</strong> <span class="priority-badge">${ticket.priority || 'No especificada'}</span></p>
                <p><strong>Impacto:</strong> ${ticket.impact_level || 'No especificado'}</p>
              </div>

              <div class="info-card">
                <h3>🏢 Organización</h3>
                <p><strong>Nombre:</strong> ${ticket.organization || 'No especificado'}</p>
                <p><strong>Contacto:</strong> ${ticket.contact_name || 'No especificado'}</p>
                <p><strong>Email:</strong> ${ticket.contact_email || 'No especificado'}</p>
                <p><strong>Teléfono:</strong> ${ticket.contact_phone || 'No especificado'}</p>
              </div>
            </div>

            <div class="section">
              <h2>🎯 Activos Afectados</h2>
              ${ticket.affected_assets && ticket.affected_assets.length > 0 ? 
                `<ul class="list-clean">${ticket.affected_assets.map(asset => `<li>• ${asset}</li>`).join('')}</ul>` :
                '<div class="empty-state">No se han especificado activos afectados</div>'
              }
            </div>

            <div class="section">
              <h2>⚡ Acciones Autorizadas</h2>
              ${ticket.authorized_actions && ticket.authorized_actions.length > 0 ? 
                `<ul class="list-clean">${ticket.authorized_actions.map(action => `<li>• ${action}</li>`).join('')}</ul>` :
                '<div class="empty-state">No se han especificado acciones autorizadas</div>'
              }
            </div>

            <div class="section">
              <h2>${icon} Detalles Específicos</h2>
              ${generateTypeSpecificHtml(ticket)}
            </div>

            <div class="section">
              <h2>📅 Cronología del Incidente</h2>
              ${ticket.timeline && ticket.timeline.length > 0 ? 
                `<div class="timeline">
                  ${ticket.timeline.map(entry => `
                    <div class="timeline-entry">
                      <div class="timeline-time">${new Date(entry.timestamp).toLocaleString('es-ES')}</div>
                      <div class="timeline-action">${entry.action}</div>
                      <div class="timeline-details">${entry.details}</div>
                    </div>
                  `).join('')}
                </div>` :
                '<div class="empty-state">No hay cronología disponible</div>'
              }
            </div>

            <div class="quick-actions">
              <h2>🔗 Acciones Rápidas</h2>
              ${generateDynamicQuickActions(ticket).map(action => {
                let buttonClass = '';
                if (action.priority === 'critical') buttonClass = ' style="background: rgba(255,0,0,0.3); border-color: rgba(255,0,0,0.5);"';
                else if (action.priority === 'escalation') buttonClass = ' style="background: rgba(255,165,0,0.3); border-color: rgba(255,165,0,0.5);"';
                
                return `<a href="${action.url}"${buttonClass}>${action.icon} ${action.text}</a>`;
              }).join('')}
            </div>

            ${ticket.war_room_channel ? 
              `<div class="war-room">
                <h2>🔗 Canal de War Room</h2>
                <p>Conéctate al canal <strong>${ticket.war_room_channel}</strong> para seguimiento en tiempo real</p>
              </div>` : ''
            }
          </div>
        </div>
      </body>
    </html>
  `;
}

function generateTypeSpecificHtml(ticket) {
  const details = ticket.incident_details;
  if (!details) return '';

  switch (ticket.incident_type) {
    case 'Ataque DDoS':
      return `
                <p><strong>Objetivo:</strong> ${details.target_domain || details.target_ip || 'No especificado'}</p>
                <p><strong>Vector de ataque:</strong> ${details.attack_vector || 'No especificado'}</p>
                <p><strong>Pico BPS:</strong> ${details.peak_bps || 'No especificado'}</p>
                <p><strong>Pico PPS:</strong> ${details.peak_pps || 'No especificado'}</p>
                <p><strong>Duración:</strong> ${details.duration || 'No especificado'}</p>
                ${details.mitigation_status ? `<p><strong>Estado mitigación:</strong> ${details.mitigation_status}</p>` : ''}
            `;

    case 'Brecha de datos':
      return `
                <p><strong>Sistemas afectados:</strong> ${details.affected_systems && Array.isArray(details.affected_systems) ? details.affected_systems.join(', ') : 'No especificado'}</p>
                <p><strong>Tipos de datos:</strong> ${details.data_types && Array.isArray(details.data_types) ? details.data_types.join(', ') : 'No especificado'}</p>
                <p><strong>Registros estimados:</strong> ${details.estimated_records || 'No especificado'}</p>
                <p><strong>Método de exfiltración:</strong> ${details.exfiltration_method || 'Desconocido'}</p>
                ${details.detection_method ? `<p><strong>Método de detección:</strong> ${details.detection_method}</p>` : ''}
            `;

    case 'Malware/Ransomware':
      return `
                <p><strong>Sistemas infectados:</strong> ${details.infected_systems && Array.isArray(details.infected_systems) ? details.infected_systems.join(', ') : 'No especificado'}</p>
                <p><strong>Tipo de malware:</strong> ${details.malware_type || 'No especificado'}</p>
                <p><strong>Vector de infección:</strong> ${details.infection_vector || 'No especificado'}</p>
                ${details.ransom_amount ? `
                    <p><strong>Rescate solicitado:</strong> ${details.ransom_amount} ${details.ransom_currency || ''}</p>
                    ${details.ransom_wallet ? `<p><strong>Wallet:</strong> ${details.ransom_wallet}</p>` : ''}
                ` : ''}
            `;

    case 'Phishing':
      return `
                <p><strong>URL:</strong> ${details.phishing_url || 'No especificado'}</p>
                <p><strong>Tipo de campaña:</strong> ${details.campaign_type || 'No especificado'}</p>
                <p><strong>Grupo objetivo:</strong> ${details.target_group || 'No especificado'}</p>
                ${details.email_subjects && Array.isArray(details.email_subjects) ? `<p><strong>Asuntos detectados:</strong> ${details.email_subjects.join(', ')}</p>` : ''}
                ${details.attachment_types && Array.isArray(details.attachment_types) ? `<p><strong>Tipos de adjuntos:</strong> ${details.attachment_types.join(', ')}</p>` : ''}
            `;

    case 'Vulnerabilidad crítica':
      return `
                <p><strong>Tipo de vulnerabilidad:</strong> ${details.vulnerability_type || 'No especificado'}</p>
                <p><strong>Sistemas afectados:</strong> ${details.affected_systems && Array.isArray(details.affected_systems) ? details.affected_systems.join(', ') : 'No especificado'}</p>
                <p><strong>CVSS Score:</strong> ${details.cvss_score || 'No especificado'}</p>
                ${details.cve_id ? `<p><strong>CVE ID:</strong> ${details.cve_id}</p>` : ''}
                ${details.patch_status ? `<p><strong>Estado del parche:</strong> ${details.patch_status}</p>` : ''}
            `;

    default:
      return '<p>No hay detalles específicos disponibles para este tipo de incidente.</p>';
  }
}

// Funciones para notificaciones de comunicación

function getUrgencyLevel(priority) {
  const levels = {
    'CRÍTICA': { 
      icon: '🚨', 
      level: 'URGENTE', 
      timeframe: 'INMEDIATO',
      color: '#ff0000',
      action: 'Contactar AHORA'
    },
    'ALTA': { 
      icon: '⚠️', 
      level: 'ALTA PRIORIDAD', 
      timeframe: 'En 15 minutos',
      color: '#ff6600',
      action: 'Contactar pronto'
    },
    'MEDIA': { 
      icon: '📞', 
      level: 'PRIORIDAD MEDIA', 
      timeframe: 'En 1-2 horas',
      color: '#ffaa00',
      action: 'Programar contacto'
    },
    'BAJA': { 
      icon: '📧', 
      level: 'SEGUIMIENTO', 
      timeframe: 'En 24 horas',
      color: '#0066cc',
      action: 'Responder por email'
    }
  };
  return levels[priority] || levels['MEDIA'];
}

function getCommunicationMethodDetails(type, data) {
  const methods = {
    'emergency-call': {
      title: 'LLAMADA DE EMERGENCIA SOLICITADA',
      description: 'El cliente necesita hablar URGENTEMENTE por teléfono',
      icon: '📞',
      priority: 'CRÍTICA'
    },
    'request-email': {
      title: 'RESPUESTA POR EMAIL SOLICITADA',
      description: 'El cliente solicita información detallada por correo electrónico',
      icon: '📧',
      priority: 'MEDIA'
    },
    'schedule-call': {
      title: 'LLAMADA PROGRAMADA SOLICITADA',
      description: 'El cliente quiere programar una llamada',
      icon: '📅',
      priority: 'MEDIA'
    },
    'request-callback': {
      title: 'CALLBACK SOLICITADO',
      description: 'El cliente solicita que le devuelvan la llamada',
      icon: '📲',
      priority: 'ALTA'
    }
  };
  return methods[type] || {
    title: 'COMUNICACIÓN SOLICITADA',
    description: 'El cliente ha solicitado comunicación',
    icon: '💬',
    priority: 'MEDIA'
  };
}

function generateDynamicQuickActions(ticket) {
  const actions = [];
  const baseUrl = process.env.FRONTEND_URL || 'https://sesec.vercel.app';
  
  // Siempre incluir enlace al ticket completo
  actions.push({
    icon: '📋',
    text: 'Ver ticket completo',
    url: `${baseUrl}/incidente/${ticket.id}`,
    priority: 'always'
  });

  // Acciones basadas en prioridad - soportar español e inglés
  const priority = ticket.priority?.toLowerCase();
  const isCriticalOrHigh = priority === 'crítica' || priority === 'critical' || 
                          priority === 'alta' || priority === 'high';
  const isMedium = priority === 'media' || priority === 'medium';
  
  if (isCriticalOrHigh) {
    // Para incidentes críticos/altos - comunicación inmediata
    if (ticket.contact_phone) {
      actions.push({
        icon: '📞',
        text: 'LLAMAR INMEDIATAMENTE',
        url: `tel:${ticket.contact_phone}`,
        priority: 'critical'
      });
    }
    
    if (ticket.war_room_channel) {
      actions.push({
        icon: '🚨',
        text: 'Unirse a War Room',
        url: ticket.war_room_channel,
        priority: 'critical'
      });
    }
    
    // WhatsApp para comunicación rápida si está disponible
    if (ticket.contact_whatsapp) {
      actions.push({
        icon: '💬',
        text: 'WhatsApp urgente',
        url: `https://wa.me/${ticket.contact_whatsapp}?text=Incidente%20crítico%20${ticket.id}%20requiere%20atención%20inmediata`,
        priority: 'critical'
      });
    }
    
    // Agregar acción de escalación inmediata para críticos
    actions.push({
      icon: '⚠️',
      text: 'ESCALAR INMEDIATAMENTE',
      url: `mailto:escalation@sesec.es?subject=ESCALACIÓN CRÍTICA: ${ticket.incident_type} - Ticket ${ticket.id}&body=INCIDENTE CRÍTICO REQUIERE ESCALACIÓN INMEDIATA%0A%0ATicket: ${ticket.id}%0ATipo: ${ticket.incident_type}%0APrioridad: ${ticket.priority}%0A%0ADetalles del incidente adjuntos.`,
      priority: 'escalation'
    });
  } else if (isMedium) {
    // Para incidentes medios - comunicación programada
    if (ticket.contact_email) {
      actions.push({
        icon: '📧',
        text: 'Responder por email',
        url: `mailto:${ticket.contact_email}?subject=Re: Incidente ${ticket.id} - ${ticket.incident_type}&body=Estimado cliente,%0A%0AEn relación al incidente ${ticket.id}...`,
        priority: 'medium'
      });
    }
    
    if (ticket.contact_phone) {
      actions.push({
        icon: '📞',
        text: 'Programar llamada',
        url: `tel:${ticket.contact_phone}`,
        priority: 'medium'
      });
    }
  } else {
    // Para incidentes leves - comunicación por email principalmente
    if (ticket.contact_email) {
      actions.push({
        icon: '📧',
        text: 'Enviar actualización',
        url: `mailto:${ticket.contact_email}?subject=Actualización: Incidente ${ticket.id}&body=Estimado cliente,%0A%0ALe informamos sobre el estado del incidente ${ticket.id}...`,
        priority: 'low'
      });
    }
  }

  // Acciones específicas por tipo de incidente - mejorar detección
  const incidentType = ticket.incident_type?.toLowerCase() || '';
  
  if (incidentType.includes('ddos')) {
    actions.push({
      icon: '🛡️',
      text: 'Panel anti-DDoS',
      url: `${baseUrl}/dashboard/ddos-protection`,
      priority: 'incident-specific'
    });
  } else if (incidentType.includes('malware') || incidentType.includes('virus') || 
             incidentType.includes('ransomware') || incidentType.includes('cryptominer')) {
    actions.push({
      icon: '🦠',
      text: 'Herramientas antimalware',
      url: `${baseUrl}/dashboard/malware-tools`,
      priority: 'incident-specific'
    });
    
    // Acción específica para ransomware
    if (incidentType.includes('ransomware')) {
      actions.push({
        icon: '🔐',
        text: 'Protocolo Ransomware',
        url: `${baseUrl}/dashboard/ransomware-protocol`,
        priority: 'incident-specific'
      });
    }
  } else if (incidentType.includes('phishing')) {
    actions.push({
      icon: '🎣',
      text: 'Reportar phishing',
      url: `${baseUrl}/dashboard/phishing-report`,
      priority: 'incident-specific'
    });
  } else if (incidentType.includes('brecha') || incidentType.includes('breach')) {
    actions.push({
      icon: '🔒',
      text: 'Protocolo de brecha',
      url: `${baseUrl}/dashboard/breach-protocol`,
      priority: 'incident-specific'
    });
  }

  // Siempre agregar acción de documentación para incidentes críticos
  if (isCriticalOrHigh) {
    actions.push({
      icon: '📝',
      text: 'Documentar respuesta',
      url: `${baseUrl}/dashboard/incident-documentation?ticket=${ticket.id}`,
      priority: 'documentation'
    });
  }

  return actions;
}

function getIncidentActionSteps(incidentType, priority) {
  const baseSteps = {
    'Ataque DDoS': {
      immediate: [
        '🔍 Verificar el estado actual del ataque en herramientas de monitoreo',
        '🛡️ Activar mitigación DDoS automática si no está activa',
        '📊 Analizar patrones de tráfico y vectores de ataque',
        '🚨 Notificar al equipo de infraestructura inmediatamente'
      ],
      followup: [
        '📈 Implementar reglas de filtrado específicas',
        '🔄 Escalar recursos de red si es necesario',
        '📝 Documentar características del ataque',
        '🤝 Coordinar con proveedores de CDN/DDoS protection'
      ],
      resolution: [
        '✅ Confirmar que el tráfico ha vuelto a la normalidad',
        '📊 Generar reporte post-incidente',
        '🔧 Revisar y mejorar defensas DDoS',
        '📞 Informar al cliente sobre medidas implementadas'
      ]
    },
    'Brecha de datos': {
      immediate: [
        '🚨 ACTIVAR PROTOCOLO DE RESPUESTA A BRECHAS',
        '🔒 Aislar sistemas afectados inmediatamente',
        '🔍 Identificar alcance y datos comprometidos',
        '⚖️ Notificar al equipo legal y compliance'
      ],
      followup: [
        '🕵️ Realizar análisis forense detallado',
        '📋 Preparar notificaciones regulatorias (GDPR, etc.)',
        '🔐 Cambiar credenciales comprometidas',
        '📞 Preparar comunicación para afectados'
      ],
      resolution: [
        '🛡️ Implementar medidas de seguridad adicionales',
        '📊 Completar reporte de incidente',
        '🎓 Realizar sesión de lecciones aprendidas',
        '✅ Confirmar cumplimiento regulatorio'
      ]
    },
    'Malware/Ransomware': {
      immediate: [
        '🚨 AISLAR SISTEMAS INFECTADOS INMEDIATAMENTE',
        '🔌 Desconectar de la red para evitar propagación',
        '💾 Preservar evidencia forense',
        '🔍 Identificar tipo y familia de malware'
      ],
      followup: [
        '🧹 Ejecutar análisis antimalware completo',
        '💿 Restaurar desde backups limpios verificados',
        '🔐 Cambiar todas las credenciales potencialmente comprometidas',
        '📊 Analizar vectores de infección'
      ],
      resolution: [
        '🛡️ Fortalecer defensas endpoint',
        '🎓 Capacitar usuarios sobre amenazas',
        '📝 Actualizar políticas de seguridad',
        '✅ Verificar integridad de sistemas restaurados'
      ]
    },
    'Phishing': {
      immediate: [
        '📧 Identificar y bloquear emails maliciosos',
        '🚫 Reportar dominios/URLs fraudulentas',
        '👥 Notificar a usuarios potencialmente afectados',
        '🔍 Analizar alcance de la campaña'
      ],
      followup: [
        '🔐 Verificar si hay credenciales comprometidas',
        '📊 Analizar logs de acceso sospechosos',
        '🛡️ Implementar filtros adicionales',
        '📞 Contactar proveedores de email/DNS'
      ],
      resolution: [
        '🎓 Realizar capacitación anti-phishing',
        '📝 Actualizar políticas de email',
        '✅ Confirmar eliminación de amenaza',
        '📊 Generar reporte de incidente'
      ]
    },
    'Acceso no autorizado': {
      immediate: [
        '🚨 BLOQUEAR ACCESO INMEDIATAMENTE',
        '🔐 Cambiar credenciales comprometidas',
        '🔍 Identificar método de acceso utilizado',
        '📊 Revisar logs de actividad sospechosa'
      ],
      followup: [
        '🕵️ Realizar análisis forense de accesos',
        '🛡️ Implementar autenticación multifactor',
        '📋 Revisar permisos y privilegios',
        '🔄 Actualizar políticas de acceso'
      ],
      resolution: [
        '✅ Confirmar que el acceso está asegurado',
        '📊 Documentar vulnerabilidades encontradas',
        '🎓 Capacitar sobre seguridad de credenciales',
        '🔧 Implementar monitoreo mejorado'
      ]
    },
    'Vulnerabilidad crítica': {
      immediate: [
        '🎯 EVALUAR CRITICIDAD Y EXPOSICIÓN',
        '🔍 Verificar si hay explotación activa',
        '🛡️ Implementar mitigaciones temporales',
        '📊 Inventariar sistemas afectados'
      ],
      followup: [
        '🔧 Aplicar parches de seguridad',
        '🧪 Probar parches en entorno de pruebas',
        '📅 Programar mantenimiento para producción',
        '🔍 Escanear en busca de indicadores de compromiso'
      ],
      resolution: [
        '✅ Confirmar aplicación exitosa de parches',
        '🔍 Realizar escaneo de vulnerabilidades',
        '📊 Actualizar inventario de activos',
        '📝 Documentar proceso de remediación'
      ]
    },
    'Otro incidente': {
      immediate: [
        '🔍 Evaluar naturaleza y alcance del incidente',
        '📊 Clasificar nivel de riesgo',
        '🚨 Activar protocolo de respuesta apropiado',
        '👥 Asignar equipo de respuesta'
      ],
      followup: [
        '🕵️ Investigar causa raíz',
        '🛡️ Implementar medidas de contención',
        '📋 Documentar hallazgos',
        '🤝 Coordinar con stakeholders relevantes'
      ],
      resolution: [
        '✅ Confirmar resolución del incidente',
        '📊 Generar reporte detallado',
        '🎓 Realizar sesión de lecciones aprendidas',
        '🔧 Implementar mejoras preventivas'
      ]
    }
  };

  const steps = baseSteps[incidentType] || baseSteps['Otro incidente'];
  
  // Ajustar urgencia según prioridad
  if (priority === 'CRÍTICA') {
    return {
      ...steps,
      timeframe: 'INMEDIATO (0-15 min)',
      escalation: 'Notificar a directivos y activar equipo de crisis'
    };
  } else if (priority === 'ALTA') {
    return {
      ...steps,
      timeframe: 'URGENTE (15-60 min)',
      escalation: 'Notificar a responsables de seguridad'
    };
  } else if (priority === 'MEDIA') {
    return {
      ...steps,
      timeframe: 'PRIORITARIO (1-4 horas)',
      escalation: 'Seguir procedimientos estándar'
    };
  } else {
    return {
      ...steps,
      timeframe: 'PROGRAMADO (4-24 horas)',
      escalation: 'Asignar a equipo disponible'
    };
  }
}

function generateCommunicationPlainText(ticket, communicationType, communicationData, urgencyLevel, contactMethod) {
  return `
🚨 ACCIÓN REQUERIDA - COMUNICACIÓN CON CLIENTE

${urgencyLevel.icon} URGENCIA: ${urgencyLevel.level}
⏰ TIEMPO LÍMITE: ${urgencyLevel.timeframe}
🎯 ACCIÓN: ${urgencyLevel.action}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${contactMethod.icon} MÉTODO SOLICITADO: ${contactMethod.title}
📝 DESCRIPCIÓN: ${contactMethod.description}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 INFORMACIÓN DEL TICKET:
• ID: #${ticket.id}
• Tipo: ${ticket.incident_type}
• Prioridad: ${ticket.priority}
• Estado: ${ticket.status}
• Creado: ${new Date(ticket.created_at).toLocaleString('es-ES')}

👤 INFORMACIÓN DEL CLIENTE:
• Nombre: ${ticket.contact_info?.name || 'No especificado'}
• Email: ${ticket.contact_info?.email || 'No especificado'}
• Teléfono: ${ticket.contact_info?.phone || 'No especificado'}
• Empresa: ${ticket.contact_info?.company || 'No especificado'}

🌐 INFORMACIÓN TÉCNICA:
• IP: ${ticket.network_metadata?.ip?.address || 'desconocida'}
• Ubicación: ${ticket.network_metadata?.geo?.city || 'desconocida'}, ${ticket.network_metadata?.geo?.country || 'desconocido'}
• Navegador: ${ticket.client_metadata?.browser?.name || 'desconocido'} ${ticket.client_metadata?.browser?.version || ''}
• SO: ${ticket.client_metadata?.os?.name || 'desconocido'} ${ticket.client_metadata?.os?.version || ''}

📄 DESCRIPCIÓN DEL INCIDENTE:
${ticket.description || 'Sin descripción disponible'}

${communicationData.message ? `💬 MENSAJE DEL CLIENTE:\n${communicationData.message}` : ''}

${communicationData.preferredTime ? `⏰ HORA PREFERIDA: ${communicationData.preferredTime}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔗 ACCESO DIRECTO AL TICKET:
${process.env.FRONTEND_URL || 'https://sesec.vercel.app'}/incidente/${ticket.id}

⚡ PRÓXIMOS PASOS:
1. ${urgencyLevel.action}
2. Actualizar el estado del ticket
3. Documentar la comunicación realizada
  `;
}

function generateCommunicationHtml(ticket, communicationType, communicationData, urgencyLevel, contactMethod) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
          .header { background: ${urgencyLevel.color}; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px; }
          .urgency-banner { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 15px 0; }
          .communication-method { background: #e3f2fd; padding: 20px; border-radius: 8px; border-left: 4px solid #2196f3; margin: 15px 0; }
          .ticket-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 15px 0; }
          .client-info { background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 15px 0; }
          .technical-info { background: #fff8e1; padding: 20px; border-radius: 8px; margin: 15px 0; }
          .action-required { background: #ffebee; border: 2px solid #f44336; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
          .info-item { margin: 8px 0; }
          .label { font-weight: bold; color: #555; }
          .value { color: #333; }
          .button { display: inline-block; background: #2196f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
          .urgent { background: #f44336; }
          .high { background: #ff9800; }
          .medium { background: #2196f3; }
          .low { background: #4caf50; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${urgencyLevel.icon} ACCIÓN REQUERIDA - COMUNICACIÓN CON CLIENTE</h1>
          <h2>Ticket #${ticket.id}</h2>
        </div>

        <div class="urgency-banner">
          <h3>${urgencyLevel.icon} URGENCIA: ${urgencyLevel.level}</h3>
          <p><strong>⏰ Tiempo límite:</strong> ${urgencyLevel.timeframe}</p>
          <p><strong>🎯 Acción requerida:</strong> ${urgencyLevel.action}</p>
        </div>

        <div class="communication-method">
          <h3>${contactMethod.icon} ${contactMethod.title}</h3>
          <p>${contactMethod.description}</p>
          ${communicationData.message ? `<div style="background: white; padding: 15px; border-radius: 6px; margin-top: 15px;"><strong>💬 Mensaje del cliente:</strong><br>${communicationData.message}</div>` : ''}
          ${communicationData.preferredTime ? `<p><strong>⏰ Hora preferida:</strong> ${communicationData.preferredTime}</p>` : ''}
        </div>

        <div class="ticket-info">
          <h3>📋 Información del Ticket</h3>
          <div class="info-grid">
            <div class="info-item"><span class="label">ID:</span> <span class="value">#${ticket.id}</span></div>
            <div class="info-item"><span class="label">Tipo:</span> <span class="value">${ticket.incident_type}</span></div>
            <div class="info-item"><span class="label">Prioridad:</span> <span class="value">${ticket.priority}</span></div>
            <div class="info-item"><span class="label">Estado:</span> <span class="value">${ticket.status}</span></div>
            <div class="info-item"><span class="label">Creado:</span> <span class="value">${new Date(ticket.created_at).toLocaleString('es-ES')}</span></div>
          </div>
          ${ticket.description ? `<div style="margin-top: 15px;"><strong>Descripción:</strong><br>${ticket.description}</div>` : ''}
        </div>

        <div class="client-info">
          <h3>👤 Información del Cliente</h3>
          <div class="info-grid">
            <div class="info-item"><span class="label">Nombre:</span> <span class="value">${ticket.contact_info?.name || 'No especificado'}</span></div>
            <div class="info-item"><span class="label">Email:</span> <span class="value">${ticket.contact_info?.email || 'No especificado'}</span></div>
            <div class="info-item"><span class="label">Teléfono:</span> <span class="value">${ticket.contact_info?.phone || 'No especificado'}</span></div>
            <div class="info-item"><span class="label">Empresa:</span> <span class="value">${ticket.contact_info?.company || 'No especificado'}</span></div>
          </div>
        </div>

        <div class="technical-info">
          <h3>🌐 Información Técnica</h3>
          <div class="info-grid">
            <div class="info-item"><span class="label">IP:</span> <span class="value">${ticket.network_metadata?.ip?.address || 'desconocida'}</span></div>
            <div class="info-item"><span class="label">Ubicación:</span> <span class="value">${ticket.network_metadata?.geo?.city || 'desconocida'}, ${ticket.network_metadata?.geo?.country || 'desconocido'}</span></div>
            <div class="info-item"><span class="label">Navegador:</span> <span class="value">${ticket.client_metadata?.browser?.name || 'desconocido'} ${ticket.client_metadata?.browser?.version || ''}</span></div>
            <div class="info-item"><span class="label">SO:</span> <span class="value">${ticket.client_metadata?.os?.name || 'desconocido'} ${ticket.client_metadata?.os?.version || ''}</span></div>
          </div>
        </div>

        <div class="action-required">
          <h3>⚡ PRÓXIMOS PASOS</h3>
          <ol>
            <li><strong>${urgencyLevel.action}</strong></li>
            <li>Actualizar el estado del ticket</li>
            <li>Documentar la comunicación realizada</li>
          </ol>
          
          <div style="text-align: center; margin-top: 20px;">
            <a href="${process.env.FRONTEND_URL || 'https://sesec.vercel.app'}/incidente/${ticket.id}" class="button ${urgencyLevel.level.toLowerCase()}">
              🔗 Ver Ticket Completo
            </a>
          </div>
        </div>
      </body>
    </html>
  `;
}