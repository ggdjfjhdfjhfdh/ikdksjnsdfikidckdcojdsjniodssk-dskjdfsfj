import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  useModalDisclosure,
  ConfirmModal,
} from './Modal';
import { Button, PrimaryButton, SecondaryButton } from '../primitives/Button';

const meta: Meta<typeof Modal> = {
  title: 'Design System/Compounds/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Componente Modal compuesto con soporte para diferentes tamaños, centrado, cierre automático y componentes anidados. Incluye hook useModalDisclosure y ConfirmModal predefinido.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Estado de apertura del modal',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Tamaño del modal',
    },
    isCentered: {
      control: 'boolean',
      description: 'Centrar el modal verticalmente',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Cerrar al hacer click en el overlay',
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Cerrar con la tecla Escape',
    },
    preventBodyScroll: {
      control: 'boolean',
      description: 'Prevenir scroll del body',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Componente auxiliar para las historias
const ModalExample = ({ 
  size = 'md', 
  isCentered = true, 
  closeOnOverlayClick = true, 
  closeOnEsc = true,
  preventBodyScroll = true 
}) => {
  const { isOpen, onOpen, onClose } = useModalDisclosure();
  
  return (
    <>
      <PrimaryButton onClick={onOpen}>
        Abrir Modal
      </PrimaryButton>
      
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={size}
        isCentered={isCentered}
        closeOnOverlayClick={closeOnOverlayClick}
        closeOnEsc={closeOnEsc}
        preventBodyScroll={preventBodyScroll}
      >
        <ModalHeader>
          <ModalTitle>Título del Modal</ModalTitle>
          <ModalDescription>Descripción opcional del modal</ModalDescription>
        </ModalHeader>
        
        <ModalBody>
          <p>Este es el contenido principal del modal. Aquí puedes incluir cualquier tipo de contenido como formularios, texto, imágenes, etc.</p>
          <p>El modal se puede cerrar haciendo click en el overlay, presionando Escape, o usando los botones de acción.</p>
        </ModalBody>
        
        <ModalFooter>
          <PrimaryButton onClick={onClose}>
            Aceptar
          </PrimaryButton>
          <SecondaryButton onClick={onClose}>
            Cancelar
          </SecondaryButton>
        </ModalFooter>
      </Modal>
    </>
  );
};

// Historia principal
export const Default: Story = {
  render: () => <ModalExample />,
};

// Tamaños
export const Sizes: Story = {
  render: () => {
    const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const;
    const [openModal, setOpenModal] = useState<string | null>(null);
    
    return (
      <div className="flex flex-wrap gap-4">
        {sizes.map((size) => (
          <div key={size}>
            <Button
              onClick={() => setOpenModal(size)}
              variant="outline"
            >
              Modal {size.toUpperCase()}
            </Button>
            
            <Modal
              isOpen={openModal === size}
              onClose={() => setOpenModal(null)}
              size={size}
            >
              <ModalHeader>
                <ModalTitle>Modal {size.toUpperCase()}</ModalTitle>
                <ModalDescription>Ejemplo de modal en tamaño {size}</ModalDescription>
              </ModalHeader>
              
              <ModalBody>
                <p>Este modal tiene el tamaño <strong>{size}</strong>.</p>
                <p>El contenido se adapta automáticamente al tamaño seleccionado.</p>
                {size === 'full' && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <p>El modal full ocupa toda la pantalla y es ideal para contenido extenso o aplicaciones complejas.</p>
                  </div>
                )}
              </ModalBody>
              
              <ModalFooter>
                <PrimaryButton onClick={() => setOpenModal(null)}>
                  Cerrar
                </PrimaryButton>
              </ModalFooter>
            </Modal>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Diferentes tamaños disponibles para el modal: sm, md, lg, xl y full.',
      },
    },
  },
};

// Modal con formulario
export const WithForm: Story = {
  render: () => {
    const { isOpen, onOpen, onClose } = useModalDisclosure();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Formulario enviado:\nNombre: ${formData.name}\nEmail: ${formData.email}\nMensaje: ${formData.message}`);
      onClose();
      setFormData({ name: '', email: '', message: '' });
    };
    
    return (
      <>
        <PrimaryButton onClick={onOpen}>
          Abrir Formulario
        </PrimaryButton>
        
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              <ModalTitle>Contacto</ModalTitle>
              <ModalDescription>Envíanos un mensaje y te responderemos pronto</ModalDescription>
            </ModalHeader>
            
            <ModalBody>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tu nombre completo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tu@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje *
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Escribe tu mensaje aquí..."
                  />
                </div>
              </div>
            </ModalBody>
            
            <ModalFooter>
              <PrimaryButton type="submit">
                Enviar Mensaje
              </PrimaryButton>
              <SecondaryButton type="button" onClick={onClose}>
                Cancelar
              </SecondaryButton>
            </ModalFooter>
          </form>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal con formulario de contacto completo.',
      },
    },
  },
};

// ConfirmModal
export const ConfirmModalExample: Story = {
  render: () => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [showDanger, setShowDanger] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    
    return (
      <div className="flex flex-wrap gap-4">
        <Button onClick={() => setShowConfirm(true)} variant="outline">
          Confirmar Acción
        </Button>
        
        <Button onClick={() => setShowDanger(true)} variant="outline" colorScheme="red">
          Acción Peligrosa
        </Button>
        
        <Button onClick={() => setShowWarning(true)} variant="outline" colorScheme="yellow">
          Acción con Advertencia
        </Button>
        
        {/* Modal de confirmación normal */}
        <ConfirmModal
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={() => {
            alert('Acción confirmada');
            setShowConfirm(false);
          }}
          title="Confirmar acción"
          description="¿Estás seguro de que quieres realizar esta acción?"
          confirmText="Confirmar"
          cancelText="Cancelar"
        />
        
        {/* Modal de confirmación peligrosa */}
        <ConfirmModal
          isOpen={showDanger}
          onClose={() => setShowDanger(false)}
          onConfirm={() => {
            alert('Elemento eliminado');
            setShowDanger(false);
          }}
          title="Eliminar elemento"
          description="Esta acción no se puede deshacer. ¿Estás seguro de que quieres eliminar este elemento permanentemente?"
          confirmText="Eliminar"
          cancelText="Cancelar"
          variant="red"
        />
        
        {/* Modal de advertencia */}
        <ConfirmModal
          isOpen={showWarning}
          onClose={() => setShowWarning(false)}
          onConfirm={() => {
            alert('Cambios guardados');
            setShowWarning(false);
          }}
          title="Guardar cambios"
          description="Tienes cambios sin guardar. ¿Quieres guardarlos antes de continuar?"
          confirmText="Guardar"
          cancelText="Descartar"
          variant="yellow"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'ConfirmModal predefinido con diferentes variantes de color para distintos tipos de confirmación.',
      },
    },
  },
};

// Modal sin centrar
export const NotCentered: Story = {
  render: () => {
    const { isOpen, onOpen, onClose } = useModalDisclosure();
    
    return (
      <>
        <PrimaryButton onClick={onOpen}>
          Modal No Centrado
        </PrimaryButton>
        
        <Modal isOpen={isOpen} onClose={onClose} isCentered={false}>
          <ModalHeader>
            <ModalTitle>Modal en la parte superior</ModalTitle>
            <ModalDescription>Este modal aparece en la parte superior de la pantalla</ModalDescription>
          </ModalHeader>
          
          <ModalBody>
            <p>Cuando isCentered es false, el modal se posiciona en la parte superior de la pantalla.</p>
            <p>Esto puede ser útil para modales que contienen mucho contenido o para ciertos diseños específicos.</p>
          </ModalBody>
          
          <ModalFooter>
            <PrimaryButton onClick={onClose}>
              Cerrar
            </PrimaryButton>
          </ModalFooter>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal posicionado en la parte superior en lugar de centrado.',
      },
    },
  },
};

// Modal con configuraciones personalizadas
export const CustomBehavior: Story = {
  render: () => {
    const { isOpen, onOpen, onClose } = useModalDisclosure();
    
    return (
      <>
        <PrimaryButton onClick={onOpen}>
          Modal Personalizado
        </PrimaryButton>
        
        <Modal 
          isOpen={isOpen} 
          onClose={onClose}
          closeOnOverlayClick={false}
          closeOnEsc={false}
          preventBodyScroll={true}
        >
          <ModalHeader>
            <ModalTitle>Modal con comportamiento personalizado</ModalTitle>
            <ModalDescription>Este modal solo se puede cerrar con los botones</ModalDescription>
          </ModalHeader>
          
          <ModalBody>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-yellow-800 text-sm">
                  <strong>Nota:</strong> Este modal tiene deshabilitado el cierre por overlay y por tecla Escape.
                </p>
              </div>
              
              <p>Solo puedes cerrarlo usando los botones de abajo. Esto es útil para:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li>Formularios importantes que no deben perderse</li>
                <li>Procesos críticos que requieren confirmación</li>
                <li>Modales con información sensible</li>
              </ul>
            </div>
          </ModalBody>
          
          <ModalFooter>
            <PrimaryButton onClick={onClose}>
              Entendido
            </PrimaryButton>
            <SecondaryButton onClick={onClose}>
              Cerrar
            </SecondaryButton>
          </ModalFooter>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Modal con comportamiento personalizado: sin cierre por overlay ni Escape.',
      },
    },
  },
};

// Hook useModalDisclosure
export const UseModalDisclosureExample: Story = {
  render: () => {
    const modal1 = useModalDisclosure();
    const modal2 = useModalDisclosure();
    const modal3 = useModalDisclosure();
    
    return (
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <h3 className="font-semibold text-blue-900 mb-2">Hook useModalDisclosure</h3>
          <p className="text-blue-800 text-sm">
            El hook useModalDisclosure proporciona un estado y funciones para controlar modales de forma sencilla.
          </p>
        </div>
        
        <div className="flex gap-4">
          <PrimaryButton onClick={modal1.onOpen}>
            Modal 1
          </PrimaryButton>
          <PrimaryButton onClick={modal2.onOpen}>
            Modal 2
          </PrimaryButton>
          <PrimaryButton onClick={modal3.onOpen}>
            Modal 3
          </PrimaryButton>
        </div>
        
        {/* Modal 1 */}
        <Modal isOpen={modal1.isOpen} onClose={modal1.onClose}>
          <ModalHeader>
            <ModalTitle>Primer Modal</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>Este es el primer modal controlado por useModalDisclosure.</p>
            <PrimaryButton onClick={modal2.onOpen}>
              Abrir Modal 2 desde aquí
            </PrimaryButton>
          </ModalBody>
          <ModalFooter>
            <PrimaryButton onClick={modal1.onClose}>
              Cerrar
            </PrimaryButton>
          </ModalFooter>
        </Modal>
        
        {/* Modal 2 */}
        <Modal isOpen={modal2.isOpen} onClose={modal2.onClose}>
          <ModalHeader>
            <ModalTitle>Segundo Modal</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>Este es el segundo modal. Puedes tener múltiples modales independientes.</p>
          </ModalBody>
          <ModalFooter>
            <PrimaryButton onClick={modal2.onClose}>
              Cerrar
            </PrimaryButton>
          </ModalFooter>
        </Modal>
        
        {/* Modal 3 */}
        <Modal isOpen={modal3.isOpen} onClose={modal3.onClose}>
          <ModalHeader>
            <ModalTitle>Tercer Modal</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>Cada modal tiene su propio estado independiente gracias al hook.</p>
          </ModalBody>
          <ModalFooter>
            <PrimaryButton onClick={modal3.onClose}>
              Cerrar
            </PrimaryButton>
          </ModalFooter>
        </Modal>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Ejemplo de uso del hook useModalDisclosure para controlar múltiples modales independientes.',
      },
    },
  },
};