'use client';
import Link from 'next/link';
import React from 'react';
import { useI18n } from '@/lib/i18n';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  bgColor?: string;
  links?: FooterLink[];
}

export default function Footer({ bgColor = 'bg-gray-900/95', links = [
  { label: 'Aviso Legal', href: '/legal/terms' },
  { label: 'Política de Privacidad', href: '/legal/privacy' },
  { label: 'Política de Cookies', href: '/legal/cookies' }
] }: FooterProps) {
  const t = useI18n();

  return (
    <footer className={`${bgColor} text-white py-16 px-4 md:px-0`}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Left section - About and social */}
        <div className="flex flex-col items-center md:items-start">
          <p className="text-gray-300 text-sm text-center md:text-left max-w-xs">
            {t('footerSlogan1')}<br/>{t('footerSlogan2')}
          </p>
          <div className="flex gap-6 mt-6">
            <a href="https://instagram.com/sesecpro" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-all drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" aria-label="Instagram">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 2.25a6 6 0 1 1-6 6 6 6 0 0 1 6-6zm0 1.5a4.5 4.5 0 1 0 4.5 4.5 4.5 4.5 0 0 0-4.5-4.5zm5.25.75a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/></svg>
            </a>
            <a href="https://youtube.com/@sesecpro" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-all drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" aria-label="YouTube">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M23.498 6.186a2.993 2.993 0 0 0-2.11-2.117C19.411 3.5 12 3.5 12 3.5s-7.411 0-9.388.569A2.993 2.993 0 0 0 .502 6.186C0 8.16 0 12 0 12s0 3.84.502 5.814a2.993 2.993 0 0 0 2.11 2.117C4.589 20.5 12 20.5 12 20.5s7.411 0 9.388-.569a2.993 2.993 0 0 0 2.11-2.117C24 15.84 24 12 24 12s0-3.84-.502-5.814zM9.545 15.568V8.432L15.818 12z"/></svg>
            </a>
            <a href="https://x.com/sesecpro" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-all drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.951.564-2.005.974-3.127 1.195-.897-.959-2.178-1.559-3.594-1.559-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.061c0 2.385 1.693 4.374 4.169 4.827-.693.188-1.452.232-2.224.084.627 1.956 2.444 3.377 4.6 3.417-2.07 1.623-4.678 2.348-7.29 2.034 2.179 1.397 4.768 2.212 7.557 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.689 1.797-1.56 2.457-2.549z"/></svg>
            </a>
          </div>
        </div>

        {/* Middle divider */}
        <div className="hidden md:block h-24 w-px bg-gradient-to-b from-cyan-500/40 via-gray-400/10 to-transparent mx-10 rounded-full" />

        {/* Right section - Navigation */}
        <nav className="flex flex-col items-center gap-6 md:gap-4 md:items-end w-full md:w-auto mt-8 md:mt-0">
          <div className="flex gap-6 text-sm font-normal">
            <Link href="/about" className="text-gray-400 hover:text-cyan-400 transition-colors">{t('navPurpose')}</Link>
            <Link href="/solutions" className="text-gray-400 hover:text-cyan-400 transition-colors">{t('navSolutions')}</Link>
            <Link href="/resources" className="text-gray-400 hover:text-cyan-400 transition-colors">{t('resources')}</Link>
            <Link href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">{t('navContact')}</Link>
          </div>
          <div className="flex flex-wrap gap-6 mt-4 justify-center md:justify-end">
            {links.map(link => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-gray-400 hover:text-cyan-300 text-xs underline underline-offset-2 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
      <div className="mt-10 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Se.Sec.Pro. {t('allRightsReserved')}
      </div>
    </footer>
  );
}
