"use client";

import Link from 'next/link';
import { Guia } from '@/data/guias';

interface Props {
  guia: Guia;
}

export default function GuiaCard({ guia }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="text-4xl mb-4">{guia.icono}</div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
            {guia.categoria}
          </span>
          <span className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-800 rounded-full">
            {guia.nivel}
          </span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{guia.titulo}</h2>
        <p className="text-gray-600 mb-4">{guia.descripcion}</p>
        <Link
          href={guia.ruta}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          Ver guía completa
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
