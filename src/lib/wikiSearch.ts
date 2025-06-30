import fs from 'fs';
import path from 'path';

type WikiArticle = {
  title: string;
  description: string;
  href: string;
  content?: string;
};

export async function getAllWikiArticles(): Promise<WikiArticle[]> {
  const wikiDir = path.join(process.cwd(), 'src/app/recursos/wiki');
  const articles: WikiArticle[] = [];

  // Función recursiva para leer directorios
  const readDirectory = (dir: string, baseHref = '') => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(baseHref, entry.name);
      
      if (entry.isDirectory()) {
        readDirectory(fullPath, relativePath);
      } else if (entry.isFile() && entry.name === 'page.tsx') {
        try {
          const content = fs.readFileSync(fullPath, 'utf-8');
          // Extraer título y descripción del archivo
          const titleMatch = content.match(/title: ['"](.+?)['"]/);
          const descMatch = content.match(/description: ['"](.+?)['"]/);
          
          if (titleMatch && descMatch) {
            articles.push({
              title: titleMatch[1],
              description: descMatch[1],
              href: `/recursos/wiki/${relativePath.replace(/\\/g, '/').replace(/\/page\.tsx$/, '')}`,
              content
            });
          }
        } catch (error) {
          console.error(`Error reading ${fullPath}:`, error);
        }
      }
    }
  };

  readDirectory(wikiDir);
  return articles;
}
