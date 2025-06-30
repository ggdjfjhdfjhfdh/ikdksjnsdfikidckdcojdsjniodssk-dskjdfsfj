"use client";

import Link from 'next/link';

export default function HerramientasPage() {
  const tools = [
    {
      key: 'password-checker',
      href: '/recursos/herramientas/comprobador-contrasenas',
      icon: '🔒',
      title: 'Comprobador de Contraseñas',
      description: 'Comprueba la fortaleza de tus contraseñas al instante',
    },
    {
      key: 'security-quiz',
      href: '/recursos/herramientas/test-ciberseguridad',
      icon: '🧠',
      title: 'Test de Conocimientos',
      description: 'Evalúa tu conocimiento en ciberseguridad',
    },
  ] as const;

  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-4 py-20 bg-white">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center">
        Herramientas
      </h1>
      <p className="text-lg text-gray-600 mb-16 text-center max-w-2xl">
        Experimenta con nuestras utilidades interactivas para mejorar la seguridad de tu negocio.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {tools.map((tool) => (
          <Link
            key={tool.key}
            href={tool.href}
            className="group flex flex-col items-center border border-gray-200 rounded-2xl p-12 bg-gray-50 shadow-sm hover:shadow-lg hover:bg-blue-50 transition"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{tool.icon}</div>
            <div className="text-2xl font-bold mb-2 text-gray-900">{tool.title}</div>
            <p className="text-gray-500 text-center text-base max-w-xs">{tool.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
