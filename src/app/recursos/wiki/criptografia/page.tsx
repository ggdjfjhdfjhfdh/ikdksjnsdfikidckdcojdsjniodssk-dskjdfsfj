import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';

export default function CriptografiaPage() {
  const articles = [
    {
      title: 'Modos de Cifrado',
      description: 'GCM, CBC, CTR y otros modos de operación',
      href: '/recursos/wiki/criptografia/modos-cifrado'
    },
    {
      title: 'Protocolos',
      description: 'Estándares de autenticación y seguridad',
      href: '/recursos/wiki/criptografia/protocolos'
    },
    {
      title: 'Hashing y KDF',
      description: 'Funciones hash y derivación de claves',
      href: '/recursos/wiki/criptografia/hashing'
    },
    {
      title: 'PFS',
      description: 'Perfect Forward Secrecy en comunicaciones',
      href: '/recursos/wiki/criptografia/pfs'
    },
    {
      title: 'PKI y Certificados',
      description: 'OCSP, CRL y certificados digitales',
      href: '/recursos/wiki/criptografia/pki'
    },
    {
      title: 'Salting y Peppering',
      description: 'Técnicas para proteger contraseñas',
      href: '/recursos/wiki/criptografia/salting'
    },
    {
      title: 'Modelos de Acceso',
      description: 'RBAC, ABAC, PBAC, DAC, MAC',
      href: '/recursos/wiki/criptografia/acceso'
    },
    {
      title: 'Biometría',
      description: 'Autenticación biométrica y comportamental',
      href: '/recursos/wiki/criptografia/biometria'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton href="/recursos/wiki" className="mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Criptografía & Autenticación</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.title} {...article} />
          ))}
        </div>
      </div>
    </div>
  );
}
