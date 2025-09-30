import pkg from 'pg';
const { Pool } = pkg;

async function testConnection() {
  const pool = new Pool({
    connectionString: 'postgres://postgres:l60Quz2aqw3S6da@sesec-db-new.flycast:5432',
    ssl: { rejectUnauthorized: false }
  });

  try {
    const client = await pool.connect();
    console.log('✅ Conexión exitosa a la base de datos');
    
    const result = await client.query('SELECT 1 as test');
    console.log('✅ Query ejecutado correctamente:', result.rows[0]);
    
    client.release();
    await pool.end();
    
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.error('Detalles:', error);
    process.exit(1);
  }
}

testConnection();