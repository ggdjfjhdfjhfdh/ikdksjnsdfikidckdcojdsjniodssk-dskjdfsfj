'use client';

import Link from 'next/link';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto py-16 px-6 text-gray-700">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Política de Privacidad y Protección de Datos</h1>
        <p className="mb-6 text-lg leading-relaxed">Respetando lo establecido en la legislación vigente, Sesecpro (en adelante, “Sitio Web”) se compromete a adoptar las medidas técnicas y organizativas necesarias, según el nivel de seguridad adecuado al riesgo de los datos recogidos.</p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">Leyes que incorpora esta política de privacidad</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-lg leading-relaxed">
          <li>Reglamento (UE) 2016/679 (RGPD).</li>
          <li>Ley Orgánica 3/2018 (LOPD-GDD).</li>
          <li>Real Decreto 1720/2007 (RDLOPD).</li>
          <li>Ley 34/2002 (LSSI-CE).</li>
        </ul>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">Identidad del responsable del tratamiento</h2>
        <p className="mb-2 text-lg leading-relaxed">Sesecpro, NIF: – (en adelante, “Responsable del tratamiento”)</p>
        <p className="mb-6 text-lg leading-relaxed">Email de contacto: <a href="mailto:contacto@sesecpro.es" className="text-blue-600 hover:underline">contacto@sesecpro.es</a></p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">Registro de Datos de Carácter Personal</h2>
        <p className="mb-6 text-lg leading-relaxed">En cumplimiento del RGPD y la LOPD-GDD, los datos personales recabados por Sesecpro serán tratados con el fin de facilitar, agilizar y cumplir los compromisos establecidos, o para atender solicitudes o consultas del Usuario. Se mantiene un registro de actividades de tratamiento según el RGPD.</p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">Principios aplicables al tratamiento</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-lg leading-relaxed">
          <li>Licitud, lealtad y transparencia</li>
          <li>Limitación de la finalidad</li>
          <li>Minimización de datos</li>
          <li>Exactitud</li>
          <li>Limitación del plazo de conservación</li>
          <li>Integridad y confidencialidad</li>
          <li>Responsabilidad proactiva</li>
        </ul>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">Categorías de datos personales</h2>
        <p className="mb-6 text-lg leading-relaxed">Solo se tratan datos identificativos. No se tratan categorías especiales de datos personales.</p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">Base legal para el tratamiento</h2>
        <p className="mb-6 text-lg leading-relaxed">La base legal es el consentimiento del Usuario, que puede retirarse en cualquier momento. En los formularios se informará de los campos obligatorios.</p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">Fines del tratamiento</h2>
        <p className="mb-6 text-lg leading-relaxed">Los datos personales se recogen para facilitar, agilizar y cumplir compromisos, atender solicitudes, y podrán usarse con fines comerciales, estadísticos y de mejora del Sitio Web.</p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">Períodos de retención</h2>
        <p className="mb-6 text-lg leading-relaxed">Se conservarán durante el tiempo mínimo necesario, o hasta que el Usuario solicite su supresión.</p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">Destinatarios de los datos</h2>
        <p className="mb-6 text-lg leading-relaxed">No se comparten datos con terceros. Se informará al Usuario en caso contrario.</p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">Menores de edad</h2>
        <p className="mb-6 text-lg leading-relaxed">Solo los mayores de 14 años pueden consentir el tratamiento de sus datos. Para menores de 14, se requiere consentimiento de padres o tutores.</p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">Seguridad y confidencialidad</h2>
        <p className="mb-6 text-lg leading-relaxed">Sesecpro adopta medidas técnicas y organizativas para garantizar la seguridad de los datos. El Sitio Web usa certificado SSL. En caso de violación de seguridad, se notificará al Usuario.</p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">Derechos del Usuario</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2 text-lg leading-relaxed">
          <li>Acceso</li>
          <li>Rectificación</li>
          <li>Supresión (“derecho al olvido”)</li>
          <li>Limitación del tratamiento</li>
          <li>Portabilidad</li>
          <li>Oposición</li>
          <li>No ser objeto de decisiones automatizadas</li>
        </ul>
        <p className="mb-6 text-lg leading-relaxed">Para ejercer estos derechos, envía solicitud con nombre, apellidos, copia de DNI, descripción, domicilio, fecha, firma y documentación a:</p>
        <ul className="mb-6 pl-6 list-disc text-lg leading-relaxed">
          <li>Dirección postal: Valencia, España</li>
          <li>Email: <a href="mailto:contacto@sesecpro.es" className="text-blue-600 hover:underline">contacto@sesecpro.es</a></li>
        </ul>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">Enlaces a sitios de terceros</h2>
        <p className="mb-6 text-lg leading-relaxed">El Sitio Web puede contener enlaces a sitios de terceros con sus propias políticas de privacidad.</p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">Reclamaciones</h2>
        <p className="mb-6 text-lg leading-relaxed">El Usuario puede reclamar ante la Agencia Española de Protección de Datos si considera que existe una infracción.</p>
        <h2 className="text-2xl font-bold mt-10 mb-4 text-gray-900">Aceptación y cambios</h2>
        <p className="mb-6 text-lg leading-relaxed">El uso del Sitio Web implica la aceptación de esta política. Sesecpro puede modificarla en función de cambios legislativos. Consulta esta página periódicamente para actualizaciones.</p>
        <p className="text-xs text-gray-500 mt-8">Actualizada para adaptarse al RGPD y a la Ley Orgánica 3/2018.</p>
        <Link href="/" className="text-blue-600 hover:underline block mt-8 text-lg font-medium">Volver al inicio</Link>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
