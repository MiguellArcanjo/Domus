import type { Metadata } from 'next'
import { WifiOff } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { RecarregarButton } from './RecarregarButton'

export const metadata: Metadata = { title: 'Sem conexão' }

/** Tela do PWA quando não há internet. */
export default function Offline() {
  return (
    <main style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center' }}>
      <div style={{ display: 'grid', gap: 14, justifyItems: 'center', maxWidth: 360 }}>
        <Logo size={24} />
        <WifiOff size={40} color="var(--ink-muted)" aria-hidden />
        <h1 style={{ fontSize: 26 }}>Sem conexão</h1>
        <p style={{ color: 'var(--ink-muted)' }}>Confira o Wi-Fi ou os dados móveis. O que você estava fazendo continua aqui quando a conexão voltar.</p>
        <RecarregarButton />
      </div>
    </main>
  )
}
