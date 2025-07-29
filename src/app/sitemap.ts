import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sesecpro.es'
  
  const routes = [
    '',
    '/about',
    '/solutions',
    '/contact',
    '/enlaces',
    '/recursos',
    '/recursos/guias',
    '/recursos/herramientas',
    '/recursos/wiki',
    '/recursos/herramientas/calculadora-riesgo',
    '/recursos/herramientas/test-ciberseguridad',
    '/legal/terms',
    '/legal/privacy',
    '/legal/cookies',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.includes('/wiki') || route.includes('/recursos') ? 'weekly' as const : 'daily' as const,
    priority: route === '' ? 1 : route.includes('/recursos') ? 0.9 : route.includes('/legal') ? 0.3 : 0.8,
  }))

  return routes
}
