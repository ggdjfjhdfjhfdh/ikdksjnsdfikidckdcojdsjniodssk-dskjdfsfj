'use client';

import React, { forwardRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from '../types';
import { cn } from '../utils';
import { useDisclosure, useEscapeKey, useFocusTrap } from '../hooks';
import { Button } from '../primitives';

// Context para el Modal
const ModalContext = React.createContext<{
  isOpen: boolean;
  onClose: () => void;
  size: ModalProps['size'];
  isCentered: boolean;
}>({ isOpen: false, onClose: () => {}, size: 'md', isCentered: true });

// Hook para usar el contexto del Modal
const useModal = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error('Modal compound components must be used within a Modal');
  }
  return context;
};

// Componente Modal principal
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({
    isOpen,
    onClose,
    size = 'md',
    isCentered = true,
    closeOnOverlayClick = true,
    closeOnEsc = true,
    children,
    className,
    ...props
  }, ref) => {
    const modalRef = useFocusTrap<HTMLDivElement>(isOpen);
    
    // Manejar tecla Escape
    useEscapeKey(() => {
      if (closeOnEsc) onClose();
    }, isOpen);

    // Prevenir scroll del body cuando el modal está abierto
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = 'unset';
        };
      }
    }, [isOpen]);

    if (!isOpen) return null;

    const sizeClasses = {
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      '2xl': 'max-w-2xl',
      '3xl': 'max-w-3xl',
      '4xl': 'max-w-4xl',
      '5xl': 'max-w-5xl',
      '6xl': 'max-w-6xl',
      full: 'max-w-full',
    };

    const modalContent = (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={closeOnOverlayClick ? onClose : undefined}
        />
        
        {/* Modal container */}
        <div
          className={cn(
            'relative min-h-full flex',
            isCentered ? 'items-center justify-center p-4' : 'items-start justify-center pt-16 pb-4'
          )}
        >
          {/* Modal content */}
          <div
            ref={modalRef}
            className={cn(
              'relative bg-white rounded-lg shadow-xl w-full',
              sizeClasses[size],
              className
            )}
            {...props}
          >
            <ModalContext.Provider value={{ isOpen, onClose, size, isCentered }}>
              {children}
            </ModalContext.Provider>
          </div>
        </div>
      </div>
    );

    // Renderizar en portal
    return typeof window !== 'undefined'
      ? createPortal(modalContent, document.body)
      : null;
  }
);

Modal.displayName = 'Modal';

// Modal Header
export const ModalHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { onClose } = useModal();
    
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between p-6 border-b border-gray-200',
          className
        )}
        {...props}
      >
        <div className="flex-1">{children}</div>
        <button
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
          aria-label="Cerrar modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  }
);

ModalHeader.displayName = 'ModalHeader';

// Modal Body
export const ModalBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-6', className)}
      {...props}
    >
      {children}
    </div>
  )
);

ModalBody.displayName = 'ModalBody';

// Modal Footer
export const ModalFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

ModalFooter.displayName = 'ModalFooter';

// Modal Title
export const ModalTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('text-lg font-semibold text-gray-900', className)}
      {...props}
    >
      {children}
    </h2>
  )
);

ModalTitle.displayName = 'ModalTitle';

// Modal Description
export const ModalDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-gray-600 mt-1', className)}
      {...props}
    >
      {children}
    </p>
  )
);

ModalDescription.displayName = 'ModalDescription';

// Hook para controlar el Modal
export const useModalDisclosure = (initialIsOpen: boolean = false) => {
  return useDisclosure(initialIsOpen);
};

// Modal de confirmación predefinido
export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = '¿Estás seguro?',
  message = 'Esta acción no se puede deshacer.',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger',
  isLoading = false,
}: ConfirmModalProps) => {
  const colorSchemes = {
    danger: 'red',
    warning: 'yellow',
    info: 'blue',
  } as const;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalHeader>
        <ModalTitle>{title}</ModalTitle>
      </ModalHeader>
      
      <ModalBody>
        <ModalDescription>{message}</ModalDescription>
      </ModalBody>
      
      <ModalFooter>
        <Button
          variant="ghost"
          onClick={onClose}
          isDisabled={isLoading}
        >
          {cancelText}
        </Button>
        <Button
          variant="primary"
          colorScheme={colorSchemes[variant]}
          onClick={onConfirm}
          isLoading={isLoading}
        >
          {confirmText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

ConfirmModal.displayName = 'ConfirmModal';