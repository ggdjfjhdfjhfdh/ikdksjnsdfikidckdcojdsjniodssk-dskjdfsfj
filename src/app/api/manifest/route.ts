import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    "name": "Sesecpro",
    "short_name": "Sesecpro",
    "icons": [
      {
        "src": "/android-chrome-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/android-chrome-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ],
    "theme_color": "#ffffff",
    "background_color": "#ffffff",
    "display": "standalone"
  };

  return NextResponse.json(manifest, {
    headers: {
      'Cache-Control': 'public, max-age=604800, immutable',
      'Content-Type': 'application/manifest+json'
    }
  });
}
