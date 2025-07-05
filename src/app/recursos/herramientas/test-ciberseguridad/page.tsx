"use client";

import { useState, useEffect } from 'react';
import { Shield, Key, AlertTriangle, EyeOff, Smartphone, Wifi, HardDrive, ArrowLeft, ChevronDown, ArrowRight, RefreshCw, Share2, Copy, MessageSquare, Mail, Check, X } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { securityQuizTranslations } from '@/lib/securityQuizTranslations';

interface Question {
  q: {
    ES: string;
    EN: string;
  };
  options: {
    ES: string[];
    EN: string[];
  };
  answer: number;
  explanation: {
    ES: string;
    EN: string;
  };
  category: CategoryKey;
  userAnswer?: number;
  questionNumber?: number;
  id: number; // Assuming questions have unique IDs
}

type CategoryKey = 'fundamentals' | 'passwords' | 'phishing' | 'privacy' | 'devices' | 'networks' | 'backups';

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
    q: {
      ES: '¿Qué principio prescribe otorgar únicamente los permisos imprescindibles para desempeñar una tarea?',
      EN: 'What principle prescribes granting only the necessary permissions to perform a task?'
    },
    options: {
      ES: ['Segregación de funciones', 'Principio de mínimo privilegio', 'Defensa en profundidad'],
      EN: ['Segregation of duties', 'Principle of least privilege', 'Defense in depth']
    },
    answer: 1,
    explanation: {
      ES: 'Al limitar los privilegios se reduce la superficie de ataque y se acota el daño si una cuenta se ve comprometida.',
      EN: 'By limiting privileges, the attack surface is reduced and the damage is limited if an account is compromised.'
    },
  },
  {
    id: 2,
    category: 'fundamentals',
    q: {
      ES: '¿Cuál es la diferencia entre una vulnerabilidad y una amenaza?',
      EN: 'What is the difference between a vulnerability and a threat?'
    },
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
    explanation: {
      ES: 'La amenaza aprovecha la vulnerabilidad para provocar impacto sobre la confidencialidad, integridad o disponibilidad.',
      EN: 'The threat exploits the vulnerability to cause impact on confidentiality, integrity, or availability.'
    },
  },
  {
    id: 18,
    category: 'fundamentals',
    q: {
      ES: '¿Por qué es crítico que se filtre un token OAuth?',
      EN: 'Why is it critical that an OAuth token is leaked?'
    },
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
    explanation: {
      ES: 'Muchos servicios de terceros usan tokens OAuth: con el token, un atacante actúa como el usuario sin conocer la contraseña; revócalo de inmediato en el proveedor.',
      EN: 'Many third-party services use OAuth tokens: with the token, an attacker acts as the user without knowing the password; revoke it immediately in the provider.'
    },
  },
  {
    id: 25,
    category: 'fundamentals',
    q: {
      ES: 'En un modelo «Zero Trust» la verificación de identidad y contexto de riesgo se realiza:',
      EN: 'In a «Zero Trust» model, identity and risk context verification is performed:'
    },
    options: {
      ES: ['Solo al iniciar sesión', 'De forma continua para cada petición', 'Una vez al día'],
      EN: ['Only at login', 'Continuously for each request', 'Once a day'],
    },
    answer: 1,
    explanation: {
      ES: 'La red se considera hostil por defecto; cada solicitud se valida en tiempo real',
      EN: 'The network is considered hostile by default; each request is validated in real-time'
    }
  },

  /* ────────── CONTRASEÑAS ────────── */
  {
    id: 3,
    category: 'passwords',
    q: {
      ES: '¿Qué algoritmo de hash se recomienda actualmente para almacenar contraseñas?',
      EN: 'What hash algorithm is currently recommended for storing passwords?'
    },
    options: {
      ES: ['MD5', 'SHA-256', 'Argon2id'],
      EN: ['MD5', 'SHA-256', 'Argon2id'],
    },
    answer: 2,
    explanation: {
      ES: 'Argon2id —con parámetros exigentes (memoryCost ≥ 2¹⁶ KB, timeCost ≥ 3)— o, en su defecto, PBKDF2 con iteraciones altas, mitiga ataques de fuerza bruta acelerados por GPU/ASIC.',
      EN: 'Argon2id —with demanding parameters (memoryCost ≥ 2¹⁶ KB, timeCost ≥ 3)— or, alternatively, PBKDF2 with high iterations, mitigates brute-force attacks accelerated by GPU/ASIC.'
    },
  },
  {
    id: 4,
    category: 'passwords',
    q: {
      ES: '¿Qué factor aporta más entropía real a una contraseña?',
      EN: 'What factor adds more real entropy to a password?'
    },
    options: {
      ES: ['Longitud', 'Símbolos especiales', 'Cambios frecuentes'],
      EN: ['Length', 'Special characters', 'Frequent changes'],
    },
    answer: 0,
    explanation: {
      ES: 'Una cadena aleatoria (no frase de diccionario) de 16+ caracteres es mucho más resistente que 8 caracteres “complejos”.',
      EN: 'A random string (not a dictionary phrase) of 16+ characters is much more resistant than 8 “complex” characters.'
    },
  },
  {
    id: 19,
    category: 'passwords',
    q: {
      ES: '¿Qué es exactamente una «passkey»?',
      EN: 'What is exactly a «passkey»?'
    },
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
    explanation: {
      ES: 'La clave privada permanece en el dispositivo y se desbloquea (biometría/PIN); el servidor solo recibe la clave pública.',
      EN: 'The private key remains on the device and is unlocked (biometrics/PIN); the server only receives the public key.'
    },
  },

  /* ────────── PHISHING ────────── */
  {
    id: 5,
    category: 'phishing',
    q: {
      ES: '¿Cuál suele ser el indicio técnico más fiable de un correo de phishing?',
      EN: 'What is usually the most reliable technical indication of a phishing email?'
    },
    options: {
      ES: ['Errores ortográficos', 'Dominio del remitente ligeramente alterado (typosquatting)', 'Adjunto PDF'],
      EN: ['Spelling errors', 'Slightly altered sender domain (typosquatting)', 'PDF attachment'],
    },
    answer: 1,
    explanation: {
      ES: 'La apariencia visual puede clonarse, pero el dominio legítimo no; pequeños cambios (p. ej. “rnicrosoft.com”) delatan el fraude.',
      EN: 'The visual appearance can be cloned, but the legitimate domain cannot; small changes (e.g. “rnicrosoft.com”) reveal the fraud.'
    },
  },
  {
    id: 6,
    category: 'phishing',
    q: {
      ES: 'El término «smishing» hace referencia a:',
      EN: 'The term «smishing» refers to:'
    },
    options: {
      ES: ['Phishing por SMS', 'Ingeniería social telefónica', 'Phishing en redes sociales'],
      EN: ['SMS phishing', 'Phone social engineering', 'Social media phishing'],
    },
    answer: 0,
    explanation: {
      ES: 'Combinación de “SMS” + “phishing”; incluye mensajes RCS y otras apps de mensajería que se comportan como SMS.',
      EN: 'Combination of “SMS” + “phishing”; includes RCS messages and other messaging apps that behave like SMS.'
    },
  },
  {
    id: 20,
    category: 'phishing',
    q: {
      ES: '«BEC» significa:',
      EN: '«BEC» means:'
    },
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
    explanation: {
      ES: 'El atacante suplanta a ejecutivos o proveedores y convence al personal de finanzas para modificar datos bancarios.',
      EN: 'The attacker impersonates executives or suppliers and convinces the finance staff to modify banking data.'
    },
  },
  {
    id: 26,
    category: 'phishing',
    q: {
      ES: 'Un «kit de phishing» es:',
      EN: 'A «phishing kit» is:'
    },
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
    explanation: {
      ES: 'Incluye HTML, scripts y panel de control; se vende en foros clandestinos y facilita a novatos montar campañas.',
      EN: 'It includes HTML, scripts, and a control panel; it is sold in clandestine forums and facilitates novice campaigns.'
    },
  },

  /* ────────── PRIVACIDAD ────────── */
  {
    id: 7,
    category: 'privacy',
    q: {
      ES: 'Para evitar que desconocidos localicen tu perfil a partir de tu número de teléfono, debes desactivar:',
      EN: 'To prevent strangers from finding your profile from your phone number, you should disable:'
    },
    options: {
      ES: ['Búsqueda inversa', 'Sincronización o coincidencia de contactos', 'Estado de actividad'],
      EN: ['Reverse search', 'Contact synchronization or matching', 'Activity status'],
    },
    answer: 1,
    explanation: {
      ES: 'Al impedir la coincidencia de contactos, evitas que alguien cargue tu número y encuentre tu cuenta.',
      EN: 'By preventing contact matching, you prevent someone from loading your number and finding your account.'
    },
  },
  {
    id: 8,
    category: 'privacy',
    q: {
      ES: 'El RGPD reconoce el derecho a la portabilidad y el derecho a:',
      EN: 'The GDPR recognizes the right to portability and the right to:'
    },
    options: {
      ES: ['Ser olvidado (supresión de datos)', 'Right-to-repair', 'Derecho de réplica'],
      EN: ['Be forgotten (data erasure)', 'Right-to-repair', 'Right of reply'],
    },
    answer: 0,
    explanation: {
      ES: 'Puedes exigir que la organización elimine todos tus datos personales cuando deje de tener base legal para tratarlos.',
      EN: 'You can demand that the organization delete all your personal data when it no longer has a legal basis for processing them.'
    },
  },
  {
    id: 21,
    category: 'privacy',
    q: {
      ES: 'La técnica de «browser fingerprinting» se basa en:',
      EN: 'The «browser fingerprinting» technique is based on:'
    },
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
    explanation: {
      ES: 'El conjunto de parámetros crea un identificador casi único, incluso con cookies bloqueadas.',
      EN: 'The set of parameters creates a nearly unique identifier, even with cookies blocked.'
    },
  },

  /* ────────── DISPOSITIVOS ────────── */
  {
    id: 9,
    category: 'devices',
    q: {
      ES: '¿Qué ventaja principal aporta el cifrado de disco completo (BitLocker/FileVault)?',
      EN: 'What is the main advantage of full disk encryption (BitLocker/FileVault)?'
    },
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
    explanation: {
      ES: 'Sin la clave de descifrado, los datos permanecen ilegibles aunque extraigan físicamente el disco.',
      EN: 'Without the decryption key, the data remains unreadable even if the disk is physically extracted.'
    },
  },
  {
    id: 10,
    category: 'devices',
    q: {
      ES: 'Activar «OEM Unlock» en Android permite:',
      EN: 'Enabling «OEM Unlock» on Android allows:'
    },
    options: {
      ES: ['Desbloquear la SIM', 'Abrir el bootloader', 'Activar el modo desarrollador'],
      EN: ['Unlock the SIM', 'Unlock the bootloader', 'Activate developer mode'],
    },
    answer: 1,
    explanation: {
      ES: 'Al desbloquear el bootloader se desactiva Verified Boot y aumenta el riesgo de firmware malicioso.',
      EN: 'By unlocking the bootloader, Verified Boot is disabled and the risk of malicious firmware increases.'
    },
  },
  {
    id: 22,
    category: 'devices',
    q: {
      ES: 'La función de «Secure Boot» en sistemas UEFI es:',
      EN: 'The «Secure Boot» function in UEFI systems is:'
    },
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
    explanation: {
      ES: 'Evita que bootkits sustituyan el gestor de arranque por cargadores de arranque no firmados.',
      EN: 'It prevents bootkits from replacing the boot manager with unsigned bootloaders.'
    },
  },
  {
    id: 27,
    category: 'devices',
    q: {
      ES: '¿Qué estándar habilita autenticación web mediante huella digital o reconocimiento facial sin contraseña?',
      EN: 'What standard enables web authentication using fingerprint or facial recognition without a password?'
    },
    options: {
      ES: ['WebAuthn / FIDO2', 'OAuth 1.0', 'OpenVPN'],
      EN: ['WebAuthn / FIDO2', 'OAuth 1.0', 'OpenVPN'],
    },
    answer: 0,
    explanation: {
      ES: 'WebAuthn, parte de FIDO2, usa criptografía de clave pública y factores locales (biometría, llave de hardware).',
      EN: 'WebAuthn, part of FIDO2, uses public key cryptography and local factors (biometrics, hardware key).'
    },
  },

  /* ────────── REDES ────────── */
  {
    id: 11,
    category: 'networks',
    q: {
      ES: '¿Qué puerto TCP utiliza HTTPS por defecto?',
      EN: 'What TCP port does HTTPS use by default?'
    },
    options: {
      ES: ['80', '443', '22'],
      EN: ['80', '443', '22'],
    },
    answer: 1,
    explanation: {
      ES: 'HTTP sin cifrar usa 80 y SSH utiliza 22.',
      EN: 'Unencrypted HTTP uses 80 and SSH uses 22.'
    },
  },
  {
    id: 12,
    category: 'networks',
    q: {
      ES: '¿Cuál es la diferencia clave entre un IDS y un IPS?',
      EN: 'What is the key difference between an IDS and an IPS?'
    },
    options: {
      ES: ['IDS bloquea y IPS solo alerta', 'IDS detecta; IPS detecta y bloquea', 'No hay diferencia'],
      EN: ['IDS blocks and IPS only alerts', 'IDS detects; IPS detects and blocks', 'No difference'],
    },
    answer: 1,
    explanation: {
      ES: 'El IPS se coloca «en línea» y puede descartar tráfico malicioso en tiempo real.',
      EN: 'The IPS is placed «in-line» and can discard malicious traffic in real-time.'
    },
  },
  {
    id: 23,
    category: 'networks',
    q: {
      ES: '¿Qué protocolo cifra las consultas de nombres de dominio para impedir el espionaje DNS?',
      EN: 'What protocol encrypts domain name queries to prevent DNS snooping?'
    },
    options: {
      ES: ['DoH (DNS over HTTPS)', 'FTP', 'SNMPv2'],
      EN: ['DoH (DNS over HTTPS)', 'FTP', 'SNMPv2'],
    },
    answer: 0,
    explanation: {
      ES: 'DoH encapsula las peticiones DNS dentro de HTTPS en el puerto 443; DoT (DNS over TLS) es otra opción popular, aunque menos adoptada por los navegadores.',
      EN: 'DoH encapsulates DNS requests within HTTPS on port 443; DoT (DNS over TLS) is another popular option, although less adopted by browsers.'
    },
  },

  /* ────────── BACKUPS ────────── */
  {
    id: 13,
    category: 'backups',
    q: {
      ES: 'En la regla 3-2-1-1-0, el «1» adicional significa:',
      EN: 'In the 3-2-1-1-0 rule, the additional «1» means:'
    },
    options: {
      ES: ['Backup incremental', 'Copia inmutable o aislada (air-gapped)', 'Test anual'],
      EN: ['Incremental backup', 'Immutable or isolated copy (air-gapped)', 'Annual test'],
    },
    answer: 1,
    explanation: {
      ES: 'Una copia inmutable/off-line evita que el ransomware cifre o borre las copias de seguridad.',
      EN: 'An immutable/off-line copy prevents ransomware from encrypting or deleting backups.'
    },
  },
  {
    id: 14,
    category: 'backups',
    q: {
      ES: '¿Con qué frecuencia debería probarse la restauración de los backups críticos?',
      EN: 'How often should critical backup restoration be tested?'
    },
    options: {
      ES: ['Anualmente', 'Trimestralmente', 'Nunca, si está automatizado'],
      EN: ['Annually', 'Quarterly', 'Never, if automated'],
    },
    answer: 1,
    explanation: {
      ES: 'Las pruebas trimestrales detectan corrupciones y verifican los tiempos reales de recuperación (RTO/RPO).',
      EN: 'Quarterly tests detect corruption and verify actual recovery times (RTO/RPO).'
    },
  },
  {
    id: 24,
    category: 'backups',
    q: {
      ES: 'Un «snapshot inmutable» es:',
      EN: 'An «immutable snapshot» is:'
    },
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
    explanation: {
      ES: 'Proporciona resistencia frente a ransomware y borrados accidentales.',
      EN: 'It provides resistance against ransomware and accidental deletions.'
    },
  },

  /* ────────── BONUS FUNDAMENTOS ────────── */
  {
    id: 15,
    category: 'fundamentals',
    q: {
      ES: 'Definición concisa de «Zero Trust»:',
      EN: 'Concise definition of «Zero Trust»:'
    },
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
    explanation: {
      ES: 'Asume compromiso interno y externo; combina autenticación fuerte + microsegmentación + análisis continuo',
      EN: 'It assumes internal and external compromise; combines strong authentication + microsegmentation + continuous analysis'
    }
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
              <p className="text-gray-900">{question.options.ES[question.userAnswer as number]}</p>
            </div>
            <div className="bg-green-50/80 p-4 rounded-lg border border-green-100">
              <p className="text-sm font-medium text-green-800 mb-1">Correcta:</p>
              <p className="text-gray-900">{question.options.ES[question.answer]}</p>
            </div>
          </div>
          
          <div className="bg-blue-50/80 p-4 rounded-lg border border-blue-100">
            <p className="text-sm font-medium text-blue-800 mb-1">Explicación:</p>
            <p className="text-gray-900">{question.explanation.ES}</p>
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
  const t = securityQuizTranslations[lang as 'ES' | 'EN'];
  
  const percentage = Math.round((score / questions.length) * 100);
  const performanceMessage = 
    percentage >= 90 ? t.results.excellent[lang as 'ES' | 'EN'] :
    percentage >= 70 ? t.results.good[lang as 'ES' | 'EN'] :
    percentage >= 50 ? t.results.average[lang as 'ES' | 'EN'] : t.results.needsImprovement[lang as 'ES' | 'EN'];

  const handleShare = async () => {
    try {
      const shareData: ShareData = {
        title: String(t.pageTitle[lang as keyof typeof t.pageTitle]),
        text: `${String(t.results.yourScore[lang as keyof typeof t.results.yourScore])}: ${score} ${String(t.results.outOf[lang as keyof typeof t.results.outOf])} ${questions.length} (${percentage}%)`,
        url: window.location.href
      };
      
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`);
        alert(t.results.shareSuccess[lang as keyof typeof t.results.shareSuccess]);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="w-full bg-white min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl p-8 shadow-lg border border-gray-100">
        {/* Score Display */}
        <div className="text-center mb-8">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <path
                d="M50 10
                  a 40 40 0 0 1 0 80
                  a 40 40 0 0 1 0 -80"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="8"
              />
              <path
                d="M50 10
                  a 40 40 0 0 1 0 80
                  a 40 40 0 0 1 0 -80"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="8"
                strokeDasharray={`${percentage}, 100`}
              />
              <text 
                x="50" 
                y="55" 
                textAnchor="middle" 
                className="text-3xl font-bold fill-gray-800"
                dominantBaseline="middle"
              >
                {percentage}%
              </text>
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.results.yourScore[lang as 'ES' | 'EN']}</h2>
          <p className="text-lg text-gray-600 mb-4">
            {score} {t.results.outOf[lang as 'ES' | 'EN']} {questions.length} {t.results.questionsCorrect[lang as 'ES' | 'EN']}
          </p>
          <div className="inline-block px-4 py-2 bg-blue-50 rounded-full">
            <p className="text-blue-600 font-medium">{performanceMessage}</p>
          </div>
        </div>

        {/* Questions Review */}
        <div className="space-y-4 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{t.results.reviewQuestions[lang as 'ES' | 'EN']}</h3>
          
          {questions.map((q, index) => (
            <div 
              key={q.id} 
              className={`p-6 rounded-lg ${q.userAnswer === q.answer 
                ? 'bg-green-50 border border-green-100' 
                : 'bg-red-50 border border-red-100'}`}
            >
              <div className="flex items-start">
                <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mr-3 ${q.userAnswer === q.answer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {q.userAnswer === q.answer ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-gray-800">{q.q[lang as 'ES' | 'EN']}</h4>
                  
                  <div className="mt-3 space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{t.results.yourAnswer[lang as 'ES' | 'EN']}:</p>
                      <p className={`${q.userAnswer === q.answer ? 'text-green-700' : 'text-red-700'} font-medium`}>
                        {q.options[lang as 'ES' | 'EN'][q.userAnswer ?? -1]}
                      </p>
                    </div>
                    
                    {q.userAnswer !== q.answer && (
                      <div>
                        <p className="text-sm font-medium text-gray-500">{t.results.correctAnswer[lang as 'ES' | 'EN']}:</p>
                        <p className="text-green-700 font-medium">
                          {q.options[lang as 'ES' | 'EN'][q.answer]}
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">{t.results.explanation[lang as 'ES' | 'EN']}:</p>
                      <p className="text-gray-700">{q.explanation[lang as 'ES' | 'EN']}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={onRestart}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors shadow-md flex items-center justify-center"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            {t.buttons.restart[lang as 'ES' | 'EN']}
          </button>
          
          <button 
            onClick={handleShare}
            className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-8 rounded-lg transition-colors shadow-sm border border-gray-300 flex items-center justify-center"
          >
            <Share2 className="w-5 h-5 mr-2" />
            {t.buttons.share[lang as 'ES' | 'EN']}
          </button>
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

export default function SecurityQuizPage() {
  const { lang } = useLanguage();
  const t = securityQuizTranslations[lang as 'ES' | 'EN'];

  const categories: Record<CategoryKey, string> = {
    fundamentals: t.categories.fundamentals,
    passwords: t.categories.passwords,
    phishing: t.categories.phishing,
    privacy: t.categories.privacy,
    devices: t.categories.devices,
    networks: t.categories.networks,
    backups: t.categories.backups
  } as const;

  const [selectedCategories, setSelectedCategories] = useState<CategoryKey[]>(Object.keys(categories) as CategoryKey[]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number>(-1);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState(questions.filter(q => selectedCategories.includes(q.category as CategoryKey)));
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
    q: {
      ES: 'Pregunta no disponible',
      EN: 'Question not available'
    },
    options: { ES: [], EN: [] },
    answer: 0,
    explanation: {
      ES: '',
      EN: ''
    },
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

  const handleCategorySelect = (category: CategoryKey) => {
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
    updatedQuestions[current as number] = {
      ...updatedQuestions[current as number],
      userAnswer: selected
    };
    
    // Update state with answered question
    setFilteredQuestions(updatedQuestions);
    
    // Update main questions array to track all answers
    setAllQuestions(prev => {
      const newQuestions = [...prev];
      const questionId = filteredQuestions[current as number].id; // Assuming questions have unique IDs
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
                  onClick={() => handleCategorySelect(key as CategoryKey)}
                  className={`flex flex-col items-center justify-center p-4 border rounded-lg transition-colors ${selectedCategories.includes(key as CategoryKey)
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
            {t.buttons.backToTools[lang as 'ES' | 'EN']}
          </button>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 w-full">
            <div className="text-sm font-medium text-gray-700">
              {t.progress.question[lang as 'ES' | 'EN']} {current + 1} {t.progress.of[lang as 'ES' | 'EN']} {filteredQuestions.length}
            </div>
            <div className="text-sm font-medium text-gray-700">
              {Math.round(((current + 1) / filteredQuestions.length) * 100)}% {t.progress.completed[lang as 'ES' | 'EN']}
            </div>
          </div>
          
          <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
            <div 
              className="h-2 rounded-full bg-blue-600 transition-all" 
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{filteredQuestions[current as number].q[lang as 'ES' | 'EN']}</h2>
          
          <div className="space-y-3 mb-6">
            {filteredQuestions[current as number].options[lang as 'ES' | 'EN'].map((option, index) => (
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
              <h3 className="font-medium text-blue-800 mb-2">{t.quizResults.explanation[lang as 'ES' | 'EN']}</h3>
              <p className="text-gray-900">{filteredQuestions[current as number].explanation[lang as 'ES' | 'EN']}</p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
            {current > 0 ? (
              <button
                onClick={() => setCurrent(prev => prev - 1)}
                className="flex items-center justify-center px-4 py-3 sm:px-6 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors shadow-sm w-full sm:w-auto"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                {t.buttons.back[lang as 'ES' | 'EN']}
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
                className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md w-full sm:w-auto"
              >
                {current < filteredQuestions.length - 1 ? t.buttons.next[lang as 'ES' | 'EN'] : t.buttons.viewResults[lang as 'ES' | 'EN']}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              <button
                onClick={() => {
                  if (confirm('¿Seguro que quieres reiniciar el test? Se perderán tus respuestas.')) {
                    handleRestart();
                  }
                }}
                className="flex items-center justify-center px-4 py-3 bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200 transition-colors shadow-sm border border-gray-300 w-full sm:w-auto"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                {t.buttons.restart[lang as 'ES' | 'EN']}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
