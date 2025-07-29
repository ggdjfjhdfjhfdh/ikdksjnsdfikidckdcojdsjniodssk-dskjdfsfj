import { Metadata } from 'next';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

export function generateSEOMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image = '/og-image.png',
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    section
  } = config;

  const fullTitle = title.includes('SESECPRO') ? title : `${title} | SESECPRO`;
  const fullUrl = url ? `https://sesecpro.es${url}` : 'https://sesecpro.es';
  const fullImageUrl = image.startsWith('http') ? image : `https://sesecpro.es${image}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : [{ name: 'SESECPRO' }],
    creator: 'SESECPRO',
    publisher: 'SESECPRO',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: 'SESECPRO',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'es_ES',
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      ...(section && { section }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [fullImageUrl],
      creator: '@sesecpro',
      site: '@sesecpro',
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        'es': fullUrl,
        'en': fullUrl.replace('sesecpro.es', 'sesecpro.es/en'),
        'x-default': fullUrl,
      },
    },
  };

  return metadata;
}

export function generateArticleSchema({
  title,
  description,
  url,
  image = '/og-image.png',
  publishedTime,
  modifiedTime,
  author = 'SESECPRO',
  section = 'Ciberseguridad',
  keywords = []
}: SEOConfig) {
  const fullUrl = url ? `https://sesecpro.es${url}` : 'https://sesecpro.es';
  const fullImageUrl = image.startsWith('http') ? image : `https://sesecpro.es${image}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": fullImageUrl,
    "author": {
      "@type": "Organization",
      "name": author,
      "url": "https://sesecpro.es"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SESECPRO",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sesecpro.es/logo.svg"
      }
    },
    "datePublished": publishedTime || new Date().toISOString(),
    "dateModified": modifiedTime || new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    },
    "articleSection": section,
    "keywords": keywords,
    "inLanguage": "es-ES"
  };
}

export function generateWebPageSchema({
  title,
  description,
  url,
  image = '/og-image.png'
}: Pick<SEOConfig, 'title' | 'description' | 'url' | 'image'>) {
  const fullUrl = url ? `https://sesecpro.es${url}` : 'https://sesecpro.es';
  const fullImageUrl = image.startsWith('http') ? image : `https://sesecpro.es${image}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": fullUrl,
    "image": fullImageUrl,
    "publisher": {
      "@type": "Organization",
      "name": "SESECPRO",
      "url": "https://sesecpro.es"
    },
    "inLanguage": "es-ES",
    "isPartOf": {
      "@type": "WebSite",
      "name": "SESECPRO",
      "url": "https://sesecpro.es"
    }
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateServiceSchema({
  name,
  description,
  url,
  image = '/og-image.png'
}: {
  name: string;
  description: string;
  url?: string;
  image?: string;
}) {
  const fullUrl = url ? `https://sesecpro.es${url}` : 'https://sesecpro.es';
  const fullImageUrl = image.startsWith('http') ? image : `https://sesecpro.es${image}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "url": fullUrl,
    "image": fullImageUrl,
    "provider": {
      "@type": "Organization",
      "name": "SESECPRO",
      "url": "https://sesecpro.es"
    },
    "areaServed": "ES",
    "availableLanguage": ["es", "en"]
  };
}