import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';

export default function WebSecurityPage() {
  const articles = [
    {
      title: 'OWASP Top 10',
      description: 'Broken Access Control, XSS, Inyecciones, etc.',
      href: '/recursos/wiki/web/owasp-top10'
    },
    {
      title: 'Deserialización Insegura',
      description: 'Vulnerabilidades en la deserialización de objetos',
      href: '/recursos/wiki/web/deserializacion'
    },
    {
      title: 'SSRF',
      description: 'Server-Side Request Forgery',
      href: '/recursos/wiki/web/ssrf'
    },
    {
      title: 'File Upload & Path Traversal',
      description: 'Riesgos en subida de archivos y traversing',
      href: '/recursos/wiki/web/file-upload'
    },
    {
      title: 'Open Redirect & Host Header Injection',
      description: 'Manipulación de redirecciones y headers',
      href: '/recursos/wiki/web/open-redirect'
    },
    {
      title: 'JWT Security',
      description: 'alg=none, replay attacks, best practices',
      href: '/recursos/wiki/web/jwt-security'
    },
    {
      title: 'HSTS, CSP, SRI',
      description: 'Cabeceras de seguridad avanzadas',
      href: '/recursos/wiki/web/security-headers'
    },
    {
      title: 'GraphQL Security',
      description: 'Protección de APIs GraphQL',
      href: '/recursos/wiki/web/graphql'
    },
    {
      title: 'RASP',
      description: 'Runtime Application Self-Protection',
      href: '/recursos/wiki/web/rasp'
    },
    {
      title: 'SAST/DAST/IAST',
      description: 'Testing de seguridad estático/dinámico',
      href: '/recursos/wiki/web/security-testing'
    },
    {
      title: 'SCA & SBOM',
      description: 'Software Composition Analysis y Bill of Materials',
      href: '/recursos/wiki/web/sca-sbom'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton href="/recursos/wiki" className="mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Seguridad Web y AppSec</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.title} {...article} />
          ))}
        </div>
      </div>
    </div>
  );
}
