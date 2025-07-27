'use client';

import React, { forwardRef } from 'react';
import { GridProps } from '../types';
import { cn } from '../utils';

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({
    columns = 1,
    gap = 4,
    rows,
    autoFlow = 'row',
    alignItems = 'stretch',
    justifyItems = 'stretch',
    children,
    className,
    ...props
  }, ref) => {
    // Generar clases de columnas
    const getColumnsClass = (cols: GridProps['columns']) => {
      if (typeof cols === 'number') {
        return `grid-cols-${cols}`;
      }
      if (typeof cols === 'object') {
        const classes = [];
        if (cols.base) classes.push(`grid-cols-${cols.base}`);
        if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
        if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
        if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
        if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);
        if (cols['2xl']) classes.push(`2xl:grid-cols-${cols['2xl']}`);
        return classes.join(' ');
      }
      return 'grid-cols-1';
    };

    // Generar clases de filas
    const getRowsClass = (rowsValue: GridProps['rows']) => {
      if (!rowsValue) return '';
      if (typeof rowsValue === 'number') {
        return `grid-rows-${rowsValue}`;
      }
      if (typeof rowsValue === 'object') {
        const classes = [];
        if (rowsValue.base) classes.push(`grid-rows-${rowsValue.base}`);
        if (rowsValue.sm) classes.push(`sm:grid-rows-${rowsValue.sm}`);
        if (rowsValue.md) classes.push(`md:grid-rows-${rowsValue.md}`);
        if (rowsValue.lg) classes.push(`lg:grid-rows-${rowsValue.lg}`);
        if (rowsValue.xl) classes.push(`xl:grid-rows-${rowsValue.xl}`);
        if (rowsValue['2xl']) classes.push(`2xl:grid-rows-${rowsValue['2xl']}`);
        return classes.join(' ');
      }
      return '';
    };

    // Generar clases de gap
    const getGapClass = (gapValue: GridProps['gap']) => {
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
      return 'gap-4';
    };

    const autoFlowClasses = {
      row: 'grid-flow-row',
      col: 'grid-flow-col',
      'row-dense': 'grid-flow-row-dense',
      'col-dense': 'grid-flow-col-dense',
    };

    const alignItemsClasses = {
      start: 'items-start',
      end: 'items-end',
      center: 'items-center',
      stretch: 'items-stretch',
    };

    const justifyItemsClasses = {
      start: 'justify-items-start',
      end: 'justify-items-end',
      center: 'justify-items-center',
      stretch: 'justify-items-stretch',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          getColumnsClass(columns),
          getRowsClass(rows),
          getGapClass(gap),
          autoFlowClasses[autoFlow],
          alignItemsClasses[alignItems],
          justifyItemsClasses[justifyItems],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

// Grid Item
export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: number | {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  rowSpan?: number | {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  colStart?: number;
  colEnd?: number;
  rowStart?: number;
  rowEnd?: number;
}

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({
    colSpan,
    rowSpan,
    colStart,
    colEnd,
    rowStart,
    rowEnd,
    children,
    className,
    ...props
  }, ref) => {
    // Generar clases de colSpan
    const getColSpanClass = (span: GridItemProps['colSpan']) => {
      if (!span) return '';
      if (typeof span === 'number') {
        return `col-span-${span}`;
      }
      if (typeof span === 'object') {
        const classes = [];
        if (span.base) classes.push(`col-span-${span.base}`);
        if (span.sm) classes.push(`sm:col-span-${span.sm}`);
        if (span.md) classes.push(`md:col-span-${span.md}`);
        if (span.lg) classes.push(`lg:col-span-${span.lg}`);
        if (span.xl) classes.push(`xl:col-span-${span.xl}`);
        if (span['2xl']) classes.push(`2xl:col-span-${span['2xl']}`);
        return classes.join(' ');
      }
      return '';
    };

    // Generar clases de rowSpan
    const getRowSpanClass = (span: GridItemProps['rowSpan']) => {
      if (!span) return '';
      if (typeof span === 'number') {
        return `row-span-${span}`;
      }
      if (typeof span === 'object') {
        const classes = [];
        if (span.base) classes.push(`row-span-${span.base}`);
        if (span.sm) classes.push(`sm:row-span-${span.sm}`);
        if (span.md) classes.push(`md:row-span-${span.md}`);
        if (span.lg) classes.push(`lg:row-span-${span.lg}`);
        if (span.xl) classes.push(`xl:row-span-${span.xl}`);
        if (span['2xl']) classes.push(`2xl:row-span-${span['2xl']}`);
        return classes.join(' ');
      }
      return '';
    };

    return (
      <div
        ref={ref}
        className={cn(
          getColSpanClass(colSpan),
          getRowSpanClass(rowSpan),
          colStart && `col-start-${colStart}`,
          colEnd && `col-end-${colEnd}`,
          rowStart && `row-start-${rowStart}`,
          rowEnd && `row-end-${rowEnd}`,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GridItem.displayName = 'GridItem';

// Grids predefinidas comunes
export const TwoColumnGrid = forwardRef<HTMLDivElement, Omit<GridProps, 'columns'>>(
  (props, ref) => (
    <Grid
      ref={ref}
      columns={{ base: 1, md: 2 }}
      {...props}
    />
  )
);

export const ThreeColumnGrid = forwardRef<HTMLDivElement, Omit<GridProps, 'columns'>>(
  (props, ref) => (
    <Grid
      ref={ref}
      columns={{ base: 1, md: 2, lg: 3 }}
      {...props}
    />
  )
);

export const FourColumnGrid = forwardRef<HTMLDivElement, Omit<GridProps, 'columns'>>(
  (props, ref) => (
    <Grid
      ref={ref}
      columns={{ base: 1, sm: 2, lg: 4 }}
      {...props}
    />
  )
);

export const ResponsiveGrid = forwardRef<HTMLDivElement, Omit<GridProps, 'columns'>>(
  (props, ref) => (
    <Grid
      ref={ref}
      columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 6 }}
      {...props}
    />
  )
);

TwoColumnGrid.displayName = 'TwoColumnGrid';
ThreeColumnGrid.displayName = 'ThreeColumnGrid';
FourColumnGrid.displayName = 'FourColumnGrid';
ResponsiveGrid.displayName = 'ResponsiveGrid';