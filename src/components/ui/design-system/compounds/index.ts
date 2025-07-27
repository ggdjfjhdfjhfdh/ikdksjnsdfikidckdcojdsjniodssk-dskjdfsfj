// Exportaciones de compound components del Design System

// Modal components
export {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  useModalDisclosure,
  ConfirmModal,
} from './Modal';

// Dropdown components
export {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
  useDropdownDisclosure,
  DropdownMenu,
} from './Dropdown';

// Tabs components
export {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useTabsState,
  SimpleTabs,
} from './Tabs';

// Re-export types for convenience
export type {
  ModalProps,
  DropdownProps,
  TabsProps,
} from '../types';
export type { ConfirmModalProps } from './Modal';
export type { DropdownMenuProps } from './Dropdown';
export type { SimpleTabsProps } from './Tabs';