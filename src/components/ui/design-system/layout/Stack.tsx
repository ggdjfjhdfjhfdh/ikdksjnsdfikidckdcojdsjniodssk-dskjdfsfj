'use client';

import React, { forwardRef } from 'react';
import { StackProps, FlexProps } from '../types';
import { cn } from '../utils';

// Stack Component (Vertical by default)
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({
    direction = 'column',
    spacing = 4,
    align = 'stretch',
    justify = 'start',
    wrap = false,
    divider,
    children,
    className,
    ...props
  }, ref) => {
    // Generar clases de spacing
    const getSpacingClass = (space: StackProps['spacing']) => {
      if (typeof space === 'number') {
        return direction === 'column' ? `space-y-${space}` : `space-x-${space}`;
      }
      if (typeof space === 'object') {
        const classes = [];
        const prefix = direction === 'column' ? 'space-y' : 'space-x';
        if (space.base) classes.push(`${prefix}-${space.base}`);
        if (space.sm) classes.push(`sm:${prefix}-${space.sm}`);
        if (space.md) classes.push(`md:${prefix}-${space.md}`);
        if (space.lg) classes.push(`lg:${prefix}-${space.lg}`);
        if (space.xl) classes.push(`xl:${prefix}-${space.xl}`);
        if (space['2xl']) classes.push(`2xl:${prefix}-${space['2xl']}`);
        return classes.join(' ');
      }
      return direction === 'column' ? 'space-y-4' : 'space-x-4';
    };

    const directionClasses = {
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse',
      column: 'flex-col',
      'column-reverse': 'flex-col-reverse',
    };

    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    };

    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    };

    const childrenArray = React.Children.toArray(children);
    const childrenWithDividers = divider
      ? childrenArray.reduce((acc: React.ReactNode[], child, index) => {
          acc.push(child);
          if (index < childrenArray.length - 1) {
            acc.push(
              <div key={`divider-${index}`} className="flex-shrink-0">
                {divider}
              </div>
            );
          }
          return acc;
        }, [])
      : children;

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          directionClasses[direction],
          alignClasses[align],
          justifyClasses[justify],
          {
            'flex-wrap': wrap,
          },
          !divider && getSpacingClass(spacing),
          className
        )}
        {...props}
      >
        {childrenWithDividers}
      </div>
    );
  }
);

Stack.displayName = 'Stack';

// VStack (Vertical Stack)
export const VStack = forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="column" {...props} />
);

// HStack (Horizontal Stack)
export const HStack = forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="row" {...props} />
);

VStack.displayName = 'VStack';
HStack.displayName = 'HStack';

// Flex Component (More flexible than Stack)
export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  ({
    direction = 'row',
    wrap = false,
    align = 'stretch',
    justify = 'start',
    gap = 0,
    grow = false,
    shrink = false,
    basis = 'auto',
    children,
    className,
    ...props
  }, ref) => {
    // Generar clases de gap
    const getGapClass = (gapValue: FlexProps['gap']) => {
      if (typeof gapValue === 'number') {
        return `gap-${gapValue}`;
      }
      if (typeof gapValue === 'object') {
        const classes = [];
        if (gapValue.base) classes.push(`gap-${gapValue.base}`);
        if (gapValue.sm) classes.push(`sm:gap-${gapValue.sm}`);
        if (gapValue.md) classes.push(`md:gap-${gapValue.md}`);
        if (gapValue.lg) classes.push(`lg:gap-${gapValue.lg}`);
        if (gapValue.xl) classes.push(`xl:gap-${gapValue.xl}`);
        if (gapValue['2xl']) classes.push(`2xl:gap-${gapValue['2xl']}`);
        return classes.join(' ');
      }
      return '';
    };

    const directionClasses = {
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse',
      column: 'flex-col',
      'column-reverse': 'flex-col-reverse',
    };

    const wrapClasses = {
      true: 'flex-wrap',
      false: 'flex-nowrap',
      reverse: 'flex-wrap-reverse',
    };

    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    };

    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    };

    const flexClasses = [];
    if (grow) flexClasses.push('flex-grow');
    if (shrink) flexClasses.push('flex-shrink');
    if (basis !== 'auto') {
      if (typeof basis === 'string') {
        flexClasses.push(`flex-basis-${basis}`);
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          directionClasses[direction],
          wrapClasses[wrap as keyof typeof wrapClasses],
          alignClasses[align],
          justifyClasses[justify],
          getGapClass(gap),
          ...flexClasses,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Flex.displayName = 'Flex';

// Spacer Component
export const Spacer = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex-grow', className)}
      {...props}
    />
  )
);

Spacer.displayName = 'Spacer';

// Center Component
export interface CenterProps extends React.HTMLAttributes<HTMLDivElement> {
  inline?: boolean;
}

export const Center = forwardRef<HTMLDivElement, CenterProps>(
  ({ inline = false, children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        inline ? 'inline-flex' : 'flex',
        'items-center justify-center',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Center.displayName = 'Center';

// Square Component (Equal width and height)
export interface SquareProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: string | number;
}

export const Square = forwardRef<HTMLDivElement, SquareProps>(
  ({ size = '10', children, className, style, ...props }, ref) => {
    const sizeClass = typeof size === 'string' ? `w-${size} h-${size}` : '';
    const sizeStyle = typeof size === 'number' ? { width: size, height: size } : {};

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center flex-shrink-0',
          sizeClass,
          className
        )}
        style={{ ...sizeStyle, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Square.displayName = 'Square';

// Circle Component
export const Circle = forwardRef<HTMLDivElement, SquareProps>(
  ({ size = '10', children, className, ...props }, ref) => (
    <Square
      ref={ref}
      size={size}
      className={cn('rounded-full', className)}
      {...props}
    >
      {children}
    </Square>
  )
);

Circle.displayName = 'Circle';