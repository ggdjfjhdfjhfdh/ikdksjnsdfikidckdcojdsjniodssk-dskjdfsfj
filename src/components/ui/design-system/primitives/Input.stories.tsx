import type { Meta, StoryObj } from '@storybook/react';
import { Input, TextArea, Select } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Design System/Primitives/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente Input versátil con soporte para diferentes variantes, validación, elementos auxiliares y accesibilidad completa. Incluye TextArea y Select.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'flushed', 'unstyled'],
      description: 'Variante visual del input',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño del input',
    },
    colorScheme: {
      control: 'select',
      options: ['blue', 'green', 'red', 'yellow', 'purple', 'gray'],
      description: 'Esquema de color del input',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Estado de error del input',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Estado deshabilitado del input',
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Estado de solo lectura',
    },
    isRequired: {
      control: 'boolean',
      description: 'Campo requerido',
    },
    placeholder: {
      control: 'text',
      description: 'Texto de placeholder',
    },
    label: {
      control: 'text',
      description: 'Etiqueta del input',
    },
    helperText: {
      control: 'text',
      description: 'Texto de ayuda',
    },
    errorMessage: {
      control: 'text',
      description: 'Mensaje de error',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Historia principal
export const Default: Story = {
  args: {
    placeholder: 'Ingresa tu texto aquí...',
    variant: 'outline',
    size: 'md',
    colorScheme: 'blue',
  },
};

// Variantes
export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input variant="outline" placeholder="Outline variant" />
      <Input variant="filled" placeholder="Filled variant" />
      <Input variant="flushed" placeholder="Flushed variant" />
      <Input variant="unstyled" placeholder="Unstyled variant" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes variantes visuales del componente Input.',
      },
    },
  },
};

// Tamaños
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes tamaños disponibles para el componente Input.',
      },
    },
  },
};

// Con etiquetas y ayuda
export const WithLabelsAndHelp: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Input
        label="Nombre de usuario"
        placeholder="Ingresa tu nombre de usuario"
        helperText="Debe tener al menos 3 caracteres"
      />
      <Input
        label="Email"
        type="email"
        placeholder="tu@email.com"
        helperText="Usaremos este email para contactarte"
        isRequired
      />
      <Input
        label="Contraseña"
        type="password"
        placeholder="••••••••"
        helperText="Mínimo 8 caracteres"
        isRequired
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Inputs con etiquetas, texto de ayuda y campos requeridos.',
      },
    },
  },
};

// Estados
export const States: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input label="Normal" placeholder="Estado normal" />
      <Input label="Deshabilitado" placeholder="Estado deshabilitado" isDisabled />
      <Input label="Solo lectura" value="Valor de solo lectura" isReadOnly />
      <Input
        label="Con error"
        placeholder="Campo con error"
        isInvalid
        errorMessage="Este campo es requerido"
      />
      <Input
        label="Requerido"
        placeholder="Campo requerido"
        isRequired
        helperText="Este campo es obligatorio"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes estados del input: normal, deshabilitado, solo lectura, error y requerido.',
      },
    },
  },
};

// Con elementos auxiliares
export const WithElements: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        label="Buscar"
        placeholder="Buscar productos..."
        leftElement={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        }
      />
      <Input
        label="Precio"
        type="number"
        placeholder="0.00"
        rightElement={
          <span className="text-gray-500 text-sm">EUR</span>
        }
      />
      <Input
        label="Sitio web"
        type="url"
        placeholder="miempresa.com"
        leftElement={
          <span className="text-gray-500 text-sm">https://</span>
        }
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Inputs con elementos auxiliares a la izquierda y derecha.',
      },
    },
  },
};

// Tipos de input
export const InputTypes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input label="Texto" type="text" placeholder="Texto normal" />
      <Input label="Email" type="email" placeholder="tu@email.com" />
      <Input label="Contraseña" type="password" placeholder="••••••••" />
      <Input label="Número" type="number" placeholder="123" />
      <Input label="Teléfono" type="tel" placeholder="+34 123 456 789" />
      <Input label="URL" type="url" placeholder="https://ejemplo.com" />
      <Input label="Fecha" type="date" />
      <Input label="Hora" type="time" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes tipos de input HTML soportados.',
      },
    },
  },
};

// TextArea
export const TextAreaExample: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <TextArea
        label="Descripción"
        placeholder="Escribe una descripción detallada..."
        rows={4}
        helperText="Máximo 500 caracteres"
      />
      <TextArea
        label="Comentarios"
        placeholder="Tus comentarios..."
        rows={6}
        isRequired
      />
      <TextArea
        label="Con error"
        placeholder="TextArea con error"
        isInvalid
        errorMessage="El contenido es demasiado corto"
        rows={3}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Componente TextArea para texto multilínea.',
      },
    },
  },
};

// Select
export const SelectExample: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Select
        label="País"
        placeholder="Selecciona un país"
        helperText="Selecciona tu país de residencia"
      >
        <option value="es">España</option>
        <option value="fr">Francia</option>
        <option value="de">Alemania</option>
        <option value="it">Italia</option>
        <option value="pt">Portugal</option>
      </Select>
      
      <Select
        label="Prioridad"
        isRequired
        helperText="Nivel de prioridad del ticket"
      >
        <option value="low">Baja</option>
        <option value="medium">Media</option>
        <option value="high">Alta</option>
        <option value="critical">Crítica</option>
      </Select>
      
      <Select
        label="Estado"
        isDisabled
        value="pending"
      >
        <option value="pending">Pendiente</option>
        <option value="approved">Aprobado</option>
        <option value="rejected">Rechazado</option>
      </Select>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Componente Select para selección de opciones.',
      },
    },
  },
};

// Formulario completo
export const CompleteForm: Story = {
  render: () => (
    <div className="space-y-6 w-96 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-900">Registro de Usuario</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Nombre"
          placeholder="Tu nombre"
          isRequired
        />
        <Input
          label="Apellidos"
          placeholder="Tus apellidos"
          isRequired
        />
      </div>
      
      <Input
        label="Email"
        type="email"
        placeholder="tu@email.com"
        isRequired
        helperText="Usaremos este email para enviarte notificaciones"
      />
      
      <Input
        label="Contraseña"
        type="password"
        placeholder="••••••••"
        isRequired
        helperText="Mínimo 8 caracteres, incluye mayúsculas y números"
      />
      
      <Select
        label="País"
        placeholder="Selecciona tu país"
        isRequired
      >
        <option value="es">España</option>
        <option value="fr">Francia</option>
        <option value="de">Alemania</option>
        <option value="it">Italia</option>
      </Select>
      
      <TextArea
        label="Biografía"
        placeholder="Cuéntanos algo sobre ti... (opcional)"
        rows={4}
        helperText="Máximo 500 caracteres"
      />
      
      <div className="flex gap-3 pt-4">
        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
          Registrarse
        </button>
        <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
          Cancelar
        </button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo de formulario completo usando todos los componentes de input.',
      },
    },
  },
};