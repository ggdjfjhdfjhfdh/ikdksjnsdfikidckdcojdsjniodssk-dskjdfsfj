'use client';

import React, { forwardRef } from 'react';
import { CardProps } from '../types';
import { cn, getCardClasses } from '../utils';

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({
    variant = 'elevated',
    size = 'md',
    colorScheme = 'white',
    isHoverable = false,
    isClickable = false,
    children,
    className,
    onClick,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          getCardClasses(variant, size, colorScheme),
          {
            'hover:shadow-lg transition-shadow duration-200': isHoverable,
            'cursor-pointer hover:shadow-md transition-all duration-200': isClickable,
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2': isClickable,
          },
          className
        )}
        onClick={onClick}
        tabIndex={isClickable ? 0 : undefined}
        role={isClickable ? 'button' : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

// Componentes de Card compuestos
export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-6 py-4 border-b border-gray-200', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

export const CardBody = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardBody.displayName = 'CardBody';

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('px-6 py-4 border-t border-gray-200 bg-gray-50', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';

export const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold text-gray-900', className)}
      {...props}
    >
      {children}
    </h3>
  )
);

CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
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

CardDescription.displayName = 'CardDescription';

// Variantes específicas de Card
export const ElevatedCard = forwardRef<HTMLDivElement, Omit<CardProps, 'variant'>>(
  (props, ref) => <Card ref={ref} variant="elevated" {...props} />
);

export const OutlineCard = forwardRef<HTMLDivElement, Omit<CardProps, 'variant'>>(
  (props, ref) => <Card ref={ref} variant="outline" {...props} />
);

export const FilledCard = forwardRef<HTMLDivElement, Omit<CardProps, 'variant'>>(
  (props, ref) => <Card ref={ref} variant="filled" {...props} />
);

export const UnstyledCard = forwardRef<HTMLDivElement, Omit<CardProps, 'variant'>>(
  (props, ref) => <Card ref={ref} variant="unstyled" {...props} />
);

ElevatedCard.displayName = 'ElevatedCard';
OutlineCard.displayName = 'OutlineCard';
FilledCard.displayName = 'FilledCard';
UnstyledCard.displayName = 'UnstyledCard';

// Card con imagen
export interface ImageCardProps extends CardProps {
  imageSrc: string;
  imageAlt: string;
  imagePosition?: 'top' | 'left' | 'right';
}

export const ImageCard = forwardRef<HTMLDivElement, ImageCardProps>(
  ({
    imageSrc,
    imageAlt,
    imagePosition = 'top',
    children,
    className,
    ...props
  }, ref) => {
    const isHorizontal = imagePosition === 'left' || imagePosition === 'right';
    
    return (
      <Card
        ref={ref}
        className={cn(
          {
            'flex': isHorizontal,
            'flex-row': imagePosition === 'left',
            'flex-row-reverse': imagePosition === 'right',
          },
          className
        )}
        {...props}
      >
        <div className={cn(
          'overflow-hidden',
          {
            'rounded-t-lg': imagePosition === 'top',
            'rounded-l-lg w-1/3': imagePosition === 'left',
            'rounded-r-lg w-1/3': imagePosition === 'right',
          }
        )}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className={cn(
          {
            'flex-1': isHorizontal,
          }
        )}>
          {children}
        </div>
      </Card>
    );
  }
);

ImageCard.displayName = 'ImageCard';

// Card con estadísticas
export interface StatsCardProps extends Omit<CardProps, 'children'> {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  icon?: React.ReactNode;
}

export const StatsCard = forwardRef<HTMLDivElement, StatsCardProps>(
  ({
    title,
    value,
    change,
    icon,
    className,
    ...props
  }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn('p-6', className)}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {change && (
              <div className="flex items-center mt-2">
                <span
                  className={cn(
                    'text-sm font-medium',
                    {
                      'text-green-600': change.type === 'increase',
                      'text-red-600': change.type === 'decrease',
                      'text-gray-600': change.type === 'neutral',
                    }
                  )}
                >
                  {change.type === 'increase' && '↗'}
                  {change.type === 'decrease' && '↘'}
                  {change.type === 'neutral' && '→'}
                  {' '}{change.value}
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div className="flex-shrink-0 ml-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                {icon}
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  }
);

StatsCard.displayName = 'StatsCard';