import Link from 'next/link';

interface BackButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export default function BackButton({ href, label, className }: BackButtonProps) {
  return (
    <div className={`container mx-auto mb-6 max-w-6xl ${className}`}>
      <Link 
        href={href}
        className={`inline-flex items-center text-blue-600 hover:text-blue-800 font-medium`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        {label || 'Volver a Recursos'}
      </Link>
    </div>
  );
}
