"use client";

import { useState, useEffect } from 'react';
import { Shield, Key, AlertTriangle, EyeOff, Smartphone, Wifi, HardDrive, ArrowLeft, ChevronDown, ArrowRight, RefreshCw, Share2, Copy, MessageSquare, Mail } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { securityQuizTranslations } from '@/lib/securityQuizTranslations';

interface Question {
  q: string;
  options: { ES: string[]; EN: string[] };
  answer: number;
  explanation: string;
  category: string;
  userAnswer?: number;
  questionNumber?: number;
  id: number; // Assuming questions have unique IDs
}

const questionCategories = {
  fundamentals: { name: 'Fundamentos', icon: <Shield className="w-5 h-5" /> },
  passwords:    { name: 'Contraseñas', icon: <Key className="w-5 h-5" /> },
  phishing:     { name: 'Phishing',    icon: <AlertTriangle className="w-5 h-5" /> },
  privacy:      { name: 'Privacidad',  icon: <EyeOff className="w-5 h-5" /> },
  devices:      { name: 'Dispositivos',icon: <Smartphone className="w-5 h-5" /> },
  networks:     { name: 'Redes',       icon: <Wifi className="w-5 h-5" /> },
  backups:      { name: 'Backups',     icon: <HardDrive className="w-5 h-5" /> }
} as const;

const questions: Question[] = [
  /* ────────── FUNDAMENTOS ────────── */
  {
    id: 1,
    category: 'fundamentals',
    q: '¿Qué principio prescribe otorgar únicamente los permisos imprescindibles para desempeñar una tarea?',
    options: {
      ES: ['Segregación de funciones', 'Principio de mínimo privilegio', 'Defensa en profundidad'],
      EN: ['Segregation of duties', 'Principle of least privilege', 'Defense in depth']
    },
    answer: 1,
    explanation:
      'Al limitar los privilegios se reduce la superficie de ataque y se acota el daño si una cuenta se ve comprometida.',
  },
  {
    id: 2,
    category: 'fundamentals',
    q: '¿Cuál es la diferencia entre una vulnerabilidad y una amenaza?',
    options: {
      ES: [
        'Ninguna, son sinónimos',
        'Una vulnerabilidad es una debilidad; una amenaza es el agente o suceso que puede explotarla',
        'Amenaza = fallo interno; vulnerabilidad = ataque externo',
      ],
      EN: [
        'None, they are synonyms',
        'A vulnerability is a weakness; a threat is the agent or event that can exploit it',
        'Threat = internal failure; vulnerability = external attack',
      ]
    },
    answer: 1,
    explanation:
      'La amenaza aprovecha la vulnerabilidad para provocar impacto sobre la confidencialidad, integridad o disponibilidad.',
  },
  {
    id: 18,
    category: 'fundamentals',
    q: '¿Por qué es crítico que se filtre un token OAuth?',
    options: {
      ES: [
        'Equivale a una contraseña filtrada',
        'Concede acceso a la cuenta sin necesidad de contraseña ni MFA',
        'Es un malware que bloquea la sesión',
      ],
      EN: [
        'It is equivalent to a leaked password',
        'It grants access to the account without the need for a password or MFA',
        'It is a malware that blocks the session',
      ]
    },
    answer: 1,
    explanation:
      'Muchos servicios de terceros usan tokens OAuth: con el token, un atacante actúa como el usuario sin conocer la contraseña; revócalo de inmediato en el proveedor.',
  },
  {
    id: 25,
    category: 'fundamentals',
    q: 'En un modelo «Zero Trust» la verificación de identidad y contexto de riesgo se realiza:',
    options: {
      ES: ['Solo al iniciar sesión', 'De forma continua para cada petición', 'Una vez al día'],
      EN: ['Only at login', 'Continuously for each request', 'Once a day'],
    },
    answer: 1,
    explanation:
      'La red se considera hostil por defecto; cada solicitud se valida en tiempo real'
  },

  /* ────────── CONTRASEÑAS ────────── */
  {
    id: 3,
    category: 'passwords',
    q: '¿Qué algoritmo de hash se recomienda actualmente para almacenar contraseñas?',
    options: {
      ES: ['MD5', 'SHA-256', 'Argon2id'],
      EN: ['MD5', 'SHA-256', 'Argon2id'],
    },
    answer: 2,
    explanation:
      'Argon2id —con parámetros exigentes (memoryCost ≥ 2¹⁶ KB, timeCost ≥ 3)— o, en su defecto, PBKDF2 con iteraciones altas, mitiga ataques de fuerza bruta acelerados por GPU/ASIC.',
  },
  {
    id: 4,
    category: 'passwords',
    q: '¿Qué factor aporta más entropía real a una contraseña?',
    options: {
      ES: ['Longitud', 'Símbolos especiales', 'Cambios frecuentes'],
      EN: ['Length', 'Special characters', 'Frequent changes'],
    },
    answer: 0,
    explanation:
      'Una cadena aleatoria (no frase de diccionario) de 16+ caracteres es mucho más resistente que 8 caracteres “complejos”.',
  },
  {
    id: 19,
    category: 'passwords',
    q: '¿Qué es exactamente una «passkey»?',
    options: {
      ES: [
        'Un archivo que guarda todas tus contraseñas',
        'Un mecanismo FIDO2 que sustituye a la contraseña mediante criptografía de clave pública',
        'La clave maestra de tu gestor de contraseñas',
      ],
      EN: [
        'A file that stores all your passwords',
        'A FIDO2 mechanism that replaces the password using public key cryptography',
        'The master key of your password manager',
      ]
    },
    answer: 1,
    explanation:
      'La clave privada permanece en el dispositivo y se desbloquea (biometría/PIN); el servidor solo recibe la clave pública.',
  },

  /* ────────── PHISHING ────────── */
  {
    id: 5,
    category: 'phishing',
    q: '¿Cuál suele ser el indicio técnico más fiable de un correo de phishing?',
    options: {
      ES: ['Errores ortográficos', 'Dominio del remitente ligeramente alterado (typosquatting)', 'Adjunto PDF'],
      EN: ['Spelling errors', 'Slightly altered sender domain (typosquatting)', 'PDF attachment'],
    },
    answer: 1,
    explanation:
      'La apariencia visual puede clonarse, pero el dominio legítimo no; pequeños cambios (p. ej. “rnicrosoft.com”) delatan el fraude.',
  },
  {
    id: 6,
    category: 'phishing',
    q: 'El término «smishing» hace referencia a:',
    options: {
      ES: ['Phishing por SMS', 'Ingeniería social telefónica', 'Phishing en redes sociales'],
      EN: ['SMS phishing', 'Phone social engineering', 'Social media phishing'],
    },
    answer: 0,
    explanation:
      'Combinación de “SMS” + “phishing”; incluye mensajes RCS y otras apps de mensajería que se comportan como SMS.',
  },
  {
    id: 20,
    category: 'phishing',
    q: '«BEC» significa:',
    options: {
      ES: [
        'Business Email Compromise: fraude mediante suplantación para desviar fondos',
        'Botnet Email Campaign: envío masivo de spam',
        'Binary Exploit Code: archivo adjunto malicioso',
      ],
      EN: [
        'Business Email Compromise: fraud through impersonation to divert funds',
        'Botnet Email Campaign: massive spam sending',
        'Binary Exploit Code: malicious attachment',
      ]
    },
    answer: 0,
    explanation:
      'El atacante suplanta a ejecutivos o proveedores y convence al personal de finanzas para modificar datos bancarios.',
  },
  {
    id: 26,
    category: 'phishing',
    q: 'Un «kit de phishing» es:',
    options: {
      ES: [
        'Paquete listo para clonar webs y robar credenciales',
        'Una suite antivirus',
        'Un informe de seguridad',
      ],
      EN: [
        'A ready-to-use package to clone websites and steal credentials',
        'An antivirus suite',
        'A security report',
      ]
    },
    answer: 0,
    explanation:
      'Incluye HTML, scripts y panel de control; se vende en foros clandestinos y facilita a novatos montar campañas.',
  },

  /* ────────── PRIVACIDAD ────────── */
  {
    id: 7,
    category: 'privacy',
    q: 'Para evitar que desconocidos localicen tu perfil a partir de tu número de teléfono, debes desactivar:',
    options: {
      ES: ['Búsqueda inversa', 'Sincronización o coincidencia de contactos', 'Estado de actividad'],
      EN: ['Reverse search', 'Contact synchronization or matching', 'Activity status'],
    },
    answer: 1,
    explanation:
      'Al impedir la coincidencia de contactos, evitas que alguien cargue tu número y encuentre tu cuenta.',
  },
  {
    id: 8,
    category: 'privacy',
    q: 'El RGPD reconoce el derecho a la portabilidad y el derecho a:',
    options: {
      ES: ['Ser olvidado (supresión de datos)', 'Right-to-repair', 'Derecho de réplica'],
      EN: ['Be forgotten (data erasure)', 'Right-to-repair', 'Right of reply'],
    },
    answer: 0,
    explanation:
      'Puedes exigir que la organización elimine todos tus datos personales cuando deje de tener base legal para tratarlos.',
  },
  {
    id: 21,
    category: 'privacy',
    q: 'La técnica de «browser fingerprinting» se basa en:',
    options: {
      ES: [
        'Combinar datos de navegador, sistema operativo, fuentes y extensiones',
        'La dirección IP únicamente',
        'Cookies de sesión',
      ],
      EN: [
        'Combining browser, operating system, font and extension data',
        'The IP address only',
        'Session cookies',
      ]
    },
    answer: 0,
    explanation:
      'El conjunto de parámetros crea un identificador casi único, incluso con cookies bloqueadas.',
  },

  /* ────────── DISPOSITIVOS ────────── */
  {
    id: 9,
    category: 'devices',
    q: '¿Qué ventaja principal aporta el cifrado de disco completo (BitLocker/FileVault)?',
    options: {
      ES: [
        'Evita cualquier malware',
        'Protege la información si el equipo se pierde o es robado',
        'Aumenta el rendimiento del SSD',
      ],
      EN: [
        'Prevents any malware',
        'Protects information if the device is lost or stolen',
        'Increases SSD performance',
      ]
    },
    answer: 1,
    explanation:
      'Sin la clave de descifrado, los datos permanecen ilegibles aunque extraigan físicamente el disco.',
  },
  {
    id: 10,
    category: 'devices',
    q: 'Activar «OEM Unlock» en Android permite:',
    options: {
      ES: ['Desbloquear la SIM', 'Abrir el bootloader', 'Activar el modo desarrollador'],
      EN: ['Unlock the SIM', 'Unlock the bootloader', 'Activate developer mode'],
    },
    answer: 1,
    explanation:
      'Al desbloquear el bootloader se desactiva Verified Boot y aumenta el riesgo de firmware malicioso.',
  },
  {
    id: 22,
    category: 'devices',
    q: 'La función de «Secure Boot» en sistemas UEFI es:',
    options: {
      ES: [
        'Arrancar más rápido el sistema',
        'Permitir solo software firmado durante el arranque',
        'Actualizar firmware del disco duro',
      ],
      EN: [
        'Boot the system faster',
        'Allow only signed software during boot',
        'Update hard drive firmware',
      ]
    },
    answer: 1,
    explanation:
      'Evita que bootkits sustituyan el gestor de arranque por cargadores de arranque no firmados.',
  },
  {
    id: 27,
    category: 'devices',
    q: '¿Qué estándar habilita autenticación web mediante huella digital o reconocimiento facial sin contraseña?',
    options: {
      ES: ['WebAuthn / FIDO2', 'OAuth 1.0', 'OpenVPN'],
      EN: ['WebAuthn / FIDO2', 'OAuth 1.0', 'OpenVPN'],
    },
    answer: 0,
    explanation:
      'WebAuthn, parte de FIDO2, usa criptografía de clave pública y factores locales (biometría, llave de hardware).',
  },

  /* ────────── REDES ────────── */
  {
    id: 11,
    category: 'networks',
    q: '¿Qué puerto TCP utiliza HTTPS por defecto?',
    options: {
      ES: ['80', '443', '22'],
      EN: ['80', '443', '22'],
    },
    answer: 1,
    explanation: 'HTTP sin cifrar usa 80 y SSH utiliza 22.',
  },
  {
    id: 12,
    category: 'networks',
    q: '¿Cuál es la diferencia clave entre un IDS y un IPS?',
    options: {
      ES: ['IDS bloquea y IPS solo alerta', 'IDS detecta; IPS detecta y bloquea', 'No hay diferencia'],
      EN: ['IDS blocks and IPS only alerts', 'IDS detects; IPS detects and blocks', 'No difference'],
    },
    answer: 1,
    explanation:
      'El IPS se coloca «en línea» y puede descartar tráfico malicioso en tiempo real.',
  },
  {
    id: 23,
    category: 'networks',
    q: '¿Qué protocolo cifra las consultas de nombres de dominio para impedir el espionaje DNS?',
    options: {
      ES: ['DoH (DNS over HTTPS)', 'FTP', 'SNMPv2'],
      EN: ['DoH (DNS over HTTPS)', 'FTP', 'SNMPv2'],
    },
    answer: 0,
    explanation:
      'DoH encapsula las peticiones DNS dentro de HTTPS en el puerto 443; DoT (DNS over TLS) es otra opción popular, aunque menos adoptada por los navegadores.',
  },

  /* ────────── BACKUPS ────────── */
  {
    id: 13,
    category: 'backups',
    q: 'En la regla 3-2-1-1-0, el «1» adicional significa:',
    options: {
      ES: ['Backup incremental', 'Copia inmutable o aislada (air-gapped)', 'Test anual'],
      EN: ['Incremental backup', 'Immutable or isolated copy (air-gapped)', 'Annual test'],
    },
    answer: 1,
    explanation:
      'Una copia inmutable/off-line evita que el ransomware cifre o borre las copias de seguridad.',
  },
  {
    id: 14,
    category: 'backups',
    q: '¿Con qué frecuencia debería probarse la restauración de los backups críticos?',
    options: {
      ES: ['Anualmente', 'Trimestralmente', 'Nunca, si está automatizado'],
      EN: ['Annually', 'Quarterly', 'Never, if automated'],
    },
    answer: 1,
    explanation:
      'Las pruebas trimestrales detectan corrupciones y verifican los tiempos reales de recuperación (RTO/RPO).',
  },
  {
    id: 24,
    category: 'backups',
    q: 'Un «snapshot inmutable» es:',
    options: {
      ES: [
        'Copia de solo lectura que no puede modificarse ni borrarse durante un periodo definido',
        'Instantánea editable del sistema',
        'Backup incremental diferencial',
      ],
      EN: [
        'Read-only copy that cannot be modified or deleted for a defined period',
        'Editable system snapshot',
        'Incremental differential backup',
      ]
    },
    answer: 0,
    explanation:
      'Proporciona resistencia frente a ransomware y borrados accidentales.',
  },

  /* ────────── BONUS FUNDAMENTOS ────────── */
  {
    id: 15,
    category: 'fundamentals',
    q: 'Definición concisa de «Zero Trust»:',
    options: {
      ES: [
        'Red sin contraseñas',
        'Modelo que nunca confía y siempre verifica cada solicitud, independientemente de la ubicación',
        'VPN corporativa permanente',
      ],
      EN: [
        'Passwordless network',
        'Model that never trusts and always verifies each request, regardless of location',
        'Permanent corporate VPN',
      ]
    },
    answer: 1,
    explanation:
      'Asume compromiso interno y externo; combina autenticación fuerte + microsegmentación + análisis continuo'
  },
];

interface QuestionResultProps {
  question: Question;
}

const QuestionResult = ({ question }: QuestionResultProps) => {
  const isCorrect = question.userAnswer === question.answer;
  const [expanded, setExpanded] = useState(!isCorrect);

  return (
    <div className={`p-6 rounded-xl backdrop-blur-sm ${isCorrect ? 'bg-green-50/70 border border-green-200' : 'bg-red-50/70 border border-red-200'} transition-all hover:shadow-sm`}>
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {isCorrect ? '✓' : '✗'}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Pregunta {question.questionNumber}</h4>
            <p className={`text-sm ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {isCorrect ? 'Correcta' : 'Incorrecta'}
            </p>
          </div>
        </div>
        {!isCorrect && (
          <ChevronDown className={`h-5 w-5 text-gray-700 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        )}
      </div>

      {expanded && !isCorrect && (
        <div className="mt-4 pl-12 space-y-3 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-red-50/80 p-4 rounded-lg border border-red-100">
              <p className="text-sm font-medium text-red-800 mb-1">Tu respuesta:</p>
              <p className="text-gray-900">{question.options.ES[question.userAnswer || 0]}</p>
            </div>
            <div className="bg-green-50/80 p-4 rounded-lg border border-green-100">
              <p className="text-sm font-medium text-green-800 mb-1">Correcta:</p>
              <p className="text-gray-900">{question.options.ES[question.answer]}</p>
            </div>
          </div>
          
          <div className="bg-blue-50/80 p-4 rounded-lg border border-blue-100">
            <p className="text-sm font-medium text-blue-800 mb-1">Explicación:</p>
            <p className="text-gray-900">{question.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
};

interface ResultsScreenProps {
  questions: Question[];
  score: number;
  onRestart: () => void;
}

const ResultsScreen = ({ questions, score, onRestart }: ResultsScreenProps) => {
  const { lang } = useLanguage();
  const t = securityQuizTranslations[lang];
  const correctPercentage = Math.round((score / questions.length) * 100);
  const [shareState, setShareState] = useState<'idle' | 'copying' | 'copied' | 'error'>('idle');
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleShare = async (method: 'clipboard' | 'whatsapp' | 'email' = 'clipboard') => {
    try {
      setShareState('copying');
      
      const resultText = `🔐 ${t.quizResults.score}: ${score}/${questions.length} (${correctPercentage}%)\n\n${correctPercentage >= 80 ? t.quizResults.excellent : correctPercentage >= 60 ? t.quizResults.goodJob : t.quizResults.keepPracticing}\n\nRealiza tu propio test en: ${window.location.origin}/recursos/herramientas/test-ciberseguridad`;

      if (method === 'clipboard') {
        await navigator.clipboard.writeText(resultText);
      } else if (method === 'whatsapp') {
        window.open(`https://wa.me/?text=${encodeURIComponent(resultText)}`);
      } else if (method === 'email') {
        window.open(`mailto:?subject=${t.quizResults.emailSubject}&body=${encodeURIComponent(resultText)}`);
      }
      
      setShareState('copied');
      setTimeout(() => setShareState('idle'), 3000);
    } catch (err) {
      setShareState('error');
      setTimeout(() => setShareState('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-gray-200/50 mb-8 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-100 to-green-100 mb-4 shadow-inner">
            <span className="text-3xl font-bold text-gray-800">{correctPercentage}%</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.quizResults.score}: {score} / {questions.length}</h1>
          <div className="text-4xl font-bold text-gray-800">
            {score}<span className="text-2xl text-gray-600">/{questions.length}</span>
          </div>
          <p className="text-gray-600 mt-2">
            {correctPercentage >= 80 ? t.quizResults.excellent : 
             correctPercentage >= 60 ? t.quizResults.goodJob : 
             t.quizResults.keepPracticing}
          </p>
        </div>

        <div className="space-y-4 mb-12">
          {questions.map((q) => (
            <QuestionResult key={q.id} question={q} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button 
            onClick={() => window.location.href='/recursos/herramientas/test-ciberseguridad'}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition-all shadow-sm border border-gray-200 w-full sm:w-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver a categorías
          </button>
          <button 
            onClick={onRestart}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md w-full sm:w-auto"
          >
            <RefreshCw className="w-5 h-5" />
            Reiniciar test
          </button>
          
          <div className="relative">
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-all shadow-md w-full sm:w-auto"
            >
              <Share2 className="w-5 h-5" />
              {shareState === 'copied' ? '✓ Copiado' : 
               shareState === 'copying' ? 'Compartiendo...' : 
               shareState === 'error' ? 'Error' : 'Compartir'}
            </button>

            {showShareOptions && (
              <div className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-2 w-48 z-10">
                <button
                  onClick={() => {
                    handleShare('clipboard');
                    setShowShareOptions(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 rounded"
                >
                  <Copy className="w-5 h-5 mr-2 text-gray-700" />
                  Copiar enlace
                </button>
                <button
                  onClick={() => {
                    handleShare('whatsapp');
                    setShowShareOptions(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 rounded"
                >
                  <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
                  WhatsApp
                </button>
                <button
                  onClick={() => {
                    handleShare('email');
                    setShowShareOptions(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100 rounded"
                >
                  <Mail className="w-5 h-5 mr-2 text-blue-600" />
                  Email
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface SecurityQuizProps {
}

const shuffleArray = (array: any[]) => {
  if (!array || !Array.isArray(array)) return array;
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function SecurityQuiz() {
  const { lang } = useLanguage();
  const t = securityQuizTranslations[lang];

  const categories = {
    fundamentals: t.categories.fundamentals,
    passwords: t.categories.passwords,
    phishing: t.categories.phishing,
    privacy: t.categories.privacy,
    devices: t.categories.devices,
    networks: t.categories.networks,
    backups: t.categories.backups
  } as const;

  const [selectedCategories, setSelectedCategories] = useState<string[]>(Object.keys(categories));
  const [quizStarted, setQuizStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number>(-1);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState(questions.filter(q => selectedCategories.includes(q.category)));
  const [allQuestions, setAllQuestions] = useState(questions);

  // Add null checks for filteredQuestions
  if (!filteredQuestions || filteredQuestions.length === 0) {
    return (
      <div className="text-center py-8">
        <p>No hay preguntas disponibles para las categorías seleccionadas</p>
        <button 
          onClick={() => setQuizStarted(false)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Volver a categorías
        </button>
      </div>
    );
  }

  // Ensure current doesn't exceed questions length
  const safeCurrent = Math.min(current, filteredQuestions.length - 1);
  const question = filteredQuestions[safeCurrent] || {
    q: 'Pregunta no disponible',
    options: { ES: [], EN: [] },
    answer: 0,
    explanation: '',
    category: 'basics'
  };

  // Update progress display
  const progress = ((safeCurrent + 1) / filteredQuestions.length) * 100;

  useEffect(() => {
    // Calculate score when answers change
    const correctCount = filteredQuestions.reduce((count, q) => 
      q.userAnswer !== undefined && q.userAnswer === q.answer ? count + 1 : count
    , 0);
    setScore(correctCount);
  }, [filteredQuestions]);

  const handleCategorySelect = (category: string) => {
    const newCategories = [...selectedCategories];
    const index = newCategories.indexOf(category);
    
    if (index === -1) {
      newCategories.push(category);
    } else {
      newCategories.splice(index, 1);
    }
    
    setSelectedCategories(newCategories);
    // Don't set filteredQuestions or quizStarted here
    // Just update selected categories
  };

  const startQuiz = () => {
    // Filter questions by selected categories
    const questionsInCategories = selectedCategories.flatMap(category => {
      const categoryQuestions = questions.filter(q => q.category === category);
      return categoryQuestions.length > 0 ? categoryQuestions : [];
    });

    if (questionsInCategories.length === 0) {
      console.error('No questions found for selected categories');
      return;
    }

    // Shuffle and prepare questions
    const shuffledQuestions = questionsInCategories.map((q, index) => ({
      ...q,
      questionNumber: index + 1,
      options: {
        ES: shuffleArray([...q.options.ES]),
        EN: shuffleArray([...q.options.EN])
      },
      answer: q.answer // Keep original answer index
    }));

    setFilteredQuestions(shuffledQuestions);
    setCurrent(0);
    setSelected(-1);
    setScore(0);
    setShowResults(false);
    setQuizStarted(true);
  };

  const handleNext = () => {
    if (selected === -1) {
      alert('Por favor selecciona una respuesta');
      return;
    }

    // Update current question with selected answer
    const updatedQuestions = [...filteredQuestions];
    updatedQuestions[current] = {
      ...updatedQuestions[current],
      userAnswer: selected
    };
    
    // Update state with answered question
    setFilteredQuestions(updatedQuestions);
    
    // Update main questions array to track all answers
    setAllQuestions(prev => {
      const newQuestions = [...prev];
      const questionId = filteredQuestions[current].id; // Assuming questions have unique IDs
      const mainIndex = newQuestions.findIndex(q => q.id === questionId);
      if (mainIndex !== -1) {
        newQuestions[mainIndex] = {
          ...newQuestions[mainIndex],
          userAnswer: selected
        };
      }
      return newQuestions;
    });

    if (current + 1 >= updatedQuestions.length) {
      // Only validate questions in CURRENT category
      const allInCategoryAnswered = updatedQuestions.every(q => q.userAnswer !== undefined);
      if (!allInCategoryAnswered) {
        alert(`Hay ${updatedQuestions.filter(q => q.userAnswer === undefined).length} pregunta(s) sin responder en esta categoría`);
        return;
      }
      
      setShowResults(true);
    } else {
      setCurrent(prev => prev + 1);
      setSelected(-1);
    }
  };

  const handleRestart = () => {
    // Reuse same categories but reshuffle questions
    const categoryQuestions = questions.filter(q => selectedCategories.includes(q.category));
    const shuffledQuestions = categoryQuestions.map((q, index) => ({
      ...q,
      questionNumber: index + 1,
      options: {
        ES: shuffleArray([...q.options.ES]),
        EN: shuffleArray([...q.options.EN])
      },
      answer: q.answer // Keep original answer index
    }));
    
    setFilteredQuestions(shuffledQuestions);
    setCurrent(0);
    setSelected(-1);
    setScore(0);
    setShowResults(false); // Add this to exit results view
  };

  if (!quizStarted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="mb-6 flex justify-between">
              <button
                onClick={() => window.location.href = '/recursos/herramientas'}
                className="text-blue-600 hover:text-blue-800"
              >
                ← Volver a herramientas
              </button>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{t.pageTitle}</h1>
            <p className="text-gray-600 mb-6">{t.pageDescription}</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {Object.entries(categories).map(([key, categoryName]) => (
                <button
                  key={key}
                  onClick={() => handleCategorySelect(key)}
                  className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${selectedCategories.includes(key)
                    ? 'bg-blue-50 border-blue-300 text-blue-700' 
                    : 'bg-white border-gray-200 hover:border-blue-200 text-gray-700'}`}
                >
                  <div className="text-2xl mb-2">
                    {questionCategories[key as keyof typeof questionCategories].icon}
                  </div>
                  <span className="text-sm font-medium">{categoryName}</span>
                </button>
              ))}
            </div>
            
            <button
              onClick={startQuiz}
              disabled={selectedCategories.length === 0}
              className={`w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md`}
            >
              {t.startQuiz}
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (showResults) {
    return (
      <ResultsScreen 
        questions={filteredQuestions} 
        score={score} 
        onRestart={handleRestart}
      />
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          {/* Simple back button at top */}
          <button
            onClick={() => setQuizStarted(false)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.buttons.backToTools[lang]}
          </button>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 w-full">
            <div className="text-sm font-medium text-gray-700">
              {t.progress.question[lang]} {current + 1} {t.progress.of[lang]} {filteredQuestions.length}
            </div>
            <div className="text-sm font-medium text-gray-700">
              {Math.round(((current + 1) / filteredQuestions.length) * 100)}% {t.progress.completed[lang]}
            </div>
          </div>
          
          <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
            <div 
              className="h-2 rounded-full bg-blue-600 transition-all" 
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{question?.q}</h2>
          
          <div className="space-y-3 mb-6">
            {question?.options?.ES?.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelected(index)}
                className={`w-full text-left p-4 border rounded-lg transition-colors ${selected === index
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-gray-200 hover:border-blue-200 text-gray-700'}`}
              >
                {option}
              </button>
            ))}
          </div>
          
          {showExplanation && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-blue-800 mb-2">{t.quizResults.explanation}</h3>
              <p className="text-gray-900">{question?.explanation}</p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
            {current > 0 ? (
              <button
                onClick={() => setCurrent(prev => prev - 1)}
                className="flex items-center justify-center px-4 py-3 sm:px-6 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors shadow-sm w-full sm:w-auto"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                {t.buttons.back[lang]}
              </button>
            ) : (
              <div className="hidden sm:block" />
            )}

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  if (selected === -1) {
                    alert('Por favor selecciona una respuesta');
                    return;
                  }
                  handleNext();
                }}
                className="flex items-center justify-center px-4 py-3 sm:px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md w-full sm:w-auto"
              >
                {current < filteredQuestions.length - 1 ? t.buttons.next[lang] : t.buttons.viewResults[lang]}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              <button
                onClick={() => {
                  if (confirm('¿Seguro que quieres reiniciar el test? Se perderán tus respuestas.')) {
                    handleRestart();
                  }
                }}
                className="flex items-center justify-center px-4 py-3 bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200 transition-colors shadow-sm w-full sm:w-auto"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                {t.buttons.restart[lang]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
