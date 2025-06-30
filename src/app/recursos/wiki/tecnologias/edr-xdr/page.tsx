import ArticleLayout from '@/components/wiki/ArticleLayout';
import BackButton from '@/components/BackButton';

export default function EDRXDRArticle() {
  return (
    <ArticleLayout 
      title="EDR/XDR: Detección y Respuesta Avanzada" 
      backUrl="/recursos/wiki/tecnologias"
    >
      <div className="prose max-w-none">
        <h2>Diferencia entre EPP, EDR y XDR</h2>
        <div className="grid md:grid-cols-3 gap-4 my-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-blue-800">EPP</h3>
            <ul className="list-disc pl-5 mt-2">
              <li>Prevención tradicional</li>
              <li>Firma-based</li>
              <li>Enfoque en prevención</li>
            </ul>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-bold text-purple-800">EDR</h3>
            <ul className="list-disc pl-5 mt-2">
              <li>Detección y respuesta</li>
              <li>Análisis de comportamiento</li>
              <li>Endpoint-focused</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-green-800">XDR</h3>
            <ul className="list-disc pl-5 mt-2">
              <li>Integración multiplataforma</li>
              <li>Correlación avanzada</li>
              <li>Automatización nativa</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-8">Arquitectura de Agentes</h3>
        <div className="bg-gray-50 p-4 rounded-lg my-4">
          <pre className="text-sm">
            {`Flujo EDR:
1. Agente recolecta telemetría (procesos, red, registros)
2. Envía a consola central
3. Motor de detección analiza patrones
4. Alerta o respuesta automática`}
          </pre>
        </div>

        <h3 className="text-xl font-semibold mt-8">Laboratorio: Análisis con Velociraptor</h3>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
          <h4 className="font-bold">Caso práctico:</h4>
          <p>Investigación de proceso sospechoso:</p>
          <pre className="text-sm mt-2 bg-white p-2 rounded">
            {`SELECT * FROM pslist() 
WHERE name = 'powershell.exe'
AND command_line LIKE '%Invoke-Expression%'`}
          </pre>
        </div>
      </div>
    </ArticleLayout>
  );
}
