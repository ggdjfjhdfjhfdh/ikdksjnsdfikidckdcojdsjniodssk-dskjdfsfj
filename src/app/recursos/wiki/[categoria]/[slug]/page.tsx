import BackButton from '@/components/BackButton';
import { BookOpenIcon, CodeBracketIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function ArticlePage({
  params,
}: {
  params: { categoria: string; slug: string };
}) {
  // Contenido de ejemplo (en producción vendría de una API/BD)
  const articles = {
    fundamentos: {
      'modelo-osi': {
        title: 'Modelo OSI',
        content: `
          <h2>¿Qué es el Modelo OSI?</h2>
          <p>El modelo OSI (Open Systems Interconnection) es un marco conceptual que describe las funciones de un sistema de red. Desarrollado por ISO en 1984, divide las comunicaciones de red en 7 capas abstractas:</p>
          
          <h3 class="mt-6 text-xl font-semibold">Las 7 Capas del Modelo OSI</h3>
          <ol class="list-decimal pl-6 space-y-2">
            <li><strong>Aplicación:</strong> Interfaz usuario-servicio (HTTP, FTP, SMTP)</li>
            <li><strong>Presentación:</strong> Traducción y cifrado de datos</li>
            <li><strong>Sesión:</strong> Control de diálogos entre sistemas</li>
            <li><strong>Transporte:</strong> Transferencia confiable de datos (TCP, UDP)</li>
            <li><strong>Red:</strong> Enrutamiento y direccionamiento lógico (IP)</li>
            <li><strong>Enlace de datos:</strong> Control de acceso al medio (MAC)</li>
            <li><strong>Física:</strong> Transmisión de bits a nivel hardware</li>
          </ol>
          
          <h3 class="mt-6 text-xl font-semibold">Importancia en Ciberseguridad</h3>
          <ul class="list-disc pl-6 space-y-2">
            <li>Permite identificar vulnerabilidades por capa</li>
            <li>Facilita el diseño de defensas estratificadas</li>
            <li>Base para protocolos de seguridad como TLS (capa 4-6) y WPA3 (capa 2)</li>
          </ul>
          
          <div class="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 class="font-medium text-blue-800">Ejemplo Práctico:</h4>
            <p>Un ataque MITM (Man-in-the-Middle) opera principalmente en las capas 2 y 3, mientras que un XSS afecta la capa 7.</p>
          </div>
        `,
        lastUpdated: '2025-06-15',
        difficulty: 'Intermedio',
        tags: ['redes', 'fundamentos', 'arquitectura'],
        related: ['principios-seguridad', 'segmentacion']
      },
      'principios-seguridad': {
        title: 'Principios CIA',
        content: `
          <h2>La Tríada CIA: Base de la Seguridad Informática</h2>
          <p>La tríada CIA (Confidencialidad, Integridad, Disponibilidad) representa los tres pilares fundamentales de la seguridad de la información:</p>
          
          <div class="grid md:grid-cols-3 gap-6 my-6">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h3 class="font-bold text-blue-800">Confidencialidad</h3>
              <ul class="mt-2 space-y-1 text-sm">
                <li>• Protección contra accesos no autorizados</li>
                <li>• Técnicas: Cifrado, controles de acceso</li>
                <li>• Ejemplo: Credenciales de usuario</li>
              </ul>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg">
              <h3 class="font-bold text-green-800">Integridad</h3>
              <ul class="mt-2 space-y-1 text-sm">
                <li>• Garantía de que los datos no son alterados</li>
                <li>• Técnicas: Hashes, firmas digitales</li>
                <li>• Ejemplo: Transacciones bancarias</li>
              </ul>
            </div>
            
            <div class="bg-purple-50 p-4 rounded-lg">
              <h3 class="font-bold text-purple-800">Disponibilidad</h3>
              <ul class="mt-2 space-y-1 text-sm">
                <li>• Acceso autorizado cuando sea necesario</li>
                <li>• Técnicas: Redundancia, DDoS protection</li>
                <li>• Ejemplo: Servicios en la nube</li>
              </ul>
            </div>
          </div>
          
          <h3 class="text-xl font-semibold mt-8">Aplicación Práctica</h3>
          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
            <p><strong>Caso:</strong> Un sistema bancario debe:</p>
            <ul class="list-disc pl-6 mt-2 space-y-1">
              <li>Mantener <u>confidenciales</u> los datos de clientes</li>
              <li>Garantizar <u>integridad</u> en las transacciones</li>
              <li>Asegurar <u>disponibilidad</u> 24/7</li>
            </ul>
          </div>
          
          <h3 class="text-xl font-semibold mt-6">Relación con Otros Marcos</h3>
          <p>La tríada CIA complementa otros modelos como:</p>
          <ul class="list-disc pl-6 space-y-1 mt-2">
            <li>Modelo Parkerian Hexad (que añade Autenticidad, Utilidad y Posesión)</li>
            <li>Estándar ISO 27001 para SGSI</li>
          </ul>
        `,
        lastUpdated: '2025-06-20',
        difficulty: 'Básico',
        tags: ['fundamentos', 'teoría', 'seguridad'],
        related: ['modelo-osi', 'iso27001']
      },
      'tipos-amenazas': {
        title: 'Tipos de Amenazas en Ciberseguridad',
        content: `
          <h2>Clasificación de Amenazas Digitales</h2>
          <p>Las amenazas a la seguridad informática pueden categorizarse según su naturaleza, vector de ataque y objetivos:</p>
          
          <h3 class="text-xl font-semibold mt-6">1. Malware</h3>
          <div class="grid md:grid-cols-3 gap-4 my-4">
            <div class="bg-red-50 p-3 rounded-lg">
              <h4 class="font-medium text-red-700">Virus</h4>
              <p class="text-sm mt-1">Se adjuntan a archivos legítimos y se replican</p>
            </div>
            <div class="bg-red-50 p-3 rounded-lg">
              <h4 class="font-medium text-red-700">Ransomware</h4>
              <p class="text-sm mt-1">Cifra datos y exige rescate</p>
            </div>
            <div class="bg-red-50 p-3 rounded-lg">
              <h4 class="font-medium text-red-700">Spyware</h4>
              <p class="text-sm mt-1">Monitoriza actividad sin consentimiento</p>
            </div>
          </div>
          
          <h3 class="text-xl font-semibold mt-6">2. Ataques de Red</h3>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>DDoS:</strong> Sobrecarga servicios con tráfico</li>
            <li><strong>Man-in-the-Middle:</strong> Intercepta comunicaciones</li>
            <li><strong>SQL Injection:</strong> Explota vulnerabilidades en bases de datos</li>
          </ul>
          
          <h3 class="text-xl font-semibold mt-6">3. Ingeniería Social</h3>
          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
            <p>Explotan la psicología humana más que vulnerabilidades técnicas:</p>
            <ul class="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Phishing:</strong> Suplantación de identidad</li>
              <li><strong>Baiting:</strong> Ofrece incentivos falsos</li>
              <li><strong>Pretexting:</strong> Crea escenarios ficticios</li>
            </ul>
          </div>
          
          <h3 class="text-xl font-semibold mt-6">Medidas de Protección</h3>
          <ol class="list-decimal pl-6 space-y-2">
            <li>Actualizar sistemas y software</li>
            <li>Usar autenticación multifactor</li>
            <li>Educar a usuarios finales</li>
            <li>Implementar defensas en capas</li>
          </ol>
        `,
        lastUpdated: '2025-06-25',
        difficulty: 'Intermedio',
        tags: ['malware', 'ataques', 'seguridad'],
        related: ['principios-seguridad', 'owasp-top10', 'firewalls']
      },
      'zero-trust': {
        title: 'Arquitectura Zero Trust',
        content: `
          <h2>Modelo Zero Trust: Never Trust, Always Verify</h2>
          <p>Paradigma de seguridad que elimina la confianza implícita y requiere verificación continua.</p>
          
          <h3 class="text-xl font-semibold mt-6">Principios Fundamentales</h3>
          <ul class="list-disc pl-6 space-y-2">
            <li><strong>Verificación explícita:</strong> Autenticar y autorizar cada acceso</li>
            <li><strong>Acceso con privilegio mínimo:</strong> Solo lo estrictamente necesario</li>
            <li><strong>Micro-segmentación:</strong> Divisiones granulares de la red</li>
            <li><strong>Análisis continuo:</strong> Monitoreo en tiempo real</li>
          </ul>
          
          <h3 class="text-xl font-semibold mt-6">Comparación con Seguridad Perimetral</h3>
          <div class="grid md:grid-cols-2 gap-4 my-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-bold text-blue-800">Seguridad Tradicional</h4>
              <ul class="mt-2 space-y-1 text-sm">
                <li>• Confianza implícita interna</li>
                <li>• Perímetro definido</li>
                <li>• Protección estática</li>
              </ul>
            </div>
            <div class="bg-green-50 p-4 rounded-lg">
              <h4 class="font-bold text-green-800">Zero Trust</h4>
              <ul class="mt-2 space-y-1 text-sm">
                <li>• Verificación continua</li>
                <li>• Protección por capas</li>
                <li>• Adaptación dinámica</li>
              </ul>
            </div>
          </div>
          
          <h3 class="text-xl font-semibold mt-6">Componentes Clave</h3>
          <ol class="list-decimal pl-6 space-y-2">
            <li><strong>Identidad:</strong> MFA, IAM, comportamiento</li>
            <li><strong>Dispositivo:</strong> Health attestation</li>
            <li><strong>Transporte:</strong> Cifrado extremo a extremo</li>
            <li><strong>Aplicación:</strong> Acceso condicional</li>
            <li><strong>Datos:</strong> Clasificación y protección</li>
          </ol>
          
          <h3 class="text-xl font-semibold mt-6">Roadmap de Adopción</h3>
          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
            <ol class="list-decimal pl-6 space-y-1">
              <li>Inventario de activos críticos</li>
              <li>Implementar IAM avanzado</li>
              <li>Micro-segmentar la red</li>
              <li>Desplegar ZTNA (Zero Trust Network Access)</li>
              <li>Automatizar orquestación</li>
            </ol>
          </div>
          
          <h3 class="text-xl font-semibold mt-6">Referencias</h3>
          <ul class="list-disc pl-6 space-y-1 text-sm text-blue-600">
            <li><a href="https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf" target="_blank" class="hover:underline">NIST SP 800-207: Zero Trust Architecture</a></li>
            <li><a href="https://cloud.google.com/beyondcorp" target="_blank" class="hover:underline">Google BeyondCorp Framework</a></li>
          </ul>
        `,
        lastUpdated: '2025-06-30',
        difficulty: 'Avanzado',
        tags: ['arquitectura', 'seguridad', 'nist'],
        related: ['segmentacion', 'autenticacion-multifactor', 'gestión-riesgos']
      },
    },
    tecnologias: {
      'firewalls': {
        title: 'Firewalls: Protección Perimetral',
        content: `
          <h2>Sistemas Firewall en Ciberseguridad</h2>
          <p>Los firewalls son dispositivos o software que controlan el tráfico de red entre zonas de diferente nivel de confianza.</p>
          
          <h3 class="text-xl font-semibold mt-6">Tipos de Firewalls</h3>
          <div class="grid md:grid-cols-2 gap-4 my-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-bold text-blue-800">Packet Filtering</h4>
              <ul class="mt-2 space-y-1 text-sm">
                <li>• Filtra por dirección IP y puerto</li>
                <li>• Bajo overhead</li>
                <li>• Vulnerable a IP spoofing</li>
              </ul>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-bold text-blue-800">Stateful Inspection</h4>
              <ul class="mt-2 space-y-1 text-sm">
                <li>• Analiza estados de conexión</li>
                <li>• Mayor seguridad</li>
                <li>• Más consumo de recursos</li>
              </ul>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-bold text-blue-800">Next-Generation (NGFW)</h4>
              <ul class="mt-2 space-y-1 text-sm">
                <li>• Inspección profunda de paquetes</li>
                <li>• Integración con IPS/IDS</li>
                <li>• Filtrado por aplicación</li>
              </ul>
            </div>
            <div class="bg-blue-50 p-4 rounded-lg">
              <h4 class="font-bold text-blue-800">Web Application (WAF)</h4>
              <ul class="mt-2 space-y-1 text-sm">
                <li>• Protege específicamente aplicaciones web</li>
                <li>• Detecta OWASP Top 10</li>
                <li>• Reglas personalizables</li>
              </ul>
            </div>
          </div>
          
          <h3 class="text-xl font-semibold mt-6">Configuración Recomendada</h3>
          <div class="bg-green-50 border-l-4 border-green-400 p-4 my-4">
            <ul class="list-disc pl-6 space-y-1">
              <li><strong>Política por defecto:</strong> Denegar todo el tráfico</li>
              <li><strong>Reglas específicas:</strong> Permitir solo lo necesario</li>
              <li><strong>Segmentación:</strong> Zonas de seguridad diferenciadas</li>
              <li><strong>Actualizaciones:</strong> Mantener firmas y reglas al día</li>
            </ul>
          </div>
          
          <h3 class="text-xl font-semibold mt-6">Mejores Prácticas</h3>
          <ol class="list-decimal pl-6 space-y-2">
            <li>Implementar firewall interno y externo</li>
            <li>Revisar logs regularmente</li>
            <li>Auditar reglas periódicamente</li>
            <li>Combinar con otros controles (IPS, VPN)</li>
          </ol>
        `,
        lastUpdated: '2025-06-18',
        difficulty: 'Intermedio',
        tags: ['redes', 'seguridad', 'hardware'],
        related: ['segmentacion', 'ids-ips', 'vpn']
      },
      'vpn': {
        title: 'VPN y Cifrado de Comunicaciones',
        content: `
          <h2>Redes Privadas Virtuales (VPN)</h2>
          <p>Las VPN crean túneles cifrados para transmitir datos de forma segura a través de redes públicas.</p>
          
          <h3 class="text-xl font-semibold mt-6">Protocolos VPN Principales</h3>
          <div class="grid md:grid-cols-2 gap-4 my-4">
            <div class="bg-indigo-50 p-4 rounded-lg">
              <h4 class="font-bold text-indigo-800">IPSec</h4>
              <ul class="mt-2 space-y-1 text-sm">
                <li>• Cifrado fuerte (AES-256)</li>
                <li>• Operación en modo Transporte/Túnel</li>
                <li>• Requiere certificados o claves precompartidas</li>
              </ul>
            </div>
            <div class="bg-indigo-50 p-4 rounded-lg">
              <h4 class="font-bold text-indigo-800">OpenVPN</h4>
              <ul class="mt-2 space-y-1 text-sm">
                <li>• Open-source</li>
                <li>• Usa SSL/TLS para key exchange</li>
                <li>• Alta configurabilidad</li>
              </ul>
            </div>
            <div class="bg-indigo-50 p-4 rounded-lg">
              <h4 class="font-bold text-indigo-800">WireGuard</h4>
              <ul class="mt-2 space-y-1 text-sm">
                <li>• Código minimalista</li>
                <li>• Mejor rendimiento</li>
                <li>• Implementación moderna</li>
              </ul>
            </div>
            <div class="bg-indigo-50 p-4 rounded-lg">
              <h4 class="font-bold text-indigo-800">SSL/TLS VPN</h4>
              <ul class="mt-2 space-y-1 text-sm">
                <li>• Acceso vía navegador</li>
                <li>• No requiere cliente especial</li>
                <li>• Ideal para acceso remoto</li>
              </ul>
            </div>
          </div>
          
          <h3 class="text-xl font-semibold mt-6">Algoritmos de Cifrado</h3>
          <table class="min-w-full divide-y divide-gray-200 mt-4">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Algoritmo</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Seguridad</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Rendimiento</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Uso típico</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-4 py-2 text-sm">AES-256</td>
                <td class="px-4 py-2 text-sm">Alta</td>
                <td class="px-4 py-2 text-sm">Bueno</td>
                <td class="px-4 py-2 text-sm">VPN corporativas</td>
              </tr>
              <tr>
                <td class="px-4 py-2 text-sm">ChaCha20</td>
                <td class="px-4 py-2 text-sm">Alta</td>
                <td class="px-4 py-2 text-sm">Excelente</td>
                <td class="px-4 py-2 text-sm">Dispositivos móviles</td>
              </tr>
              <tr>
                <td class="px-4 py-2 text-sm">3DES</td>
                <td class="px-4 py-2 text-sm">Media</td>
                <td class="px-4 py-2 text-sm">Lento</td>
                <td class="px-4 py-2 text-sm">Legacy systems</td>
              </tr>
            </tbody>
          </table>
          
          <h3 class="text-xl font-semibold mt-6">Consideraciones de Seguridad</h3>
          <div class="bg-red-50 border-l-4 border-red-400 p-4 my-4">
            <ul class="list-disc pl-6 space-y-1">
              <li>Evitar protocolos obsoletos (PPTP, L2TP sin IPSec)</li>
              <li>Implementar autenticación multifactor</li>
              <li>Limitar acceso por geolocalización</li>
              <li>Monitorear conexiones activas</li>
            </ul>
          </div>
          
          <h3 class="text-xl font-semibold mt-6">Implementación Recomendada</h3>
          <ol class="list-decimal pl-6 space-y-2">
            <li>Usar WireGuard o OpenVPN con configuraciones seguras</li>
            <li>Rotar claves periódicamente</li>
            <li>Segmentar redes por niveles de acceso</li>
            <li>Auditar configuraciones trimestralmente</li>
          </ol>
        `,
        lastUpdated: '2025-06-28',
        difficulty: 'Avanzado',
        tags: ['redes', 'cifrado', 'seguridad'],
        related: ['firewalls', 'autenticacion-multifactor', 'segmentacion']
      },
    }
  };

  const article = articles[params.categoria as keyof typeof articles]?.[params.slug] || {
    title: 'Artículo no encontrado',
    content: '<p>El artículo solicitado no existe o no está disponible.</p>',
    lastUpdated: new Date().toISOString().split('T')[0],
    difficulty: 'N/A',
    tags: []
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <BackButton href={`/recursos/wiki/${params.categoria}`} label={`Volver a ${params.categoria}`} />
      
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2">
                {article.difficulty}
              </span>
              <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {article.tags.map((tag: string) => (
                  <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-sm text-gray-700">
              Actualizado: {article.lastUpdated}
            </div>
          </div>
          
          <div 
            className="prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </div>
    </main>
  );
}
