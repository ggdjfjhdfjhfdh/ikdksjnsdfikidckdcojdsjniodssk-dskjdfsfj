import { useI18n } from '@/lib/i18n';
import { TranslationKey } from '@/lib/i18n';
import type { WikiArticle } from '@/lib/wikiSearch';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

interface WikiPageClientProps {
  allArticles: WikiArticle[];
}

type WikiCategory = {
  id: string;
  nameKey: TranslationKey;
  descriptionKey: TranslationKey;
  path: string; // Spanish path to match directory structure
};

export default function WikiPageClient({ allArticles }: WikiPageClientProps) {
  const { t } = useI18n();

  const categories: WikiCategory[] = [
    { id: 'fundamentals', nameKey: 'wikiCategoryFundamentals', descriptionKey: 'wikiCategoryFundamentalsDesc', path: 'fundamentos' },
    { id: 'threats', nameKey: 'wikiCategoryThreats', descriptionKey: 'wikiCategoryThreatsDesc', path: 'amenazas' },
    { id: 'malware', nameKey: 'wikiCategoryMalware', descriptionKey: 'wikiCategoryMalwareDesc', path: 'malware' },
    { id: 'cryptography', nameKey: 'wikiCategoryCryptography', descriptionKey: 'wikiCategoryCryptographyDesc', path: 'criptografia' },
    { id: 'networks', nameKey: 'wikiCategoryNetworks', descriptionKey: 'wikiCategoryNetworksDesc', path: 'redes' },
    { id: 'web-security', nameKey: 'wikiCategoryWebSecurity', descriptionKey: 'wikiCategoryWebSecurityDesc', path: 'web' },
    { id: 'cloud', nameKey: 'wikiCategoryCloud', descriptionKey: 'wikiCategoryCloudDesc', path: 'cloud' },
    { id: 'identity', nameKey: 'wikiCategoryIdentity', descriptionKey: 'wikiCategoryIdentityDesc', path: 'identidad' },
    { id: 'endpoint', nameKey: 'wikiCategoryEndpoint', descriptionKey: 'wikiCategoryEndpointDesc', path: 'endpoint' },
    { id: 'monitoring', nameKey: 'wikiCategoryMonitoring', descriptionKey: 'wikiCategoryMonitoringDesc', path: 'monitorizacion' },
    { id: 'forensics', nameKey: 'wikiCategoryForensics', descriptionKey: 'wikiCategoryForensicsDesc', path: 'forense' },
    { id: 'compliance', nameKey: 'wikiCategoryCompliance', descriptionKey: 'wikiCategoryComplianceDesc', path: 'cumplimiento' },
    { id: 'physical', nameKey: 'wikiCategoryPhysical', descriptionKey: 'wikiCategoryPhysicalDesc', path: 'fisica' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <BackButton href="/recursos" className="mb-6" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('wikiTitle')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(({id, nameKey, descriptionKey, path}) => (
            <Link key={id} href={`/recursos/wiki/${path}`}>
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col bg-white p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{t(nameKey)}</h2>
                <p className="text-gray-600">{t(descriptionKey)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
