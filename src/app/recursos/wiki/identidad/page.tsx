import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';

export default function IdentityIndexPage() {
  const articles = [
    {
      title: 'IAM',
      description: 'Gestión de identidades y accesos',
      href: '/recursos/wiki/identidad/iam'
    },
    {
      title: 'MFA',
      description: 'Autenticación Multifactor',
      href: '/recursos/wiki/identidad/mfa'
    },
    {
      title: 'Passwordless',
      description: 'Autenticación sin contraseñas',
      href: '/recursos/wiki/identidad/passwordless'
    },
    {
      title: 'OAuth 2.0 & OIDC',
      description: 'Estándares de autorización',
      href: '/recursos/wiki/identidad/oauth'
    },
    {
      title: 'SAML',
      description: 'Federación de identidad',
      href: '/recursos/wiki/identidad/saml'
    },
    {
      title: 'Conditional Access',
      description: 'Políticas de acceso condicional',
      href: '/recursos/wiki/identidad/conditional-access'
    },
    {
      title: 'PAM',
      description: 'Gestión de acceso privilegiado',
      href: '/recursos/wiki/identidad/pam'
    },
    {
      title: 'JIT Access',
      description: 'Acceso justo a tiempo',
      href: '/recursos/wiki/identidad/jit-access'
    },
    {
      title: 'ITDR',
      description: 'Detección de amenazas en identidad',
      href: '/recursos/wiki/identidad/itdr'
    },
    {
      title: 'Gestión de Sesiones',
      description: 'Control y revocación de sesiones',
      href: '/recursos/wiki/identidad/sesiones'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton href="/recursos/wiki" className="mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Gestión de Identidad</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.title} {...article} />
          ))}
        </div>
      </div>
    </div>
  );
}
