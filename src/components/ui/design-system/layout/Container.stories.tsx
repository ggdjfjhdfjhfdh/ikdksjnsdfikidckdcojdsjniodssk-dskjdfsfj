import type { Meta, StoryObj } from '@storybook/react';
import {
  Container,
  SmallContainer,
  MediumContainer,
  LargeContainer,
  ExtraLargeContainer,
  FullContainer,
  SectionContainer,
} from './Container';

const meta: Meta<typeof Container> = {
  title: 'Design System/Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Componente Container para controlar el ancho máximo y centrado del contenido. Incluye variantes predefinidas y SectionContainer para elementos semánticos.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Ancho máximo del container',
    },
    centerContent: {
      control: 'boolean',
      description: 'Centrar el contenido horizontalmente',
    },
    className: {
      control: 'text',
      description: 'Clases CSS adicionales',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Contenido de ejemplo para visualizar los containers
const ExampleContent = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
    <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
    <p className="text-blue-700 mb-4">{description}</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-md shadow-sm">
        <h4 className="font-medium mb-2">Característica 1</h4>
        <p className="text-sm text-gray-600">Descripción de la primera característica del container.</p>
      </div>
      <div className="bg-white p-4 rounded-md shadow-sm">
        <h4 className="font-medium mb-2">Característica 2</h4>
        <p className="text-sm text-gray-600">Descripción de la segunda característica del container.</p>
      </div>
      <div className="bg-white p-4 rounded-md shadow-sm">
        <h4 className="font-medium mb-2">Característica 3</h4>
        <p className="text-sm text-gray-600">Descripción de la tercera característica del container.</p>
      </div>
    </div>
  </div>
);

// Historia principal
export const Default: Story = {
  args: {
    maxWidth: 'lg',
    centerContent: true,
    children: (
      <ExampleContent
        title="Container por Defecto"
        description="Este es un container con configuración estándar que limita el ancho del contenido y lo centra en la página."
      />
    ),
  },
};

// Todos los tamaños
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tamaños de Container</h2>
        <p className="text-gray-600">Diferentes tamaños disponibles para adaptar el contenido a distintas necesidades</p>
      </div>
      
      <Container maxWidth="sm">
        <ExampleContent
          title="Small Container (sm)"
          description="Container pequeño, ideal para contenido focalizado o formularios simples."
        />
      </Container>
      
      <Container maxWidth="md">
        <ExampleContent
          title="Medium Container (md)"
          description="Container mediano, perfecto para artículos y contenido de lectura."
        />
      </Container>
      
      <Container maxWidth="lg">
        <ExampleContent
          title="Large Container (lg)"
          description="Container grande, excelente para dashboards y contenido complejo."
        />
      </Container>
      
      <Container maxWidth="xl">
        <ExampleContent
          title="Extra Large Container (xl)"
          description="Container extra grande, ideal para aplicaciones con mucho contenido lateral."
        />
      </Container>
      
      <Container maxWidth="full">
        <ExampleContent
          title="Full Container (full)"
          description="Container que ocupa todo el ancho disponible, perfecto para aplicaciones de escritorio."
        />
      </Container>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparación de todos los tamaños de container disponibles.',
      },
    },
  },
};

// Variantes predefinidas
export const PredefinedVariants: Story = {
  render: () => (
    <div className="space-y-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Variantes Predefinidas</h2>
        <p className="text-gray-600">Componentes de container preconfigurados para uso rápido</p>
      </div>
      
      <SmallContainer>
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-green-900 mb-2">SmallContainer</h3>
          <p className="text-green-700">Componente preconfigurado con tamaño small. Ideal para formularios de login, modales pequeños o contenido focalizado.</p>
        </div>
      </SmallContainer>
      
      <MediumContainer>
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-purple-900 mb-2">MediumContainer</h3>
          <p className="text-purple-700">Componente preconfigurado con tamaño medium. Perfecto para artículos de blog, páginas de contenido y documentación.</p>
        </div>
      </MediumContainer>
      
      <LargeContainer>
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">LargeContainer</h3>
          <p className="text-blue-700">Componente preconfigurado con tamaño large. Excelente para dashboards, páginas principales y contenido complejo.</p>
        </div>
      </LargeContainer>
      
      <ExtraLargeContainer>
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-yellow-900 mb-2">ExtraLargeContainer</h3>
          <p className="text-yellow-700">Componente preconfigurado con tamaño extra large. Ideal para aplicaciones complejas con sidebars y múltiples columnas.</p>
        </div>
      </ExtraLargeContainer>
      
      <FullContainer>
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-red-900 mb-2">FullContainer</h3>
          <p className="text-red-700">Componente preconfigurado que ocupa todo el ancho. Perfecto para aplicaciones de escritorio y contenido que necesita máximo espacio.</p>
        </div>
      </FullContainer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Componentes de container preconfigurados para uso directo sin props.',
      },
    },
  },
};

// SectionContainer con elementos semánticos
export const SemanticContainers: Story = {
  render: () => (
    <div className="space-y-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Containers Semánticos</h2>
        <p className="text-gray-600">SectionContainer permite usar diferentes elementos HTML semánticos</p>
      </div>
      
      <SectionContainer as="header" maxWidth="lg">
        <div className="bg-blue-600 text-white rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">Header Section</h1>
          <p>Este container usa el elemento &lt;header&gt; para mejor semántica HTML.</p>
        </div>
      </SectionContainer>
      
      <SectionContainer as="main" maxWidth="lg">
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-900 mb-2">Main Content</h2>
          <p className="text-green-700 mb-4">Este container usa el elemento &lt;main&gt; para el contenido principal.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-md">
              <h3 className="font-medium mb-2">Artículo 1</h3>
              <p className="text-sm text-gray-600">Contenido del primer artículo en la sección principal.</p>
            </div>
            <div className="bg-white p-4 rounded-md">
              <h3 className="font-medium mb-2">Artículo 2</h3>
              <p className="text-sm text-gray-600">Contenido del segundo artículo en la sección principal.</p>
            </div>
          </div>
        </div>
      </SectionContainer>
      
      <SectionContainer as="section" maxWidth="md">
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-purple-900 mb-2">Section Element</h2>
          <p className="text-purple-700">Este container usa el elemento &lt;section&gt; para agrupar contenido relacionado.</p>
        </div>
      </SectionContainer>
      
      <SectionContainer as="aside" maxWidth="sm">
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">Aside Content</h3>
          <p className="text-yellow-700">Este container usa el elemento &lt;aside&gt; para contenido complementario.</p>
        </div>
      </SectionContainer>
      
      <SectionContainer as="footer" maxWidth="lg">
        <div className="bg-gray-800 text-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Footer Section</h3>
          <p>Este container usa el elemento &lt;footer&gt; para el pie de página.</p>
        </div>
      </SectionContainer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'SectionContainer con diferentes elementos HTML semánticos para mejor accesibilidad.',
      },
    },
  },
};

// Sin centrado
export const WithoutCentering: Story = {
  render: () => (
    <div className="space-y-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Containers sin Centrado</h2>
        <p className="text-gray-600">Containers que no centran el contenido horizontalmente</p>
      </div>
      
      <Container maxWidth="lg" centerContent={false}>
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-red-900 mb-2">Container sin Centrado</h3>
          <p className="text-red-700">Este container no centra su contenido. Útil cuando necesitas control total sobre el posicionamiento.</p>
        </div>
      </Container>
      
      <Container maxWidth="md" centerContent={false} className="ml-8">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">Container con Margen Personalizado</h3>
          <p className="text-blue-700">Este container tiene un margen izquierdo personalizado aplicado mediante className.</p>
        </div>
      </Container>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Containers sin centrado automático para mayor control sobre el posicionamiento.',
      },
    },
  },
};

// Casos de uso comunes
export const CommonUseCases: Story = {
  render: () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <SectionContainer as="header" maxWidth="full" className="bg-white shadow-sm">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-blue-600 rounded-md"></div>
            <h1 className="text-xl font-bold">Mi Aplicación</h1>
          </div>
          <nav className="flex gap-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">Inicio</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Productos</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Contacto</a>
          </nav>
        </div>
      </SectionContainer>
      
      {/* Hero Section */}
      <SectionContainer as="section" maxWidth="lg" className="py-16">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Bienvenido a Nuestra Plataforma</h2>
          <p className="text-xl text-gray-600 mb-8">Descubre las mejores soluciones para tu negocio</p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
              Comenzar
            </button>
            <button className="border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-50">
              Saber Más
            </button>
          </div>
        </div>
      </SectionContainer>
      
      {/* Content Section */}
      <SectionContainer as="main" maxWidth="lg" className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-blue-600 text-xl">🚀</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Rápido</h3>
            <p className="text-gray-600">Implementación rápida y eficiente para tu proyecto.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-green-600 text-xl">🔒</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Seguro</h3>
            <p className="text-gray-600">Máxima seguridad para proteger tus datos.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-purple-600 text-xl">⚡</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Potente</h3>
            <p className="text-gray-600">Herramientas avanzadas para maximizar tu productividad.</p>
          </div>
        </div>
      </SectionContainer>
      
      {/* Footer */}
      <SectionContainer as="footer" maxWidth="lg" className="bg-gray-800 text-white py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Sobre nosotros</a></li>
              <li><a href="#" className="hover:text-white">Equipo</a></li>
              <li><a href="#" className="hover:text-white">Carreras</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Productos</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Características</a></li>
              <li><a href="#" className="hover:text-white">Precios</a></li>
              <li><a href="#" className="hover:text-white">API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Documentación</a></li>
              <li><a href="#" className="hover:text-white">Contacto</a></li>
              <li><a href="#" className="hover:text-white">Estado</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Privacidad</a></li>
              <li><a href="#" className="hover:text-white">Términos</a></li>
              <li><a href="#" className="hover:text-white">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Mi Aplicación. Todos los derechos reservados.</p>
        </div>
      </SectionContainer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo completo de página web usando diferentes containers para estructura semántica.',
      },
    },
  },
};