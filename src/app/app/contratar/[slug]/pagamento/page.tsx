import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CalendarDays, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { RadioList } from '@/components/ui/Controls'
import { Eyebrow, Meta } from '@/components/ui/Meta'
import { Row, Stack } from '@/components/ui/Stack'
import { BackBar, StickyActions } from '@/components/layout/PageHeader'
import { reais } from '@/lib/format'
import { PRESTADORES, prestador } from '@/lib/mock'

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ item?: string; quando?: string }> }

export function generateStaticParams() {
  return PRESTADORES.map((p) => ({ slug: p.slug }))
}

export const metadata: Metadata = { title: 'Pagamento protegido' }

/** Pagamento protegido (M-09). Só front: o botão leva ao acompanhamento do pedido de exemplo. */
export default async function Pagamento({ params, searchParams }: Props) {
  const p = prestador((await params).slug)
  if (!p) notFound()
  const { item, quando = 'Hoje' } = await searchParams
  const escolhido = p.precos.find((i) => i.servico === item) ?? p.precos[0]
  return (
    <Stack gap={4} style={{ maxWidth: 640 }}>
      <BackBar title="Pagamento" back={`/app/contratar/${p.slug}`} />
      <Card tone="soft">
        <Row start gap={3}><ShieldCheck size={24} color="var(--brand)" aria-hidden style={{ flexShrink: 0 }} /><div><b>Pagamento protegido</b><p style={{ fontSize: 13 }}>O valor fica guardado e só vai para {p.nome.split(' ')[0]} quando você confirmar que o serviço foi feito, ou em 7 dias sem contestação.</p></div></Row>
      </Card>
      <Eyebrow as="h2">Resumo</Eyebrow>
      <ul style={{ display: 'grid', fontSize: 15 }}>
        <li style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line)' }}><span>{escolhido.servico}</span><b className="tabular">{reais(escolhido.preco, true)}</b></li>
        <li style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line)' }}><span>Taxa de proteção</span><b className="tabular">{reais(0, true)}</b></li>
        <li style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: 17 }}><b>Total</b><b className="tabular">{reais(escolhido.preco, true)}</b></li>
      </ul>
      <Eyebrow as="h2">Forma de pagamento</Eyebrow>
      <RadioList name="forma" label="Forma de pagamento" defaultValue="pix" options={[{ value: 'pix', label: 'Pix', detalhe: 'aprovação na hora' }, { value: 'cartao', label: 'Cartão de crédito', detalhe: 'até 3x' }]} />
      <Meta icon={CalendarDays}>{quando} · {p.proximoHorario} · Rua das Acácias, 120</Meta>
      <StickyActions>
        <Button variant="primary" block href="/app/meus-pedidos/c8f3k2?novo=1">Pagar {reais(escolhido.preco)} pelo app</Button>
      </StickyActions>
    </Stack>
  )
}
