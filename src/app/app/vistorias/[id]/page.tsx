import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Row, Stack } from '@/components/ui/Stack'
import { VistoriaDetalhe } from '@/components/views/corretor/VistoriaDetalhe'
import { BackBar } from '@/components/layout/PageHeader'
import { VISTORIAS, imovel, vistoria } from '@/lib/mock'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return VISTORIAS.map((v) => ({ id: v.id }))
}

export const metadata: Metadata = { title: 'Vistoria' }

export default async function Page({ params }: Props) {
  const v = vistoria((await params).id)
  if (!v) notFound()
  return (
    <Stack gap={4} style={{ maxWidth: 720 }}>
      <BackBar title={`Vistoria de ${v.tipo}`} back={`/app/vistorias?imovel=${v.imovelId}`} />
      <Row between><div><b>{imovel(v.imovelId)?.nome}</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{v.data} · {v.responsavel}</p></div><Badge tone={v.tipo === 'entrada' ? 'info' : 'warning'}>{v.tipo === 'entrada' ? 'Entrada' : 'Saída'}</Badge></Row>
      <VistoriaDetalhe v={v} />
      <Button href={`/app/vistorias/comparar?imovel=${v.imovelId}`}>Comparar entrada e saída</Button>
    </Stack>
  )
}
