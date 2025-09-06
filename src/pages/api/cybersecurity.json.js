// API endpoint for cybersecurity dashboard data
import { cybersecurityAPI } from '../../services/cybersecurity-api.js';

export async function GET() {
  try {
    // Set CORS headers for cross-origin requests
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'public, max-age=900' // 15 minutes cache
    };

    // Fetch all cybersecurity data (solo datos reales, sin fallbacks)
    const data = await cybersecurityAPI.getAllData();

    // Construir metadatos de estado por API (ok/error)
    const apis = {
      urlhaus: {
        status: data?.urlhaus && !data.urlhaus.error ? 'ok' : 'error',
        description: 'URLhaus - Malicious URLs',
        type: 'free'
      },
      cloudflare: {
        status: data?.cloudflare && !data.cloudflare.error ? 'ok' : 'error',
        description: 'Cloudflare Radar - L7 Attacks',
        type: 'premium'
      },
      sansISC: {
        status: data?.sansISC && !data.sansISC.error ? 'ok' : 'error',
        description: 'SANS ISC - Top Scanned Ports',
        type: 'free'
      },
      ransomwatch: {
        status: data?.ransomwatch && !data.ransomwatch.error ? 'ok' : 'error',
        description: 'RansomWatch - Ransomware Victims',
        type: 'free'
      }
    };

    const response = {
      success: true,
      data,
      apis,
      metadata: {
        timestamp: new Date().toISOString(),
        source: 'SESEC Cybersecurity Dashboard',
        cacheTimeout: 900 // 15 minutes
      }
    };

    return new Response(JSON.stringify(response, null, 2), {
      status: 200,
      headers
    });

  } catch (error) {
    console.error('Cybersecurity API Error:', error);

    // En fallo total, devolver error sin datos simulados
    const errorResponse = {
      success: false,
      error: 'No se pudieron obtener datos en tiempo real de las APIs de ciberseguridad',
      metadata: {
        timestamp: new Date().toISOString(),
        source: 'SESEC Cybersecurity Dashboard'
      }
    };

    return new Response(JSON.stringify(errorResponse, null, 2), {
      status: 502,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'no-store'
      }
    });
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}