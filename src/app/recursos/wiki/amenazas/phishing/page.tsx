import ArticleLayout from '@/components/wiki/ArticleLayout';
import { FiExternalLink } from 'react-icons/fi';

export default function PhishingPage() {
  return (
    <ArticleLayout 
      title="Phishing y Técnicas de Ingeniería Social" 
      description="Métodos de manipulación psicológica para obtener acceso a información sensible"
      backUrl="/recursos/wiki/amenazas"
    >
      <div className="space-y-10 text-gray-800">
        <section className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">¿Qué es el Phishing?</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              El phishing es:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Un ataque que suplanta identidades legítimas</li>
              <li>Basado en manipulación psicológica (ingeniería social)</li>
              <li>Busca robar credenciales, datos financieros o instalar malware</li>
              <li>Representa +90% de los ciberataques exitosos</li>
            </ul>
            
            <div className="bg-red-50 p-4 rounded border-l-4 border-red-500">
              <p className="text-sm">
                <strong>Evolución:</strong> Del email genérico a campañas altamente personalizadas (spear phishing).
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-bold mb-4 text-blue-800">Técnicas Comunes</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">Email Phishing</p>
              <p className="text-xs">Mensajes falsos que imitan entidades legítimas</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">Smishing</p>
              <p className="text-xs">Phishing a través de SMS/mensajería</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">Vishing</p>
              <p className="text-xs">Llamadas telefónicas fraudulentas</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">Spear Phishing</p>
              <p className="text-xs">Ataques personalizados a objetivos específicos</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">Whaling</p>
              <p className="text-xs">Targeteo a ejecutivos de alto nivel</p>
            </div>
            <div className="bg-white p-3 rounded shadow text-center">
              <p className="font-semibold text-sm">Clone Phishing</p>
              <p className="text-xs">Duplicación de comunicaciones legítimas</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Indicadores Clave</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold mb-3">Señales de Alerta</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Urgencia o amenazas en el lenguaje</li>
                <li>Errores gramaticales o de formato</li>
                <li>Dominios similares pero no idénticos</li>
                <li>Solicitudes de información personal</li>
                <li>Archivos adjuntos inesperados</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Estadísticas</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>3.4 billones de emails de phishing diarios</li>
                <li>36% de todos los ataques de phishing usan Microsoft como señuelo</li>
                <li>74% de organizaciones han sufrido breaches por phishing</li>
                <li>Costo promedio por incidente: $4.91M</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Protecciones</h2>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="font-semibold mb-3">Estrategias Defensivas</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Concientización:</strong> Entrenamiento continuo a empleados</li>
              <li><strong>Verificación:</strong> Autenticación multifactor (MFA)</li>
              <li><strong>Tecnología:</strong> Filtros anti-phishing y DMARC</li>
              <li><strong>Procedimientos:</strong> Políticas claras para manejo de datos sensibles</li>
              <li><strong>Pruebas:</strong> Simulaciones periódicas de phishing</li>
            </ol>
          </div>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-2xl font-bold mb-4">Referencias</h2>
          
          <div className="border-l-4 border-blue-600 pl-4">
            <h3 className="font-semibold mb-2">Recursos Oficiales</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://www.cisa.gov/phishing" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> CISA Phishing Guidance
                </a>
              </li>
              <li>
                <a href="https://www.ftc.gov/business-guidance/small-businesses/cybersecurity/phishing" className="flex items-center text-blue-700 hover:text-blue-900">
                  <FiExternalLink className="mr-2" /> FTC Phishing Resources
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </ArticleLayout>
  );
}