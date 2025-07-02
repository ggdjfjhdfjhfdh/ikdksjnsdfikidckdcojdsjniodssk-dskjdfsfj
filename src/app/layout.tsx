import { Inter } from "next/font/google";
import CookieConsent from '../components/CookieConsent';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";
import { metadata } from './metadata';
import { LanguageProvider } from "../lib/LanguageContext";

const inter = Inter({ subsets: ['latin'] });

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.className}>
      <head>
        {/* Manifest removed to prevent 429 errors */}
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
