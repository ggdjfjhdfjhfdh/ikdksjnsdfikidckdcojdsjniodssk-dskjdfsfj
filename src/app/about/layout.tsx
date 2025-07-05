export const metadata = {
  title: 'Sobre Nosotros | SESECPRO',
  description: 'Conoce nuestro equipo de expertos en ciberseguridad y nuestra misión de proteger lo que más importa en la era digital.',
  keywords: ['equipo ciberseguridad', 'expertos seguridad', 'consultoría seguridad', 'historia SESECPRO'],
  openGraph: {
    url: 'https://sesecpro.es/about',
    type: 'website',
    images: [
      {
        url: '/og-about.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function AboutLayout({
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
