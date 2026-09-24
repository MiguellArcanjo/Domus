import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Domu',
    short_name: 'Domu',
    description: 'Aluguel em dia. Casa em ordem.',
    start_url: '/app',
    display: 'standalone',
    background_color: '#F4F6F2',
    theme_color: '#0E5C4A',
    lang: 'pt-BR',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
