'use client';

import React, { forwardRef, useState, useRef } from 'react';
import { DropdownProps } from '../types';
import { cn } from '../utils';
import { useClickOutside, useDisclosure, useEscapeKey, useId } from '../hooks';

// Context para el Dropdown
const DropdownContext = React.createContext<{
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  placement: DropdownProps['placement'];
  triggerId: string;
}>({ 
  isOpen: false, 
  onClose: () => {}, 
  onToggle: () => {}, 
  placement: 'bottom-start',
  triggerId: ''
});

// Hook para usar el contexto del Dropdown
const useDropdown = () => {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown compound components must be used within a Dropdown');
  }
  return context;
};

// Componente Dropdown principal
export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({
    placement = 'bottom-start',
    closeOnSelect = true,
    isDisabled = false,
    children,
    className,
    ...props
  }, ref) => {
    const { isOpen, onClose, onToggle } = useDisclosure();
    const dropdownRef = useClickOutside<HTMLDivElement>(onClose, isOpen);
    const triggerId = useId('dropdown-trigger');
    
    // Manejar tecla Escape
    useEscapeKey(onClose, isOpen);

    return (
      <div
        ref={ref}
        className={cn('relative inline-block', className)}
        {...props}
      >
        <div ref={dropdownRef}>
          <DropdownContext.Provider 
            value={{ 
              isOpen: isOpen && !isDisabled, 
              onClose, 
              onToggle: isDisabled ? () => {} : onToggle, 
              placement,
              triggerId
            }}
          >
            {children}
          </DropdownContext.Provider>
        </div>
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

// Dropdown Trigger
export const DropdownTrigger = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    const { isOpen, onToggle, triggerId } = useDropdown();
    
    return (
      <button
        ref={ref}
        id={triggerId}
        type="button"
        className={cn(
          'inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          {
            'ring-2 ring-blue-500 ring-offset-2': isOpen,
          },
          className
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={onToggle}
        {...props}
      >
        {children}
        <svg
          className={cn(
            'ml-2 h-4 w-4 transition-transform duration-200',
            { 'rotate-180': isOpen }
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    );
  }
);

DropdownTrigger.displayName = 'DropdownTrigger';

// Dropdown Content
export const DropdownContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { isOpen, placement, triggerId } = useDropdown();
    
    if (!isOpen) return null;

    const placementClasses = {
      'top-start': 'bottom-full left-0 mb-1',
      'top-end': 'bottom-full right-0 mb-1',
      'bottom-start': 'top-full left-0 mt-1',
      'bottom-end': 'top-full right-0 mt-1',
      'left-start': 'right-full top-0 mr-1',
      'left-end': 'right-full bottom-0 mr-1',
      'right-start': 'left-full top-0 ml-1',
      'right-end': 'left-full bottom-0 ml-1',
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          'absolute z-50 min-w-[200px] bg-white border border-gray-200 rounded-md shadow-lg',
          'animate-in fade-in-0 zoom-in-95 duration-100',
          placementClasses[placement],
          className
        )}
        role="menu"
        aria-labelledby={triggerId}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DropdownContent.displayName = 'DropdownContent';

// Dropdown Item
export const DropdownItem = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isDisabled?: boolean;
  isDanger?: boolean;
}>(
  ({ className, children, isDisabled = false, isDanger = false, onClick, ...props }, ref) => {
    const { onClose } = useDropdown();
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!isDisabled) {
        onClick?.(event);
        onClose();
      }
    };
    
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'w-full text-left px-4 py-2 text-sm transition-colors duration-150',
          'hover:bg-gray-100 focus:bg-gray-100 focus:outline-none',
          {
            'text-gray-900': !isDanger && !isDisabled,
            'text-red-600': isDanger && !isDisabled,
            'text-gray-400 cursor-not-allowed': isDisabled,
            'hover:bg-red-50 focus:bg-red-50': isDanger && !isDisabled,
          },
          className
        )}
        disabled={isDisabled}
        role="menuitem"
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);

DropdownItem.displayName = 'DropdownItem';

// Dropdown Separator
export const DropdownSeparator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('my-1 border-t border-gray-200', className)}
      role="separator"
      {...props}
    />
  )
);

DropdownSeparator.displayName = 'DropdownSeparator';

// Dropdown Label
export const DropdownLabel = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider', className)}
      {...props}
    >
      {children}
    </div>
  )
);

DropdownLabel.displayName = 'DropdownLabel';

// Hook para controlar el Dropdown
export const useDropdownDisclosure = (initialIsOpen: boolean = false) => {
  return useDisclosure(initialIsOpen);
};

// Dropdown Menu predefinido
export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: Array<{
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    isDisabled?: boolean;
    isDanger?: boolean;
  } | 'separator' | { type: 'label'; label: string }>;
  placement?: DropdownProps['placement'];
  className?: string;
}

export const DropdownMenu = ({
  trigger,
  items,
  placement = 'bottom-start',
  className,
}: DropdownMenuProps) => {
  return (
    <Dropdown placement={placement} className={className}>
      <DropdownTrigger asChild>
        {trigger}
      </DropdownTrigger>
      
      <DropdownContent>
        {items.map((item, index) => {
          if (item === 'separator') {
            return <DropdownSeparator key={`separator-${index}`} />;
          }
          
          if (typeof item === 'object' && 'type' in item && item.type === 'label') {
            return (
              <DropdownLabel key={`label-${index}`}>
                {item.label}
              </DropdownLabel>
            );
          }
          
          if (typeof item === 'object' && 'label' in item) {
            return (
              <DropdownItem
                key={`item-${index}`}
                onClick={item.onClick}
                isDisabled={item.isDisabled}
                isDanger={item.isDanger}
              >
                <div className="flex items-center">
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </div>
              </DropdownItem>
            );
          }
          
          return null;
        })}
      </DropdownContent>
    </Dropdown>
  );
};

DropdownMenu.displayName = 'DropdownMenu';