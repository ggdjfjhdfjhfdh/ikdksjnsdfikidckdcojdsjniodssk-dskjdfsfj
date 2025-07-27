import type { Meta, StoryObj } from '@storybook/react';
import { Button, PrimaryButton, SecondaryButton, OutlineButton, GhostButton, LinkButton } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Design System/Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente Button versátil con múltiples variantes, tamaños y esquemas de color. Incluye soporte para estados de carga, iconos y accesibilidad completa.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'link'],
      description: 'Variante visual del botón',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del botón',
    },
    colorScheme: {
      control: 'select',
      options: ['blue', 'green', 'red', 'yellow', 'purple', 'gray'],
      description: 'Esquema de color del botón',
    },
    isLoading: {
      control: 'boolean',
      description: 'Estado de carga del botón',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Estado deshabilitado del botón',
    },
    children: {
      control: 'text',
      description: 'Contenido del botón',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Historia principal
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    colorScheme: 'blue',
  },
};

// Variantes
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes variantes visuales del componente Button.',
      },
    },
  },
};

// Tamaños
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes tamaños disponibles para el componente Button.',
      },
    },
  },
};

// Esquemas de color
export const ColorSchemes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button colorScheme="blue">Blue</Button>
      <Button colorScheme="green">Green</Button>
      <Button colorScheme="red">Red</Button>
      <Button colorScheme="yellow">Yellow</Button>
      <Button colorScheme="purple">Purple</Button>
      <Button colorScheme="gray">Gray</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes esquemas de color disponibles.',
      },
    },
  },
};

// Estados
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>Normal</Button>
      <Button isLoading>Loading</Button>
      <Button isDisabled>Disabled</Button>
      <Button isLoading loadingText="Cargando...">Custom Loading</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes estados del botón: normal, cargando y deshabilitado.',
      },
    },
  },
};

// Con iconos
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button
        leftIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        }
      >
        Add Item
      </Button>
      <Button
        rightIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        }
      >
        Next
      </Button>
      <Button
        leftIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        }
        rightIcon={
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        }
      >
        Download
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Botones con iconos a la izquierda, derecha o ambos lados.',
      },
    },
  },
};

// Componentes específicos
export const SpecificComponents: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <PrimaryButton>Primary Button</PrimaryButton>
      <SecondaryButton>Secondary Button</SecondaryButton>
      <OutlineButton>Outline Button</OutlineButton>
      <GhostButton>Ghost Button</GhostButton>
      <LinkButton>Link Button</LinkButton>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Componentes específicos pre-configurados para cada variante.',
      },
    },
  },
};

// Casos de uso comunes
export const CommonUseCases: Story = {
  render: () => (
    <div className="space-y-6">
      {/* Acciones principales */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Acciones Principales</h3>
        <div className="flex gap-3">
          <Button variant="primary" colorScheme="blue">Guardar</Button>
          <Button variant="primary" colorScheme="green">Crear</Button>
          <Button variant="primary" colorScheme="red">Eliminar</Button>
        </div>
      </div>
      
      {/* Acciones secundarias */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Acciones Secundarias</h3>
        <div className="flex gap-3">
          <Button variant="outline">Cancelar</Button>
          <Button variant="ghost">Editar</Button>
          <Button variant="link">Ver más</Button>
        </div>
      </div>
      
      {/* Formularios */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Formularios</h3>
        <div className="flex gap-3">
          <Button variant="primary" type="submit">Enviar</Button>
          <Button variant="outline" type="button">Cancelar</Button>
          <Button variant="ghost" type="reset">Limpiar</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Casos de uso comunes organizados por contexto de aplicación.',
      },
    },
  },
};