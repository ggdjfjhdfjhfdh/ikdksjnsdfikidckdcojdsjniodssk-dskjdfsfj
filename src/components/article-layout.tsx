import { ReactNode } from 'react';

interface ArticleLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  backUrl: string;
}

export default function ArticleLayout({
  children,
  title,
  description,
  backUrl
}: ArticleLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-6">{description}</p>
      {children}
    </div>
  );
}
