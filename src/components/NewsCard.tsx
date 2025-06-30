'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface NewsCardProps {
  title: string;
  rewrittenTitle?: string;
  category?: string;
  date: string;
  description: string;
  content: string;
  url: string;
  slug: string;
}

export default function NewsCard(props: NewsCardProps) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-white shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all min-h-[260px] flex flex-col justify-between mb-8"
    >
      <div className="p-4 md:p-8 flex flex-col h-full gap-4">
        <div className="flex justify-between items-center mb-3">
          {/* Etiqueta de categoría con icono y color dinámico */}
          {(() => {
            const category = (props.category || 'Otros').toLowerCase();
            const categoryMap: Record<string, { label: string; color: string; icon: React.ReactElement }> = {
              'malware': {
                label: 'Malware',
                color: 'bg-purple-100 text-purple-800',
                icon: <svg className="h-4 w-4 mr-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.364-7.364l-1.414 1.414M7.05 16.95l-1.414 1.414m12.728 0l-1.414-1.414M7.05 7.05L5.636 5.636" /></svg>
              },
              'vulnerabilidades': {
                label: 'Vulnerabilidades',
                color: 'bg-yellow-100 text-yellow-800',
                icon: <svg className="h-4 w-4 mr-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 5c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              },
              'ataques': {
                label: 'Ataques',
                color: 'bg-red-100 text-red-800',
                icon: <svg className="h-4 w-4 mr-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-1.414 1.414M5.636 18.364l-1.414-1.414M12 8v4l3 3" /></svg>
              },
              'brechas de datos': {
                label: 'Brechas de datos',
                color: 'bg-pink-100 text-pink-800',
                icon: <svg className="h-4 w-4 mr-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 4v16" /></svg>
              },
              'regulación': {
                label: 'Regulación',
                color: 'bg-green-100 text-green-800',
                icon: <svg className="h-4 w-4 mr-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></svg>
              },
              'infraestructura crítica': {
                label: 'Infraestructura crítica',
                color: 'bg-blue-100 text-blue-800',
                icon: <svg className="h-4 w-4 mr-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M9 21h6M4 6h16M8 17h8" /></svg>
              },
              'empresas': {
                label: 'Empresas',
                color: 'bg-gray-100 text-gray-800',
                icon: <svg className="h-4 w-4 mr-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></svg>
              },
              'tecnología': {
                label: 'Tecnología',
                color: 'bg-cyan-100 text-cyan-800',
                icon: <svg className="h-4 w-4 mr-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" /></svg>
              },
              'educación': {
                label: 'Educación',
                color: 'bg-orange-100 text-orange-800',
                icon: <svg className="h-4 w-4 mr-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7" /></svg>
              },
              'otros': {
                label: 'Otros',
                color: 'bg-gray-200 text-gray-800',
                icon: <svg className="h-4 w-4 mr-1 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
              }
            };
            const cat = categoryMap[category] || categoryMap['otros'];
            return (
              <span className={`inline-flex items-center ${cat.color} text-xs font-semibold px-3 py-1 rounded-full shadow-sm`}>
                {cat.icon}
                {cat.label}
              </span>
            );
          })()}
          <span className="text-xs text-gray-500">{new Date(props.date).toLocaleDateString()}</span>
        </div>
        
        <h3 className="text-lg md:text-2xl font-extrabold mb-2 text-gray-800 leading-tight font-serif hover:underline cursor-pointer">
          {props.rewrittenTitle || props.title}
        </h3>
        

        
        <Link 
          href={`/article/${props.slug}`}
          className="mt-auto px-5 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-full shadow transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 w-full md:w-fit text-center"
        >
          Leer completo
        </Link>
      </div>
    </motion.article>
  );
}
