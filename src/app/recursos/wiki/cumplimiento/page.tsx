import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';

export default function CumplimientoPage() {
  const articles = [
    {
      title: 'ISO 27002',
      description: 'Estándar internacional de seguridad de la información',
      href: '/recursos/wiki/cumplimiento/iso27002'
    },
    {
      title: 'SOC 2',
      description: 'Reportes de controles organizacionales',
      href: '/recursos/wiki/cumplimiento/soc2'
    },
    {
      title: 'HIPAA',
      description: 'Protección de datos de salud (ePHI)',
      href: '/recursos/wiki/cumplimiento/hipaa'
    },
    {
      title: 'FedRAMP',
      description: 'Seguridad para proveedores cloud del gobierno US',
      href: '/recursos/wiki/cumplimiento/fedramp'
    },
    {
      title: 'CCPA/CPRA',
      description: 'Protección de datos en California',
      href: '/recursos/wiki/cumplimiento/ccpa'
    },
    {
      title: 'GDPR',
      description: 'Reglamento general de protección de datos UE',
      href: '/recursos/wiki/cumplimiento/gdpr'
    },
    {
      title: 'CMMC',
      description: 'Modelo de madurez para contratistas de defensa US',
      href: '/recursos/wiki/cumplimiento/cmmc'
    },
    {
      title: 'Privacy by Design',
      description: 'Principios de privacidad desde el diseño',
      href: '/recursos/wiki/cumplimiento/privacy-design'
    },
    {
      title: 'NIS2',
      description: 'Directiva UE sobre seguridad de redes y sistemas',
      href: '/recursos/wiki/cumplimiento/nis2'
    },
    {
      title: 'DORA',
      description: 'Resiliencia operacional en sector financiero UE',
      href: '/recursos/wiki/cumplimiento/dora'
    },
    {
      title: 'PCI DSS',
      description: 'Estándar de seguridad para datos de tarjetas',
      href: '/recursos/wiki/cumplimiento/pci-dss'
    },
    {
      title: 'POPIA',
      description: 'Protección de datos personales (Sudáfrica)',
      href: '/recursos/wiki/cumplimiento/popia'
    },
    {
      title: 'Data Classification',
      description: 'Retention & Minimization policies',
      href: '/recursos/wiki/cumplimiento/data-classification'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton href="/recursos/wiki" className="mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Cumplimiento y Regulaciones</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.title} {...article} />
          ))}
        </div>
      </div>
    </div>
  );
}
