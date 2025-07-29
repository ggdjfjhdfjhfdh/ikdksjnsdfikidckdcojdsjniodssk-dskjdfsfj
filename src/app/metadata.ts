import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://sesecpro.es'),
  title: {
    default: 'Sesecpro - Advanced Cybersecurity Solutions',
    template: '%s | Sesecpro'
  },
  description: 'Your trusted cybersecurity partner. We provide advanced, simple, and business-adapted solutions with real-time threat monitoring and cutting-edge technology.',
  keywords: [
    'ciberseguridad',
    'seguridad informática',
    'protección digital',
    'consultoría seguridad',
    'evaluación riesgos',
    'SESECPRO',
    'cybersecurity',
    'security assessment',
    'digital protection',
    'risk calculator',
    'security tools',
    'phishing protection',
    'ISO 27001',
    'NIST framework',
    'GDPR compliance',
    'penetration testing',
    'vulnerability assessment',
    'security audit',
    'cyber threats',
    'information security'
  ],
  authors: [{ name: 'Sesecpro', url: 'https://sesecpro.es' }],
  creator: 'Sesecpro',
  publisher: 'Sesecpro',
  icons: {
    icon: '/favicon.ico',
    // También puedes añadir versiones en diferentes tamaños
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { rel: 'icon', url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
  },
  // Manifest removed to prevent 429 errors
  // Configuración para redes sociales
  openGraph: {
    title: 'Sesecpro - Advanced Cybersecurity Solutions',
    description: 'Your cybersecurity partner. Advanced, simple, and business-adapted solutions.',
    url: 'https://sesecpro.es',
    siteName: 'Sesecpro',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sesecpro Cybersecurity',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  // Configuración para Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'Sesecpro - Advanced Cybersecurity Solutions',
    description: 'Your cybersecurity partner. Advanced, simple, and business-adapted solutions.',
    images: ['/twitter-image.png'],
  },
}
