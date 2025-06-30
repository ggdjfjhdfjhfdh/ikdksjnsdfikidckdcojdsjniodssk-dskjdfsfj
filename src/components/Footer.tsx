import Link from 'next/link';
import React from 'react';
import { useI18n } from '@/lib/i18n';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  bgColor?: string; // e.g. 'bg-white' or 'bg-gray-100'
  links?: FooterLink[];
}

const defaultLinks: FooterLink[] = [
  { label: 'Aviso Legal', href: '/legal/terms' },
  { label: 'Política de Privacidad', href: '/legal/privacy' },
  { label: 'Política de Cookies', href: '/legal/cookies' }
];

const Footer: React.FC<FooterProps> = ({ bgColor = 'bg-white', links = defaultLinks }) => {
  const t = useI18n();

  return (
    <footer className={`${bgColor} border-t border-gray-100 py-12`}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="text-gray-600">{new Date().getFullYear()} Sesecpro. {t('allRightsReserved')}</p>
            <p className="text-gray-500 italic mt-1">{t('yourCybersecurityPartner')}</p>
          </div>
          <div className="flex space-x-6">
            {links.map(link => {
                let label;
                if (link.label === 'Aviso Legal') label = t('termsAndConditions');
                else if (link.label === 'Política de Privacidad') label = t('privacyPolicy');
                else if (link.label === 'Política de Cookies') label = t('cookieConsent');
                else label = link.label;
                return (
                  <Link key={link.href + link.label} href={link.href} className="text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium hover:underline">
                    {label}
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
