"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// Utilidad para generar slug igual que en news/page.tsx
function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Fetch de noticias: primero window.newsData, luego API, luego localStorage
async function fetchNews() {
  // @ts-ignore
  if (typeof window !== "undefined" && window.newsData && Array.isArray(window.newsData) && window.newsData.length > 0) {
    return window.newsData;
  }
  // Intenta obtener desde API
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/news");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.news)) {
          // Guarda en window y localStorage para siguiente vez
          window.newsData = data.news;
          window.localStorage?.setItem("newsData", JSON.stringify(data.news));
          return data.news;
        }
      }
    } catch (e) {
      console.error("Error fetching news from API:", e);
    }
  }
  // Fallback: prueba a obtener desde localStorage (si lo usas)
  if (typeof window !== "undefined" && window.localStorage) {
    const data = window.localStorage.getItem("newsData");
    if (data) return JSON.parse(data);
  }
  // Si todo falla, retorna array vacío
  return [];
}

export default function ArticleBySlugPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const news = await fetchNews();
      // Debug: log all generated slugs and the current slug
      if (Array.isArray(news)) {
        const slugs = news.map((item: any) => ({
          title: item.title,
          slug: slugify(item.title)
        }));
        console.log('Generated slugs:', slugs);
        console.log('Current slug:', slug);
      } else {
        console.log('news is not an array:', news);
      }
      const found = Array.isArray(news) ? news.find((item: any) => slugify(item.title) === slug) : null;
      setArticle(found || null);
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Cargando artículo...</div>
      </div>
    );

  if (!article)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Artículo no encontrado</div>
      </div>
    );

  return (
    <div className="bg-white">
      {/* Cabecera */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <Link href="/news" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Volver a noticias
          </Link>

          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {article.title}
            </h1>

            {/* Botones de compartir modernos */}
            <div className="flex flex-wrap gap-3 mt-4">
              {/* Web Share API si está disponible */}
              {typeof window !== "undefined" && navigator.share ? (
                <button
                  className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-semibold shadow transition"
                  onClick={() => {
                    navigator.share({
                      title: article.title,
                      text: article.title,
                      url: window.location.href,
                    });
                  }}
                  title="Compartir"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 8a3 3 0 1 0-6 0v8a3 3 0 1 0 6 0V8z"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 8V4m0 0l-3 3m3-3l3 3"/></svg>
                  Compartir
                </button>
              ) : (
                <>
                  {/* WhatsApp */}
                  <button
                    className="flex items-center bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow transition"
                    onClick={() => {
                      const url = window.location.href;
                      window.open(`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + url)}`,'_blank');
                    }}
                    title="Compartir en WhatsApp"
                  >
                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12a11.93 11.93 0 0 0 1.64 6.07L0 24l6.18-1.62A12.07 12.07 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zm-8.52 19.2c-1.7 0-3.36-.33-4.92-.98l-.35-.14-3.67.97.98-3.58-.16-.36A10.07 10.07 0 0 1 2 12c0-5.52 4.48-10 10-10 2.67 0 5.18 1.04 7.07 2.93A9.93 9.93 0 0 1 22 12c0 5.52-4.48 10-10 10zm5.42-7.63c-.08-.13-.31-.2-.65-.35-.34-.14-2.02-.99-2.33-1.1-.31-.11-.54-.17-.77.17-.23.34-.89 1.1-1.09 1.33-.2.23-.4.25-.74.09-.34-.17-1.44-.53-2.74-1.68-1.01-.9-1.7-2.01-1.9-2.35-.2-.34-.02-.52.15-.68.15-.15.34-.4.51-.6.17-.2.23-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.77-1.85-1.06-2.54-.28-.68-.58-.59-.8-.6-.2-.01-.43-.01-.66-.01-.23 0-.6.09-.92.43-.31.34-1.2 1.17-1.2 2.85 0 1.68 1.23 3.31 1.4 3.54.17.23 2.43 3.71 5.88 5.06.82.34 1.46.54 1.96.69.82.26 1.57.22 2.16.13.66-.1 2.02-.82 2.31-1.61.29-.79.29-1.47.2-1.61zm-5.42 5.63z"/></svg>
                    WhatsApp
                  </button>
                  {/* Facebook */}
                  <button
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs font-semibold shadow transition"
                    onClick={() => {
                      const url = window.location.href;
                      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,'_blank');
                    }}
                    title="Compartir en Facebook"
                  >
                    <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24h-1.918c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0"/></svg>
                    Facebook
                  </button>
                  {/* Copiar enlace */}
                  <button
                    className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold shadow transition"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('¡Enlace copiado!');
                    }}
                    title="Copiar enlace"
                  >
                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 010 5.656m-1.414-1.414a2 2 0 010-2.828m7.778-7.778a4 4 0 010 5.656l-1.415 1.415a2 2 0 01-2.828 0m-7.778 7.778a4 4 0 010-5.656l1.415-1.415a2 2 0 012.828 0" /></svg>
                    Copiar enlace
                  </button>
                </>
              )}
            </div>

            <div className="mt-6 flex items-center space-x-4 text-sm text-gray-300">
              {/* Etiqueta de categoría con icono y color dinámico */}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                {article.category}
              </span>
               <span className="flex items-center">
                 <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                 {/* Solo la fecha sin hora */}
                 {(article.publishedAt || article.date)?.split(' ')[0]}
               </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido del artículo */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <article
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </main>
    </div>
  );
}
