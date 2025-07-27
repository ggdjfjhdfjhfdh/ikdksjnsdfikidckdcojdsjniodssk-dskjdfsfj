'use client';

import React, { forwardRef } from 'react';
import { ContainerProps } from '../types';
import { cn } from '../utils';

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({
    maxWidth = 'lg',
    centerContent = false,
    children,
    className,
    ...props
  }, ref) => {
    const sizeClasses = {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-screen-2xl',
      full: 'max-w-full',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'w-full mx-auto px-4 sm:px-6 lg:px-8',
          sizeClasses[maxWidth],
          {
            'flex items-center justify-center min-h-screen': centerContent,
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

// Variantes específicas del Container
export const SmallContainer = forwardRef<HTMLDivElement, Omit<ContainerProps, 'maxWidth'>>(
  (props, ref) => <Container ref={ref} maxWidth="sm" {...props} />
);

export const MediumContainer = forwardRef<HTMLDivElement, Omit<ContainerProps, 'maxWidth'>>(
  (props, ref) => <Container ref={ref} maxWidth="md" {...props} />
);

export const LargeContainer = forwardRef<HTMLDivElement, Omit<ContainerProps, 'maxWidth'>>(
  (props, ref) => <Container ref={ref} maxWidth="lg" {...props} />
);

export const ExtraLargeContainer = forwardRef<HTMLDivElement, Omit<ContainerProps, 'maxWidth'>>(
  (props, ref) => <Container ref={ref} maxWidth="xl" {...props} />
);

export const FullContainer = forwardRef<HTMLDivElement, Omit<ContainerProps, 'maxWidth'>>(
  (props, ref) => <Container ref={ref} maxWidth="full" {...props} />
);

SmallContainer.displayName = 'SmallContainer';
MediumContainer.displayName = 'MediumContainer';
LargeContainer.displayName = 'LargeContainer';
ExtraLargeContainer.displayName = 'ExtraLargeContainer';
FullContainer.displayName = 'FullContainer';

// Container con sección
export interface SectionContainerProps extends ContainerProps {
  as?: 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main' | 'nav';
}

export const SectionContainer = forwardRef<HTMLElement, SectionContainerProps>(
  ({
    as: Component = 'section',
    maxWidth = 'lg',
    centerContent = false,
    children,
    className,
    ...props
  }, ref) => {
    const sizeClasses = {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-screen-2xl',
      full: 'max-w-full',
    };

    return (
      <Component
        ref={ref as any}
        className={cn(
          'w-full mx-auto px-4 sm:px-6 lg:px-8',
          sizeClasses[maxWidth],
          {
            'flex items-center justify-center min-h-screen': centerContent,
          },
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

SectionContainer.displayName = 'SectionContainer';