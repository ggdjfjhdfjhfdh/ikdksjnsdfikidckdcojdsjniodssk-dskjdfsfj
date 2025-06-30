import BackButton from '@/components/BackButton';
import ArticleLayout from '@/components/wiki/ArticleLayout';

interface Article {
  title: string;
  content: string;
  lastUpdated: string;
  difficulty: string;
  tags: string[];
  related: string[];
}

const articles: Record<string, Article> = {
  'modelo-osi': {
    title: 'Modelo OSI',
    content: `
      <h2>Las 7 Capas del Modelo OSI y su Seguridad</h2>
      
      <div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
        <p class="font-medium">El Modelo OSI (Open Systems Interconnection) es un marco de referencia para las comunicaciones de red que consta de 7 capas, cada una con protocolos y medidas de seguridad específicas.</p>
      </div>
      
      <div class="space-y-6">
        <div class="border rounded-lg overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capa</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Protocolos</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amenazas</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Controles</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap font-medium">7. Aplicación</td>
                <td class="px-6 py-4 whitespace-nowrap">HTTP, FTP, SMTP</td>
                <td class="px-6 py-4 whitespace-nowrap">Inyección SQL, XSS</td>
                <td class="px-6 py-4 whitespace-nowrap">WAF, Validación inputs</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap font-medium">6. Presentación</td>
                <td class="px-6 py-4 whitespace-nowrap">SSL/TLS, ASCII</td>
                <td class="px-6 py-4 whitespace-nowrap">Man-in-the-middle</td>
                <td class="px-6 py-4 whitespace-nowrap">Cifrado, Certificados</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap font-medium">5. Sesión</td>
                <td class="px-6 py-4 whitespace-nowrap">NetBIOS, RPC</td>
                <td class="px-6 py-4 whitespace-nowrap">Hijacking de sesión</td>
                <td class="px-6 py-4 whitespace-nowrap">Tokens seguros, Timeouts</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="p-4 bg-yellow-50 border-l-4 border-yellow-400">
          <h3 class="font-bold text-yellow-800">Ejemplo Práctico</h3>
          <p>Un ataque a la capa de Aplicación (SQLi) puede prevenirse con:</p>
          <ul class="list-disc pl-6 mt-2">
            <li>Prepared statements</li>
            <li>Principio de mínimo privilegio en DB</li>
            <li>Web Application Firewall (WAF)</li>
          </ul>
        </div>
      </div>
    `,
    lastUpdated: '2025-06-30',
    difficulty: 'Intermedio',
    tags: ['redes', 'osi', 'seguridad', 'protocolos'],
    related: ['principios-cia', 'zero-trust']
  },
  'principios-cia': {
    title: 'Principios CIA',
    content: `
      <h2>La Triada CIA: Fundamentos de Seguridad de la Información</h2>
      
      <div class="bg-purple-50 border-l-4 border-purple-400 p-4 my-4">
        <p class="font-medium">La triada CIA (Confidencialidad, Integridad, Disponibilidad) es el modelo fundamental de la seguridad de la información que guía las políticas de seguridad en organizaciones.</p>
      </div>
      
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white p-4 rounded-lg shadow-md border-t-4 border-blue-500">
          <h3 class="text-xl font-bold text-blue-800 mb-3">Confidencialidad</h3>
          <ul class="list-disc pl-5 space-y-1">
            <li>Control de acceso basado en roles (RBAC)</li>
            <li>Cifrado de datos en tránsito y en reposo</li>
            <li>Mecanismos de autenticación fuerte (MFA)</li>
            <li>Prevención de fugas de datos (DLP)</li>
          </ul>
          <div class="mt-3 p-2 bg-blue-50 rounded">
            <p class="text-sm font-medium">Ejemplo: Cifrado AES-256 para datos sensibles</p>
          </div>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow-md border-t-4 border-green-500">
          <h3 class="text-xl font-bold text-green-800 mb-3">Integridad</h3>
          <ul class="list-disc pl-5 space-y-1">
            <li>Funciones hash criptográficas (SHA-256)</li>
            <li>Firmas digitales y certificados</li>
            <li>Registros inmutables (blockchain)</li>
            <li>Controles de cambio y versionado</li>
          </ul>
          <div class="mt-3 p-2 bg-green-50 rounded">
            <p class="text-sm font-medium">Ejemplo: Firma digital de documentos con RSA</p>
          </div>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow-md border-t-4 border-red-500">
          <h3 class="text-xl font-bold text-red-800 mb-3">Disponibilidad</h3>
          <ul class="list-disc pl-5 space-y-1">
            <li>Redundancia y balanceo de carga</li>
            <li>Planes de recuperación ante desastres</li>
            <li>Protección contra DDoS</li>
            <li>Mantenimiento predictivo</li>
          </ul>
          <div class="mt-3 p-2 bg-red-50 rounded">
            <p class="text-sm font-medium">Ejemplo: Cluster de servidores con failover automático</p>
          </div>
        </div>
      </div>
      
      <div class="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400">
        <h3 class="font-bold text-yellow-800">Caso de Estudio: Violación de la Triada</h3>
        <p class="mt-1">Un ataque ransomware afecta:</p>
        <ul class="list-disc pl-6 mt-2">
          <li><span class="font-medium">Confidencialidad:</span> Datos expuestos en dark web</li>
          <li><span class="font-medium">Integridad:</span> Archivos cifrados/modificados</li>
          <li><span class="font-medium">Disponibilidad:</span> Sistemas inaccesibles hasta pagar rescate</li>
        </ul>
      </div>
    `,
    lastUpdated: '2025-06-30',
    difficulty: 'Intermedio',
    tags: ['fundamentos', 'cia', 'seguridad', 'criptografía'],
    related: ['modelo-osi', 'tipos-amenazas', 'gestion-riesgos']
  },
  'tipos-amenazas': {
    title: 'Tipos de Amenazas de Seguridad',
    content: `
      <h2>Clasificación Completa de Amenazas Cibernéticas</h2>
      
      <div class="bg-red-50 border-l-4 border-red-400 p-4 my-4">
        <p class="font-medium">Las amenazas de seguridad pueden clasificarse en tres categorías principales según su naturaleza y vector de ataque.</p>
      </div>
      
      <div class="space-y-6">
        <div class="border rounded-lg overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ejemplos</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impacto</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Protecciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap font-medium">Malware</td>
                <td class="px-6 py-4">
                  <ul class="list-disc pl-5">
                    <li>Ransomware (WannaCry)</li>
                    <li>Troyanos (Emotet)</li>
                    <li>Spyware (Pegasus)</li>
                  </ul>
                </td>
                <td class="px-6 py-4">Pérdida de datos, extorsión, espionaje</td>
                <td class="px-6 py-4">Antivirus EDR, parches, backups</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap font-medium">Ingeniería Social</td>
                <td class="px-6 py-4">
                  <ul class="list-disc pl-5">
                    <li>Phishing (BEC, spear)</li>
                    <li>Vishing (llamadas)</li>
                    <li>Pretexting (suplantación)</li>
                  </ul>
                </td>
                <td class="px-6 py-4">Robo de credenciales, fraude</td>
                <td class="px-6 py-4">Concienciación, MFA, DMARC</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap font-medium">Ataques de Red</td>
                <td class="px-6 py-4">
                  <ul class="list-disc pl-5">
                    <li>DDoS (Mirai)</li>
                    <li>Man-in-the-Middle</li>
                    <li>SQL Injection</li>
                  </ul>
                </td>
                <td class="px-6 py-4">Interrupción, robo de datos</td>
                <td class="px-6 py-4">WAF, IDS/IPS, VPN</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="p-4 bg-white rounded-lg shadow-md border-t-4 border-orange-500">
            <h3 class="text-lg font-bold text-orange-800 mb-2">Tácticas Comunes</h3>
            <ul class="list-disc pl-5 space-y-1">
              <li>Explotación de vulnerabilidades 0-day</li>
              <li>Ataques de cadena de suministro</li>
              <li>Credential stuffing</li>
              <li>Watering hole attacks</li>
            </ul>
          </div>
          
          <div class="p-4 bg-white rounded-lg shadow-md border-t-4 border-blue-500">
            <h3 class="text-lg font-bold text-blue-800 mb-2">Estrategias de Mitigación</h3>
            <ul class="list-disc pl-5 space-y-1">
              <li>Defensa en profundidad</li>
              <li>Segmentación de red</li>
              <li>Monitoreo continuo (SIEM)</li>
              <li>Plan de respuesta a incidentes</li>
            </ul>
          </div>
        </div>
      </div>
    `,
    lastUpdated: '2025-06-30',
    difficulty: 'Intermedio',
    tags: ['amenazas', 'malware', 'phishing', 'ataques'],
    related: ['principios-cia', 'zero-trust', 'gestion-riesgos']
  },
  'gestion-riesgos': {
    title: 'Gestión de Riesgos (ISO 27005/NIST RMF)',
    content: `
      <h2>Ciclo de Gestión de Riesgos</h2>
      <div class="grid md:grid-cols-4 gap-4 my-6">
        <div class="bg-blue-50 p-3 rounded-lg text-center">
          <h3 class="font-bold">Identificación</h3>
          <p class="text-sm mt-1">Activos, amenazas y controles</p>
        </div>
        <div class="bg-blue-50 p-3 rounded-lg text-center">
          <h3 class="font-bold">Evaluación</h3>
          <p class="text-sm mt-1">Impacto y probabilidad</p>
        </div>
        <div class="bg-blue-50 p-3 rounded-lg text-center">
          <h3 class="font-bold">Tratamiento</h3>
          <p class="text-sm mt-1">Mitigar, transferir, aceptar o evitar</p>
        </div>
        <div class="bg-blue-50 p-3 rounded-lg text-center">
          <h3 class="font-bold">Monitoreo</h3>
          <p class="text-sm mt-1">Revisión continua</p>
        </div>
      </div>

      <h3 class="text-xl font-semibold mt-6">Matriz de Riesgos</h3>
      <div class="bg-gray-50 p-4 rounded-lg my-4">
        <table class="min-w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left p-2">Probabilidad/Impacto</th>
              <th class="text-center p-2">Bajo</th>
              <th class="text-center p-2">Medio</th>
              <th class="text-center p-2">Alto</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b">
              <td class="p-2 font-medium">Alta</td>
              <td class="bg-yellow-100 text-center p-2">Medio</td>
              <td class="bg-orange-100 text-center p-2">Alto</td>
              <td class="bg-red-100 text-center p-2">Crítico</td>
            </tr>
            <tr class="border-b">
              <td class="p-2 font-medium">Media</td>
              <td class="bg-green-100 text-center p-2">Bajo</td>
              <td class="bg-yellow-100 text-center p-2">Medio</td>
              <td class="bg-orange-100 text-center p-2">Alto</td>
            </tr>
            <tr>
              <td class="p-2 font-medium">Baja</td>
              <td class="bg-green-50 text-center p-2">Mínimo</td>
              <td class="bg-green-100 text-center p-2">Bajo</td>
              <td class="bg-yellow-100 text-center p-2">Medio</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="text-xl font-semibold mt-6">Plantilla de Registro</h3>
      <div class="bg-white border border-gray-200 rounded-lg p-4 my-4">
        <div class="grid grid-cols-12 gap-2 text-sm font-medium text-gray-500 mb-2">
          <div class="col-span-3">Riesgo</div>
          <div class="col-span-2 text-center">Probabilidad</div>
          <div class="col-span-2 text-center">Impacto</div>
          <div class="col-span-3">Controles</div>
          <div class="col-span-2 text-center">Estado</div>
        </div>
        <div class="text-sm">
          {/* Ejemplo de fila */}
          <div class="grid grid-cols-12 gap-2 py-2 border-b">
            <div class="col-span-3">Fuga de datos</div>
            <div class="col-span-2 text-center">Media</div>
            <div class="col-span-2 text-center">Alto</div>
            <div class="col-span-3">Cifrado, DLP, IAM</div>
            <div class="col-span-2 text-center text-green-600">Mitigado</div>
          </div>
        </div>
      </div>
    `,
    lastUpdated: '2025-06-30',
    difficulty: 'Intermedio',
    tags: ['riesgos', 'iso27001', 'nist'],
    related: ['zero-trust', 'seguridad-diseno']
  },
  'seguridad-diseno': {
    title: 'Seguridad por Diseño',
    content: `
      <h2>Principios Fundamentales</h2>
      <div class="grid md:grid-cols-3 gap-4 my-4">
        <div class="bg-purple-50 p-3 rounded-lg">
          <h3 class="font-bold text-purple-800">Privilegio Mínimo</h3>
          <p class="text-sm mt-1">Solo los permisos estrictamente necesarios</p>
        </div>
        <div class="bg-purple-50 p-3 rounded-lg">
          <h3 class="font-bold text-purple-800">Fail Secure</h3>
          <p class="text-sm mt-1">El sistema debe fallar en modo seguro</p>
        </div>
        <div class="bg-purple-50 p-3 rounded-lg">
          <h3 class="font-bold text-purple-800">Defensa en Profundidad</h3>
          <p class="text-sm mt-1">Múltiples capas de seguridad</p>
        </div>
      </div>

      <h3 class="text-xl font-semibold mt-6">Secure SDLC</h3>
      <div class="bg-blue-50 border-l-4 border-blue-400 p-4 my-4">
        <ol class="list-decimal pl-6 space-y-2">
          <li><strong>Requisitos:</strong> Identificar controles de seguridad</li>
          <li><strong>Diseño:</strong> Modelado de amenazas (STRIDE)</li>
          <li><strong>Implementación:</strong> Revisiones de código seguras</li>
          <li><strong>Pruebas:</strong> SAST/DAST, pentesting</li>
          <li><strong>Despliegue:</strong> Configuración segura</li>
          <li><strong>Mantenimiento:</strong> Parches y actualizaciones</li>
        </ol>
      </div>

      <h3 class="text-xl font-semibold mt-6">Ejemplo: Aplicación Web</h3>
      <div class="space-y-4">
        <div class="p-4 border rounded-lg">
          <h4 class="font-medium">Autenticación</h4>
          <ul class="list-disc pl-6 mt-2 text-sm">
            <li>MFA obligatorio</li>
            <li>Protección contra fuerza bruta</li>
            <li>Tokens JWT firmados</li>
          </ul>
        </div>
        <div class="p-4 border rounded-lg">
          <h4 class="font-medium">Protección de Datos</h4>
          <ul class="list-disc pl-6 mt-2 text-sm">
            <li>Cifrado en tránsito (TLS 1.3)</li>
            <li>Cifrado en reposo (AES-256)</li>
            <li>Masking de datos sensibles</li>
          </ul>
        </div>
      </div>
    `,
    lastUpdated: '2025-06-30',
    difficulty: 'Avanzado',
    tags: ['sdlc', 'devsecops', 'owasp'],
    related: ['zero-trust', 'gestion-riesgos']
  },
  'zero-trust': {
    title: 'Arquitectura Zero Trust',
    content: `
      <h2>Zero Trust: Never Trust, Always Verify</h2>
      
      <div class="bg-indigo-50 border-l-4 border-indigo-400 p-4 my-4">
        <p class="font-medium">El modelo Zero Trust elimina la confianza implícita y requiere verificación continua para cada solicitud de acceso, independientemente de su origen.</p>
      </div>
      
      <div class="grid md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div class="p-4 bg-white rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-indigo-800 mb-3">Principios Fundamentales</h3>
            <ul class="list-disc pl-5 space-y-2">
              <li><span class="font-medium">Verificación explícita:</span> Autenticar y autorizar cada acceso</li>
              <li><span class="font-medium">Acceso con privilegio mínimo:</span> Solo lo estrictamente necesario</li>
              <li><span class="font-medium">Microsegmentación:</span> Divisiones granulares de la red</li>
              <li><span class="font-medium">Monitoreo continuo:</span> Análisis de comportamiento en tiempo real</li>
            </ul>
          </div>
          
          <div class="p-4 bg-white rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-indigo-800 mb-3">Componentes Clave</h3>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div class="bg-gray-50 p-2 rounded">IAM (Gestión de Identidad)</div>
              <div class="bg-gray-50 p-2 rounded">MFA Obligatorio</div>
              <div class="bg-gray-50 p-2 rounded">SDP (Software Defined Perimeter)</div>
              <div class="bg-gray-50 p-2 rounded">Analítica de Comportamiento</div>
            </div>
          </div>
        </div>
        
        <div class="p-4 bg-white rounded-lg shadow-md">
          <h3 class="text-xl font-bold text-indigo-800 mb-3">Roadmap de Implementación</h3>
          <ol class="list-decimal pl-5 space-y-2">
            <li><span class="font-medium">Inventario de activos:</span> Identificar todos los recursos</li>
            <li><span class="font-medium">Segmentación:</span> Dividir la red en zonas lógicas</li>
            <li><span class="font-medium">Políticas de acceso:</span> Definir reglas granulares</li>
            <li><span class="font-medium">Monitoreo:</span> Implementar SIEM y analítica</li>
            <li><span class="font-medium">Automatización:</span> Respuesta a incidentes</li>
          </ol>
          
          <div class="mt-4 p-3 bg-indigo-50 rounded">
            <h4 class="font-bold text-indigo-800">Ejemplo Práctico</h4>
            <p class="text-sm mt-1">Un empleado intenta acceder a un archivo confidencial:</p>
            <ul class="list-disc pl-5 mt-1 text-sm">
              <li>Verifica identidad con MFA</li>
              <li>Valida dispositivo cumple políticas</li>
              <li>Comprueba necesidad de acceso</li>
              <li>Registra la actividad</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="mt-6 p-4 bg-white rounded-lg shadow-md border-t-4 border-purple-500">
        <h3 class="text-lg font-bold text-purple-800 mb-2">Comparación: Zero Trust vs Seguridad Tradicional</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aspecto</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo Tradicional</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zero Trust</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap font-medium">Confianza</td>
                <td class="px-6 py-4">Implícita dentro del perímetro</td>
                <td class="px-6 py-4">Nunca confiar, siempre verificar</td>
              </tr>
              <tr class="bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap font-medium">Acceso</td>
                <td class="px-6 py-4">Basado en ubicación</td>
                <td class="px-6 py-4">Basado en identidad y contexto</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
    lastUpdated: '2025-06-30',
    difficulty: 'Avanzado',
    tags: ['zero-trust', 'seguridad', 'arquitectura', 'nist'],
    related: ['seguridad-diseno', 'gestion-riesgos']
  }
};

export default function WikiFundamentosArticle({ params }: { params: { slug: string } }) {
  const article = articles[params.slug as keyof typeof articles];
  
  if (!article) {
    return (
      <ArticleLayout title="Artículo no encontrado" backUrl="/recursos/wiki/fundamentos">
        <p>El artículo solicitado no existe.</p>
      </ArticleLayout>
    );
  }

  return (
    <ArticleLayout title={article.title} backUrl="/recursos/wiki/fundamentos">
      <div dangerouslySetInnerHTML={{ __html: article.content }} className="prose max-w-none" />
      
      <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
        <p>Última actualización: {article.lastUpdated}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {article.tags.map((tag: string) => (
            <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </ArticleLayout>
  );
}
