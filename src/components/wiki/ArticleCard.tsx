import Link from 'next/link';

type ArticleCardProps = {
  title: string;
  description: string;
  href: string;
  className?: string;
};

export default function ArticleCard({
  title,
  description,
  href,
  className = ''
}: ArticleCardProps) {
  // Asegurar que la ruta no contenga segmentos dinámicos
  const staticHref = href.replace(/\/\[.*?\]/g, '');

  return (
    <Link href={staticHref} className="block">
      <div className={`border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col bg-white p-6 ${className}`}>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </Link>
  );
}
