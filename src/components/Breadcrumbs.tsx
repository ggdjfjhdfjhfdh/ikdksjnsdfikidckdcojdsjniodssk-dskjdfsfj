'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import JsonLd from './JsonLd';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const pathNameMap: Record<string, string> = {
  'recursos': 'Recursos',
  'wiki': 'Wiki',
  'herramientas': 'Herramientas',
  'guias': 'Guías',
  'fundamentos': 'Fundamentos',
  'gestion-riesgos': 'Gestión de Riesgos',
  'calculadora-riesgo': 'Calculadora de Riesgo',
  'test-ciberseguridad': 'Test de Ciberseguridad',
  'about': 'Acerca de',
  'contact': 'Contacto',
  'solutions': 'Soluciones',
  'enlaces': 'Enlaces',
  'legal': 'Legal',
  'terms': 'Términos y Condiciones',
  'privacy': 'Política de Privacidad',
  'cookies': 'Política de Cookies'
};

export default function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const pathname = usePathname();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;
    
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [];
    
    let currentPath = '';
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const name = pathNameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
      
      breadcrumbs.push({
        name,
        href: currentPath
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  if (breadcrumbs.length === 0) return null;
  
  // Schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://sesecpro.es"
      },
      ...breadcrumbs.map((breadcrumb, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": breadcrumb.name,
        "item": `https://sesecpro.es${breadcrumb.href}`
      }))
    ]
  };
  
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`} aria-label="Breadcrumb">
        <Link 
          href="/" 
          className="flex items-center hover:text-blue-600 transition-colors"
          aria-label="Ir al inicio"
        >
          <HomeIcon className="h-4 w-4" />
          <span className="sr-only">Inicio</span>
        </Link>
        
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={breadcrumb.href} className="flex items-center space-x-2">
            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
            {index === breadcrumbs.length - 1 ? (
              <span className="font-medium text-gray-900" aria-current="page">
                {breadcrumb.name}
              </span>
            ) : (
              <Link 
                href={breadcrumb.href} 
                className="hover:text-blue-600 transition-colors"
              >
                {breadcrumb.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}