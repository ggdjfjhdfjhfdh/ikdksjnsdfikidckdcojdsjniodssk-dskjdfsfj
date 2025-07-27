import type { Meta, StoryObj } from '@storybook/react';
import {
  Stack,
  VStack,
  HStack,
  Flex,
  Spacer,
  Center,
  Square,
  Circle,
} from './Stack';

const meta: Meta<typeof Stack> = {
  title: 'Design System/Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Sistema de Stack flexible para organizar elementos en filas o columnas con espaciado, alineación y divisores. Incluye variantes especializadas como VStack, HStack, Flex, Spacer, Center, Square y Circle.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column'],
      description: 'Dirección del stack',
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Espaciado entre elementos',
    },
    align: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch'],
      description: 'Alineación de los elementos',
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'between', 'around', 'evenly'],
      description: 'Justificación de los elementos',
    },
    wrap: {
      control: 'boolean',
      description: 'Permite que los elementos se envuelvan',
    },
    divider: {
      control: 'boolean',
      description: 'Muestra divisores entre elementos',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Componente auxiliar para mostrar items del stack
const StackItem = ({ children, className = '', ...props }: any) => (
  <div className={`bg-blue-100 border-2 border-blue-300 rounded-lg p-4 text-center ${className}`} {...props}>
    {children}
  </div>
);

// Historia principal
export const Default: Story = {
  args: {
    direction: 'column',
    spacing: 'md',
    children: (
      <>
        <StackItem>Item 1</StackItem>
        <StackItem>Item 2</StackItem>
        <StackItem>Item 3</StackItem>
      </>
    ),
  },
};

// Direcciones
export const Directions: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Stack Vertical (Column)</h3>
        <Stack direction="column" spacing="md">
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Stack Horizontal (Row)</h3>
        <Stack direction="row" spacing="md">
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
        </Stack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Stack en diferentes direcciones: vertical (column) y horizontal (row).',
      },
    },
  },
};

// Espaciados
export const Spacing: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Sin espaciado (none)</h3>
        <Stack direction="row" spacing="none">
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Espaciado pequeño (sm)</h3>
        <Stack direction="row" spacing="sm">
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Espaciado mediano (md)</h3>
        <Stack direction="row" spacing="md">
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Espaciado grande (lg)</h3>
        <Stack direction="row" spacing="lg">
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Espaciado extra grande (xl)</h3>
        <Stack direction="row" spacing="xl">
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
        </Stack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes opciones de espaciado entre elementos del stack.',
      },
    },
  },
};

// Alineación
export const Alignment: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Alineación: start</h3>
        <Stack direction="row" spacing="md" align="start" className="h-32 bg-gray-50 p-4">
          <StackItem className="h-16">Item 1</StackItem>
          <StackItem className="h-20">Item 2</StackItem>
          <StackItem className="h-12">Item 3</StackItem>
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Alineación: center</h3>
        <Stack direction="row" spacing="md" align="center" className="h-32 bg-gray-50 p-4">
          <StackItem className="h-16">Item 1</StackItem>
          <StackItem className="h-20">Item 2</StackItem>
          <StackItem className="h-12">Item 3</StackItem>
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Alineación: end</h3>
        <Stack direction="row" spacing="md" align="end" className="h-32 bg-gray-50 p-4">
          <StackItem className="h-16">Item 1</StackItem>
          <StackItem className="h-20">Item 2</StackItem>
          <StackItem className="h-12">Item 3</StackItem>
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Alineación: stretch</h3>
        <Stack direction="row" spacing="md" align="stretch" className="h-32 bg-gray-50 p-4">
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
        </Stack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes opciones de alineación para los elementos del stack.',
      },
    },
  },
};

// Justificación
export const Justification: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Justificación: start</h3>
        <Stack direction="row" spacing="md" justify="start" className="bg-gray-50 p-4">
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Justificación: center</h3>
        <Stack direction="row" spacing="md" justify="center" className="bg-gray-50 p-4">
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Justificación: end</h3>
        <Stack direction="row" spacing="md" justify="end" className="bg-gray-50 p-4">
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Justificación: between</h3>
        <Stack direction="row" spacing="none" justify="between" className="bg-gray-50 p-4">
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Justificación: around</h3>
        <Stack direction="row" spacing="none" justify="around" className="bg-gray-50 p-4">
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Justificación: evenly</h3>
        <Stack direction="row" spacing="none" justify="evenly" className="bg-gray-50 p-4">
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
        </Stack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes opciones de justificación para los elementos del stack.',
      },
    },
  },
};

// Con divisores
export const WithDividers: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Stack Vertical con Divisores</h3>
        <Stack direction="column" spacing="md" divider className="max-w-md">
          <StackItem>Primer elemento</StackItem>
          <StackItem>Segundo elemento</StackItem>
          <StackItem>Tercer elemento</StackItem>
          <StackItem>Cuarto elemento</StackItem>
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Stack Horizontal con Divisores</h3>
        <Stack direction="row" spacing="md" divider>
          <StackItem>Item 1</StackItem>
          <StackItem>Item 2</StackItem>
          <StackItem>Item 3</StackItem>
          <StackItem>Item 4</StackItem>
        </Stack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Stack con divisores entre elementos.',
      },
    },
  },
};

// Wrap
export const WithWrap: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Stack sin Wrap (por defecto)</h3>
        <div className="w-96 border-2 border-dashed border-gray-300 p-4">
          <Stack direction="row" spacing="md">
            <StackItem className="w-32">Item 1</StackItem>
            <StackItem className="w-32">Item 2</StackItem>
            <StackItem className="w-32">Item 3</StackItem>
            <StackItem className="w-32">Item 4</StackItem>
            <StackItem className="w-32">Item 5</StackItem>
          </Stack>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Stack con Wrap</h3>
        <div className="w-96 border-2 border-dashed border-gray-300 p-4">
          <Stack direction="row" spacing="md" wrap>
            <StackItem className="w-32">Item 1</StackItem>
            <StackItem className="w-32">Item 2</StackItem>
            <StackItem className="w-32">Item 3</StackItem>
            <StackItem className="w-32">Item 4</StackItem>
            <StackItem className="w-32">Item 5</StackItem>
          </Stack>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Stack con y sin wrap para elementos que no caben en una línea.',
      },
    },
  },
};

// VStack y HStack
export const StackVariants: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">VStack (Stack Vertical)</h3>
        <VStack spacing="md" className="max-w-md">
          <StackItem className="bg-green-100 border-green-300">VStack Item 1</StackItem>
          <StackItem className="bg-green-100 border-green-300">VStack Item 2</StackItem>
          <StackItem className="bg-green-100 border-green-300">VStack Item 3</StackItem>
        </VStack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">HStack (Stack Horizontal)</h3>
        <HStack spacing="md">
          <StackItem className="bg-purple-100 border-purple-300">HStack Item 1</StackItem>
          <StackItem className="bg-purple-100 border-purple-300">HStack Item 2</StackItem>
          <StackItem className="bg-purple-100 border-purple-300">HStack Item 3</StackItem>
        </HStack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Variantes especializadas: VStack para layout vertical y HStack para layout horizontal.',
      },
    },
  },
};

// Flex
export const FlexComponent: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Flex Básico</h3>
        <Flex gap="md">
          <StackItem className="bg-red-100 border-red-300">Flex Item 1</StackItem>
          <StackItem className="bg-red-100 border-red-300">Flex Item 2</StackItem>
          <StackItem className="bg-red-100 border-red-300">Flex Item 3</StackItem>
        </Flex>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Flex con Grow</h3>
        <Flex gap="md">
          <StackItem className="bg-yellow-100 border-yellow-300">Fijo</StackItem>
          <Flex grow className="bg-yellow-100 border-yellow-300 rounded-lg p-4 text-center">
            Crece para llenar el espacio
          </Flex>
          <StackItem className="bg-yellow-100 border-yellow-300">Fijo</StackItem>
        </Flex>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Flex con Shrink</h3>
        <div className="w-96 border-2 border-dashed border-gray-300 p-4">
          <Flex gap="md">
            <StackItem className="bg-indigo-100 border-indigo-300 w-32">No Shrink</StackItem>
            <Flex shrink className="bg-indigo-100 border-indigo-300 rounded-lg p-4 text-center w-64">
              Se encoge si es necesario
            </Flex>
            <StackItem className="bg-indigo-100 border-indigo-300 w-32">No Shrink</StackItem>
          </Flex>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Flex con Basis</h3>
        <Flex gap="md">
          <Flex basis="1/4" className="bg-teal-100 border-teal-300 rounded-lg p-4 text-center">
            25% (1/4)
          </Flex>
          <Flex basis="1/2" className="bg-teal-100 border-teal-300 rounded-lg p-4 text-center">
            50% (1/2)
          </Flex>
          <Flex basis="1/4" className="bg-teal-100 border-teal-300 rounded-lg p-4 text-center">
            25% (1/4)
          </Flex>
        </Flex>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Componente Flex con propiedades grow, shrink y basis.',
      },
    },
  },
};

// Spacer
export const SpacerComponent: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Spacer en HStack</h3>
        <HStack className="bg-gray-50 p-4">
          <StackItem className="bg-orange-100 border-orange-300">Izquierda</StackItem>
          <Spacer />
          <StackItem className="bg-orange-100 border-orange-300">Derecha</StackItem>
        </HStack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Múltiples Spacers</h3>
        <HStack className="bg-gray-50 p-4">
          <StackItem className="bg-pink-100 border-pink-300">Item 1</StackItem>
          <Spacer />
          <StackItem className="bg-pink-100 border-pink-300">Item 2</StackItem>
          <Spacer />
          <StackItem className="bg-pink-100 border-pink-300">Item 3</StackItem>
        </HStack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Spacer en VStack</h3>
        <VStack className="bg-gray-50 p-4 h-64">
          <StackItem className="bg-cyan-100 border-cyan-300">Superior</StackItem>
          <Spacer />
          <StackItem className="bg-cyan-100 border-cyan-300">Inferior</StackItem>
        </VStack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Componente Spacer para crear espacio flexible entre elementos.',
      },
    },
  },
};

// Center
export const CenterComponent: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Center Básico</h3>
        <Center className="bg-gray-100 h-32 border-2 border-dashed border-gray-300">
          <StackItem className="bg-emerald-100 border-emerald-300">Centrado</StackItem>
        </Center>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Center con Múltiples Elementos</h3>
        <Center className="bg-gray-100 h-40 border-2 border-dashed border-gray-300">
          <VStack spacing="sm">
            <div className="text-lg font-semibold">🎯</div>
            <div className="text-sm text-gray-600">Perfectamente centrado</div>
          </VStack>
        </Center>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Componente Center para centrar contenido horizontal y verticalmente.',
      },
    },
  },
};

// Square y Circle
export const ShapeComponents: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Square (Cuadrados)</h3>
        <HStack spacing="md">
          <Square size="12" className="bg-red-200 border-2 border-red-400">
            <span className="text-red-800 font-semibold">48px</span>
          </Square>
          <Square size="16" className="bg-blue-200 border-2 border-blue-400">
            <span className="text-blue-800 font-semibold">64px</span>
          </Square>
          <Square size="20" className="bg-green-200 border-2 border-green-400">
            <span className="text-green-800 font-semibold">80px</span>
          </Square>
          <Square size="24" className="bg-purple-200 border-2 border-purple-400">
            <span className="text-purple-800 font-semibold">96px</span>
          </Square>
        </HStack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Circle (Círculos)</h3>
        <HStack spacing="md">
          <Circle size="12" className="bg-red-200 border-2 border-red-400">
            <span className="text-red-800 font-bold">A</span>
          </Circle>
          <Circle size="16" className="bg-blue-200 border-2 border-blue-400">
            <span className="text-blue-800 font-bold">B</span>
          </Circle>
          <Circle size="20" className="bg-green-200 border-2 border-green-400">
            <span className="text-green-800 font-bold">C</span>
          </Circle>
          <Circle size="24" className="bg-purple-200 border-2 border-purple-400">
            <span className="text-purple-800 font-bold">D</span>
          </Circle>
        </HStack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Avatares con Circle</h3>
        <HStack spacing="md">
          <Circle size="12" className="bg-gradient-to-br from-pink-400 to-red-400 text-white">
            <span className="font-bold">JD</span>
          </Circle>
          <Circle size="16" className="bg-gradient-to-br from-blue-400 to-purple-400 text-white">
            <span className="font-bold">AM</span>
          </Circle>
          <Circle size="20" className="bg-gradient-to-br from-green-400 to-blue-400 text-white">
            <span className="font-bold">LG</span>
          </Circle>
        </HStack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Iconos con Square</h3>
        <HStack spacing="md">
          <Square size="12" className="bg-gray-100 border border-gray-300 hover:bg-gray-200 cursor-pointer transition-colors">
            <span>📁</span>
          </Square>
          <Square size="12" className="bg-gray-100 border border-gray-300 hover:bg-gray-200 cursor-pointer transition-colors">
            <span>📄</span>
          </Square>
          <Square size="12" className="bg-gray-100 border border-gray-300 hover:bg-gray-200 cursor-pointer transition-colors">
            <span>🖼️</span>
          </Square>
          <Square size="12" className="bg-gray-100 border border-gray-300 hover:bg-gray-200 cursor-pointer transition-colors">
            <span>🎵</span>
          </Square>
        </HStack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Componentes Square y Circle para crear elementos con dimensiones iguales.',
      },
    },
  },
};

// Casos de uso comunes
export const CommonUseCases: Story = {
  render: () => (
    <div className="space-y-12 p-6">
      {/* Header con navegación */}
      <div>
        <h3 className="text-xl font-semibold mb-6">Header con Navegación</h3>
        <HStack spacing="md" align="center" className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <Circle size="10" className="bg-blue-600 text-white font-bold">
            L
          </Circle>
          <div className="font-semibold text-lg">Mi App</div>
          <Spacer />
          <HStack spacing="md">
            <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded hover:bg-gray-100">Inicio</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded hover:bg-gray-100">Productos</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded hover:bg-gray-100">Contacto</a>
          </HStack>
          <Circle size="8" className="bg-gray-200 cursor-pointer hover:bg-gray-300">
            <span className="text-sm">👤</span>
          </Circle>
        </HStack>
      </div>
      
      {/* Card de perfil */}
      <div>
        <h3 className="text-xl font-semibold mb-6">Card de Perfil</h3>
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm max-w-md">
          <VStack spacing="md" align="center">
            <Circle size="20" className="bg-gradient-to-br from-purple-400 to-pink-400 text-white text-xl font-bold">
              JS
            </Circle>
            <VStack spacing="sm" align="center">
              <h4 className="text-xl font-semibold">Juan Pérez</h4>
              <p className="text-gray-600">Desarrollador Frontend</p>
              <p className="text-sm text-gray-500 text-center">Especializado en React y TypeScript con 5 años de experiencia.</p>
            </VStack>
            <HStack spacing="sm">
              <Square size="8" className="bg-blue-100 text-blue-600 cursor-pointer hover:bg-blue-200">
                <span className="text-sm">📧</span>
              </Square>
              <Square size="8" className="bg-green-100 text-green-600 cursor-pointer hover:bg-green-200">
                <span className="text-sm">📱</span>
              </Square>
              <Square size="8" className="bg-purple-100 text-purple-600 cursor-pointer hover:bg-purple-200">
                <span className="text-sm">🔗</span>
              </Square>
            </HStack>
          </VStack>
        </div>
      </div>
      
      {/* Lista de notificaciones */}
      <div>
        <h3 className="text-xl font-semibold mb-6">Lista de Notificaciones</h3>
        <VStack spacing="none" divider className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm max-w-lg">
          <HStack spacing="md" align="center" className="p-4 hover:bg-gray-50">
            <Circle size="10" className="bg-blue-100 text-blue-600">
              <span className="text-sm">📧</span>
            </Circle>
            <VStack spacing="xs" className="flex-1">
              <div className="font-medium">Nuevo mensaje</div>
              <div className="text-sm text-gray-600">Tienes un mensaje de María García</div>
            </VStack>
            <div className="text-xs text-gray-500">2m</div>
          </HStack>
          
          <HStack spacing="md" align="center" className="p-4 hover:bg-gray-50">
            <Circle size="10" className="bg-green-100 text-green-600">
              <span className="text-sm">✅</span>
            </Circle>
            <VStack spacing="xs" className="flex-1">
              <div className="font-medium">Tarea completada</div>
              <div className="text-sm text-gray-600">Has completado "Revisar documentación"</div>
            </VStack>
            <div className="text-xs text-gray-500">1h</div>
          </HStack>
          
          <HStack spacing="md" align="center" className="p-4 hover:bg-gray-50">
            <Circle size="10" className="bg-yellow-100 text-yellow-600">
              <span className="text-sm">⚠️</span>
            </Circle>
            <VStack spacing="xs" className="flex-1">
              <div className="font-medium">Recordatorio</div>
              <div className="text-sm text-gray-600">Reunión de equipo en 30 minutos</div>
            </VStack>
            <div className="text-xs text-gray-500">3h</div>
          </HStack>
        </VStack>
      </div>
      
      {/* Footer */}
      <div>
        <h3 className="text-xl font-semibold mb-6">Footer</h3>
        <VStack spacing="lg" className="bg-gray-900 text-white p-8 rounded-lg">
          <HStack spacing="xl" align="start" wrap className="w-full">
            <VStack spacing="md" align="start">
              <h4 className="font-semibold">Producto</h4>
              <VStack spacing="sm" align="start">
                <a href="#" className="text-gray-300 hover:text-white text-sm">Características</a>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Precios</a>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Documentación</a>
              </VStack>
            </VStack>
            
            <VStack spacing="md" align="start">
              <h4 className="font-semibold">Empresa</h4>
              <VStack spacing="sm" align="start">
                <a href="#" className="text-gray-300 hover:text-white text-sm">Acerca de</a>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Blog</a>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Carreras</a>
              </VStack>
            </VStack>
            
            <VStack spacing="md" align="start">
              <h4 className="font-semibold">Soporte</h4>
              <VStack spacing="sm" align="start">
                <a href="#" className="text-gray-300 hover:text-white text-sm">Centro de ayuda</a>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Contacto</a>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Estado</a>
              </VStack>
            </VStack>
            
            <Spacer />
            
            <VStack spacing="md" align="end">
              <h4 className="font-semibold">Síguenos</h4>
              <HStack spacing="sm">
                <Square size="8" className="bg-gray-700 hover:bg-gray-600 cursor-pointer">
                  <span className="text-sm">📘</span>
                </Square>
                <Square size="8" className="bg-gray-700 hover:bg-gray-600 cursor-pointer">
                  <span className="text-sm">🐦</span>
                </Square>
                <Square size="8" className="bg-gray-700 hover:bg-gray-600 cursor-pointer">
                  <span className="text-sm">📷</span>
                </Square>
              </HStack>
            </VStack>
          </HStack>
          
          <div className="w-full h-px bg-gray-700"></div>
          
          <HStack justify="between" align="center" className="w-full">
            <div className="text-sm text-gray-400">© 2024 Mi Empresa. Todos los derechos reservados.</div>
            <HStack spacing="md">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacidad</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Términos</a>
            </HStack>
          </HStack>
        </VStack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplos de casos de uso comunes: header con navegación, card de perfil, lista de notificaciones y footer.',
      },
    },
  },
};