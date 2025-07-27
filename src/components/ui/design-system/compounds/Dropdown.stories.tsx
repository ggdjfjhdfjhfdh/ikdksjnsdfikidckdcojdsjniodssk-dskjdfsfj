import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
  DropdownMenu,
} from './Dropdown';
import { Button, PrimaryButton, SecondaryButton } from '../primitives/Button';

const meta: Meta<typeof Dropdown> = {
  title: 'Design System/Compounds/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente Dropdown compuesto con soporte para posicionamiento, cierre automático y componentes anidados. Incluye hook useDropdownDisclosure y DropdownMenu predefinido.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['bottom-start', 'bottom-end', 'top-start', 'top-end'],
      description: 'Posición del dropdown',
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Cerrar al seleccionar un item',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Estado deshabilitado del dropdown',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Componente auxiliar para las historias
const DropdownExample = ({ 
  placement = 'bottom-start', 
  closeOnSelect = true, 
  isDisabled = false 
}) => {
  return (
    <Dropdown
      placement={placement}
      closeOnSelect={closeOnSelect}
      isDisabled={isDisabled}
    >
      <DropdownTrigger>
        <Button disabled={isDisabled}>
          Opciones ▼
        </Button>
      </DropdownTrigger>
      
      <DropdownContent>
        <DropdownLabel>Acciones</DropdownLabel>
        <DropdownItem onClick={() => alert('Editar seleccionado')}>
          ✏️ Editar
        </DropdownItem>
        <DropdownItem onClick={() => alert('Duplicar seleccionado')}>
          📋 Duplicar
        </DropdownItem>
        <DropdownSeparator />
        <DropdownLabel>Peligroso</DropdownLabel>
        <DropdownItem onClick={() => alert('Eliminar seleccionado')} isDanger>
          🗑️ Eliminar
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};

// Historia principal
export const Default: Story = {
  render: () => <DropdownExample />,
};

// Posicionamiento
export const Placement: Story = {
  render: () => {
    const placements = [
      'bottom-start', 'bottom-end', 'top-start', 'top-end'
    ] as const;
    
    return (
      <div className="grid grid-cols-2 gap-8 p-8">
        {placements.map((placement) => {
          return (
            <div key={placement} className="flex flex-col items-center">
              <p className="text-sm text-gray-600 mb-2">{placement}</p>
              <Dropdown placement={placement}>
                <DropdownTrigger>
                  <Button size="sm">
                    {placement.split('-')[0]} ▼
                  </Button>
                </DropdownTrigger>
                
                <DropdownContent>
                  <DropdownItem>Opción 1</DropdownItem>
                  <DropdownItem>Opción 2</DropdownItem>
                  <DropdownItem>Opción 3</DropdownItem>
                </DropdownContent>
              </Dropdown>
            </div>
          );
        })}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Diferentes posiciones disponibles para el dropdown.',
      },
    },
  },
};

// Dropdown con iconos y descripciones
export const WithIconsAndDescriptions: Story = {
  render: () => {
    return (
      <Dropdown>
        <DropdownTrigger>
          <PrimaryButton>
            Acciones de Usuario ▼
          </PrimaryButton>
        </DropdownTrigger>
        
        <DropdownContent className="w-64">
          <DropdownLabel>Perfil</DropdownLabel>
          <DropdownItem className="flex items-center gap-3 p-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              👤
            </div>
            <div>
              <div className="font-medium">Ver Perfil</div>
              <div className="text-sm text-gray-500">Gestiona tu información personal</div>
            </div>
          </DropdownItem>
          
          <DropdownItem className="flex items-center gap-3 p-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              ⚙️
            </div>
            <div>
              <div className="font-medium">Configuración</div>
              <div className="text-sm text-gray-500">Ajusta tus preferencias</div>
            </div>
          </DropdownItem>
          
          <DropdownSeparator />
          
          <DropdownLabel>Ayuda</DropdownLabel>
          <DropdownItem className="flex items-center gap-3 p-3">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              📚
            </div>
            <div>
              <div className="font-medium">Documentación</div>
              <div className="text-sm text-gray-500">Aprende a usar la plataforma</div>
            </div>
          </DropdownItem>
          
          <DropdownItem className="flex items-center gap-3 p-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              💬
            </div>
            <div>
              <div className="font-medium">Soporte</div>
              <div className="text-sm text-gray-500">Contacta con nuestro equipo</div>
            </div>
          </DropdownItem>
          
          <DropdownSeparator />
          
          <DropdownItem className="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              🚪
            </div>
            <div>
              <div className="font-medium">Cerrar Sesión</div>
              <div className="text-sm text-red-400">Salir de tu cuenta</div>
            </div>
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown con iconos, descripciones y diferentes estilos de items.',
      },
    },
  },
};

// DropdownMenu predefinido
export const DropdownMenuExample: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    
    const menuItems = [
      { label: 'Crear Nuevo', onClick: () => { setSelectedOption('create'); alert('Seleccionado: create'); }, icon: '➕' },
      { label: 'Importar', onClick: () => { setSelectedOption('import'); alert('Seleccionado: import'); }, icon: '📥' },
      { label: 'Exportar', onClick: () => { setSelectedOption('export'); alert('Seleccionado: export'); }, icon: '📤' },
      'separator' as const,
      { label: 'Configuración', onClick: () => { setSelectedOption('settings'); alert('Seleccionado: settings'); }, icon: '⚙️' },
      { label: 'Ayuda', onClick: () => { setSelectedOption('help'); alert('Seleccionado: help'); }, icon: '❓' },
      'separator' as const,
      { label: 'Cerrar Sesión', onClick: () => { setSelectedOption('logout'); alert('Seleccionado: logout'); }, icon: '🚪', isDanger: true },
    ];
    
    return (
      <div className="space-y-4">
        <DropdownMenu
          trigger={
            <PrimaryButton>
              Menú Rápido ▼
            </PrimaryButton>
          }
          items={menuItems}
        />
        
        {selectedOption && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-blue-800 text-sm">
              Última opción seleccionada: <strong>{selectedOption}</strong>
            </p>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'DropdownMenu predefinido con configuración simplificada mediante array de items.',
      },
    },
  },
};

// Dropdown sin cierre automático
export const NoAutoClose: Story = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    
    const toggleItem = (item: string) => {
      setSelectedItems(prev => 
        prev.includes(item) 
          ? prev.filter(i => i !== item)
          : [...prev, item]
      );
    };
    
    return (
      <div className="space-y-4">
        <Dropdown closeOnSelect={false}>
          <DropdownTrigger>
            <Button>
              Filtros ({selectedItems.length}) ▼
            </Button>
          </DropdownTrigger>
          
          <DropdownContent className="w-56">
            <DropdownLabel>Categorías</DropdownLabel>
            
            {['Tecnología', 'Diseño', 'Marketing', 'Ventas', 'Finanzas'].map((category) => (
              <DropdownItem
                key={category}
                onClick={() => toggleItem(category)}
                className="flex items-center justify-between"
              >
                <span>{category}</span>
                {selectedItems.includes(category) && (
                  <span className="text-blue-600">✓</span>
                )}
              </DropdownItem>
            ))}
            
            <DropdownSeparator />
            
            <div className="p-2">
              <button
                onClick={() => setSelectedItems([])}
                className="w-full text-sm text-gray-600 hover:text-gray-800 py-1"
              >
                Limpiar todo
              </button>
              <DropdownItem className="w-full text-sm bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors mt-2">
                Aplicar filtros
              </DropdownItem>
            </div>
          </DropdownContent>
        </Dropdown>
        
        {selectedItems.length > 0 && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 text-sm">
              Filtros activos: {selectedItems.join(', ')}
            </p>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown que no se cierra automáticamente al seleccionar, útil para filtros múltiples.',
      },
    },
  },
};

// Dropdown deshabilitado
export const Disabled: Story = {
  render: () => {
    return (
      <div className="flex gap-4">
        <Dropdown>
          <DropdownTrigger>
            <Button>
              Dropdown Normal ▼
            </Button>
          </DropdownTrigger>
          
          <DropdownContent>
            <DropdownItem>Opción 1</DropdownItem>
            <DropdownItem>Opción 2</DropdownItem>
            <DropdownItem>Opción 3</DropdownItem>
          </DropdownContent>
        </Dropdown>
        
        <Dropdown isDisabled>
          <DropdownTrigger>
            <Button disabled>
              Dropdown Deshabilitado ▼
            </Button>
          </DropdownTrigger>
          
          <DropdownContent>
            <DropdownItem>Esta opción no es accesible</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Comparación entre dropdown normal y deshabilitado.',
      },
    },
  },
};

// Dropdown anidado
export const Nested: Story = {
  render: () => {
    return (
      <Dropdown>
        <DropdownTrigger>
          <PrimaryButton>
            Menú Principal ▼
          </PrimaryButton>
        </DropdownTrigger>
        
        <DropdownContent>
          <DropdownLabel>Acciones Básicas</DropdownLabel>
          <DropdownItem onClick={() => alert('Nuevo documento')}>
            📄 Nuevo Documento
          </DropdownItem>
          <DropdownItem onClick={() => alert('Abrir archivo')}>
            📁 Abrir Archivo
          </DropdownItem>
          
          <DropdownSeparator />
          
          <DropdownLabel>Más Opciones</DropdownLabel>
          
          {/* Dropdown anidado */}
          <div className="relative group">
            <DropdownItem className="flex items-center justify-between">
              <span>🔧 Herramientas</span>
              <span className="text-xs">▶</span>
            </DropdownItem>
            
            {/* Submenu simulado - en una implementación real usarías otro Dropdown */}
            <div className="absolute left-full top-0 ml-1 bg-white border border-gray-200 rounded-md shadow-lg py-1 min-w-48 z-50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onClick={() => alert('Validador')}>
                ✅ Validador
              </button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onClick={() => alert('Formateador')}>
                🎨 Formateador
              </button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onClick={() => alert('Minificador')}>
                📦 Minificador
              </button>
            </div>
          </div>
          
          <DropdownSeparator />
          
          <DropdownItem onClick={() => alert('Configuración')}>
            ⚙️ Configuración
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo de dropdown con submenú anidado.',
      },
    },
  },
};

// Dropdowns independientes
export const UseDropdownDisclosureExample: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="font-semibold text-blue-900 mb-2">Dropdowns Independientes</h3>
          <p className="text-blue-800 text-sm">
            Cada dropdown gestiona su propio estado internamente de forma independiente.
          </p>
        </div>
        
        <div className="flex gap-4">
          <Dropdown>
            <DropdownTrigger>
              <Button>
                Dropdown 1 ▼
              </Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem>Opción 1.1</DropdownItem>
              <DropdownItem>Opción 1.2</DropdownItem>
              <DropdownItem>Opción 1.3</DropdownItem>
            </DropdownContent>
          </Dropdown>
          
          <Dropdown>
            <DropdownTrigger>
              <Button>
                Dropdown 2 ▼
              </Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem>Opción 2.1</DropdownItem>
              <DropdownItem>Opción 2.2</DropdownItem>
              <DropdownItem>Opción 2.3</DropdownItem>
            </DropdownContent>
          </Dropdown>
          
          <Dropdown>
            <DropdownTrigger>
              <Button>
                Dropdown 3 ▼
              </Button>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem>Opción 3.1</DropdownItem>
              <DropdownItem>Opción 3.2</DropdownItem>
              <DropdownItem>Opción 3.3</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo de múltiples dropdowns independientes, cada uno gestionando su propio estado.',
      },
    },
  },
};