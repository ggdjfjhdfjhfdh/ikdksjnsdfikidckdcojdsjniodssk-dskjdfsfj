import { useI18n } from '@/lib/LanguageContext';
import { TranslationKey } from '@/lib/i18n/index';
import type { WikiArticle } from '@/lib/wikiSearch';
import Link from 'next/link';
import BackButton from '@/components/BackButton';
import { 
  Shield, 
  Bug, 
  Lock, 
  Network, 
  Globe, 
  Cloud, 
  Users, 
  Monitor, 
  Search, 
  FileText, 
  Scale, 
  Building,
  BookOpen,
  TrendingUp,
  Star,
  Clock,
  ArrowRight
} from 'lucide-react';

interface WikiPageClientProps {
  allArticles: WikiArticle[];
}

type WikiCategory = {
  id: string;
  nameKey: TranslationKey;
  descriptionKey: TranslationKey;
  path: string; // Spanish path to match directory structure
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
};

export default function WikiPageClient({ allArticles }: WikiPageClientProps) {
  const { t } = useI18n();

  const categories: WikiCategory[] = [
    { id: 'fundamentals', nameKey: 'wikiCategoryFundamentals', descriptionKey: 'wikiCategoryFundamentalsDesc', path: 'fundamentos', icon: Shield, color: 'blue', gradient: 'from-blue-500 to-blue-600' },
    { id: 'threats', nameKey: 'wikiCategoryThreats', descriptionKey: 'wikiCategoryThreatsDesc', path: 'amenazas', icon: Bug, color: 'red', gradient: 'from-red-500 to-red-600' },
    { id: 'malware', nameKey: 'wikiCategoryMalware', descriptionKey: 'wikiCategoryMalwareDesc', path: 'malware', icon: Search, color: 'orange', gradient: 'from-orange-500 to-orange-600' },
    { id: 'cryptography', nameKey: 'wikiCategoryCryptography', descriptionKey: 'wikiCategoryCryptographyDesc', path: 'criptografia', icon: Lock, color: 'purple', gradient: 'from-purple-500 to-purple-600' },
    { id: 'networks', nameKey: 'wikiCategoryNetworks', descriptionKey: 'wikiCategoryNetworksDesc', path: 'redes', icon: Network, color: 'green', gradient: 'from-green-500 to-green-600' },
    { id: 'web-security', nameKey: 'wikiCategoryWebSecurity', descriptionKey: 'wikiCategoryWebSecurityDesc', path: 'web', icon: Globe, color: 'cyan', gradient: 'from-cyan-500 to-cyan-600' },
    { id: 'cloud', nameKey: 'wikiCategoryCloud', descriptionKey: 'wikiCategoryCloudDesc', path: 'cloud', icon: Cloud, color: 'sky', gradient: 'from-sky-500 to-sky-600' },
    { id: 'identity', nameKey: 'wikiCategoryIdentity', descriptionKey: 'wikiCategoryIdentityDesc', path: 'identidad', icon: Users, color: 'indigo', gradient: 'from-indigo-500 to-indigo-600' },
    { id: 'endpoint', nameKey: 'wikiCategoryEndpoint', descriptionKey: 'wikiCategoryEndpointDesc', path: 'endpoint', icon: Monitor, color: 'gray', gradient: 'from-gray-500 to-gray-600' },
    { id: 'monitoring', nameKey: 'wikiCategoryMonitoring', descriptionKey: 'wikiCategoryMonitoringDesc', path: 'monitorizacion', icon: TrendingUp, color: 'emerald', gradient: 'from-emerald-500 to-emerald-600' },
    { id: 'forensics', nameKey: 'wikiCategoryForensics', descriptionKey: 'wikiCategoryForensicsDesc', path: 'forense', icon: FileText, color: 'amber', gradient: 'from-amber-500 to-amber-600' },
    { id: 'compliance', nameKey: 'wikiCategoryCompliance', descriptionKey: 'wikiCategoryComplianceDesc', path: 'cumplimiento', icon: Scale, color: 'teal', gradient: 'from-teal-500 to-teal-600' },
    { id: 'physical', nameKey: 'wikiCategoryPhysical', descriptionKey: 'wikiCategoryPhysicalDesc', path: 'fisica', icon: Building, color: 'slate', gradient: 'from-slate-500 to-slate-600' },
  ];

  // Calcular estadísticas
  const totalArticles = allArticles.length;
  const getCategoryCount = (categoryPath: string) => {
    return allArticles.filter(article => 
      article.href.startsWith(`/recursos/wiki/${categoryPath}/`) &&
      !article.href.endsWith('page.tsx')
    ).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <BackButton href="/recursos" className="mb-6" />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-16">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
              <BookOpen className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              {t('wikiTitle')}
            </span>
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Explora nuestra completa base de conocimientos sobre ciberseguridad. 
            Desde conceptos fundamentales hasta técnicas avanzadas.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold text-white">{totalArticles}</div>
              <div className="text-blue-100">Artículos</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold text-white">{categories.length}</div>
              <div className="text-blue-100">Categorías</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-bold text-white">100%</div>
              <div className="text-blue-100">Gratuito</div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explora por Categorías
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Navega por nuestras categorías especializadas para encontrar exactamente lo que necesitas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map(({id, nameKey, descriptionKey, path, icon: Icon, color, gradient}) => {
            const articleCount = getCategoryCount(path);
            return (
              <Link key={id} href={`/recursos/wiki/${path}`}>
                <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
                  {/* Gradient Header */}
                  <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
                  
                  <div className="p-6">
                    {/* Icon */}
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {t(nameKey)}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {t(descriptionKey)}
                    </p>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <FileText className="h-4 w-4 mr-1" />
                        <span>{articleCount} artículos</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Utiliza nuestra función de búsqueda avanzada para encontrar contenido específico
          </p>
          <Link 
            href="/recursos/wiki/buscar"
            className="inline-flex items-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            <Search className="h-5 w-5 mr-2" />
            Buscar en la Wiki
          </Link>
        </div>
      </div>
    </div>
  );
}
