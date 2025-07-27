// Tipos base del Design System
import { ReactNode, HTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';
import { colors, spacing, typography, borderRadius, shadows } from './tokens';

// Tipos de variantes comunes
export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'ghost' | 'outline';
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ColorScheme = 'blue' | 'gray' | 'green' | 'yellow' | 'red' | 'cyan';

// Props base para todos los componentes
export interface BaseProps {
  className?: string;
  children?: ReactNode;
  id?: string;
  'data-testid'?: string;
}

// Props para componentes con variantes
export interface VariantProps {
  variant?: Variant;
  size?: Size;
  colorScheme?: ColorScheme;
}

// Props para componentes interactivos
export interface InteractiveProps {
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

// Props específicas para botones
export interface ButtonProps extends BaseProps, VariantProps, InteractiveProps {
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}

// Props específicas para inputs
export interface InputProps extends BaseProps, Omit<VariantProps, 'variant'> {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  autoComplete?: string;
  autoFocus?: boolean;
}

// Props para cards
export interface CardProps extends BaseProps {
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: keyof typeof spacing;
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

// Props para badges
export interface BadgeProps extends BaseProps, VariantProps {
  dot?: boolean;
  pill?: boolean;
}

// Props para avatares
export interface AvatarProps extends BaseProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: Size;
  fallback?: ReactNode;
  loading?: boolean;
}

// Props para modales
export interface ModalProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  footer?: ReactNode;
}

// Props para tooltips
export interface TooltipProps extends BaseProps {
  content: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  delay?: number;
  disabled?: boolean;
}

// Props para dropdowns
export interface DropdownProps extends BaseProps {
  trigger: ReactNode;
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  offset?: number;
  closeOnSelect?: boolean;
  disabled?: boolean;
}

// Props para tabs
export interface TabsProps extends BaseProps {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'line' | 'enclosed' | 'soft-rounded';
}

export interface TabProps extends BaseProps {
  value: string;
  disabled?: boolean;
}

export interface TabPanelProps extends BaseProps {
  value: string;
}

// Props para accordion
export interface AccordionProps extends BaseProps {
  allowMultiple?: boolean;
  allowToggle?: boolean;
  defaultIndex?: number | number[];
  index?: number | number[];
  onChange?: (index: number | number[]) => void;
}

export interface AccordionItemProps extends BaseProps {
  isDisabled?: boolean;
}

// Props para progress
export interface ProgressProps extends BaseProps, Pick<VariantProps, 'colorScheme' | 'size'> {
  value?: number;
  max?: number;
  min?: number;
  isIndeterminate?: boolean;
  hasStripe?: boolean;
  isAnimated?: boolean;
}

// Props para switch
export interface SwitchProps extends BaseProps, Pick<VariantProps, 'colorScheme' | 'size'> {
  isChecked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
}

// Props para checkbox
export interface CheckboxProps extends BaseProps, Pick<VariantProps, 'colorScheme' | 'size'> {
  isChecked?: boolean;
  isIndeterminate?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
}

// Props para radio
export interface RadioProps extends BaseProps, Pick<VariantProps, 'colorScheme' | 'size'> {
  isChecked?: boolean;
  defaultChecked?: boolean;
  onChange?: (value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  value: string;
}

export interface RadioGroupProps extends BaseProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  required?: boolean;
}

// Props para select
export interface SelectProps extends BaseProps, Pick<VariantProps, 'size'> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  loading?: boolean;
  options: SelectOption[];
}

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  group?: string;
}

// Props para textarea
export interface TextareaProps extends BaseProps, Pick<VariantProps, 'size'> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: boolean;
  rows?: number;
  cols?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  autoResize?: boolean;
}

// Props para alert
export interface AlertProps extends BaseProps {
  status?: 'info' | 'warning' | 'success' | 'error';
  variant?: 'subtle' | 'solid' | 'left-accent' | 'top-accent';
  title?: string;
  description?: string;
  icon?: ReactNode;
  isClosable?: boolean;
  onClose?: () => void;
}

// Props para skeleton
export interface SkeletonProps extends BaseProps {
  height?: string | number;
  width?: string | number;
  isLoaded?: boolean;
  fadeDuration?: number;
  speed?: number;
  startColor?: string;
  endColor?: string;
}

// Props para spinner
export interface SpinnerProps extends BaseProps, Pick<VariantProps, 'size' | 'colorScheme'> {
  thickness?: string;
  speed?: string;
  emptyColor?: string;
  label?: string;
}

// Props para divider
export interface DividerProps extends BaseProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed';
  colorScheme?: ColorScheme;
}

// Compound Components Props
export interface SearchBoxProps extends BaseProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  loading?: boolean;
  suggestions?: string[];
  showSuggestions?: boolean;
  clearable?: boolean;
  size?: Size;
}

export interface DataTableColumn<T = any> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  fixed?: 'left' | 'right';
}

export interface DataTableProps<T = any> extends BaseProps {
  columns: DataTableColumn<T>[];
  data: T[];
  loading?: boolean;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  rowSelection?: {
    selectedRowKeys: string[];
    onChange: (selectedRowKeys: string[], selectedRows: T[]) => void;
  };
  onRow?: (record: T, index: number) => HTMLAttributes<HTMLTableRowElement>;
  scroll?: { x?: number; y?: number };
  size?: 'sm' | 'md' | 'lg';
}

// Layout Props
export interface ContainerProps extends BaseProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  centerContent?: boolean;
  padding?: keyof typeof spacing;
}

export interface GridProps extends BaseProps {
  columns?: number | { [key: string]: number };
  gap?: keyof typeof spacing;
  rowGap?: keyof typeof spacing;
  columnGap?: keyof typeof spacing;
  autoFlow?: 'row' | 'column' | 'dense';
  autoRows?: string;
  autoCols?: string;
}

export interface StackProps extends BaseProps {
  direction?: 'row' | 'column';
  spacing?: keyof typeof spacing;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  divider?: ReactNode;
}

export interface FlexProps extends BaseProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: keyof typeof spacing;
}

export interface SectionProps extends BaseProps {
  as?: 'section' | 'div' | 'article' | 'aside' | 'header' | 'footer' | 'main';
  padding?: keyof typeof spacing;
  margin?: keyof typeof spacing;
  background?: string;
  minHeight?: string;
}