import { Check, Smartphone } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Row, Stack } from '@/components/ui/Stack'
import { LOJAS, NO_APP } from '@/lib/app'
import type { Perfil } from '@/lib/types'

function Loja({ href, linha1, linha2 }: { href: string; linha1: string; linha2: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-grid', gap: 0, padding: '8px 16px', borderRadius: 12, background: 'var(--tinta)', color: '#fff', minWidth: 150, lineHeight: 1.2 }}>
      <span style={{ fontSize: 11, opacity: 0.8 }}>{linha1}</span>
      <b style={{ fontSize: 16 }}>{linha2}</b>
    </a>
  )
}

export function BotoesLojas() {
  return (
    <Row wrap gap={2}>
      <Loja href={LOJAS.ios} linha1="Baixar na" linha2="App Store" />
      <Loja href={LOJAS.android} linha1="Disponível no" linha2="Google Play" />
    </Row>
  )
}

/** Aviso de que a operação do dia a dia fica no app, com os botões das lojas. */
export function BaixarApp({ perfil, titulo = 'O dia a dia fica no app', texto }: { perfil?: Perfil; titulo?: string; texto?: string }) {
  const lista = perfil ? NO_APP[perfil].itens : null
  return (
    <Card tone="soft">
      <Stack gap={3}>
        <Row start gap={3}>
          <span style={{ display: 'grid', placeItems: 'center', width: 40, height: 40, borderRadius: 12, background: 'var(--brand)', color: 'var(--on-brand)', flexShrink: 0 }}><Smartphone size={20} aria-hidden /></span>
          <div>
            <b style={{ fontSize: 16 }}>{titulo}</b>
            <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>{texto ?? 'Aqui no site ficam sua conta, a assinatura e os relatórios. Para o resto, use o app Domu no celular.'}</p>
          </div>
        </Row>
        {lista && (
          <ul style={{ display: 'grid', gap: 6 }}>
            {lista.map((t) => <li key={t} style={{ display: 'flex', gap: 8, fontSize: 14 }}><Check size={16} color="var(--brand)" aria-hidden style={{ flexShrink: 0, marginTop: 2 }} />{t}</li>)}
          </ul>
        )}
        <BotoesLojas />
      </Stack>
    </Card>
  )
}
