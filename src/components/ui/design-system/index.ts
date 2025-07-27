// Design System - Exportaciones principales

// Tokens de diseño
export * from './tokens';

// Tipos
export * from './types';

// Utilidades
export * from './utils';

// Hooks personalizados
export * from './hooks';

// Componentes primitivos
export * from './primitives';

// Compound components
export * from './compounds';

// Componentes de layout
export * from './layout';

// Re-exportaciones organizadas por categoría
export {
  // Primitivos
  Button, PrimaryButton, SecondaryButton, OutlineButton, GhostButton, LinkButton,
  Input, TextArea, Select,
  Card, CardHeader, CardBody, CardFooter, CardTitle, CardDescription,
  ElevatedCard, OutlineCard, FilledCard, UnstyledCard, ImageCard, StatsCard,
} from './primitives';

export {
  // Compounds
  Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle, ModalDescription,
  useModalDisclosure, ConfirmModal,
  Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator,
  DropdownLabel, useDropdownDisclosure, DropdownMenu,
  Tabs, TabList, Tab, TabPanels, TabPanel, useTabsState, SimpleTabs,
} from './compounds';

export {
  // Layout
  Container, SmallContainer, MediumContainer, LargeContainer, ExtraLargeContainer,
  FullContainer, SectionContainer,
  Grid, GridItem, TwoColumnGrid, ThreeColumnGrid, FourColumnGrid, ResponsiveGrid,
  Stack, VStack, HStack, Flex, Spacer, Center, Square, Circle,
} from './layout';

export {
  // Hooks
  useToggle, useDisclosure, useClickOutside, useEscapeKey, useId, useDebounce,
  useThrottle, useAsync, useLocalStorage, useMediaQuery, useIsMobile, useIsDarkMode,
  useScroll, useIntersectionObserver, useClipboard, useFocusTrap, useForm,
} from './hooks';

export {
  // Utilidades
  cn, getVariantClasses, getSizeClasses, getColorSchemeClasses,
  getButtonClasses, getInputClasses, getCardClasses, getBadgeClasses, getAvatarClasses,
  validateProps, generateId, formatText, debounce, throttle, isMobile, isDarkMode,
  copyToClipboard, formatNumber, formatDate,
} from './utils';

export {
  // Tokens
  designTokens,
} from './tokens';