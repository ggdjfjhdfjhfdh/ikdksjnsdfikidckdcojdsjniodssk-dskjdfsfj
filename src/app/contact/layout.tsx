export const metadata = {
  title: 'Contacto | SESECPRO',
  description: 'Contácta con nuestros expertos en ciberseguridad para proteger tu negocio o necesidades personales. Soporte técnico y consultas.',
  keywords: ['contacto ciberseguridad', 'soporte seguridad', 'consultoría seguridad', 'asesoramiento seguridad'],
  openGraph: {
    url: 'https://sesecpro.es/contact',
    type: 'website',
    images: [
      {
        url: '/og-contact.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  );
}
