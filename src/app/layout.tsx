import { Inter } from "next/font/google";
import CookieConsent from '../components/CookieConsent';
import Navbar from "../components/Navbar";
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
      <body className="antialiased">
        <LanguageProvider>
          <CookieConsent />
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
