import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useTabsState,
  SimpleTabs,
} from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Design System/Compounds/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente Tabs compuesto con soporte para diferentes variantes, tamaños, orientación y control de estado. Incluye hook useTabsState y SimpleTabs predefinido.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'enclosed', 'soft-rounded', 'solid-rounded', 'unstyled'],
      description: 'Variante visual de las tabs',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tamaño de las tabs',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientación de las tabs',
    },
    colorScheme: {
      control: 'select',
      options: ['blue', 'green', 'red', 'yellow', 'purple', 'gray'],
      description: 'Esquema de color de las tabs',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Estado deshabilitado de las tabs',
    },
    defaultIndex: {
      control: 'number',
      description: 'Índice de la tab activa por defecto',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Historia principal
export const Default: Story = {
  args: {
    variant: 'line',
    size: 'md',
    orientation: 'horizontal',
    colorScheme: 'blue',
    defaultIndex: 0,
    children: (
      <>
        <TabList>
          <Tab>Inicio</Tab>
          <Tab>Productos</Tab>
          <Tab>Servicios</Tab>
          <Tab>Contacto</Tab>
        </TabList>
        
        <TabPanels>
          <TabPanel>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Bienvenido</h3>
              <p>Esta es la página de inicio con información general sobre nuestra empresa.</p>
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Nuestros Productos</h3>
              <p>Descubre nuestra amplia gama de productos diseñados para satisfacer tus necesidades.</p>
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Servicios Profesionales</h3>
              <p>Ofrecemos servicios de consultoría y soporte técnico especializado.</p>
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">Contáctanos</h3>
              <p>Ponte en contacto con nuestro equipo para más información.</p>
            </div>
          </TabPanel>
        </TabPanels>
      </>
    ),
  },
};

// Variantes
export const Variants: Story = {
  render: () => {
    const variants = ['line', 'enclosed', 'soft-rounded', 'solid-rounded', 'unstyled'] as const;
    
    return (
      <div className="space-y-8 w-full max-w-4xl">
        {variants.map((variant) => (
          <div key={variant}>
            <h3 className="text-lg font-semibold mb-4 capitalize">{variant.replace('-', ' ')}</h3>
            <Tabs variant={variant} defaultIndex={0}>
              <TabList>
                <Tab>Tab 1</Tab>
                <Tab>Tab 2</Tab>
                <Tab>Tab 3</Tab>
              </TabList>
              
              <TabPanels>
                <TabPanel>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <p>Contenido de la primera tab con variante <strong>{variant}</strong>.</p>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <p>Contenido de la segunda tab con variante <strong>{variant}</strong>.</p>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="p-4 bg-gray-50 rounded-md">
                    <p>Contenido de la tercera tab con variante <strong>{variant}</strong>.</p>
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Diferentes variantes visuales del componente Tabs.',
      },
    },
  },
};

// Tamaños
export const Sizes: Story = {
  render: () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    
    return (
      <div className="space-y-8 w-full max-w-4xl">
        {sizes.map((size) => (
          <div key={size}>
            <h3 className="text-lg font-semibold mb-4">Tamaño {size.toUpperCase()}</h3>
            <Tabs size={size} defaultIndex={0}>
              <TabList>
                <Tab>Primera</Tab>
                <Tab>Segunda</Tab>
                <Tab>Tercera</Tab>
              </TabList>
              
              <TabPanels>
                <TabPanel>
                  <div className="p-4 bg-blue-50 rounded-md">
                    <p>Contenido con tamaño <strong>{size}</strong>. Las tabs se adaptan al tamaño seleccionado.</p>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="p-4 bg-green-50 rounded-md">
                    <p>Segunda tab con tamaño <strong>{size}</strong>.</p>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="p-4 bg-purple-50 rounded-md">
                    <p>Tercera tab con tamaño <strong>{size}</strong>.</p>
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Diferentes tamaños disponibles para el componente Tabs.',
      },
    },
  },
};

// Orientación vertical
export const VerticalOrientation: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Tabs orientation="vertical" defaultIndex={0} className="flex gap-6">
        <TabList className="flex-shrink-0">
          <Tab>📊 Dashboard</Tab>
          <Tab>👥 Usuarios</Tab>
          <Tab>📈 Analíticas</Tab>
          <Tab>⚙️ Configuración</Tab>
          <Tab>🔒 Seguridad</Tab>
        </TabList>
        
        <TabPanels className="flex-1">
          <TabPanel>
            <div className="p-6 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">📊 Dashboard</h3>
              <p className="mb-4">Vista general de todas las métricas importantes de tu aplicación.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-md shadow-sm">
                  <h4 className="font-medium">Usuarios Activos</h4>
                  <p className="text-2xl font-bold text-blue-600">1,234</p>
                </div>
                <div className="p-4 bg-white rounded-md shadow-sm">
                  <h4 className="font-medium">Ingresos</h4>
                  <p className="text-2xl font-bold text-green-600">€45,678</p>
                </div>
              </div>
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="p-6 bg-green-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">👥 Gestión de Usuarios</h3>
              <p className="mb-4">Administra los usuarios de tu plataforma.</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-md">
                  <span>Juan Pérez</span>
                  <span className="text-green-600">Activo</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-md">
                  <span>María García</span>
                  <span className="text-green-600">Activo</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-md">
                  <span>Carlos López</span>
                  <span className="text-gray-500">Inactivo</span>
                </div>
              </div>
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="p-6 bg-purple-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">📈 Analíticas</h3>
              <p className="mb-4">Métricas detalladas y reportes de rendimiento.</p>
              <div className="h-32 bg-white rounded-md flex items-center justify-center">
                <p className="text-gray-500">Gráfico de analíticas aquí</p>
              </div>
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="p-6 bg-yellow-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">⚙️ Configuración</h3>
              <p className="mb-4">Ajusta las preferencias de tu aplicación.</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Notificaciones por email</span>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>Modo oscuro</span>
                  <input type="checkbox" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Actualizaciones automáticas</span>
                  <input type="checkbox" defaultChecked />
                </div>
              </div>
            </div>
          </TabPanel>
          
          <TabPanel>
            <div className="p-6 bg-red-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">🔒 Seguridad</h3>
              <p className="mb-4">Configuración de seguridad y privacidad.</p>
              <div className="space-y-4">
                <button className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Cambiar Contraseña
                </button>
                <button className="w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700">
                  Activar 2FA
                </button>
                <button className="w-full p-3 bg-red-600 text-white rounded-md hover:bg-red-700">
                  Cerrar Todas las Sesiones
                </button>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs con orientación vertical, ideal para paneles de administración.',
      },
    },
  },
};

// Esquemas de color
export const ColorSchemes: Story = {
  render: () => {
    const colors = ['blue', 'green', 'red', 'yellow', 'purple', 'gray'] as const;
    
    return (
      <div className="space-y-6 w-full max-w-4xl">
        {colors.map((color) => (
          <div key={color}>
            <h3 className="text-lg font-semibold mb-3 capitalize">{color}</h3>
            <Tabs colorScheme={color} variant="solid-rounded" defaultIndex={0}>
              <TabList>
                <Tab>Tab 1</Tab>
                <Tab>Tab 2</Tab>
                <Tab>Tab 3</Tab>
              </TabList>
              
              <TabPanels>
                <TabPanel>
                  <div className="p-4 border rounded-md">
                    <p>Contenido con esquema de color <strong>{color}</strong>.</p>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="p-4 border rounded-md">
                    <p>Segunda tab con color <strong>{color}</strong>.</p>
                  </div>
                </TabPanel>
                <TabPanel>
                  <div className="p-4 border rounded-md">
                    <p>Tercera tab con color <strong>{color}</strong>.</p>
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Diferentes esquemas de color disponibles para las tabs.',
      },
    },
  },
};

// Tabs con iconos
export const WithIcons: Story = {
  render: () => (
    <Tabs variant="soft-rounded" defaultIndex={0} className="w-full max-w-4xl">
      <TabList>
        <Tab>
          <span className="flex items-center gap-2">
            🏠 <span>Inicio</span>
          </span>
        </Tab>
        <Tab>
          <span className="flex items-center gap-2">
            📊 <span>Estadísticas</span>
          </span>
        </Tab>
        <Tab>
          <span className="flex items-center gap-2">
            👥 <span>Equipo</span>
          </span>
        </Tab>
        <Tab>
          <span className="flex items-center gap-2">
            ⚙️ <span>Configuración</span>
          </span>
        </Tab>
      </TabList>
      
      <TabPanels>
        <TabPanel>
          <div className="p-6 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              🏠 Página de Inicio
            </h3>
            <p>Bienvenido a tu dashboard principal. Aquí encontrarás un resumen de toda la actividad.</p>
          </div>
        </TabPanel>
        
        <TabPanel>
          <div className="p-6 bg-green-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              📊 Estadísticas Detalladas
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-md">
                <div className="text-2xl font-bold text-blue-600">1,234</div>
                <div className="text-sm text-gray-600">Visitantes</div>
              </div>
              <div className="text-center p-4 bg-white rounded-md">
                <div className="text-2xl font-bold text-green-600">89%</div>
                <div className="text-sm text-gray-600">Conversión</div>
              </div>
              <div className="text-center p-4 bg-white rounded-md">
                <div className="text-2xl font-bold text-purple-600">€45K</div>
                <div className="text-sm text-gray-600">Ingresos</div>
              </div>
            </div>
          </div>
        </TabPanel>
        
        <TabPanel>
          <div className="p-6 bg-purple-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              👥 Gestión del Equipo
            </h3>
            <div className="space-y-3">
              {['Ana Martín', 'Carlos Ruiz', 'Laura Sánchez', 'Miguel Torres'].map((name) => (
                <div key={name} className="flex items-center gap-3 p-3 bg-white rounded-md">
                  <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium">{name}</div>
                    <div className="text-sm text-gray-600">Desarrollador</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabPanel>
        
        <TabPanel>
          <div className="p-6 bg-yellow-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              ⚙️ Configuración del Sistema
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white rounded-md">
                <span>Notificaciones push</span>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-md">
                <span>Backup automático</span>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-md">
                <span>Modo mantenimiento</span>
                <input type="checkbox" />
              </div>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs con iconos para mejorar la experiencia visual.',
      },
    },
  },
};

// SimpleTabs predefinido
export const SimpleTabsExample: Story = {
  render: () => {
    const tabsData = [
      {
        label: '📋 Tareas',
        content: (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded-md">
              <input type="checkbox" />
              <span>Revisar propuesta de diseño</span>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-md">
              <input type="checkbox" defaultChecked />
              <span className="line-through text-gray-500">Actualizar documentación</span>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-md">
              <input type="checkbox" />
              <span>Preparar presentación</span>
            </div>
          </div>
        ),
      },
      {
        label: '📅 Calendario',
        content: (
          <div className="space-y-3">
            <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
              <div className="font-medium">Reunión de equipo</div>
              <div className="text-sm text-gray-600">Hoy, 10:00 AM</div>
            </div>
            <div className="p-3 border-l-4 border-green-500 bg-green-50">
              <div className="font-medium">Presentación cliente</div>
              <div className="text-sm text-gray-600">Mañana, 2:00 PM</div>
            </div>
            <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
              <div className="font-medium">Revisión de código</div>
              <div className="text-sm text-gray-600">Viernes, 11:00 AM</div>
            </div>
          </div>
        ),
      },
      {
        label: '📊 Reportes',
        content: (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-md text-center">
                <div className="text-2xl font-bold text-blue-600">85%</div>
                <div className="text-sm text-gray-600">Progreso del proyecto</div>
              </div>
              <div className="p-4 border rounded-md text-center">
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-sm text-gray-600">Tareas completadas</div>
              </div>
            </div>
            <div className="p-4 border rounded-md">
              <div className="text-sm text-gray-600 mb-2">Tiempo invertido esta semana</div>
              <div className="text-xl font-bold">32 horas</div>
            </div>
          </div>
        ),
      },
    ];
    
    return (
      <div className="w-full max-w-4xl">
        <SimpleTabs
          tabs={tabsData}
          variant="enclosed"
          defaultIndex={0}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'SimpleTabs predefinido con configuración simplificada mediante array de datos.',
      },
    },
  },
};

// Tabs deshabilitadas
export const DisabledTabs: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-4xl">
      <div>
        <h3 className="text-lg font-semibold mb-3">Tabs individuales deshabilitadas</h3>
        <Tabs defaultIndex={0}>
          <TabList>
            <Tab>Disponible</Tab>
            <Tab isDisabled>Deshabilitada</Tab>
            <Tab>Otra disponible</Tab>
            <Tab isDisabled>También deshabilitada</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel>
              <div className="p-4 bg-green-50 rounded-md">
                <p>Esta tab está disponible y se puede seleccionar.</p>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="p-4 bg-gray-50 rounded-md">
                <p>Esta tab está deshabilitada.</p>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="p-4 bg-blue-50 rounded-md">
                <p>Esta tab también está disponible.</p>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="p-4 bg-gray-50 rounded-md">
                <p>Esta tab también está deshabilitada.</p>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-3">Todas las tabs deshabilitadas</h3>
        <Tabs isDisabled defaultIndex={0}>
          <TabList>
            <Tab>Tab 1</Tab>
            <Tab>Tab 2</Tab>
            <Tab>Tab 3</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel>
              <div className="p-4 bg-gray-50 rounded-md">
                <p>Todas las tabs están deshabilitadas.</p>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="p-4 bg-gray-50 rounded-md">
                <p>No se puede cambiar de tab.</p>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="p-4 bg-gray-50 rounded-md">
                <p>Estado deshabilitado global.</p>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs con estado deshabilitado individual y global.',
      },
    },
  },
};

// Hook useTabsState
export const UseTabsStateExample: Story = {
  render: () => {
    const { activeIndex, setActiveIndex } = useTabsState(0);
    
    return (
      <div className="space-y-4 w-full max-w-4xl">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="font-semibold text-blue-900 mb-2">Hook useTabsState</h3>
          <p className="text-blue-800 text-sm mb-2">
            El hook useTabsState permite controlar el estado de las tabs externamente.
          </p>
          <p className="text-blue-700 text-sm">
            Tab activa: <strong>{activeIndex + 1}</strong>
          </p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setActiveIndex(0)}
            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
          >
            Ir a Tab 1
          </button>
          <button
            onClick={() => setActiveIndex(1)}
            className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
          >
            Ir a Tab 2
          </button>
          <button
            onClick={() => setActiveIndex(2)}
            className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
          >
            Ir a Tab 3
          </button>
        </div>
        
        <Tabs index={activeIndex} onChange={setActiveIndex}>
          <TabList>
            <Tab>Primera Tab</Tab>
            <Tab>Segunda Tab</Tab>
            <Tab>Tercera Tab</Tab>
          </TabList>
          
          <TabPanels>
            <TabPanel>
              <div className="p-4 bg-blue-50 rounded-md">
                <h4 className="font-semibold mb-2">Primera Tab</h4>
                <p>Contenido controlado externamente. Puedes cambiar de tab usando los botones de arriba.</p>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="p-4 bg-green-50 rounded-md">
                <h4 className="font-semibold mb-2">Segunda Tab</h4>
                <p>El estado se sincroniza automáticamente entre el hook y el componente.</p>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="p-4 bg-purple-50 rounded-md">
                <h4 className="font-semibold mb-2">Tercera Tab</h4>
                <p>Esto es útil para navegación programática o integración con routers.</p>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo de uso del hook useTabsState para control externo del estado de las tabs.',
      },
    },
  },
};