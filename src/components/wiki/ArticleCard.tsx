import Link from 'next/link';
import { FileText, Clock, Star, ArrowRight } from 'lucide-react';

type ArticleCardProps = {
  title: string;
  description: string;
  href: string;
  className?: string;
  icon?: React.ComponentType<any>;
  difficulty?: 'Básico' | 'Intermedio' | 'Avanzado';
  readTime?: string;
  popularity?: number;
  gradient?: string;
};

export default function ArticleCard({
  title,
  description,
  href,
  className = '',
  icon: Icon = FileText,
  difficulty = 'Básico',
  readTime = '5 min',
  popularity = 3,
  gradient = 'from-blue-500 to-blue-600'
}: ArticleCardProps) {
  // Asegurar que la ruta no contenga segmentos dinámicos
  const staticHref = href.replace(/\/\[.*?\]/g, '');

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Básico': return 'bg-green-100 text-green-800';
      case 'Intermedio': return 'bg-yellow-100 text-yellow-800';
      case 'Avanzado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link href={staticHref} className="block group">
      <div className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden h-full flex flex-col ${className}`}>
        {/* Gradient Header */}
        <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
        
        <div className="p-6 flex-1 flex flex-col">
          {/* Icon */}
          <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${gradient} mb-4 self-start group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          
          {/* Content */}
          <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h2>
          <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
            {description}
          </p>
          
          {/* Metadata */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
                {difficulty}
              </span>
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < popularity ? 'fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{readTime}</span>
              </div>
              <ArrowRight className="h-4 w-4 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
