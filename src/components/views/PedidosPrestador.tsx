'use client'

import { useState } from 'react'
import { ArrowRight, MapPin } from 'lucide-react'
import Link from 'next/link'
import { Avatar } from '@/components/ui/Avatar'
import { Badge, UrgenteBadge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Eyebrow, Meta } from '@/components/ui/Meta'
import { Row, Stack } from '@/components/ui/Stack'
import { Tabs } from '@/components/ui/Tabs'
import { km, reais } from '@/lib/format'
import { CARTEIRA, PEDIDOS_PRESTADOR, PRESTADORES } from '@/lib/mock'

const GRUPOS = [{ id: 'novo', rotulo: 'Novos' }, { id: 'aceito', rotulo: 'Aceitos' }, { id: 'concluido', rotulo: 'Concluídos' }] as const

/** Início do prestador: disponibilidade, saldo e pedidos por status. */
export function PedidosPrestador() {
  const eu = PRESTADORES[0]
  const [aba, setAba] = useState(0)
  const [disponivel, setDisponivel] = useState(true)
  const lista = PEDIDOS_PRESTADOR.filter((p) => p.status === GRUPOS[aba].id)
  return (
    <Stack gap={4} style={{ maxWidth: 720 }}>
      <Row gap={3}>
        <Avatar iniciais={eu.iniciais} size={44} />
        <div style={{ flexGrow: 1 }}><span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>Olá,</span><h1 style={{ fontSize: 22 }}>{eu.nome.split(' ')[0]}</h1></div>
        <button type="button" aria-pressed={disponivel} onClick={() => setDisponivel(!disponivel)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 36, padding: '0 12px', borderRadius: 999, border: 0, fontSize: 13, fontWeight: 600, background: disponivel ? 'var(--brand-soft)' : 'var(--neutral-bg)', color: disponivel ? 'var(--on-brand-soft)' : 'var(--neutral)' }}>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: disponivel ? 'var(--brand)' : 'var(--line-strong)' }} />{disponivel ? 'Disponível' : 'Indisponível'}
        </button>
      </Row>
      <Card>
        <Row between style={{ alignItems: 'flex-end' }}>
          <div><Eyebrow>A liberar</Eyebrow><b style={{ fontSize: 22 }} className="tabular">{reais(CARTEIRA.aLiberar)}</b></div>
          <div><Eyebrow>Este mês</Eyebrow><b style={{ fontSize: 22 }} className="tabular">{reais(CARTEIRA.mes)}</b></div>
          <Link href="/app/carteira" aria-label="Abrir carteira" style={{ width: 36, height: 36, borderRadius: 18, background: 'var(--accent)', color: 'var(--on-accent)', display: 'grid', placeItems: 'center' }}><ArrowRight size={18} aria-hidden /></Link>
        </Row>
      </Card>
      <Tabs label="Pedidos" tabs={GRUPOS.map((g) => `${g.rotulo} ${PEDIDOS_PRESTADOR.filter((p) => p.status === g.id).length}`)} value={aba} onChange={setAba} />
      {lista.map((p) => (
        <Card key={p.id} href={`/app/pedidos/${p.id}`}>
          <Row between><b>{p.servico}</b><b className="tabular">{reais(p.valor)}</b></Row>
          <Meta icon={MapPin}>{p.bairro} · {km(p.distanciaKm)} · {p.quando}</Meta>
          <Row gap={2}>{p.urgente && <UrgenteBadge />}<Badge>{p.origem === 'corretor' ? 'Via corretor' : 'Cliente do app'}</Badge></Row>
        </Card>
      ))}
      {lista.length === 0 && <p style={{ color: 'var(--ink-muted)' }}>Nenhum pedido aqui.</p>}
    </Stack>
  )
}
