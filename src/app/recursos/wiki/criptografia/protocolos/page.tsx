import ArticleLayout from '@/components/wiki/ArticleLayout';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';

export default function ProtocolosPage() {
  const protocols = [
    {
      title: 'Kerberos',
      description: 'Protocolo de autenticación basado en tickets',
      href: '/recursos/wiki/criptografia/protocolos/kerberos'
    },
    {
      title: 'RADIUS',
      description: 'Protocolo AAA para acceso a redes',
      href: '/recursos/wiki/criptografia/protocolos/radius'
    },
    {
      title: 'TACACS+',
      description: 'Protocolo AAA para administración de dispositivos',
      href: '/recursos/wiki/criptografia/protocolos/tacacs'
    }
  ];

  return (
    <ArticleLayout 
      title="Protocolos de Autenticación"
      description="Estándares y protocolos para gestión de identidad y acceso"
      backUrl="/recursos/wiki/criptografia"
    >
      <div className="space-y-6 text-gray-800 dark:text-gray-200">
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Introducción</h2>
          <div className="prose max-w-none dark:prose-invert">
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Los protocolos de autenticación proporcionan mecanismos estandarizados para verificar identidades y controlar acceso a recursos. Se dividen principalmente en:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700 dark:text-gray-300">
              <li><strong className="text-gray-900 dark:text-white">Protocolos de red:</strong> Para acceso a infraestructura (RADIUS, TACACS+)</li>
              <li><strong className="text-gray-900 dark:text-white">Protocolos de sistemas:</strong> Para autenticación entre servicios (Kerberos)</li>
              <li><strong className="text-gray-900 dark:text-white">Protocolos web:</strong> Para aplicaciones y APIs (OAuth, OpenID Connect)</li>
            </ul>
          </div>
        </section>

        <section className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-200">Protocolos</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {protocols.map((protocol) => (
              <Link 
                key={protocol.href} 
                href={protocol.href}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow text-gray-900 dark:text-white"
              >
                <h3 className="font-bold text-lg mb-2">{protocol.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{protocol.description}</p>
                <div className="mt-2 flex items-center text-blue-600 dark:text-blue-400 text-sm">
                  Ver detalles <FiExternalLink className="ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
