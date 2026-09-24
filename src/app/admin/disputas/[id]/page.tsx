import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Photo } from '@/components/ui/Photo'
import { Row, Stack } from '@/components/ui/Stack'
import { BackBar } from '@/components/layout/PageHeader'
import { Split } from '@/components/patterns/Responsive'
import { DisputaDecisao } from '@/components/views/admin/DisputaDecisao'
import { reais } from '@/lib/format'
import { DISPUTAS, disputa, prestador } from '@/lib/mock'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return DISPUTAS.map((d) => ({ id: d.id }))
}

export const metadata: Metadata = { title: 'Disputa' }

export default async function Page({ params }: Props) {
  const d = disputa((await params).id)
  if (!d) notFound()
  return (
    <Stack gap={4} style={{ maxWidth: 1100 }}>
      <BackBar title={`Disputa ${d.codigo}`} back="/admin/disputas" />
      <Split>
        <Stack gap={3}>
          <Card>
            <Row between><b>{d.servico} · {reais(d.valor)}</b><Badge tone={d.status === 'aberta' ? 'danger' : 'success'}>{d.status === 'aberta' ? 'Pagamento retido' : 'Resolvida'}</Badge></Row>
            <p style={{ fontSize: 14 }}>Cliente: <b>{d.cliente}</b> · Prestador: <b>{prestador(d.prestadorSlug)?.nome}</b></p>
          </Card>
          <Card><b>Relato do cliente</b><p>“{d.motivo}”</p><div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>{Array.from({ length: d.fotos }, (_, n) => <Photo key={n} legenda={`Foto ${n + 1} do cliente`} height={100} radius={10} />)}</div></Card>
          <Card><b>Resposta do prestador</b><p>“Limpei a cozinha inteira. Posso voltar para ver o que ficou faltando.”</p><div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr' }}><Photo legenda="Antes" height={100} radius={10} /><Photo legenda="Depois" height={100} radius={10} /></div></Card>
        </Stack>
        <Card>{d.status === 'aberta' ? <DisputaDecisao valor={d.valor} /> : <p>Resolvida: valor dividido entre as partes em 30 ago.</p>}</Card>
      </Split>
    </Stack>
  )
}
