import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CalendarDays, MapPin, ShieldCheck, Wallet } from 'lucide-react'
import { Badge, UrgenteBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Meta } from '@/components/ui/Meta'
import { Photo } from '@/components/ui/Photo'
import { Row, Stack } from '@/components/ui/Stack'
import { BackBar, StickyActions } from '@/components/layout/PageHeader'
import { reais } from '@/lib/format'
import { CARTEIRA, PEDIDOS_PRESTADOR, pedidoPrestador } from '@/lib/mock'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return PEDIDOS_PRESTADOR.map((p) => ({ id: p.id }))
}

export const metadata: Metadata = { title: 'Pedido' }

/** O prestador aceita ou recusa (M-03). O endereço completo aparece só depois de aceitar. */
export default async function Pedido({ params }: Props) {
  const p = pedidoPrestador((await params).id)
  if (!p) notFound()
  return (
    <Stack gap={4} style={{ maxWidth: 640 }}>
      <BackBar title={`Pedido ${p.codigo}`} back="/app/pedidos" />
      <Row gap={2}>{p.urgente && <UrgenteBadge />}<Badge>{p.origem === 'corretor' ? 'Via corretor' : 'Cliente do app'}</Badge></Row>
      <h2 style={{ fontSize: 22 }}>{p.servico} · {reais(p.valor)}</h2>
      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr' }}><Photo legenda="Foto do problema" height={130} /><Photo legenda="Foto 2" height={130} /></div>
      <p>“{p.descricao}”</p>
      <Card>
        <Meta icon={MapPin} tone="ink">{p.bairro} · endereço completo depois de aceitar</Meta>
        <Meta icon={CalendarDays} tone="ink">{p.quando}</Meta>
        <Meta icon={ShieldCheck} tone="ink">Pagamento protegido: você recebe depois da confirmação</Meta>
      </Card>
      <Card><Meta icon={Wallet} tone="ink">Você recebe {reais(p.valor * (1 - CARTEIRA.taxa), true)} (taxa Domu de {CARTEIRA.taxa * 100}%).</Meta></Card>
      {p.status === 'novo' && (
        <StickyActions>
          <Button variant="danger" href="/app/pedidos">Recusar</Button>
          <Button variant="primary" href="/app/agenda">Aceitar e agendar</Button>
        </StickyActions>
      )}
      {p.status === 'aceito' && <StickyActions><Button variant="primary" block href={`/app/agenda/${p.id}/concluir`}>Concluir serviço</Button></StickyActions>}
    </Stack>
  )
}
