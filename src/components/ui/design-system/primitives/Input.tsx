'use client';

import React, { forwardRef, useState } from 'react';
import { InputProps } from '../types';
import { cn, getInputClasses } from '../utils';
import { useId } from '../hooks';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    variant = 'outline',
    size = 'md',
    colorScheme = 'blue',
    isInvalid = false,
    isDisabled = false,
    isReadOnly = false,
    isRequired = false,
    leftElement,
    rightElement,
    label,
    helperText,
    errorMessage,
    placeholder,
    className,
    id,
    type = 'text',
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = useId('input');
    const finalId = id || inputId;
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const PasswordToggle = () => (
      <button
        type="button"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={() => setShowPassword(!showPassword)}
        tabIndex={-1}
      >
        {showPassword ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        )}
      </button>
    );

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={finalId}
            className={cn(
              'block text-sm font-medium mb-2',
              isInvalid ? 'text-red-700' : 'text-gray-700',
              isDisabled && 'opacity-50'
            )}
          >
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftElement && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {leftElement}
            </div>
          )}
          
          <input
            ref={ref}
            id={finalId}
            type={inputType}
            placeholder={placeholder}
            disabled={isDisabled}
            readOnly={isReadOnly}
            required={isRequired}
            className={cn(
              getInputClasses(variant, size, colorScheme),
              {
                'border-red-500 focus:border-red-500 focus:ring-red-500': isInvalid,
                'opacity-50 cursor-not-allowed': isDisabled,
                'bg-gray-50 cursor-default': isReadOnly,
                'pl-10': leftElement,
                'pr-10': rightElement || isPassword,
              },
              className
            )}
            {...props}
          />
          
          {isPassword && <PasswordToggle />}
          
          {rightElement && !isPassword && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {rightElement}
            </div>
          )}
        </div>
        
        {(helperText || errorMessage) && (
          <div className="mt-2">
            {isInvalid && errorMessage ? (
              <p className="text-sm text-red-600">{errorMessage}</p>
            ) : (
              helperText && (
                <p className="text-sm text-gray-600">{helperText}</p>
              )
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Componente TextArea
export const TextArea = forwardRef<HTMLTextAreaElement, InputProps & { rows?: number }>(
  ({
    variant = 'outline',
    size = 'md',
    colorScheme = 'blue',
    isInvalid = false,
    isDisabled = false,
    isReadOnly = false,
    isRequired = false,
    label,
    helperText,
    errorMessage,
    placeholder,
    className,
    id,
    rows = 4,
    ...props
  }, ref) => {
    const inputId = useId('textarea');
    const finalId = id || inputId;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={finalId}
            className={cn(
              'block text-sm font-medium mb-2',
              isInvalid ? 'text-red-700' : 'text-gray-700',
              isDisabled && 'opacity-50'
            )}
          >
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <textarea
          ref={ref}
          id={finalId}
          rows={rows}
          placeholder={placeholder}
          disabled={isDisabled}
          readOnly={isReadOnly}
          required={isRequired}
          className={cn(
            getInputClasses(variant, size, colorScheme),
            'resize-vertical',
            {
              'border-red-500 focus:border-red-500 focus:ring-red-500': isInvalid,
              'opacity-50 cursor-not-allowed': isDisabled,
              'bg-gray-50 cursor-default': isReadOnly,
            },
            className
          )}
          {...props}
        />
        
        {(helperText || errorMessage) && (
          <div className="mt-2">
            {isInvalid && errorMessage ? (
              <p className="text-sm text-red-600">{errorMessage}</p>
            ) : (
              helperText && (
                <p className="text-sm text-gray-600">{helperText}</p>
              )
            )}
          </div>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

// Componente Select
export const Select = forwardRef<HTMLSelectElement, InputProps & { children: React.ReactNode }>(
  ({
    variant = 'outline',
    size = 'md',
    colorScheme = 'blue',
    isInvalid = false,
    isDisabled = false,
    isRequired = false,
    label,
    helperText,
    errorMessage,
    placeholder,
    className,
    id,
    children,
    ...props
  }, ref) => {
    const inputId = useId('select');
    const finalId = id || inputId;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={finalId}
            className={cn(
              'block text-sm font-medium mb-2',
              isInvalid ? 'text-red-700' : 'text-gray-700',
              isDisabled && 'opacity-50'
            )}
          >
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <select
            ref={ref}
            id={finalId}
            disabled={isDisabled}
            required={isRequired}
            className={cn(
              getInputClasses(variant, size, colorScheme),
              'pr-10 appearance-none bg-white',
              {
                'border-red-500 focus:border-red-500 focus:ring-red-500': isInvalid,
                'opacity-50 cursor-not-allowed': isDisabled,
              },
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>
          
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {(helperText || errorMessage) && (
          <div className="mt-2">
            {isInvalid && errorMessage ? (
              <p className="text-sm text-red-600">{errorMessage}</p>
            ) : (
              helperText && (
                <p className="text-sm text-gray-600">{helperText}</p>
              )
            )}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';