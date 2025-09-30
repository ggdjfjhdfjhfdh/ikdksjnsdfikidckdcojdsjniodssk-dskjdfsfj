import dotenv from 'dotenv';
import * as cybersecurityAPI from './backend/services/cybersecurity-api.js';

// Cargar variables de entorno
dotenv.config();

async function testAPIs() {
  console.log('🔍 Probando APIs de ciberseguridad...');
  
  try {
    console.log('\n📡 Probando URLhaus API...');
    const urlhausData = await cybersecurityAPI.fetchURLhausData();
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
    const cloudflareData = await cybersecurityAPI.fetchCloudflareData();
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
    const sansData = await cybersecurityAPI.fetchSansISCData();
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
    const ransomData = await cybersecurityAPI.fetchRansomwatchData();
    console.log('RansomWatch resultado:', {
      count: ransomData.count,
      topGroups: ransomData.topGroups?.length,
      threatLevel: ransomData.threatLevel,
      error: ransomData.error
    });
  } catch (error) {
    console.error('❌ RansomWatch falló:', error.message);
  }

  try {
    console.log('\n🦠 Probando ThreatFox API...');
    const threatfoxData = await cybersecurityAPI.fetchThreatFoxData();
    console.log('ThreatFox resultado:', {
      countries: threatfoxData.countries?.length,
      recentThreats: threatfoxData.recentThreats?.length,
      totalCount: threatfoxData.totalCount,
      error: threatfoxData.error
    });
  } catch (error) {
    console.error('❌ ThreatFox falló:', error.message);
  }

  try {
    console.log('\n🤖 Probando FeodoTracker API...');
    const feodoData = await cybersecurityAPI.fetchFeodoTrackerData();
    console.log('FeodoTracker resultado:', {
      countries: feodoData.countries?.length,
      recentBotnets: feodoData.recentBotnets?.length,
      totalCount: feodoData.totalCount,
      error: feodoData.error
    });
  } catch (error) {
    console.error('❌ FeodoTracker falló:', error.message);
  }
  
  console.log('\n🔄 Probando fetchAllThreatData...');
  try {
    const allData = await cybersecurityAPI.fetchAllThreatData();
    console.log('Datos combinados:', {
      urlhaus: allData.urlhaus?.error ? 'ERROR' : 'OK',
      cloudflare: allData.cloudflare?.error ? 'ERROR' : 'OK',
      sansISC: allData.sansISC?.error ? 'ERROR' : 'OK',
      ransomwatch: allData.ransomwatch?.error ? 'ERROR' : 'OK',
      threatfox: allData.threatfox?.error ? 'ERROR' : 'OK',
      feodotracker: allData.feodotracker?.error ? 'ERROR' : 'OK'
    });
  } catch (error) {
    console.error('❌ fetchAllThreatData falló:', error.message);
  }
}

testAPIs().catch(console.error);