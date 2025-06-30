import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function SeguridadPorDisenoPage() {
  return (
    <ArticleLayout 
      title="Seguridad por Diseño" 
      description="Principio de integrar controles de seguridad desde las etapas iniciales del desarrollo de sistemas y procesos"
      backUrl="/recursos/wiki/fundamentos"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">¿Qué es Seguridad por Diseño?</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              La <strong>Seguridad por Diseño</strong> es un enfoque proactivo que integra controles y consideraciones de seguridad:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Desde las fases iniciales de diseño de sistemas</li>
              <li>En toda la arquitectura y ciclo de vida del producto</li>
              <li>Basado en principios de privacidad y seguridad fundamentales</li>
            </ul>
            <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
              <p className="text-sm">
                <strong>Definición formal (NIST):</strong> "Enfoque que incorpora seguridad y resiliencia cibernética como componentes esenciales desde la concepción inicial."
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Principios Clave</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold mb-2 text-blue-700">Proactividad</h3>
              <p className="text-sm">Prevenir vulnerabilidades en lugar de corregirlas después</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold mb-2 text-blue-700">Defensa en Profundidad</h3>
              <p className="text-sm">Múltiples capas de seguridad complementarias</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold mb-2 text-blue-700">Mínimo Privilegio</h3>
              <p className="text-sm">Acceso restringido solo a lo estrictamente necesario</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Implementación Práctica</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3">En Desarrollo de Software</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Análisis de amenazas en fase de diseño (Threat Modeling)</li>
                <li>Revisión de código seguro (SAST/DAST)</li>
                <li>Uso de frameworks seguros y actualizados</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">En Infraestructura</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Arquitecturas Zero Trust</li>
                <li>Segmentación de redes</li>
                <li>Configuraciones seguras por defecto</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Estándares y Referencias</h2>
          
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-semibold mb-2">Documentación Oficial</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://csrc.nist.gov/publications/detail/sp/800-160/vol-2/final" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> NIST SP 800-160 (Systems Security Engineering)
                </a>
              </li>
              <li>
                <a href="https://owasp.org/www-project-secure-design-principles/" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> OWASP Secure Design Principles
                </a>
              </li>
              <li>
                <a href="https://www.iso.org/standard/83102.html" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> ISO/IEC 27034 (Application Security)
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}
