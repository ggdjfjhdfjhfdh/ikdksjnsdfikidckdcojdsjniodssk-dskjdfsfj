import ArticleCard from '@/components/wiki/ArticleCard';
import BackButton from '@/components/BackButton';

export default function CloudSecurityPage() {
  const articles = [
    {
      title: 'Modelo de Responsabilidad Compartida',
      description: 'AWS/Azure/GCP responsabilidades de seguridad',
      href: '/recursos/wiki/cloud/responsabilidad-compartida'
    },
    {
      title: 'CSPM, CWPP, CNAPP, CASB',
      description: 'Herramientas de seguridad en cloud',
      href: '/recursos/wiki/cloud/herramientas'
    },
    {
      title: 'Seguridad en IaC',
      description: 'Terraform, CloudFormation, OPA',
      href: '/recursos/wiki/cloud/iac'
    },
    {
      title: 'CI/CD Seguro',
      description: 'Firmado de artefactos con Sigstore/cosign',
      href: '/recursos/wiki/cloud/cicd'
    },
    {
      title: 'IAM Roles & Service Accounts',
      description: 'Gestión de identidades en cloud',
      href: '/recursos/wiki/cloud/iam'
    },
    {
      title: 'VPC y Network Security',
      description: 'Security Groups, PrivateLink',
      href: '/recursos/wiki/cloud/redes'
    },
    {
      title: 'Monitoreo y Detección',
      description: 'GuardDuty, CloudTrail, Azure Defender',
      href: '/recursos/wiki/cloud/monitoreo'
    },
    {
      title: 'Automatización SOAR',
      description: 'Policy-as-Code e implementación',
      href: '/recursos/wiki/cloud/automation'
    },
    {
      title: 'Immutable Infrastructure',
      description: 'Blue-Green & Canary Deployments',
      href: '/recursos/wiki/cloud/infraestructura'
    },
    {
      title: 'Confidential Computing',
      description: 'Encryption-in-Use y enclaves seguros',
      href: '/recursos/wiki/cloud/confidential'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton href="/recursos/wiki" className="mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Cloud & DevSecOps</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.title} {...article} />
          ))}
        </div>
      </div>
    </div>
  );
}
