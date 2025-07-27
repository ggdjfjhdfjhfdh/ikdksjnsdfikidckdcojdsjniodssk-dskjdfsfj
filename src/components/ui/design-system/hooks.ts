// Hooks personalizados del Design System
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { debounce, throttle, generateId } from './utils';

// Hook para manejar estado booleano con toggle
export function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  
  return { value, toggle, setTrue, setFalse, setValue };
}

// Hook para manejar disclosure (abrir/cerrar)
export function useDisclosure(initialIsOpen: boolean = false) {
  const { value: isOpen, setTrue: onOpen, setFalse: onClose, toggle: onToggle } = useToggle(initialIsOpen);
  
  return { isOpen, onOpen, onClose, onToggle };
}

// Hook para manejar clicks fuera de un elemento
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  callback: () => void,
  enabled: boolean = true
) {
  const ref = useRef<T>(null);
  
  useEffect(() => {
    if (!enabled) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [callback, enabled]);
  
  return ref;
}

// Hook para manejar teclas de escape
export function useEscapeKey(callback: () => void, enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;
    
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callback();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [callback, enabled]);
}

// Hook para generar IDs únicos
export function useId(prefix?: string) {
  const id = useMemo(() => generateId(prefix), [prefix]);
  return id;
}

// Hook para debounce
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

// Hook para throttle
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const throttledCallback = useMemo(
    () => throttle(callback, delay),
    [callback, delay]
  );
  
  return throttledCallback as T;
}

// Hook para manejar estado de loading
export function useAsync<T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate: boolean = true
) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<E | null>(null);
  
  const execute = useCallback(async () => {
    setStatus('pending');
    setData(null);
    setError(null);
    
    try {
      const response = await asyncFunction();
      setData(response);
      setStatus('success');
      return response;
    } catch (error) {
      setError(error as E);
      setStatus('error');
      throw error;
    }
  }, [asyncFunction]);
  
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  
  return {
    execute,
    status,
    data,
    error,
    isIdle: status === 'idle',
    isPending: status === 'pending',
    isSuccess: status === 'success',
    isError: status === 'error',
  };
}

// Hook para manejar localStorage
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });
  
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );
  
  return [storedValue, setValue];
}

// Hook para manejar media queries
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const media = window.matchMedia(query);
    setMatches(media.matches);
    
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [query]);
  
  return matches;
}

// Hook para detectar si es móvil
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)');
}

// Hook para detectar modo oscuro
export function useIsDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)');
}

// Hook para manejar scroll
export function useScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? 'down' : 'up';
      
      if (direction !== scrollDirection && Math.abs(currentScrollY - lastScrollY) > 10) {
        setScrollDirection(direction);
      }
      
      setScrollY(currentScrollY);
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
    };
    
    const throttledUpdateScrollDirection = throttle(updateScrollDirection, 100);
    
    window.addEventListener('scroll', throttledUpdateScrollDirection);
    return () => window.removeEventListener('scroll', throttledUpdateScrollDirection);
  }, [scrollDirection]);
  
  return { scrollY, scrollDirection };
}

// Hook para manejar intersección (para lazy loading)
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      options
    );
    
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [elementRef, options]);
  
  return isIntersecting;
}

// Hook para manejar copiar al portapapeles
export function useClipboard(timeout: number = 2000) {
  const [hasCopied, setHasCopied] = useState(false);
  
  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setHasCopied(true);
      
      setTimeout(() => setHasCopied(false), timeout);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      setHasCopied(false);
      return false;
    }
  }, [timeout]);
  
  return { copy, hasCopied };
}

// Hook para manejar focus trap (para modales)
export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  isActive: boolean = true
) {
  const ref = useRef<T>(null);
  
  useEffect(() => {
    if (!isActive || !ref.current) return;
    
    const element = ref.current;
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          event.preventDefault();
        }
      }
    };
    
    element.addEventListener('keydown', handleTabKey);
    firstElement?.focus();
    
    return () => element.removeEventListener('keydown', handleTabKey);
  }, [isActive]);
  
  return ref;
}

// Hook para manejar estado de formulario
export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationSchema?: (values: T) => Partial<Record<keyof T, string>>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  
  const setValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);
  
  const setError = useCallback((name: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);
  
  const setTouched = useCallback((name: keyof T, isTouched: boolean = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
  }, []);
  
  const validate = useCallback(() => {
    if (!validationSchema) return true;
    
    const newErrors = validationSchema(values);
    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0;
  }, [values, validationSchema]);
  
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);
  
  return {
    values,
    errors,
    touched,
    setValue,
    setError,
    setTouched,
    validate,
    reset,
    isValid: Object.keys(errors).length === 0,
  };
}