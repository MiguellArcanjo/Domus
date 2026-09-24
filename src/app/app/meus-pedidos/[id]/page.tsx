import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CircleCheck, MessageCircle, ShieldCheck } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { IconButton } from '@/components/ui/IconButton'
import { Row, Stack } from '@/components/ui/Stack'
import { Steps } from '@/components/ui/Steps'
import { BackBar, StickyActions } from '@/components/layout/PageHeader'
import { reais } from '@/lib/format'
import { PEDIDOS_CLIENTE, pedidoCliente, prestador } from '@/lib/mock'

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ novo?: string }> }

export function generateStaticParams() {
  return PEDIDOS_CLIENTE.map((p) => ({ id: p.id }))
}

export const metadata: Metadata = { title: 'Acompanhar pedido' }

const PASSOS = ['Pedido enviado', 'Prestador aceitou', 'Agendado', 'Serviço concluído', 'Pagamento liberado']
const ATUAL = { aberto: 0, triado: 0, prestador_atribuido: 1, agendado: 2, concluido: 3, pago: 4, avaliado: 5, cancelado: 0, em_disputa: 3 } as const

export default async function Acompanhar({ params, searchParams }: Props) {
  const ped = pedidoCliente((await params).id)
  if (!ped) notFound()
  const { novo } = await searchParams
  const p = prestador(ped.prestadorSlug)!
  return (
    <Stack gap={4} style={{ maxWidth: 640 }}>
      <BackBar title={`Pedido ${ped.codigo}`} back="/app/meus-pedidos" />
      {novo && <Card tone="soft"><Row gap={2}><CircleCheck size={18} color="var(--brand)" aria-hidden /><span role="status">Pagamento recebido. {p.nome.split(' ')[0]} já foi avisado.</span></Row></Card>}
      <Card>
        <Row gap={3}>
          <Avatar iniciais={p.iniciais} size={44} />
          <div style={{ flexGrow: 1 }}><b>{p.nome}</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{ped.servico} · {reais(ped.valor)}</p></div>
          <IconButton icon={MessageCircle} label="Conversar com o prestador" href={`/app/mensagens/${p.slug}`} />
        </Row>
      </Card>
      <Steps passos={PASSOS.map((t, i) => ({ titulo: t, detalhe: i === 2 ? ped.quando : ped.eventos[i]?.quando }))} atual={ATUAL[ped.estado]} />
      <Card><Row gap={2}><ShieldCheck size={20} color="var(--brand)" aria-hidden /><p style={{ fontSize: 14 }}>{reais(ped.valor)} guardados. Liberamos quando você confirmar.</p></Row></Card>
      <StickyActions>
        <Button variant="danger" href={`/app/meus-pedidos/${ped.id}/contestar`}>Contestar</Button>
        <Button variant="primary" href={`/app/meus-pedidos/${ped.id}/avaliar`}>Confirmar serviço</Button>
      </StickyActions>
    </Stack>
  )
}
