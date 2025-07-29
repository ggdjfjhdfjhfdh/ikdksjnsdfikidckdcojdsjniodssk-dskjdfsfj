import { Inter } from "next/font/google";
import CookieConsent from '../components/CookieConsent';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import "./globals.css";
import { LanguageProvider } from "../lib/LanguageContext";

export const metadata = {
  title: 'SESECPRO | Soluciones Integrales de Ciberseguridad',
  description: 'Protección avanzada contra ciberamenazas para empresas y particulares con soluciones personalizadas de seguridad digital.',
  metadataBase: new URL('https://sesecpro.es'),
  alternates: {
    canonical: 'https://sesecpro.es',
    languages: {
      'es': 'https://sesecpro.es',
      'en': 'https://sesecpro.es/en',
      'x-default': 'https://sesecpro.es'
    }
  },
  openGraph: {
    title: 'SESECPRO | Soluciones Integrales de Ciberseguridad',
    description: 'Protección avanzada contra ciberamenazas para empresas y particulares con soluciones personalizadas de seguridad digital.',
    images: '/og-image.jpg',
  },
};

const inter = Inter({ subsets: ['latin'] });

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SESECPRO",
  "description": "Soluciones avanzadas de ciberseguridad para proteger tu mundo digital",
  "url": "https://sesecpro.es",
  "logo": "https://sesecpro.es/logo.svg",
  "image": "https://sesecpro.es/og-image.png",
  "sameAs": [
    "https://sesecpro.es"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "url": "https://sesecpro.es/contact"
  },
  "areaServed": "ES",
  "serviceType": "Cybersecurity Services",
  "knowsAbout": [
    "Cybersecurity",
    "Risk Assessment",
    "Security Consulting",
    "Digital Protection",
    "Information Security"
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.className}>
      <head>
        <JsonLd data={organizationSchema} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/api/manifest" />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <LanguageProvider>
          <CookieConsent />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
