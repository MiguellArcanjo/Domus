'use client'

import { TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/Button'

/** Erro dentro do app: explica e deixa tentar de novo sem perder a navegação. */
export default function ErroApp({ reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert" style={{ display: 'grid', gap: 14, justifyItems: 'start', maxWidth: 520, paddingTop: 24 }}>
      <TriangleAlert size={36} color="var(--danger)" aria-hidden />
      <h1 style={{ fontSize: 24 }}>Não conseguimos carregar esta tela</h1>
      <p style={{ color: 'var(--ink-muted)' }}>Pode ser a conexão. Tente de novo; se continuar, volte para o início.</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="primary" onClick={reset}>Tentar de novo</Button>
        <Button href="/app">Ir para o início</Button>
      </div>
    </div>
  )
}
