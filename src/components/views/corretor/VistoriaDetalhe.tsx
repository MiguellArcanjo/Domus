import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Photo } from '@/components/ui/Photo'
import { Row, Stack } from '@/components/ui/Stack'
import type { Vistoria } from '@/lib/mock/vistorias'

export const TOM_ESTADO = { bom: { tom: 'success', rotulo: 'Bom' }, regular: { tom: 'warning', rotulo: 'Regular' }, ruim: { tom: 'danger', rotulo: 'Ruim' } } as const

export function ComodoCard({ c }: { c: Vistoria['comodos'][number] }) {
  return (
    <Card>
      <Row between><b>{c.nome}</b><Badge tone={TOM_ESTADO[c.estado].tom}>{TOM_ESTADO[c.estado].rotulo}</Badge></Row>
      <p style={{ fontSize: 14 }}>{c.obs}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 6 }}>
        {Array.from({ length: Math.min(c.fotos, 3) }, (_, n) => <Photo key={n} legenda={`${c.nome} ${n + 1}`} height={80} radius={10} showLabel={false} />)}
      </div>
    </Card>
  )
}

export function VistoriaDetalhe({ v }: { v: Vistoria }) {
  return <Stack gap={3}>{v.comodos.map((c) => <ComodoCard key={c.nome} c={c} />)}</Stack>
}
