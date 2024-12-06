import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cortex',
    short_name: 'Cortex',
    description: 'An agent and actions built around your Farcaster profile',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/images/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}