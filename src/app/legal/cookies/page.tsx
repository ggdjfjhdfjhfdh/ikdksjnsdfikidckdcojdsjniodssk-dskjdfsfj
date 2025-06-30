'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';

export default function CookiesPolicy() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto py-16 px-6 text-gray-700">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Política de Cookies</h1>
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800">I. POLÍTICA DE COOKIES Y PROTECCIÓN DE DATOS</h2>
        <p className="mb-6 text-lg leading-relaxed">Respetando lo establecido en la legislación vigente, Sesecpro (en adelante, también “Sitio Web”) se compromete a adoptar las medidas técnicas y organizativas necesarias, según el nivel de seguridad adecuado al riesgo de los datos recogidos.</p>
        <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Leyes que incorpora esta política de cookies</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-lg leading-relaxed">
          <li>Reglamento (UE) 2016/679 (RGPD).</li>
          <li>Ley Orgánica 3/2018 (LOPD-GDD).</li>
          <li>Real Decreto 1720/2007 (RDLOPD).</li>
          <li>Ley 34/2002 (LSSI-CE).</li>
        </ul>
        <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Identidad del responsable del tratamiento de los datos personales</h3>
        <p className="mb-2 text-lg leading-relaxed">Sesecpro, NIF: - (en adelante, “Responsable del tratamiento”)</p>
        <p className="mb-6 text-lg leading-relaxed">Email de contacto: <a href="mailto:contacto@sesecpro.es" className="text-blue-600 hover:underline">contacto@sesecpro.es</a></p>
        <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Registro de Datos de Carácter Personal</h3>
        <p className="mb-6 text-lg leading-relaxed">En cumplimiento del RGPD y la LOPD-GDD, los datos personales recabados por Sesecpro serán tratados para facilitar, agilizar y cumplir los compromisos establecidos, o para atender solicitudes o consultas del Usuario.</p>
        <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Principios aplicables al tratamiento de los datos personales</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-lg leading-relaxed">
          <li>Licitud, lealtad y transparencia</li>
          <li>Limitación de la finalidad</li>
          <li>Minimización de datos</li>
          <li>Exactitud</li>
          <li>Limitación del plazo de conservación</li>
          <li>Integridad y confidencialidad</li>
          <li>Responsabilidad proactiva</li>
        </ul>
        <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Categorías de datos personales</h3>
        <p className="mb-6 text-lg leading-relaxed">Solo se tratan datos identificativos. No se tratan categorías especiales de datos personales.</p>
        <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Base legal para el tratamiento de los datos personales</h3>
        <p className="mb-6 text-lg leading-relaxed">La base legal es el consentimiento del Usuario, que puede retirarse en cualquier momento.</p>
        <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Fines del tratamiento</h3>
        <p className="mb-6 text-lg leading-relaxed">Los datos personales se recogen para facilitar, agilizar y cumplir compromisos, atender solicitudes, y podrán usarse con fines comerciales, estadísticos y de mejora del Sitio Web.</p>
        <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Períodos de retención de los datos personales</h3>
        <p className="mb-6 text-lg leading-relaxed">Se conservarán durante el tiempo mínimo necesario, o hasta que el Usuario solicite su supresión.</p>
        <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Destinatarios de los datos personales</h3>
        <p className="mb-6 text-lg leading-relaxed">No se comparten datos con terceros. Se informará al Usuario en caso contrario.</p>
        <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Datos personales de menores de edad</h3>
        <p className="mb-6 text-lg leading-relaxed">Solo los mayores de 14 años pueden consentir el tratamiento de sus datos. Para menores de 14, se requiere consentimiento de padres o tutores.</p>
        <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Secreto y seguridad de los datos personales</h3>
        <p className="mb-6 text-lg leading-relaxed">Sesecpro adopta medidas técnicas y organizativas para garantizar la seguridad de los datos recogidos, evitando su destrucción, pérdida o alteración accidental o ilícita, así como el acceso no autorizado.</p>
        <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Derechos derivados del tratamiento de los datos personales</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-lg leading-relaxed">
          <li>Derecho de acceso</li>
          <li>Derecho de rectificación</li>
          <li>Derecho de supresión ("derecho al olvido")</li>
          <li>Derecho a la limitación del tratamiento</li>
          <li>Derecho a la portabilidad de los datos</li>
          <li>Derecho de oposición</li>
          <li>Derecho a no ser objeto de decisiones basadas únicamente en el tratamiento automatizado</li>
        </ul>
        <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Enlaces a sitios web de terceros</h3>
        <p className="mb-6 text-lg leading-relaxed">El Sitio Web puede contener hipervínculos a páginas web de terceros que no son operadas por Sesecpro. Cada titular es responsable de su propia política de privacidad y protección de datos.</p>
        <h3 className="text-xl font-semibold mt-8 mb-2 text-gray-800">Reclamaciones ante la autoridad de control</h3>
        <p className="mb-6 text-lg leading-relaxed">Si el Usuario considera que existe una infracción en el tratamiento de sus datos personales, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos.</p>
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800">II. ACEPTACIÓN Y CAMBIOS EN ESTA POLÍTICA DE COOKIES</h2>
        <p className="mb-6 text-lg leading-relaxed">Es necesario que el Usuario lea y acepte las condiciones aquí establecidas para el tratamiento de sus datos personales. El uso del Sitio Web implica la aceptación de esta Política de Cookies.</p>
        <p className="mb-6 text-lg leading-relaxed">Sesecpro se reserva el derecho a modificar esta política en función de cambios legislativos, jurisprudenciales o doctrinales, sin necesidad de notificación explícita. Se recomienda consultar esta página periódicamente para estar informado de las últimas actualizaciones.</p>
        <p className="text-xs text-gray-500 mt-8">Esta Política de Cookies fue actualizada para adaptarse al Reglamento (UE) 2016/679 y a la Ley Orgánica 3/2018.</p>
        <Link href="/" className="text-blue-600 hover:underline block mt-8 text-lg font-medium">Volver al inicio</Link>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
