import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardDescription,
  ElevatedCard,
  OutlineCard,
  FilledCard,
  UnstyledCard,
  ImageCard,
  StatsCard,
} from './Card';

const meta: Meta<typeof Card> = {
  title: 'Design System/Primitives/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente Card versátil con múltiples variantes, tamaños y componentes compuestos. Incluye variantes específicas como ImageCard y StatsCard.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outline', 'filled', 'unstyled'],
      description: 'Variante visual de la card',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño de la card',
    },
    colorScheme: {
      control: 'select',
      options: ['white', 'gray', 'blue', 'green', 'red', 'yellow', 'purple'],
      description: 'Esquema de color de la card',
    },
    isHoverable: {
      control: 'boolean',
      description: 'Efecto hover en la card',
    },
    isClickable: {
      control: 'boolean',
      description: 'Card clickeable con cursor pointer',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Historia principal
export const Default: Story = {
  args: {
    variant: 'elevated',
    size: 'md',
    colorScheme: 'white',
    children: (
      <>
        <CardHeader>
          <CardTitle>Título de la Card</CardTitle>
          <CardDescription>Descripción de la card con información adicional</CardDescription>
        </CardHeader>
        <CardBody>
          <p>Contenido principal de la card. Aquí puedes incluir cualquier tipo de contenido.</p>
        </CardBody>
        <CardFooter>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Acción
          </button>
        </CardFooter>
      </>
    ),
  },
};

// Variantes
export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
      <ElevatedCard>
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
          <CardDescription>Card con sombra elevada</CardDescription>
        </CardHeader>
        <CardBody>
          <p>Contenido de la card elevated con sombra sutil.</p>
        </CardBody>
      </ElevatedCard>
      
      <OutlineCard>
        <CardHeader>
          <CardTitle>Outline Card</CardTitle>
          <CardDescription>Card con borde</CardDescription>
        </CardHeader>
        <CardBody>
          <p>Contenido de la card con borde definido.</p>
        </CardBody>
      </OutlineCard>
      
      <FilledCard>
        <CardHeader>
          <CardTitle>Filled Card</CardTitle>
          <CardDescription>Card con fondo</CardDescription>
        </CardHeader>
        <CardBody>
          <p>Contenido de la card con fondo de color.</p>
        </CardBody>
      </FilledCard>
      
      <UnstyledCard>
        <CardHeader>
          <CardTitle>Unstyled Card</CardTitle>
          <CardDescription>Card sin estilos</CardDescription>
        </CardHeader>
        <CardBody>
          <p>Contenido de la card sin estilos predefinidos.</p>
        </CardBody>
      </UnstyledCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes variantes visuales del componente Card.',
      },
    },
  },
};

// Tamaños
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-full max-w-2xl">
      <Card size="sm">
        <CardHeader>
          <CardTitle>Card Pequeña</CardTitle>
          <CardDescription>Tamaño small</CardDescription>
        </CardHeader>
        <CardBody>
          <p>Contenido compacto para espacios reducidos.</p>
        </CardBody>
      </Card>
      
      <Card size="md">
        <CardHeader>
          <CardTitle>Card Mediana</CardTitle>
          <CardDescription>Tamaño medium (por defecto)</CardDescription>
        </CardHeader>
        <CardBody>
          <p>Contenido estándar con espaciado equilibrado.</p>
        </CardBody>
      </Card>
      
      <Card size="lg">
        <CardHeader>
          <CardTitle>Card Grande</CardTitle>
          <CardDescription>Tamaño large</CardDescription>
        </CardHeader>
        <CardBody>
          <p>Contenido amplio con mayor espaciado para destacar información importante.</p>
        </CardBody>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes tamaños disponibles para el componente Card.',
      },
    },
  },
};

// Estados interactivos
export const InteractiveStates: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
      <Card isHoverable>
        <CardHeader>
          <CardTitle>Card Hoverable</CardTitle>
          <CardDescription>Pasa el mouse por encima</CardDescription>
        </CardHeader>
        <CardBody>
          <p>Esta card tiene efectos de hover para mejor interacción.</p>
        </CardBody>
      </Card>
      
      <Card isClickable onClick={() => alert('Card clickeada!')}>
        <CardHeader>
          <CardTitle>Card Clickeable</CardTitle>
          <CardDescription>Haz click en cualquier parte</CardDescription>
        </CardHeader>
        <CardBody>
          <p>Esta card es completamente clickeable y muestra cursor pointer.</p>
        </CardBody>
      </Card>
      
      <Card isHoverable isClickable onClick={() => alert('Card interactiva!')}>
        <CardHeader>
          <CardTitle>Card Interactiva</CardTitle>
          <CardDescription>Hover + Click</CardDescription>
        </CardHeader>
        <CardBody>
          <p>Combina efectos de hover y funcionalidad de click.</p>
        </CardBody>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Card Estática</CardTitle>
          <CardDescription>Sin interacciones</CardDescription>
        </CardHeader>
        <CardBody>
          <p>Card normal sin efectos especiales.</p>
        </CardBody>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Estados interactivos: hoverable, clickeable y combinaciones.',
      },
    },
  },
};

// ImageCard
export const ImageCardExample: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 w-full max-w-4xl">
      <ImageCard
        imageSrc="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=200&fit=crop"
        imageAlt="Oficina moderna"
        imagePosition="top"
      >
        <CardHeader>
          <CardTitle>Imagen Superior</CardTitle>
          <CardDescription>Card con imagen en la parte superior</CardDescription>
        </CardHeader>
        <CardBody>
          <p>Contenido debajo de la imagen. Ideal para artículos y productos.</p>
        </CardBody>
        <CardFooter>
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            Leer más
          </button>
        </CardFooter>
      </ImageCard>
      
      <ImageCard
        imageSrc="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=200&fit=crop"
        imageAlt="Espacio de trabajo"
        imagePosition="bottom"
      >
        <CardHeader>
          <CardTitle>Imagen Inferior</CardTitle>
          <CardDescription>Card con imagen en la parte inferior</CardDescription>
        </CardHeader>
        <CardBody>
          <p>Contenido encima de la imagen. Útil para destacar el texto primero.</p>
        </CardBody>
      </ImageCard>
      
      <ImageCard
        imageSrc="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=200&h=300&fit=crop"
        imageAlt="Oficina colaborativa"
        imagePosition="left"
        className="col-span-2"
      >
        <CardHeader>
          <CardTitle>Imagen Lateral</CardTitle>
          <CardDescription>Card con imagen a la izquierda</CardDescription>
        </CardHeader>
        <CardBody>
          <p>Contenido al lado de la imagen. Perfecto para layouts horizontales y descripciones extensas.</p>
        </CardBody>
        <CardFooter>
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Acción Principal
            </button>
            <button className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors">
              Secundaria
            </button>
          </div>
        </CardFooter>
      </ImageCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ImageCard con diferentes posiciones de imagen: superior, inferior y lateral.',
      },
    },
  },
};

// StatsCard
export const StatsCardExample: Story = {
  render: () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-6xl">
      <StatsCard
        title="Usuarios Activos"
        value="12,345"
        change="+12%"
        changeType="positive"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        }
      />
      
      <StatsCard
        title="Ingresos"
        value="€45,678"
        change="-3%"
        changeType="negative"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        }
      />
      
      <StatsCard
        title="Conversiones"
        value="89.2%"
        change="+5.4%"
        changeType="positive"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        }
      />
      
      <StatsCard
        title="Tiempo Promedio"
        value="2m 34s"
        change="0%"
        changeType="neutral"
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'StatsCard para mostrar métricas y estadísticas con indicadores de cambio.',
      },
    },
  },
};

// Casos de uso comunes
export const CommonUseCases: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-4xl">
      {/* Tarjeta de producto */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Tarjeta de Producto</h3>
        <ImageCard
          imageSrc="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop"
          imageAlt="Producto"
          imagePosition="top"
          className="max-w-sm"
        >
          <CardHeader>
            <CardTitle>MacBook Pro 16"</CardTitle>
            <CardDescription>Chip M3 Pro, 18GB RAM, 512GB SSD</CardDescription>
          </CardHeader>
          <CardBody>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">€2,499</p>
              <p className="text-sm text-gray-600">Envío gratuito</p>
            </div>
          </CardBody>
          <CardFooter>
            <div className="flex gap-2 w-full">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Comprar
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                ♡
              </button>
            </div>
          </CardFooter>
        </ImageCard>
      </div>
      
      {/* Tarjeta de perfil */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Tarjeta de Perfil</h3>
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-600">JD</span>
            </div>
            <CardTitle>Juan Pérez</CardTitle>
            <CardDescription>Desarrollador Frontend Senior</CardDescription>
          </CardHeader>
          <CardBody>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📍 Madrid, España</p>
              <p>📧 juan.perez@email.com</p>
              <p>🔗 linkedin.com/in/juanperez</p>
            </div>
          </CardBody>
          <CardFooter>
            <div className="flex gap-2 w-full">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Conectar
              </button>
              <button className="flex-1 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors">
                Mensaje
              </button>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      {/* Tarjeta de notificación */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Tarjeta de Notificación</h3>
        <Card className="max-w-md border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <CardTitle className="text-base">Nueva actualización disponible</CardTitle>
                <CardDescription>Versión 2.1.0 con nuevas funcionalidades</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-gray-600">
              Esta actualización incluye mejoras de rendimiento y corrección de errores.
            </p>
          </CardBody>
          <CardFooter>
            <div className="flex gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">
                Actualizar
              </button>
              <button className="text-gray-600 hover:text-gray-800 px-4 py-2 text-sm">
                Más tarde
              </button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplos de casos de uso comunes: producto, perfil y notificación.',
      },
    },
  },
};