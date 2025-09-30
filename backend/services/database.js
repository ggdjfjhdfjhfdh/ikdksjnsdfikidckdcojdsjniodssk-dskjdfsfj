import pkg from 'pg';
const { Pool } = pkg;


// Configuración de la conexión a PostgreSQL
const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  max: 20, // máximo de conexiones en el pool
  idleTimeoutMillis: 30000, // cierra conexiones inactivas después de 30 segundos
  connectionTimeoutMillis: 10000, // timeout de conexión de 10 segundos (aumentado para SSL)
};

// Configuración SSL robusta para Fly.io y entornos de producción
// Solo habilitamos SSL si la URL apunta al dominio público *.fly.dev (excluyendo *.flycast que es la red interna)
if (process.env.DATABASE_URL?.includes('.fly.dev') && !process.env.DATABASE_URL?.includes('flycast')) {

  // Configuración específica para Fly.io PostgreSQL
  poolConfig.ssl = {
    rejectUnauthorized: false, // Crucial para Fly.io PostgreSQL
    require: true,
  };

  // Tiempo extra para el handshake TLS cuando corresponda
  poolConfig.connectionTimeoutMillis = 30000; // 30 segundos para SSL handshake

  console.log('🔒 Configuración SSL activada para conexiones públicas *.fly.dev');
}
// Para Fly.io, usar la URL interna de flycast pero con configuración SSL adecuada
else if (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('flycast')) {
  // Fly.io PostgreSQL requiere SSL pero NO se deben agregar parámetros a la URL
  // La configuración SSL se maneja a través del objeto ssl, no de parámetros de URL

  // Configuración adicional específica para el driver pg de Node.js
  poolConfig.connectionTimeoutMillis = 30000; // 30 segundos para SSL handshake (aumentado por ECONNRESET)

  console.log('⚡ Configuración optimizada para conexiones internas flycast');
}

const pool = new Pool(poolConfig);

// Inicializar la base de datos con la tabla de tickets
async function initializeDatabase() {
  let client;
  try {
    client = await pool.connect();

    // Utilizar un bloqueo asesor para evitar condiciones de carrera cuando
    // múltiples instancias intentan inicializar la base de datos al mismo tiempo.
    // El número 123456789 es arbitrario pero debe ser entero con ámbito global.
    await client.query('SELECT pg_advisory_lock($1)', [123456789]);

    // Crear tabla de tickets si no existe
    await client.query(`
      CREATE TABLE IF NOT EXISTS security_tickets (
        id VARCHAR(36) PRIMARY KEY,
        -- Campos básicos (Paso 1)
        organization VARCHAR(255) NOT NULL,
        contact_name VARCHAR(255) NOT NULL,
        contact_email VARCHAR(255) NOT NULL,
        contact_phone VARCHAR(50) NOT NULL,
        incident_type VARCHAR(50) NOT NULL,
        affected_assets TEXT[] NOT NULL,
        incident_start TIMESTAMP WITH TIME ZONE NOT NULL,
        impact_level VARCHAR(20) NOT NULL,
        authorized_actions TEXT[] NOT NULL,
        war_room_channel VARCHAR(50) NOT NULL,
        
        -- Estado y timestamps
        status VARCHAR(20) DEFAULT 'RECEIVED' CHECK (status IN ('RECEIVED', 'TRIAGE', 'MITIGATING', 'CONTAINING', 'MONITORING', 'RESOLVED', 'POSTMORTEM')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        resolved_at TIMESTAMP WITH TIME ZONE,
        
        -- Campos específicos por tipo (Paso 2)
        incident_details JSONB NOT NULL DEFAULT '{}'::jsonb,
        
        -- Metadatos automáticos
        enrichment_data JSONB NOT NULL DEFAULT '{}'::jsonb,
        technical_metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
        
        -- Datos de respuesta
        sla_data JSONB,
        timeline JSONB[] NOT NULL DEFAULT '[]'::jsonb[],
        attachments JSONB[] NOT NULL DEFAULT '[]'::jsonb[]
      )
    `);

    // Crear índice para búsquedas por tipo de incidente
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_incident_type ON security_tickets(incident_type)
    `);

    // Crear índice para búsquedas por prioridad
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_priority ON security_tickets(priority)
    `);

    // Crear índice para búsquedas por fecha
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_created_at ON security_tickets(created_at)
    `);

    console.log('✅ Base de datos inicializada correctamente');
  } catch (error) {
    // Si la tabla ya existe por condición de carrera, ignoramos el error 23505.
    if (error.code === '23505') {
      console.warn('⚠️  La tabla ya existía, se ignora el error de duplicado.');
    } else {
      console.error('❌ Error inicializando la base de datos:', error);
      throw error;
    }
  } finally {
    // Liberar el bloqueo y la conexión si estaban activos
    try {
      if (client) await client.query('SELECT pg_advisory_unlock($1)', [123456789]);
    } catch (unlockErr) {
      console.error('⚠️  Error liberando el bloqueo asesor:', unlockErr);
    }
    if (client) client.release();
  }
}

// Funciones CRUD para tickets
const ticketRepository = {
  // Crear nuevo ticket
  async create(ticketData) {
    const client = await pool.connect();
    try {
      const query = `
        INSERT INTO security_tickets (
          id, type, incident_type, priority, response_time, 
          status, metadata, response
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `;

      const values = [
        ticketData.id,
        ticketData.type,
        ticketData.incident_type,
        ticketData.priority,
        ticketData.response_time,
        ticketData.status,
        JSON.stringify(ticketData.metadata || {}),
        JSON.stringify(ticketData.response || {})
      ];

      const result = await client.query(query, values);
      return result.rows[0];

    } finally {
      client.release();
    }
  },

  // Obtener ticket por ID
  async findById(id) {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM security_tickets WHERE id = $1';
      const result = await client.query(query, [id]);
      return result.rows[0];

    } finally {
      client.release();
    }
  },

  // Obtener todos los tickets (ordenados por fecha descendente)
  async findAll() {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM security_tickets ORDER BY created_at DESC';
      const result = await client.query(query);
      return result.rows;

    } finally {
      client.release();
    }
  },

  // Actualizar ticket
  async update(id, updates) {
    const client = await pool.connect();
    try {
      const fields = [];
      const values = [];
      let paramCount = 1;

      Object.keys(updates).forEach((key, index) => {
        fields.push(`${key} = $${paramCount++}`);
        values.push(updates[key]);
      });

      // Siempre actualizar updated_at
      fields.push('updated_at = CURRENT_TIMESTAMP');

      const query = `
        UPDATE security_tickets 
        SET ${fields.join(', ')}
        WHERE id = $${paramCount}
        RETURNING *
      `;

      values.push(id);
      const result = await client.query(query, values);
      return result.rows[0];

    } finally {
      client.release();
    }
  },

  // Eliminar ticket
  async delete(id) {
    const client = await pool.connect();
    try {
      const query = 'DELETE FROM security_tickets WHERE id = $1 RETURNING *';
      const result = await client.query(query, [id]);
      return result.rows[0];

    } finally {
      client.release();
    }
  },

  // Limpiar tickets antiguos (más de 30 días)
  async cleanupOldTickets() {
    const client = await pool.connect();
    try {
      const query = `
        DELETE FROM security_tickets 
        WHERE created_at < NOW() - INTERVAL '30 days'
        RETURNING id
      `;

      const result = await client.query(query);
      console.log(`🗑️  Tickets eliminados (antiguos): ${result.rowCount}`);
      return result.rowCount;

    } finally {
      client.release();
    }
  }
};

// Health check de la base de datos
async function checkDatabaseHealth() {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    return { healthy: true, message: 'Database connection OK' };
  } catch (error) {
    return {
      healthy: false,
      message: 'Database connection failed',
      error: error.message
    };
  }
}

export { pool, initializeDatabase, ticketRepository, checkDatabaseHealth };