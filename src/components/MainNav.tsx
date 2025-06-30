import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Inicio', path: '/' },
  { name: 'Soluciones', path: '/solutions' },
  { name: 'Contacto', path: '/contact' }
];

export function MainNav() {
  const pathname = usePathname();
  
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`
            text-white hover:text-blue-300 transition-colors
            ${pathname === item.path ? 'font-bold text-blue-300' : ''}
          `}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
