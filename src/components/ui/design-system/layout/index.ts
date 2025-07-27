// Exportaciones de componentes de layout del Design System

// Container components
export {
  Container,
  SmallContainer,
  MediumContainer,
  LargeContainer,
  ExtraLargeContainer,
  FullContainer,
  SectionContainer,
} from './Container';

// Grid components
export {
  Grid,
  GridItem,
  TwoColumnGrid,
  ThreeColumnGrid,
  FourColumnGrid,
  ResponsiveGrid,
} from './Grid';

// Stack and Flex components
export {
  Stack,
  VStack,
  HStack,
  Flex,
  Spacer,
  Center,
  Square,
  Circle,
} from './Stack';

// Re-export types for convenience
export type {
  ContainerProps,
  GridProps,
  StackProps,
  FlexProps,
} from '../types';
export type { SectionContainerProps, GridItemProps, CenterProps, SquareProps } from './Container';
export type { GridItemProps } from './Grid';
export type { CenterProps, SquareProps } from './Stack';