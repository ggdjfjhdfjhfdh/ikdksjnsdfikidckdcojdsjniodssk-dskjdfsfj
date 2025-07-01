'use client';

import { useState, useEffect } from 'react';
import { JSX } from 'react';
import { Shield, Lock, Key, Eye, EyeOff, AlertTriangle, HardDrive, Wifi, Smartphone } from 'lucide-react';

interface QuestionCategory {
  name: string;
  icon: JSX.Element;
}

const questionCategories: { [key: string]: QuestionCategory } = {
  basics: { name: 'Conceptos Básicos', icon: <Shield className="w-5 h-5" /> },
  passwords: { name: 'Contraseñas', icon: <Key className="w-5 h-5" /> },
  phishing: { name: 'Phishing', icon: <AlertTriangle className="w-5 h-5" /> },
  privacy: { name: 'Privacidad', icon: <EyeOff className="w-5 h-5" /> },
  devices: { name: 'Dispositivos', icon: <Smartphone className="w-5 h-5" /> },
  network: { name: 'Redes', icon: <Wifi className="w-5 h-5" /> },
  backups: { name: 'Copias de Seguridad', icon: <HardDrive className="w-5 h-5" /> }
};

interface DifficultyLevel {
  name: string;
  color: string;
}

const difficultyLevels: { [key: string]: DifficultyLevel } = {
  basic: { name: 'Básico', color: 'bg-green-100 text-green-800' },
  intermediate: { name: 'Intermedio', color: 'bg-blue-100 text-blue-800' },
  advanced: { name: 'Avanzado', color: 'bg-purple-100 text-purple-800' }
};

interface Question {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
  category: string;
  level: string;
}

const questions: Question[] = [
  // Nivel Básico
  {
    q: '¿Qué indica el candado en la barra de direcciones del navegador?',
    options: [
      'Que el sitio es oficial',
      'Que la conexión está cifrada',
      'Que el sitio no tiene publicidad'
    ],
    answer: 1,
    explanation: 'Indica que la conexión está cifrada con HTTPS, protegiendo los datos transmitidos.',
    category: 'basics',
    level: 'basic'
  },
  {
    q: '¿Qué significa la sigla "HTTPS"?',
    options: ['HyperText Transfer Process', 'HyperText Transfer Protocol Secure', 'High Transfer Protect System'],
    answer: 1,
    explanation: 'HTTPS significa HyperText Transfer Protocol Secure, que cifra la comunicación entre tu navegador y el sitio web.',
    category: 'basics',
    level: 'basic'
  },
  {
    q: '¿Qué es un ataque de "Man-in-the-Middle"?',
    options: ['Un virus que infecta archivos', 'Cuando un atacante intercepta comunicación entre dos partes', 'Un tipo de firewall'],
    answer: 1,
    explanation: 'Es cuando un atacante se posiciona entre dos partes que se comunican para interceptar o modificar los datos.',
    category: 'basics',
    level: 'basic'
  },
  {
    q: '¿Qué es la autenticación de dos factores (2FA)?',
    options: ['Una contraseña doble', 'Un método que requiere dos formas diferentes de verificar tu identidad', 'Un sistema de respaldo'],
    answer: 1,
    explanation: '2FA combina algo que sabes (contraseña) con algo que tienes (teléfono) o algo que eres (huella digital).',
    category: 'basics',
    level: 'basic'
  },
  {
    q: '¿Qué es un ataque DDoS?',
    options: ['Un virus que roba datos', 'Sobrecarga un sistema con tráfico falso', 'Un tipo de phishing'],
    answer: 1,
    explanation: 'Un ataque DDoS intenta hacer caer un servicio inundándolo con tráfico desde múltiples fuentes.',
    category: 'basics',
    level: 'intermediate'
  },
  
  // Nivel Intermedio  
  {
    q: '¿Qué deberías hacer si recibes un SMS con un enlace para "actualizar tu información bancaria"?',
    options: [
      'Hacer clic para verificar si es legítimo',
      'Eliminarlo inmediatamente',
      'Responder preguntando por más información'
    ],
    answer: 1,
    explanation: 'Es un intento de smishing. Nunca hagas clic en enlaces sospechosos.',
    category: 'phishing',
    level: 'intermediate'
  },
  {
    q: 'Recibes un email que parece de tu banco pidiendo credenciales. ¿Qué haces?',
    options: ['Respondo con mis datos', 'Verifico el remitente y llamo al banco', 'Hago clic en el enlace para verificar'],
    answer: 1,
    explanation: 'Los bancos nunca piden credenciales por email. Siempre verifica el remitente y contacta al banco directamente.',
    category: 'phishing',
    level: 'intermediate'
  },
  {
    q: '¿Cuál es una señal común de phishing?',
    options: ['Gramática y ortografía perfectas', 'Urgencia en el mensaje', 'Logos oficiales'],
    answer: 1,
    explanation: 'Los ataques de phishing suelen crear urgencia falsa para que actúes sin pensar.',
    category: 'phishing',
    level: 'intermediate'
  },
  {
    q: '¿Qué característica hace más segura una contraseña?',
    options: ['Longitud (12+ caracteres)', 'Usar información personal', 'Palabras del diccionario'],
    answer: 0,
    explanation: 'La longitud es el factor más importante. Una contraseña larga con múltiples tipos de caracteres es más segura.',
    category: 'passwords',
    level: 'basic'
  },
  
  // Nivel Avanzado
  {
    q: '¿Qué técnica usarías para proteger datos sensibles en una base de datos?',
    options: [
      'Encriptación AES-256',
      'Codificación Base64', 
      'Compresión ZIP con contraseña'
    ],
    answer: 0,
    explanation: 'AES-256 es un estándar de encriptación fuerte para proteger datos sensibles.',
    category: 'privacy',
    level: 'advanced'
  },
  {
    q: '¿Qué información deberías evitar compartir en redes sociales?',
    options: ['Tu comida favorita', 'Tu dirección exacta y fechas de viaje', 'Tus películas preferidas'],
    answer: 1,
    explanation: 'Información personal como ubicaciones y planes puede ser usada por atacantes.',
    category: 'privacy',
    level: 'advanced'
  },
  {
    q: '¿Qué es el spear phishing?',
    options: ['Phishing dirigido a individuos específicos', 'Phishing por SMS', 'Phishing con archivos adjuntos'],
    answer: 0,
    explanation: 'Spear phishing son ataques personalizados que usan información específica de la víctima.',
    category: 'phishing',
    level: 'intermediate'
  },
  {
    q: '¿Qué información es más sensible en redes sociales?',
    options: ['Tu ubicación en tiempo real', 'Tus intereses', 'Tu foto de perfil'],
    answer: 0,
    explanation: 'Compartir tu ubicación exacta en tiempo real puede comprometer tu seguridad física y digital.',
    category: 'privacy',
    level: 'basic'
  },
  {
    q: '¿Por qué es importante el borrado seguro de dispositivos?',
    options: ['Para liberar espacio', 'Para prevenir recuperación de datos', 'Para mejorar el rendimiento'],
    answer: 1,
    explanation: 'El borrado normal no elimina completamente los datos. El borrado seguro evita su recuperación.',
    category: 'devices',
    level: 'intermediate'
  },
  {
    q: '¿Qué hace más segura una red WiFi?',
    options: ['WPA3', 'WEP', 'Red abierta'],
    answer: 0,
    explanation: 'WPA3 es el estándar más seguro actualmente para redes WiFi.',
    category: 'network',
    level: 'basic'
  },
  {
    q: '¿Con qué frecuencia deberías probar tus backups?',
    options: ['Nunca', 'Cada 6-12 meses', 'Solo cuando los necesites'],
    answer: 1,
    explanation: 'Los backups deben probarse regularmente para asegurar su integridad.',
    category: 'backups',
    level: 'basic'
  },
  
  // 50+ additional questions...
];

interface ResultsProps {
  score: number;
  questions: typeof questions;
  answers: number[];
}

const Results = ({ score, questions, answers }: ResultsProps) => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold">Resultado: {score}%</h3>
    
    {answers.map((answer: number, idx: number) => (
      answer !== questions[idx].answer && (
        <div key={idx} className="p-4 bg-red-50 rounded-lg">
          <p className="font-medium">Pregunta: {questions[idx].q}</p>
          <p>Tu respuesta: {questions[idx].options[answer]}</p>
          <p>Respuesta correcta: {questions[idx].options[questions[idx].answer]}</p>
          <p className="text-sm mt-2">Explicación: {questions[idx].explanation}</p>
        </div>
      )
    ))}
  </div>
);

export default function SecurityQuiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(Object.keys(questionCategories));
  const [quizStarted, setQuizStarted] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  
  const filteredQuestions = questions.filter(q => selectedCategories.includes(q.category));
  const question = filteredQuestions[current];
  const progress = (current / filteredQuestions.length) * 100;

  const handleNext = () => {
    if (selected === null) return;
    
    if (selected === question.answer) {
      setScore(prev => (prev === null ? 1 : prev + 1));
    }
    
    setAnswers(prev => [...prev, selected]);
    
    setShowExplanation(true);
  };

  const handleContinue = () => {
    setShowExplanation(false);
    setSelected(null);
    
    if (current + 1 < filteredQuestions.length) {
      setCurrent(current + 1);
    } else {
      // Quiz completed
      setCurrent(filteredQuestions.length);
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelected(null);
      setShowExplanation(false);
    }
  };

  if (!quizStarted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Test de Ciberseguridad</h1>
          <p className="text-gray-700 mb-8 text-center">
            Evalúa tus conocimientos sobre seguridad digital con este test interactivo.
            Selecciona las categorías que deseas incluir:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {Object.entries(questionCategories).map(([key, { name, icon }]) => (
              <label key={key} className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(key)}
                  onChange={() => {
                    setSelectedCategories(prev => 
                      prev.includes(key)
                        ? prev.filter(cat => cat !== key)
                        : [...prev, key]
                    );
                  }}
                  className="h-5 w-5 text-blue-600"
                />
                <div className="flex items-center space-x-2">
                  {icon}
                  <span>{name}</span>
                </div>
              </label>
            ))}
          </div>
          
          <button
            onClick={() => setQuizStarted(true)}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            disabled={selectedCategories.length === 0}
          >
            Comenzar Test
          </button>
        </div>
      </main>
    );
  }

  if (current >= filteredQuestions.length) {
    const finalScore = score || 0;
    const percentage = Math.round((finalScore / filteredQuestions.length) * 100);
    
    return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Resultados</h1>
          
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div 
              className="h-4 rounded-full" 
              style={{
                width: `${percentage}%`,
                backgroundColor: 
                  percentage >= 75 ? '#10B981' : 
                  percentage >= 50 ? '#F59E0B' : '#EF4444'
              }}
            />
          </div>
          
          <p className="text-xl text-gray-700 mb-2">
            Puntuación: {finalScore} de {filteredQuestions.length}
          </p>
          <p className="text-lg mb-6">
            {percentage >= 75 ? '¡Excelente! Eres muy consciente de la seguridad.' :
             percentage >= 50 ? 'Buen trabajo, pero hay espacio para mejorar.' :
             'Considera aprender más sobre seguridad digital.'}
          </p>
          
          <Results score={percentage} questions={filteredQuestions} answers={answers} />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setCurrent(0);
                setScore(null);
                setSelected(null);
                setQuizStarted(false);
                setAnswers([]);
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Volver a Intentar
            </button>
            <button
              onClick={() => {
                setCurrent(0);
                setScore(null);
                setSelected(null);
                setAnswers([]);
              }}
              className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
            >
              Repetir con Mismas Categorías
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-700 mb-1">
            <span>Pregunta {current + 1} de {filteredQuestions.length}</span>
            <span>{Math.round(progress)}% completado</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div 
              className="h-2 rounded-full bg-blue-600" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex justify-between gap-4 mb-6">
          <button
            onClick={handlePrevious}
            disabled={current === 0}
            className={`px-4 py-2 rounded-lg ${current === 0 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            Anterior
          </button>
          <button
            onClick={() => {
              setCurrent(0);
              setScore(null);
              setSelected(null);
              setAnswers([]);
              setShowExplanation(false);
            }}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Reiniciar Test
          </button>
        </div>
        
        {/* Question */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${difficultyLevels[question.level].color}`}>
              {difficultyLevels[question.level].name}
            </span>
            {questionCategories[question.category].icon}
            <span className="text-sm font-medium text-blue-600">
              {questionCategories[question.category].name}
            </span>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-6">{question.q}</h2>
          
          <div className="space-y-3">
            {question.options.map((opt, idx) => (
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
        </div>
        
        {/* Explanation */}
        {showExplanation && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
            <h3 className="font-medium text-blue-800 mb-2">Explicación:</h3>
            <p className="text-blue-700">{question.explanation}</p>
          </div>
        )}
        
        {/* Navigation */}
        <button
          onClick={showExplanation ? handleContinue : handleNext}
          className={`w-full py-3 rounded-lg font-medium ${showExplanation 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : selected === null 
              ? 'bg-gray-300 text-gray-700 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'} transition`}
          disabled={!showExplanation && selected === null}
        >
          {showExplanation 
            ? current + 1 === filteredQuestions.length ? 'Ver Resultados' : 'Continuar'
            : current + 1 === filteredQuestions.length ? 'Finalizar Test' : 'Siguiente Pregunta'}
        </button>
      </div>
    </main>
  );
}
