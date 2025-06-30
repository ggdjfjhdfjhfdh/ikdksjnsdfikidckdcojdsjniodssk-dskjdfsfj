export interface Guia {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
  categoria: string;
  nivel: string;
  ruta: string;
}

export const guias: Guia[] = [
  {
    id: 1,
    titulo: 'Seguridad en contraseñas',
    descripcion: 'Aprende a crear y gestionar contraseñas seguras para proteger tus cuentas',
    icono: '🔐',
    categoria: 'Seguridad',
    nivel: 'Básico',
    ruta: '/recursos/guias/seguridad-contrasenas',
  },
  {
    id: 2,
    titulo: 'Autenticación en dos pasos',
    descripcion: 'Protege tus cuentas con una capa adicional de seguridad',
    icono: '🛡️',
    categoria: 'Seguridad',
    nivel: 'Intermedio',
    ruta: '/recursos/guias/autenticacion-dos-pasos',
  },
  {
    id: 3,
    titulo: 'Privacidad en redes sociales',
    descripcion: 'Controla tu información personal en plataformas sociales',
    icono: '🔒',
    categoria: 'Privacidad',
    nivel: 'Avanzado',
    ruta: '/recursos/guias/privacidad-redes-sociales',
  },
  {
    id: 4,
    titulo: 'Protección contra phishing',
    descripcion: 'Identifica y evita intentos de estafa en línea',
    icono: '🎣',
    categoria: 'Seguridad',
    nivel: 'Intermedio',
    ruta: '/recursos/guias/proteccion-phishing',
  },
  {
    id: 5,
    titulo: 'Gestión de copias de seguridad',
    descripcion: 'Protege tus datos importantes con backups efectivos',
    icono: '💾',
    categoria: 'Organización',
    nivel: 'Básico',
    ruta: '/recursos/guias/gestion-copias-seguridad',
  },
];
