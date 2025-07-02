'use client';

import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

export default function SafeHtmlRenderer({ html }: { html: string }) {
  const [sanitizedHtml, setSanitizedHtml] = useState('');

  useEffect(() => {
    // Configure DOMPurify to fix common nesting issues
    const clean = DOMPurify.sanitize(html, {
      FORBID_TAGS: ['p>ul', 'p>ol', 'p>div'],
      ADD_TAGS: ['#text'],
      WHOLE_DOCUMENT: false,
    });
    
    // Additional processing to ensure valid HTML structure
    const processedHtml = clean
      .replace(/<p[^>]*>\s*<(ul|ol|div)/g, '</p><$1')
      .replace(/<\/(ul|ol|div)>\s*<\/p>/g, '</$1><p>');
      
    setSanitizedHtml(processedHtml);
  }, [html]);

  return (
    <div 
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      className="prose max-w-none"
    />
  );
}
