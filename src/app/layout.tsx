import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import '../../brand/tokens/tokens.css'
import './globals.css'
import { PerfilProvider } from '@/components/layout/PerfilProvider'

export const metadata: Metadata = {
  title: { default: 'Domu · Aluguel em dia. Casa em ordem.', template: '%s · Domu' },
  description: 'Gestão de aluguel e prestadores de manutenção da sua região, com preço antes de contratar e pagamento protegido.',
  applicationName: 'Domu',
  manifest: '/manifest.webmanifest',
  appleWebApp: { capable: true, title: 'Domu', statusBarStyle: 'default' },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F6F2' },
    { media: '(prefers-color-scheme: dark)', color: '#0D1512' },
  ],
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <PerfilProvider>{children}</PerfilProvider>
      </body>
    </html>
  )
}
