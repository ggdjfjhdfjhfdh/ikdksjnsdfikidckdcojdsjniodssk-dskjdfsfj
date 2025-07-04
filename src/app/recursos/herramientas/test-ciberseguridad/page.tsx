"use client";

import { useState, useEffect } from 'react';
import { Shield, Key, AlertTriangle, EyeOff, Smartphone, Wifi, HardDrive, ArrowLeft, ChevronDown, ArrowRight, RefreshCw, Share2, Copy, MessageSquare, Mail } from 'lucide-react';

interface Question {
  q: string;
  options: readonly string[];
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
  // FUNDAMENTOS
  {
    id: 1,
    category: 'fundamentals',
    q: '¿Qué principio exige otorgar solo los permisos estrictamente necesarios?',
    options: ['Segregación de funciones', 'Principio de mínimo privilegio', 'Control de acceso discrecional'],
    answer: 1,
    explanation: 'Limita el alcance de daño en caso de cuenta comprometida.'
  },
  {
    id: 2,
    category: 'fundamentals',
    q: '¿Qué diferencia hay entre vulnerabilidad y amenaza?',
    options: ['Ninguna, son sinónimos', 'Vulnerabilidad = debilidad; amenaza = actor/evento explotándola', 'Amenaza = fallo interno; vulnerabilidad = ataque externo'],
    answer: 1,
    explanation: 'Una amenaza explota una vulnerabilidad para causar impacto.'
  },
  {
    id: 18,
    category: 'fundamentals',
    q: '¿Qué es un «token OAuth» comprometido?',
    options: [
      'Una contraseña filtrada',
      'Un identificador que permite acceso a tu cuenta sin contraseña',
      'Un virus que bloquea tu sesión'
    ],
    answer: 1,
    explanation: 'Muchas apps de terceros usan tokens OAuth. Si filtran, un atacante puede acceder sin conocer tu contraseña.'
  },
  {
    id: 25,
    category: 'fundamentals',
    q: 'En “Zero Trust”, la verificación de identidad ocurre:',
    options: [
      'Solo al iniciar sesión',
      'De forma continua en cada petición',
      'Una vez al día'
    ],
    answer: 1,
    explanation: 'La red se considera insegura; se evalúa contexto y riesgo en tiempo real.'
  },
  // CONTRASEÑAS
  {
    id: 3,
    category: 'passwords',
    q: '¿Qué algoritmo de hash se recomienda hoy para guardar contraseñas?',
    options: ['MD5', 'SHA-256', 'Argon2id'],
    answer: 2,
    explanation: 'Argon2id (o, en su defecto, PBKDF2 con iteraciones altas) resiste ataques GPU.'
  },
  {
    id: 4,
    category: 'passwords',
    q: 'Para una contraseña, ¿qué aporta más entropía real?',
    options: ['Longitud', 'Símbolos especiales', 'Cambios frecuentes'],
    answer: 0,
    explanation: '16 caracteres aleatorios > 8 caracteres complejos.'
  },
  {
    id: 19,
    category: 'passwords',
    q: '¿Qué es una «passkey»?',
    options: [
      'Un archivo con todas tus contraseñas',
      'Un estándar FIDO2 que reemplaza a la contraseña usando criptografía de clave pública',
      'Una clave maestra del gestor de contraseñas'
    ],
    answer: 1,
    explanation: 'Passkeys funcionan con biometría o PIN local; la clave privada nunca sale del dispositivo.'
  },

  // PHISHING
  {
    id: 5,
    category: 'phishing',
    q: '¿Cuál es la señal más fiable de un correo de phishing?',
    options: ['Faltas de ortografía', 'Dominio del remitente alterado', 'Adjunto PDF'],
    answer: 1,
    explanation: 'Los atacantes clonan la apariencia, pero no el dominio exacto.'
  },
  {
    id: 6,
    category: 'phishing',
    q: '“Smishing” hace referencia a:',
    options: ['Phishing por SMS', 'Ingeniería social telefónica', 'Phishing en redes sociales'],
    answer: 0,
    explanation: 'Combina “SMS” + “phishing”.'
  },
  {
    id: 20,
    category: 'phishing',
    q: 'El término «BEC» se refiere a:',
    options: [
      'Business Email Compromise: fraude de transferencia bancaria',
      'Botnet Email Campaign: envío masivo de spam',
      'Binary Exploit Code: archivo adjunto malicioso'
    ],
    answer: 0,
    explanation: 'BEC suplanta ejecutivos o proveedores para cambiar cuentas bancarias.'
  },
  {
    id: 26,
    category: 'phishing',
    q: 'Un «kit de phishing» es:',
    options: [
      'Un paquete listo para clonar páginas y robar credenciales',
      'Una herramienta de antivirus',
      'Un informe de seguridad'
    ],
    answer: 0,
    explanation: 'Se vende en foros underground, incluye HTML, scripts y panel de credenciales.'
  },
  // PRIVACIDAD
  {
    id: 7,
    category: 'privacy',
    q: '¿Qué ajuste debes desactivar para evitar que te encuentren por tu número?',
    options: ['Búsqueda inversa', 'Sincronización de contactos', 'Estado de actividad'],
    answer: 1,
    explanation: 'Mantén desactivada la coincidencia de teléfono/e-mail en redes sociales.'
  },
  {
    id: 8,
    category: 'privacy',
    q: 'RGPD otorga dos derechos clave, uno es portabilidad. ¿Cuál es el otro?',
    options: ['Derecho al olvido', 'Right-to-repair', 'Derecho de réplica'],
    answer: 0,
    explanation: 'Puedes solicitar eliminación completa de tus datos personales.'
  },
  {
    id: 21,
    category: 'privacy',
    q: 'La huella digital “browser fingerprint” se basa en:',
    options: [
      'Datos combinados de navegador, OS, fuentes y extensiones',
      'Tu dirección IP solamente',
      'Cookies de sesión'
    ],
    answer: 0,
    explanation: 'Permite rastrear usuarios incluso con cookies bloqueadas.'
  },
  
  // DISPOSITIVOS
  {
    id: 9,
    category: 'devices',
    q: '¿Qué ventaja añade el cifrado de disco completo (BitLocker/FileVault)?',
    options: ['Evita cualquier malware', 'Protege datos si el equipo se roba', 'Acelera el rendimiento SSD'],
    answer: 1,
    explanation: 'Sin la clave, los datos son ilegibles aunque extraigan el disco.'
  },
  {
    id: 10,
    category: 'devices',
    q: '¿Qué es el “OEM Unlock” en Android?',
    options: ['Desbloquea la SIM', 'Permite abrir el bootloader', 'Activa modo desarrollador'],
    answer: 1,
    explanation: 'Al habilitarlo pierdes protección Verified Boot.'
  },
  {
    id: 22,
    category: 'devices',
    q: '¿Cuál es la función de «Secure Boot» en UEFI?',
    options: [
      'Arrancar más rápido el sistema',
      'Permitir solo software firmado durante el arranque',
      'Actualizar firmware del disco duro'
    ],
    answer: 1,
    explanation: 'Evita bootkits reemplazando el gestor de arranque por uno firmado.'
  },
  {
    id: 27,
    category: 'devices',
    q: '¿Qué estándar define la autenticación de huella digital y reconocimiento facial en la web?',
    options: [
      'WebAuthn/FIDO2',
      'OAuth 1.0',
      'OpenVPN'
    ],
    answer: 0,
    explanation: 'WebAuthn es parte de FIDO2 y permite autenticación sin contraseña con biometría o llave de hardware.',
  },
 
  // REDES
  {
    id: 11,
    category: 'networks',
    q: '¿Qué puerto TCP usa HTTPS por defecto?',
    options: ['80', '443', '22'],
    answer: 1,
    explanation: 'HTTP sin cifrar usa 80; SSH 22.'
  },
  {
    id: 12,
    category: 'networks',
    q: '¿Cuál es la diferencia clave entre IDS e IPS?',
    options: ['IDS bloquea; IPS solo avisa', 'IDS detecta; IPS detecta y bloquea', 'Ninguna'],
    answer: 1,
    explanation: 'IPS suele ir “en línea”, deteniendo tráfico malicioso.'
  },
  {
    id: 23,
    category: 'networks',
    q: '¿Qué protocolo cifra los nombres de dominio para evitar espionaje DNS?',
    options: [
      'DoH (DNS over HTTPS)',
      'FTP',
      'SNMPv2'
    ],
    answer: 0,
    explanation: 'DoH túnela las peticiones DNS sobre HTTPS 443.'
  },
  // BACKUPS
  {
    id: 13,
    category: 'backups',
    q: 'La regla 3-2-1-1-0 añade un “1” extra. ¿Qué significa?',
    options: ['Una copia incremental', 'Una copia inmutable / air-gapped', 'Un test anual'],
    answer: 1,
    explanation: 'Garantiza resistencia a ransomware.'
  },
  {
    id: 14,
    category: 'backups',
    q: '¿Con qué frecuencia debes probar una restauración de backups críticos?',
    options: ['Anual', 'Mensual', 'Nunca, si está automatizado'],
    answer: 1,
    explanation: 'Las pruebas detectan corrupciones y tiempos reales de recuperación.'
  },
  {
    id: 24,
    category: 'backups',
    q: '¿Qué es un snapshot inmutable?',
    options: [
      'Copia de solo lectura que no puede alterarse ni borrarse dentro del período definido',
      'Instantánea editable de un sistema',
      'Backup incremental diferencial'
    ],
    answer: 0,
    explanation: 'Protege contra ransomware que intenta cifrar o borrar backups.'
  },
  
  // BONUS FUNDAMENTOS
  {
    id: 15,
    category: 'fundamentals',
    q: '¿Qué es “Zero Trust”?',
    options: [
      'Red sin contraseñas',
      'Modelo que nunca confía y siempre verifica cada petición',
      'VPN corporativa permanente'
    ],
    answer: 1,
    explanation: 'Se asume que la red está comprometida; cada acceso requiere autenticación y evaluación continua.'
  }
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
              <p className="text-gray-900">{question.options[question.userAnswer || 0]}</p>
            </div>
            <div className="bg-green-50/80 p-4 rounded-lg border border-green-100">
              <p className="text-sm font-medium text-green-800 mb-1">Correcta:</p>
              <p className="text-gray-900">{question.options[question.answer]}</p>
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
  const correctPercentage = Math.round((score / questions.length) * 100);
  const [shareState, setShareState] = useState<'idle' | 'copying' | 'copied' | 'error'>('idle');
  const [showShareOptions, setShowShareOptions] = useState(false);

  const handleShare = async (method: 'clipboard' | 'whatsapp' | 'email' = 'clipboard') => {
    try {
      setShareState('copying');
      
      const resultText = `🔐 Resultado Test Ciberseguridad:\n\n${score}/${questions.length} (${correctPercentage}%)\n\n${correctPercentage >= 80 ? '¡Excelente! 🎉' : correctPercentage >= 60 ? '¡Buen trabajo! 👍' : '¡Sigue practicando! 💪'}\n\nRealiza tu propio test en: ${window.location.origin}/recursos/herramientas/test-ciberseguridad`;

      if (method === 'clipboard') {
        await navigator.clipboard.writeText(resultText);
      } else if (method === 'whatsapp') {
        window.open(`https://wa.me/?text=${encodeURIComponent(resultText)}`);
      } else if (method === 'email') {
        window.open(`mailto:?subject=Resultado Test Ciberseguridad&body=${encodeURIComponent(resultText)}`);
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Resultados</h1>
          <div className="text-4xl font-bold text-gray-800">
            {score}<span className="text-2xl text-gray-600">/{questions.length}</span>
          </div>
          <p className="text-gray-600 mt-2">
            {correctPercentage >= 80 ? '¡Excelente! 🎉' : 
             correctPercentage >= 60 ? '¡Buen trabajo! 👍' : 
             '¡Sigue practicando! 💪'}
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
  return [...array].sort(() => Math.random() - 0.5);
};

export default function SecurityQuiz() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(Object.keys(questionCategories));
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
    options: [],
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
    if (selectedCategories.length === 0) return;
    
    // Get questions from selected categories and shuffle them
    const categoryQuestions = questions.filter(q => selectedCategories.includes(q.category));
    const shuffledQuestions = shuffleArray(categoryQuestions).map((q, index) => ({
      ...q,
      questionNumber: index + 1,
      // Shuffle options but keep track of correct answer index
      options: shuffleArray(q.options),
      answer: q.options.indexOf(q.options[q.answer]) // Update answer index after shuffle
    }));
    
    setFilteredQuestions(shuffledQuestions);
    setQuizStarted(true);
    setCurrent(0);
    setSelected(-1);
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
    const shuffledQuestions = shuffleArray(categoryQuestions).map((q, index) => ({
      ...q,
      questionNumber: index + 1,
      options: shuffleArray(q.options),
      answer: q.options.indexOf(q.options[q.answer])
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
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Test de Ciberseguridad</h1>
            <p className="text-gray-600 mb-6">Selecciona las categorías que deseas incluir en el test:</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {Object.entries(questionCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => handleCategorySelect(key)}
                  className={`flex flex-col items-center p-4 rounded-lg border transition-all ${selectedCategories.includes(key) 
                    ? 'bg-blue-50 border-blue-300 text-blue-700' 
                    : 'bg-white border-gray-200 hover:border-blue-200 text-gray-700'}`}
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>
            
            <button
              onClick={startQuiz}
              disabled={selectedCategories.length === 0}
              className={`w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md`}
            >
              Comenzar Test
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
            className="mb-6 text-blue-600 hover:text-blue-800"
          >
            ← Volver
          </button>
          
          <div className="flex justify-between text-sm text-gray-600 mb-4">
            <span>Pregunta {safeCurrent + 1} de {filteredQuestions.length}</span>
            <span>{Math.round(progress)}% completado</span>
          </div>
          
          <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
            <div 
              className="h-2 rounded-full bg-blue-600 transition-all" 
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{question?.q}</h2>
          
          <div className="space-y-3 mb-6">
            {question?.options?.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => !showExplanation && setSelected(idx)}
                className={`w-full text-left p-4 rounded-lg border transition ${selected === idx 
                  ? showExplanation 
                    ? idx === question.answer 
                      ? 'bg-green-50 border-green-200 text-gray-900' 
                      : 'bg-red-50 border-red-200 text-gray-900'
                    : 'bg-blue-50 border-blue-200 text-gray-900'
                  : 'bg-white border-gray-200 hover:border-blue-200 text-gray-800'}`}
                disabled={showExplanation}
              >
                {opt}
              </button>
            ))}
          </div>
          
          {showExplanation && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-blue-800 mb-2">Explicación:</h3>
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
                Atrás
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
                {current < filteredQuestions.length - 1 ? 'Siguiente' : 'Ver resultados'}
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
                Reiniciar
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
