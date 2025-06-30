import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';

export default function FundamentosPage() {
  const articles = [
    {
      title: 'Zero Trust',
      description: 'Modelo y principios de "Never Trust, Always Verify"',
      href: '/recursos/wiki/fundamentos/zero-trust'
    },
    {
      title: 'Defense in Depth',
      description: 'Estrategia de múltiples capas de seguridad',
      href: '/recursos/wiki/fundamentos/defense-in-depth'
    },
    {
      title: 'Principio de Mínimo Privilegio',
      description: 'Least Privilege - acceso mínimo necesario',
      href: '/recursos/wiki/fundamentos/minimo-privilegio'
    },
    {
      title: 'Modelo AAA',
      description: 'Autenticación, Autorización y Auditoría',
      href: '/recursos/wiki/fundamentos/modelo-aaa'
    },
    {
      title: 'Gestión de Riesgos',
      description: 'ISO 27005 / NIST RMF - Marco de gestión de riesgos',
      href: '/recursos/wiki/fundamentos/gestion-riesgos'
    },
    {
      title: 'Seguridad por Diseño',
      description: 'Secure SDLC - Integración de seguridad en el ciclo de desarrollo',
      href: '/recursos/wiki/fundamentos/seguridad-diseno'
    },
    {
      title: 'Superficie de Ataque',
      description: 'Identificación y reducción de vectores de ataque',
      href: '/recursos/wiki/fundamentos/superficie-ataque'
    },
    {
      title: 'Métricas de Seguridad',
      description: 'MTTD, MTTR y Dwell Time - Medición de capacidades defensivas',
      href: '/recursos/wiki/fundamentos/metricas-seguridad'
    },
    {
      title: 'Kerckhoffs',
      description: 'Principios de seguridad por transparencia',
      href: '/recursos/wiki/fundamentos/kerckhoffs'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton href="/recursos/wiki" className="mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Fundamentos de Ciberseguridad</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.href} {...article} />
          ))}
        </div>
      </div>
    </div>
  );
}
