import Link from 'next/link';
import SearchBar from '@/components/wiki/SearchBar';
import BackButton from '@/components/BackButton'; // Import BackButton component
import WikiPageWrapper from './WikiPageWrapper';
import { getAllWikiArticles } from '@/lib/wikiSearch';
import type { WikiArticle } from '@/lib/wikiSearch';

export default async function WikiPage() {
  const allArticles = await getAllWikiArticles();
  return <WikiPageWrapper allArticles={allArticles} />;
}

interface WikiPageWrapperProps {
  allArticles: WikiArticle[];
}

// Contar artículos por categoría (incluyendo subdirectorios)
const getCategoryCount = (categoryPath: string, allArticles: WikiArticle[]) => {
  return allArticles.filter(article => 
    article.href.startsWith(`/recursos/wiki/${categoryPath}/`) &&
    !article.href.endsWith('page.tsx')
  ).length;
};

const categories = [
  {
    title: 'Fundamentos',
    description: 'Conceptos teóricos y principios de seguridad',
    path: 'fundamentos'
  },
  {
    title: 'Amenazas y Ataques',
    description: 'Técnicas de ataque y vectores de amenaza',
    path: 'amenazas'
  },
  {
    title: 'Malware',
    description: 'Tipos y características de software malicioso',
    path: 'malware'
  },
  {
    title: 'Criptografía & Autenticación',
    description: 'Métodos de cifrado y verificación de identidad',
    path: 'criptografia'
  },
  {
    title: 'Redes e Infraestructura',
    description: 'Protección de sistemas de red',
    path: 'redes'
  },
  {
    title: 'Seguridad Web y AppSec',
    description: 'Protección de aplicaciones y sitios web',
    path: 'web'
  },
  {
    title: 'Cloud & DevSecOps',
    description: 'Seguridad en entornos cloud y pipelines',
    path: 'cloud'
  },
  {
    title: 'Gestión de Identidad',
    description: 'Control de acceso y autenticación',
    path: 'identidad'
  },
  {
    title: 'Endpoint & OT/IoT',
    description: 'Protección de dispositivos y sistemas operacionales',
    path: 'endpoint'
  },
  {
    title: 'Monitorización y Respuesta',
    description: 'Detección y manejo de incidentes',
    path: 'monitorizacion'
  },
  {
    title: 'Forense Digital',
    description: 'Investigación post-incidente',
    path: 'forense'
  },
  {
    title: 'Cumplimiento y Gobierno',
    description: 'Estándares y regulaciones',
    path: 'cumplimiento'
  },
  {
    title: 'Seguridad Física',
    description: 'Controles físicos y continuidad',
    path: 'fisica'
  }
];
