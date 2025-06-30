"use client";

import { useState } from 'react';

const questions = [
  {
    q: '¿Qué significa la sigla "HTTPS"?',
    options: ['HyperText Transfer Process', 'HyperText Transfer Protocol Secure', 'High Transfer Protect System'],
    answer: 1,
  },
  {
    q: 'Una contraseña segura debe contener:',
    options: ['Solo letras', 'Letras y números', 'Letras, números y caracteres especiales'],
    answer: 2,
  },
  {
    q: '¿Qué es el phishing?',
    options: ['Un tipo de malware', 'Un intento de engañar para obtener información confidencial', 'Un firewall avanzado'],
    answer: 1,
  },
] as const;

export default function SecurityQuiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const question = questions[current];
  const progress = (current / questions.length) * 100;

  const handleNext = () => {
    if (selected === null) return;
    if (selected === question.answer) {
      setScore((prev) => (prev === null ? 1 : prev + 1));
    }
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      // finished
      if (selected === question.answer) {
        setScore((prev) => (prev === null ? 1 : prev));
      }
    }
  };

  if (score !== null && current === questions.length - 1 && selected !== null) {
    const finalScore = selected === question.answer ? score + 1 : score;
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-4 py-20 bg-white">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">Resultado</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Obtuviste {finalScore} de {questions.length} respuestas correctas.
        </p>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => {
            setCurrent(0);
            setScore(null);
            setSelected(null);
          }}
        >
          Reintentar
        </button>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-4 py-20 bg-white">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">Test de Ciberseguridad</h1>

      {/* Barra de progreso */}
      <div className="w-full max-w-xl mb-6">
        <div className="w-full bg-gray-200 h-2 rounded">
          <div className="h-2 rounded bg-blue-600" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="w-full max-w-xl border border-gray-200 rounded-2xl p-8 bg-gray-50 shadow">
        <p className="text-lg font-medium text-gray-800 mb-6">
          {current + 1}. {question.q}
        </p>
        <div className="space-y-4">
          {question.options.map((opt, idx) => (
            <label key={idx} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="option"
                className="mr-3 h-4 w-4 text-blue-600"
                checked={selected === idx}
                onChange={() => setSelected(idx)}
              />
              <span className="text-gray-700">{opt}</span>
            </label>
          ))}
        </div>
        <button
          className="mt-8 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          disabled={selected === null}
          onClick={handleNext}
        >
          {current + 1 === questions.length ? 'Finalizar' : 'Siguiente'}
        </button>
      </div>
    </main>
  );
}
