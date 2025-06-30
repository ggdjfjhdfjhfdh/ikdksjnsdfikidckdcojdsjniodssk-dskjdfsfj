import ArticleLayout from '@/components/wiki/ArticleLayout';
import BackButton from '@/components/BackButton';

export default function SOARArticle() {
  return (
    <ArticleLayout 
      title="SOAR y Automatización de Seguridad" 
      backUrl="/recursos/wiki/tecnologias"
    >
      <div className="prose max-w-none">
        <h2>Componentes de Orquestación</h2>
        <div className="grid md:grid-cols-3 gap-4 my-6">
          <div className="bg-blue-50 p-3 rounded-lg">
            <h3 className="font-bold text-blue-800">Conectores</h3>
            <ul className="list-disc pl-5 mt-2 text-sm">
              <li>SIEM (Splunk, Elastic)</li>
              <li>EDR (Crowdstrike, SentinelOne)</li>
              <li>Sistemas de Tickets (ServiceNow, Jira)</li>
            </ul>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <h3 className="font-bold text-purple-800">Playbooks</h3>
            <ul className="list-disc pl-5 mt-2 text-sm">
              <li>BPMN (flujos gráficos)</li>
              <li>YAML (definición declarativa)</li>
              <li>Python (lógica compleja)</li>
            </ul>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <h3 className="font-bold text-green-800">Automatización</h3>
            <ul className="list-disc pl-5 mt-2 text-sm">
              <li>Respuesta a incidentes</li>
              <li>Investigación guiada</li>
              <li>Remediación</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-8">Casos Rápidos de Automatización</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium">Bloqueo de IOC</h4>
            <pre className="text-sm mt-2 bg-gray-50 p-2 rounded">
              {`playbook:
  - name: Block malicious IP
    action: firewall_block
    params:
      ip: {{ event.ioc }}
      duration: 24h
    triggers:
      - siem_alert`}
            </pre>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium">Aislamiento de Host</h4>
            <pre className="text-sm mt-2 bg-gray-50 p-2 rounded">
              {`playbook:
  - name: Isolate compromised host
    steps:
      - edr_isolate: {{ host.id }}
      - ticket_create: 
          title: "Host isolated"
          severity: high`}
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-8">ROI y Métricas</h3>
        <div className="bg-white p-4 rounded-lg shadow-md mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700">MTTR Antes</h4>
              <p className="text-2xl font-bold text-red-600">4h 30m</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">MTTR Después</h4>
              <p className="text-2xl font-bold text-green-600">22m</p>
            </div>
          </div>
        </div>
      </div>
    </ArticleLayout>
  );
}
