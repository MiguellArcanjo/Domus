import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { TrustBadge } from '@/components/domain/Trust'
import { Arch } from '@/components/site/Blocks'

export const metadata: Metadata = { title: 'Boas-vindas' }

/** Abertura do app instalado (PWA), no padrão de onboarding da referência Property Finder. */
export default function BoasVindas() {
  return (
    <div style={{ display: 'grid', gap: 20, justifyItems: 'center', textAlign: 'center', paddingTop: 32, flexGrow: 1, alignContent: 'start' }}>
      <TrustBadge>+50 prestadores verificados</TrustBadge>
      <h1 style={{ fontSize: 38, lineHeight: 1.05, letterSpacing: '-0.035em' }}>Aluguel em dia.<br />Casa em ordem.</h1>
      <p style={{ color: 'var(--ink-muted)', fontSize: 15, maxWidth: 340 }}>Gestão de aluguel e os melhores prestadores da sua região, com preço antes de contratar.</p>
      <div style={{ width: '70%', maxWidth: 280, padding: '8px 0' }}><Arch stroke={56} /></div>
      <Button href="/entrar" variant="dark" arrow block>Começar</Button>
      <Link href="/entrar" style={{ color: 'var(--brand)', fontWeight: 600, padding: 12 }}>Já tenho conta</Link>
    </div>
  )
}
