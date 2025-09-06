import dotenv from 'dotenv';
import cybersecurityAPI from './src/services/cybersecurity-api.js';

// Cargar variables de entorno
dotenv.config();

async function testAPIs() {
  console.log('🔍 Probando APIs de ciberseguridad...');
  
  try {
    console.log('\n📡 Probando URLhaus API...');
    const urlhausData = await cybersecurityAPI.getURLhausData();
    console.log('URLhaus resultado:', {
      total_urls: urlhausData.total_urls || urlhausData.count,
      recent_samples: urlhausData.recent_samples?.length,
      error: urlhausData.error
    });
  } catch (error) {
    console.error('❌ URLhaus falló:', error.message);
  }
  
  try {
    console.log('\n☁️ Probando Cloudflare Radar API...');
    const cloudflareData = await cybersecurityAPI.getCloudflareRadarData();
    console.log('Cloudflare resultado:', {
      totalAttacks: cloudflareData.totalAttacks,
      percentage: cloudflareData.percentage,
      top_countries: cloudflareData.top_countries?.length,
      error: cloudflareData.error
    });
  } catch (error) {
    console.error('❌ Cloudflare falló:', error.message);
  }
  
  try {
    console.log('\n🛡️ Probando SANS ISC API...');
    const sansData = await cybersecurityAPI.getSANSISCData();
    console.log('SANS resultado:', {
      totalScans: sansData.totalScans,
      ports: sansData.ports?.length,
      threatLevel: sansData.threatLevel,
      error: sansData.error
    });
  } catch (error) {
    console.error('❌ SANS falló:', error.message);
  }
  
  try {
    console.log('\n🦹 Probando RansomWatch API...');
    const ransomData = await cybersecurityAPI.getRansomWatchData();
    console.log('RansomWatch resultado:', {
      count: ransomData.count,
      topGroups: ransomData.topGroups?.length,
      threatLevel: ransomData.threatLevel,
      error: ransomData.error
    });
  } catch (error) {
    console.error('❌ RansomWatch falló:', error.message);
  }
  
  console.log('\n🔄 Probando getAllData...');
  try {
    const allData = await cybersecurityAPI.getAllData();
    console.log('Datos combinados:', {
      urlhaus: allData.urlhaus?.error ? 'ERROR' : 'OK',
      cloudflare: allData.cloudflare?.error ? 'ERROR' : 'OK',
      sansISC: allData.sansISC?.error ? 'ERROR' : 'OK',
      ransomwatch: allData.ransomwatch?.error ? 'ERROR' : 'OK'
    });
  } catch (error) {
    console.error('❌ getAllData falló:', error.message);
  }
}

testAPIs().catch(console.error);