import cybersecurityAPI from '../../services/cybersecurity-api.js';

export async function GET({ request }) {
  try {
    // Configurar headers CORS
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept, Cache-Control',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    };

    // Obtener datos frescos de todas las APIs
    console.log('🔄 Obteniendo datos actualizados de las APIs...');
    
    const threatData = await cybersecurityAPI.getAllData();
    
    if (!threatData) {
      console.warn('⚠️ No se pudieron obtener datos de las APIs');
      return new Response(
        JSON.stringify({ 
          error: 'No se pudieron obtener datos de las APIs',
          timestamp: new Date().toISOString()
        }), 
        { 
          status: 503, 
          headers 
        }
      );
    }

    // Validar que al menos una fuente tenga datos
    const hasValidData = threatData.urlhaus || threatData.cloudflare || threatData.ransomwatch;
    
    if (!hasValidData) {
      console.warn('⚠️ Datos obtenidos están vacíos o inválidos');
      return new Response(
        JSON.stringify({ 
          error: 'Datos obtenidos están vacíos o inválidos',
          timestamp: new Date().toISOString()
        }), 
        { 
          status: 503, 
          headers 
        }
      );
    }

    // Agregar metadatos de actualización
    const responseData = {
      ...threatData,
      metadata: {
        timestamp: new Date().toISOString(),
        sources: {
          urlhaus: !!threatData.urlhaus,
          cloudflare: !!threatData.cloudflare,
          ransomwatch: !!threatData.ransomwatch
        },
        updateInterval: 30 * 1000, // 30 segundos
        cacheStatus: cybersecurityAPI.getCacheStatus ? cybersecurityAPI.getCacheStatus() : null
      }
    };

    console.log('✅ Datos actualizados enviados correctamente');
    console.log('📊 Fuentes disponibles:', {
      urlhaus: !!threatData.urlhaus,
      cloudflare: !!threatData.cloudflare,
      ransomwatch: !!threatData.ransomwatch
    });

    return new Response(
      JSON.stringify(responseData), 
      { 
        status: 200, 
        headers 
      }
    );

  } catch (error) {
    console.error('❌ Error en endpoint de threat-data:', error);
    
    const errorResponse = {
      error: 'Error interno del servidor',
      message: error.message,
      timestamp: new Date().toISOString()
    };

    return new Response(
      JSON.stringify(errorResponse), 
      { 
        status: 500, 
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}

// Manejar preflight requests para CORS
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept, Cache-Control',
      'Access-Control-Max-Age': '86400'
    }
  });
}