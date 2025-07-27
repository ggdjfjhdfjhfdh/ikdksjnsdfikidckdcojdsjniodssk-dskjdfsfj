// Utilidades del Design System
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { colors, spacing, typography, borderRadius, shadows } from './tokens';
import type { Variant, Size, ColorScheme } from './types';

// Función para combinar clases CSS de manera inteligente
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generadores de clases para variantes
export const variantClasses = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
  secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
  success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
  warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500',
  error: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  info: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
} as const;

// Generadores de clases para tamaños
export const sizeClasses = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
} as const;

// Generadores de clases para esquemas de color
export const colorSchemeClasses = {
  blue: {
    bg: 'bg-blue-500',
    text: 'text-blue-500',
    border: 'border-blue-500',
    ring: 'ring-blue-500',
  },
  gray: {
    bg: 'bg-gray-500',
    text: 'text-gray-500',
    border: 'border-gray-500',
    ring: 'ring-gray-500',
  },
  green: {
    bg: 'bg-green-500',
    text: 'text-green-500',
    border: 'border-green-500',
    ring: 'ring-green-500',
  },
  yellow: {
    bg: 'bg-yellow-500',
    text: 'text-yellow-500',
    border: 'border-yellow-500',
    ring: 'ring-yellow-500',
  },
  red: {
    bg: 'bg-red-500',
    text: 'text-red-500',
    border: 'border-red-500',
    ring: 'ring-red-500',
  },
  cyan: {
    bg: 'bg-cyan-500',
    text: 'text-cyan-500',
    border: 'border-cyan-500',
    ring: 'ring-cyan-500',
  },
} as const;

// Función para obtener clases de variante
export function getVariantClasses(variant: Variant = 'primary'): string {
  return variantClasses[variant] || variantClasses.primary;
}

// Función para obtener clases de tamaño
export function getSizeClasses(size: Size = 'md'): string {
  return sizeClasses[size] || sizeClasses.md;
}

// Función para obtener clases de esquema de color
export function getColorSchemeClasses(colorScheme: ColorScheme = 'blue') {
  return colorSchemeClasses[colorScheme] || colorSchemeClasses.blue;
}

// Función para generar clases de botón
export function getButtonClasses({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
}: {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
} = {}) {
  return cn(
    // Clases base
    'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    
    // Clases de variante
    getVariantClasses(variant),
    
    // Clases de tamaño
    getSizeClasses(size),
    
    // Clases condicionales
    {
      'w-full': fullWidth,
      'opacity-50 cursor-not-allowed': disabled,
      'cursor-wait': loading,
    }
  );
}

// Función para generar clases de input
export function getInputClasses({
  size = 'md',
  error = false,
  disabled = false,
}: {
  size?: Size;
  error?: boolean;
  disabled?: boolean;
} = {}) {
  return cn(
    // Clases base
    'block w-full rounded-md border-gray-300 shadow-sm transition-colors duration-200',
    'focus:border-primary-500 focus:ring-primary-500',
    'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
    
    // Clases de tamaño
    {
      'px-2 py-1 text-xs': size === 'xs',
      'px-3 py-1.5 text-sm': size === 'sm',
      'px-3 py-2 text-base': size === 'md',
      'px-4 py-3 text-lg': size === 'lg',
      'px-5 py-4 text-xl': size === 'xl',
    },
    
    // Clases condicionales
    {
      'border-red-300 focus:border-red-500 focus:ring-red-500': error,
      'bg-gray-50 text-gray-500 cursor-not-allowed': disabled,
    }
  );
}

// Función para generar clases de card
export function getCardClasses({
  variant = 'elevated',
  hover = false,
  clickable = false,
}: {
  variant?: 'elevated' | 'outlined' | 'filled';
  hover?: boolean;
  clickable?: boolean;
} = {}) {
  return cn(
    // Clases base
    'rounded-lg transition-all duration-200',
    
    // Clases de variante
    {
      'bg-white shadow-md': variant === 'elevated',
      'bg-white border border-gray-200': variant === 'outlined',
      'bg-gray-50': variant === 'filled',
    },
    
    // Clases condicionales
    {
      'hover:shadow-lg': hover && variant === 'elevated',
      'hover:border-gray-300': hover && variant === 'outlined',
      'hover:bg-gray-100': hover && variant === 'filled',
      'cursor-pointer': clickable,
    }
  );
}

// Función para generar clases de badge
export function getBadgeClasses({
  variant = 'primary',
  size = 'md',
  dot = false,
  pill = false,
}: {
  variant?: Variant;
  size?: Size;
  dot?: boolean;
  pill?: boolean;
} = {}) {
  return cn(
    // Clases base
    'inline-flex items-center font-medium',
    
    // Clases de forma
    {
      'rounded-full': pill,
      'rounded': !pill,
      'w-2 h-2 p-0': dot,
    },
    
    // Clases de tamaño (solo si no es dot)
    !dot && {
      'px-1.5 py-0.5 text-xs': size === 'xs',
      'px-2 py-0.5 text-xs': size === 'sm',
      'px-2.5 py-0.5 text-sm': size === 'md',
      'px-3 py-1 text-sm': size === 'lg',
      'px-4 py-1 text-base': size === 'xl',
    },
    
    // Clases de variante
    !dot && getVariantClasses(variant),
    
    // Clases especiales para dot
    dot && {
      'bg-primary-500': variant === 'primary',
      'bg-secondary-500': variant === 'secondary',
      'bg-green-500': variant === 'success',
      'bg-yellow-500': variant === 'warning',
      'bg-red-500': variant === 'error',
      'bg-blue-500': variant === 'info',
    }
  );
}

// Función para generar clases de avatar
export function getAvatarClasses({
  size = 'md',
}: {
  size?: Size;
} = {}) {
  return cn(
    // Clases base
    'inline-flex items-center justify-center rounded-full bg-gray-500 overflow-hidden',
    
    // Clases de tamaño
    {
      'w-6 h-6 text-xs': size === 'xs',
      'w-8 h-8 text-sm': size === 'sm',
      'w-10 h-10 text-base': size === 'md',
      'w-12 h-12 text-lg': size === 'lg',
      'w-16 h-16 text-xl': size === 'xl',
    }
  );
}

// Función para validar props
export function validateProps<T extends Record<string, any>>(
  props: T,
  requiredProps: (keyof T)[]
): void {
  for (const prop of requiredProps) {
    if (props[prop] === undefined || props[prop] === null) {
      throw new Error(`Prop '${String(prop)}' is required but was not provided`);
    }
  }
}

// Función para generar IDs únicos
export function generateId(prefix: string = 'ds'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

// Función para formatear texto
export function formatText(text: string, maxLength?: number): string {
  if (!maxLength) return text;
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

// Función para debounce
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Función para throttle
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Función para detectar si es móvil
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

// Función para detectar modo oscuro
export function isDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Función para copiar al portapapeles
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

// Función para formatear números
export function formatNumber(num: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat('es-ES', options).format(num);
}

// Función para formatear fechas
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('es-ES', options).format(dateObj);
}