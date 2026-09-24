import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'

export default function NotFound() {
  return (
    <main style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center' }}>
      <div style={{ display: 'grid', gap: 16, justifyItems: 'center' }}>
        <Logo size={28} />
        <h1 style={{ fontSize: 28 }}>Não encontramos esta página</h1>
        <p style={{ color: 'var(--ink-muted)' }}>O endereço pode ter mudado. Volte para o início.</p>
        <Link href="/" style={{ color: 'var(--brand)', fontWeight: 600 }}>Ir para o início</Link>
      </div>
    </main>
  )
}
