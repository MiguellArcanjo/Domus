'use client'

import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'

export default function Erro({ reset }: { error: Error; reset: () => void }) {
  return (
    <main role="alert" style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center' }}>
      <div style={{ display: 'grid', gap: 14, justifyItems: 'center' }}>
        <Logo size={24} />
        <h1 style={{ fontSize: 26 }}>Algo deu errado</h1>
        <p style={{ color: 'var(--ink-muted)' }}>Tente de novo em alguns segundos.</p>
        <Button variant="primary" onClick={reset}>Tentar de novo</Button>
      </div>
    </main>
  )
}
