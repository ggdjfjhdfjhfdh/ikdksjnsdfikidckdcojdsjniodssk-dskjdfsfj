import dotenv from 'dotenv';
import cybersecurityAPI from './src/services/cybersecurity-api.js';

// Cargar variables de entorno
dotenv.config();

async function debugAPIs() {
  console.log('🔍 Debug detallado de APIs...');
  
  try {
    console.log('\n📡 Debug URLhaus API...');
    const urlhausData = await cybersecurityAPI.getURLhausData();
    console.log('URLhaus datos completos:', {
      count: urlhausData.count,
      total_urls: urlhausData.total_urls,
      recent_samples_length: urlhausData.recent_samples?.length,
      trend_length: urlhausData.trend?.length,
      threatTypes_length: urlhausData.threatTypes?.length,
      topCountries_length: urlhausData.topCountries?.length,
      error: urlhausData.error
    });
    
    if (urlhausData.recent_samples?.length > 0) {
      console.log('Muestra de datos URLhaus:', urlhausData.recent_samples[0]);
    }
  } catch (error) {
    console.error('❌ URLhaus falló:', error.message);
  }
  
  try {
    console.log('\n☁️ Debug Cloudflare API...');
    const cloudflareData = await cybersecurityAPI.getCloudflareRadarData();
    console.log('Cloudflare datos completos:', {
      percentage: cloudflareData.percentage,
      totalAttacks: cloudflareData.totalAttacks,
      topCountries_length: cloudflareData.topCountries?.length,
      topTechniques_length: cloudflareData.topTechniques?.length,
      trend_length: cloudflareData.trend?.length,
      attackTypes: cloudflareData.attackTypes,
      error: cloudflareData.error
    });
  } catch (error) {
    console.error('❌ Cloudflare falló:', error.message);
  }
  
  try {
    console.log('\n🦹 Debug RansomWatch API...');
    const ransomData = await cybersecurityAPI.getRansomWatchData();
    console.log('RansomWatch datos completos:', {
      count: ransomData.count,
      count7d: ransomData.count7d,
      count30d: ransomData.count30d,
      topGroups_length: ransomData.topGroups?.length,
      threatLevel: ransomData.threatLevel,
      rawData_posts_length: ransomData.rawData?.allPosts?.length,
      error: ransomData.error
    });
    
    // Verificar fechas de los posts
    if (ransomData.rawData?.allPosts?.length > 0) {
      const posts = ransomData.rawData.allPosts;
      console.log('Muestra de fechas de posts:');
      for (let i = 0; i < Math.min(5, posts.length); i++) {
        const post = posts[i];
        console.log(`  Post ${i}: discovered=${post.discovered}, title=${post.post_title?.substring(0, 50)}`);
      }
      
      // Verificar rango de fechas
      const now = new Date();
      const day24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const day7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      console.log(`Fecha actual: ${now.toISOString()}`);
      console.log(`Filtro 24h: ${day24h.toISOString()}`);
      console.log(`Filtro 7d: ${day7d.toISOString()}`);
      
      const recentPosts = posts.filter(post => {
        const discovered = new Date(post.discovered);
        return discovered > day7d && post.post_title && post.group_name;
      });
      console.log(`Posts en últimos 7 días: ${recentPosts.length}`);
    }
  } catch (error) {
    console.error('❌ RansomWatch falló:', error.message);
  }
}

debugAPIs().catch(console.error);