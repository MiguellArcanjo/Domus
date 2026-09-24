import type { Metadata } from 'next'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Row, Stack } from '@/components/ui/Stack'
import { PageHeader } from '@/components/layout/PageHeader'
import { reais } from '@/lib/format'
import { DISPUTAS, prestador } from '@/lib/mock'

export const metadata: Metadata = { title: 'Disputas' }

/** Contestações de serviço (M-11). O pagamento fica retido até a decisão. */
export default function Disputas() {
  return (
    <Stack gap={3} style={{ maxWidth: 900 }}>
      <PageHeader title="Disputas" />
      {DISPUTAS.map((d) => (
        <Card key={d.id} href={`/admin/disputas/${d.id}`}>
          <Row between><div><b>{d.servico} · {reais(d.valor)}</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{d.codigo} · {d.cliente} × {prestador(d.prestadorSlug)?.nome} · aberta em {d.abertaEm}</p></div><Badge tone={d.status === 'aberta' ? 'danger' : 'success'}>{d.status === 'aberta' ? 'Aberta' : 'Resolvida'}</Badge></Row>
        </Card>
      ))}
    </Stack>
  )
}
