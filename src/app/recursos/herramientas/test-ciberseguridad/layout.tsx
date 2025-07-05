export const metadata = {
  title: 'Test de Ciberseguridad | SESECPRO',
  description: 'Evalúa tus conocimientos de ciberseguridad con nuestro test interactivo y descubre áreas de mejora para protegerte mejor.',
  keywords: ['test ciberseguridad', 'cuestionario seguridad', 'evaluación conocimientos', 'quiz seguridad digital'],
  openGraph: {
    url: 'https://sesecpro.es/recursos/herramientas/test-ciberseguridad',
    type: 'website',
    images: [
      {
        url: '/og-quiz.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function SecurityQuizLayout({
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
