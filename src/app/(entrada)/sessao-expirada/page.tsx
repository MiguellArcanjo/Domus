import type { Metadata } from 'next'
import { Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = { title: 'Sessão expirada' }

/** Para onde o app manda quando a sessão acaba. */
export default function SessaoExpirada() {
  return (
    <div style={{ display: 'grid', gap: 14, justifyItems: 'start', paddingTop: 40 }}>
      <Clock size={40} color="var(--ink-muted)" aria-hidden />
      <h1 style={{ fontSize: 28 }}>Sua sessão terminou</h1>
      <p style={{ color: 'var(--ink-muted)' }}>Por segurança, saímos da sua conta depois de um tempo sem uso. Entre de novo para continuar de onde parou.</p>
      <Button href="/entrar" variant="primary" block>Entrar de novo</Button>
    </div>
  )
}
