import type { Meta, StoryObj } from '@storybook/react';
import {
  Grid,
  GridItem,
  TwoColumnGrid,
  ThreeColumnGrid,
  FourColumnGrid,
  ResponsiveGrid,
} from './Grid';

const meta: Meta<typeof Grid> = {
  title: 'Design System/Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Sistema de Grid flexible con soporte para columnas, filas, espaciado y responsividad. Incluye variantes predefinidas y GridItem para elementos específicos.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'number',
      description: 'Número de columnas del grid',
    },
    rows: {
      control: 'number',
      description: 'Número de filas del grid',
    },
    gap: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Espaciado entre elementos',
    },
    autoFlow: {
      control: 'select',
      options: ['row', 'column', 'dense', 'row-dense', 'column-dense'],
      description: 'Flujo automático del grid',
    },
    alignItems: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch'],
      description: 'Alineación vertical de los items',
    },
    justifyItems: {
      control: 'select',
      options: ['start', 'end', 'center', 'stretch'],
      description: 'Alineación horizontal de los items',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Componente auxiliar para mostrar items del grid
const GridItemExample = ({ children, className = '', ...props }: any) => (
  <div className={`bg-blue-100 border-2 border-blue-300 rounded-lg p-4 text-center ${className}`} {...props}>
    {children}
  </div>
);

// Historia principal
export const Default: Story = {
  args: {
    columns: 3,
    gap: 'md',
    children: (
      <>
        <GridItemExample>Item 1</GridItemExample>
        <GridItemExample>Item 2</GridItemExample>
        <GridItemExample>Item 3</GridItemExample>
        <GridItemExample>Item 4</GridItemExample>
        <GridItemExample>Item 5</GridItemExample>
        <GridItemExample>Item 6</GridItemExample>
      </>
    ),
  },
};

// Diferentes números de columnas
export const ColumnVariations: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">2 Columnas</h3>
        <Grid columns={2} gap="md">
          <GridItemExample>Item 1</GridItemExample>
          <GridItemExample>Item 2</GridItemExample>
          <GridItemExample>Item 3</GridItemExample>
          <GridItemExample>Item 4</GridItemExample>
        </Grid>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">3 Columnas</h3>
        <Grid columns={3} gap="md">
          <GridItemExample>Item 1</GridItemExample>
          <GridItemExample>Item 2</GridItemExample>
          <GridItemExample>Item 3</GridItemExample>
          <GridItemExample>Item 4</GridItemExample>
          <GridItemExample>Item 5</GridItemExample>
          <GridItemExample>Item 6</GridItemExample>
        </Grid>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">4 Columnas</h3>
        <Grid columns={4} gap="md">
          <GridItemExample>Item 1</GridItemExample>
          <GridItemExample>Item 2</GridItemExample>
          <GridItemExample>Item 3</GridItemExample>
          <GridItemExample>Item 4</GridItemExample>
          <GridItemExample>Item 5</GridItemExample>
          <GridItemExample>Item 6</GridItemExample>
          <GridItemExample>Item 7</GridItemExample>
          <GridItemExample>Item 8</GridItemExample>
        </Grid>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">6 Columnas</h3>
        <Grid columns={6} gap="sm">
          <GridItemExample>1</GridItemExample>
          <GridItemExample>2</GridItemExample>
          <GridItemExample>3</GridItemExample>
          <GridItemExample>4</GridItemExample>
          <GridItemExample>5</GridItemExample>
          <GridItemExample>6</GridItemExample>
          <GridItemExample>7</GridItemExample>
          <GridItemExample>8</GridItemExample>
          <GridItemExample>9</GridItemExample>
          <GridItemExample>10</GridItemExample>
          <GridItemExample>11</GridItemExample>
          <GridItemExample>12</GridItemExample>
        </Grid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grids con diferentes números de columnas.',
      },
    },
  },
};

// Diferentes espaciados
export const GapVariations: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Sin espaciado (none)</h3>
        <Grid columns={3} gap="none">
          <GridItemExample>Item 1</GridItemExample>
          <GridItemExample>Item 2</GridItemExample>
          <GridItemExample>Item 3</GridItemExample>
        </Grid>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Espaciado pequeño (sm)</h3>
        <Grid columns={3} gap="sm">
          <GridItemExample>Item 1</GridItemExample>
          <GridItemExample>Item 2</GridItemExample>
          <GridItemExample>Item 3</GridItemExample>
        </Grid>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Espaciado mediano (md)</h3>
        <Grid columns={3} gap="md">
          <GridItemExample>Item 1</GridItemExample>
          <GridItemExample>Item 2</GridItemExample>
          <GridItemExample>Item 3</GridItemExample>
        </Grid>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Espaciado grande (lg)</h3>
        <Grid columns={3} gap="lg">
          <GridItemExample>Item 1</GridItemExample>
          <GridItemExample>Item 2</GridItemExample>
          <GridItemExample>Item 3</GridItemExample>
        </Grid>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Espaciado extra grande (xl)</h3>
        <Grid columns={3} gap="xl">
          <GridItemExample>Item 1</GridItemExample>
          <GridItemExample>Item 2</GridItemExample>
          <GridItemExample>Item 3</GridItemExample>
        </Grid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes opciones de espaciado entre elementos del grid.',
      },
    },
  },
};

// GridItem con posicionamiento específico
export const GridItemPositioning: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">GridItem con span de columnas</h3>
        <Grid columns={4} gap="md">
          <GridItem colSpan={2}>
            <GridItemExample className="bg-green-100 border-green-300">Span 2 columnas</GridItemExample>
          </GridItem>
          <GridItemExample>Item 2</GridItemExample>
          <GridItemExample>Item 3</GridItemExample>
          <GridItem colSpan={3}>
            <GridItemExample className="bg-purple-100 border-purple-300">Span 3 columnas</GridItemExample>
          </GridItem>
          <GridItemExample>Item 5</GridItemExample>
        </Grid>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">GridItem con span de filas</h3>
        <Grid columns={3} rows={3} gap="md">
          <GridItem rowSpan={2}>
            <GridItemExample className="bg-red-100 border-red-300 h-full">Span 2 filas</GridItemExample>
          </GridItem>
          <GridItemExample>Item 2</GridItemExample>
          <GridItemExample>Item 3</GridItemExample>
          <GridItemExample>Item 4</GridItemExample>
          <GridItem colSpan={2}>
            <GridItemExample className="bg-yellow-100 border-yellow-300">Span 2 columnas</GridItemExample>
          </GridItem>
          <GridItemExample>Item 6</GridItemExample>
          <GridItemExample>Item 7</GridItemExample>
        </Grid>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">GridItem con posición específica</h3>
        <Grid columns={4} rows={3} gap="md">
          <GridItem colStart={2} colEnd={4} rowStart={1} rowEnd={3}>
            <GridItemExample className="bg-indigo-100 border-indigo-300 h-full">
              Posición específica<br/>
              Col: 2-4, Row: 1-3
            </GridItemExample>
          </GridItem>
          <GridItemExample>Item 1</GridItemExample>
          <GridItemExample>Item 2</GridItemExample>
          <GridItemExample>Item 3</GridItemExample>
          <GridItemExample>Item 4</GridItemExample>
          <GridItemExample>Item 5</GridItemExample>
          <GridItemExample>Item 6</GridItemExample>
        </Grid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'GridItem con diferentes opciones de posicionamiento y span.',
      },
    },
  },
};

// Alineación de elementos
export const Alignment: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Alineación: start</h3>
        <Grid columns={3} gap="md" alignItems="start" justifyItems="start" className="h-32">
          <GridItemExample className="w-20 h-16">Start</GridItemExample>
          <GridItemExample className="w-24 h-12">Start</GridItemExample>
          <GridItemExample className="w-16 h-20">Start</GridItemExample>
        </Grid>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Alineación: center</h3>
        <Grid columns={3} gap="md" alignItems="center" justifyItems="center" className="h-32">
          <GridItemExample className="w-20 h-16">Center</GridItemExample>
          <GridItemExample className="w-24 h-12">Center</GridItemExample>
          <GridItemExample className="w-16 h-20">Center</GridItemExample>
        </Grid>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Alineación: end</h3>
        <Grid columns={3} gap="md" alignItems="end" justifyItems="end" className="h-32">
          <GridItemExample className="w-20 h-16">End</GridItemExample>
          <GridItemExample className="w-24 h-12">End</GridItemExample>
          <GridItemExample className="w-16 h-20">End</GridItemExample>
        </Grid>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Alineación: stretch</h3>
        <Grid columns={3} gap="md" alignItems="stretch" justifyItems="stretch" className="h-32">
          <GridItemExample>Stretch</GridItemExample>
          <GridItemExample>Stretch</GridItemExample>
          <GridItemExample>Stretch</GridItemExample>
        </Grid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Diferentes opciones de alineación para los elementos del grid.',
      },
    },
  },
};

// Grids predefinidos
export const PredefinedGrids: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">TwoColumnGrid</h3>
        <TwoColumnGrid>
          <GridItemExample className="bg-green-100 border-green-300">Columna 1</GridItemExample>
          <GridItemExample className="bg-green-100 border-green-300">Columna 2</GridItemExample>
          <GridItemExample className="bg-green-100 border-green-300">Columna 3</GridItemExample>
          <GridItemExample className="bg-green-100 border-green-300">Columna 4</GridItemExample>
        </TwoColumnGrid>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">ThreeColumnGrid</h3>
        <ThreeColumnGrid>
          <GridItemExample className="bg-purple-100 border-purple-300">Item 1</GridItemExample>
          <GridItemExample className="bg-purple-100 border-purple-300">Item 2</GridItemExample>
          <GridItemExample className="bg-purple-100 border-purple-300">Item 3</GridItemExample>
          <GridItemExample className="bg-purple-100 border-purple-300">Item 4</GridItemExample>
          <GridItemExample className="bg-purple-100 border-purple-300">Item 5</GridItemExample>
          <GridItemExample className="bg-purple-100 border-purple-300">Item 6</GridItemExample>
        </ThreeColumnGrid>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">FourColumnGrid</h3>
        <FourColumnGrid>
          <GridItemExample className="bg-red-100 border-red-300">1</GridItemExample>
          <GridItemExample className="bg-red-100 border-red-300">2</GridItemExample>
          <GridItemExample className="bg-red-100 border-red-300">3</GridItemExample>
          <GridItemExample className="bg-red-100 border-red-300">4</GridItemExample>
          <GridItemExample className="bg-red-100 border-red-300">5</GridItemExample>
          <GridItemExample className="bg-red-100 border-red-300">6</GridItemExample>
          <GridItemExample className="bg-red-100 border-red-300">7</GridItemExample>
          <GridItemExample className="bg-red-100 border-red-300">8</GridItemExample>
        </FourColumnGrid>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">ResponsiveGrid</h3>
        <p className="text-sm text-gray-600 mb-4">Se adapta automáticamente: 1 columna en móvil, 2 en tablet, 3 en desktop</p>
        <ResponsiveGrid>
          <GridItemExample className="bg-yellow-100 border-yellow-300">Responsive 1</GridItemExample>
          <GridItemExample className="bg-yellow-100 border-yellow-300">Responsive 2</GridItemExample>
          <GridItemExample className="bg-yellow-100 border-yellow-300">Responsive 3</GridItemExample>
          <GridItemExample className="bg-yellow-100 border-yellow-300">Responsive 4</GridItemExample>
          <GridItemExample className="bg-yellow-100 border-yellow-300">Responsive 5</GridItemExample>
          <GridItemExample className="bg-yellow-100 border-yellow-300">Responsive 6</GridItemExample>
        </ResponsiveGrid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Componentes de grid predefinidos para uso rápido.',
      },
    },
  },
};

// Grid responsivo personalizado
export const ResponsiveCustom: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Grid Responsivo Personalizado</h3>
        <p className="text-sm text-gray-600 mb-4">Cambia el número de columnas según el tamaño de pantalla</p>
        <Grid 
          columns={1} 
          gap="md" 
          className="md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <GridItemExample>Item 1</GridItemExample>
          <GridItemExample>Item 2</GridItemExample>
          <GridItemExample>Item 3</GridItemExample>
          <GridItemExample>Item 4</GridItemExample>
          <GridItemExample>Item 5</GridItemExample>
          <GridItemExample>Item 6</GridItemExample>
          <GridItemExample>Item 7</GridItemExample>
          <GridItemExample>Item 8</GridItemExample>
        </Grid>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Grid con Auto-fit</h3>
        <p className="text-sm text-gray-600 mb-4">Las columnas se ajustan automáticamente al contenido disponible</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          <GridItemExample>Auto-fit 1</GridItemExample>
          <GridItemExample>Auto-fit 2</GridItemExample>
          <GridItemExample>Auto-fit 3</GridItemExample>
          <GridItemExample>Auto-fit 4</GridItemExample>
          <GridItemExample>Auto-fit 5</GridItemExample>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grids responsivos con comportamiento personalizado.',
      },
    },
  },
};

// Casos de uso comunes
export const CommonUseCases: Story = {
  render: () => (
    <div className="space-y-12 p-6">
      {/* Dashboard Layout */}
      <div>
        <h3 className="text-xl font-semibold mb-6">Dashboard Layout</h3>
        <Grid columns={4} rows={3} gap="lg">
          <GridItem colSpan={4}>
            <div className="bg-blue-600 text-white p-6 rounded-lg">
              <h4 className="text-lg font-semibold">Header / Navigation</h4>
            </div>
          </GridItem>
          
          <GridItem rowSpan={2}>
            <div className="bg-gray-100 p-6 rounded-lg h-full">
              <h4 className="font-semibold mb-4">Sidebar</h4>
              <ul className="space-y-2 text-sm">
                <li>📊 Dashboard</li>
                <li>👥 Usuarios</li>
                <li>📈 Reportes</li>
                <li>⚙️ Configuración</li>
              </ul>
            </div>
          </GridItem>
          
          <GridItem colSpan={3}>
            <div className="bg-white border-2 border-gray-200 p-6 rounded-lg">
              <h4 className="font-semibold mb-4">Contenido Principal</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-100 p-4 rounded text-center">
                  <div className="text-2xl font-bold text-green-600">1,234</div>
                  <div className="text-sm text-green-700">Usuarios</div>
                </div>
                <div className="bg-blue-100 p-4 rounded text-center">
                  <div className="text-2xl font-bold text-blue-600">€45K</div>
                  <div className="text-sm text-blue-700">Ingresos</div>
                </div>
                <div className="bg-purple-100 p-4 rounded text-center">
                  <div className="text-2xl font-bold text-purple-600">89%</div>
                  <div className="text-sm text-purple-700">Conversión</div>
                </div>
              </div>
            </div>
          </GridItem>
        </Grid>
      </div>
      
      {/* Product Grid */}
      <div>
        <h3 className="text-xl font-semibold mb-6">Catálogo de Productos</h3>
        <ResponsiveGrid>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Imagen {i + 1}</span>
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-2">Producto {i + 1}</h4>
                <p className="text-gray-600 text-sm mb-3">Descripción del producto con características principales.</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">€{(i + 1) * 25}</span>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ResponsiveGrid>
      </div>
      
      {/* Blog Layout */}
      <div>
        <h3 className="text-xl font-semibold mb-6">Layout de Blog</h3>
        <Grid columns={4} gap="lg">
          <GridItem colSpan={3}>
            <div className="space-y-6">
              <article className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-xl font-semibold mb-3">Título del Artículo Principal</h4>
                <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>📅 15 Mar 2024</span>
                  <span>👤 Juan Pérez</span>
                  <span>🏷️ Tecnología</span>
                </div>
              </article>
              
              <div className="grid grid-cols-2 gap-6">
                <article className="bg-white border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold mb-2">Artículo Secundario 1</h5>
                  <p className="text-gray-600 text-sm">Resumen del artículo...</p>
                </article>
                <article className="bg-white border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold mb-2">Artículo Secundario 2</h5>
                  <p className="text-gray-600 text-sm">Resumen del artículo...</p>
                </article>
              </div>
            </div>
          </GridItem>
          
          <GridItem>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold mb-4">Sidebar</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium mb-2">Artículos Populares</h5>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-blue-600 hover:underline">Guía de React 2024</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">CSS Grid vs Flexbox</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">JavaScript Moderno</a></li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium mb-2">Categorías</h5>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">React</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">CSS</span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">JS</span>
                  </div>
                </div>
              </div>
            </div>
          </GridItem>
        </Grid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Ejemplos de layouts comunes usando el sistema de Grid: dashboard, catálogo de productos y blog.',
      },
    },
  },
};