'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import Link from 'next/link';

type ArticleLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
  backUrl: string;
};

export default function ArticleLayout({
  title,
  description,
  children,
  backUrl
}: ArticleLayoutProps) {
  const router = useRouter();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: description,
        url: window.location.href
      }).catch(err => {
        console.log('Error sharing:', err);
      });
    } else {
      alert('Share functionality not available in your browser');
    }
  };

  const handleDownload = () => {
    alert('Download functionality will be implemented soon');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-start mb-6">
          <Link 
            href={backUrl} 
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            ← Volver
          </Link>
          
          <div className="flex space-x-2">
            <button 
              onClick={handleShare}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Compartir artículo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            
            <button 
              onClick={handleDownload}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              aria-label="Descargar artículo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-lg text-gray-600 mb-8">{description}</p>
        
        <div className="article-content prose max-w-none bg-white p-6 rounded-lg shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
