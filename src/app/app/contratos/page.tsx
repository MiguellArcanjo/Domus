import type { Metadata } from 'next'
import { FileText } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Row, Stack } from '@/components/ui/Stack'
import { PageHeader } from '@/components/layout/PageHeader'
import { reais } from '@/lib/format'
import { IMOVEIS } from '@/lib/mock'

export const metadata: Metadata = { title: 'Contratos' }

/** Contratos ativos, com alertas de vencimento e reajuste (G-07). */
export default function Contratos() {
  const lista = IMOVEIS.filter((i) => i.contrato)
  return (
    <Stack gap={3}>
      <PageHeader title="Contratos" subtitle="Alertas 60 e 30 dias antes do vencimento e do reajuste" />
      {lista.map((i) => (
        <Card key={i.id} href={`/app/imoveis/${i.id}`}>
          <Row gap={3} start>
            <FileText size={20} color="var(--brand)" aria-hidden />
            <div style={{ flexGrow: 1, display: 'grid', gap: 2 }}>
              <b>{i.nome}</b>
              <span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{i.contrato!.inquilino.nome} · {i.contrato!.inicio} a {i.contrato!.fim} · {i.contrato!.indice}</span>
            </div>
            <div style={{ display: 'grid', justifyItems: 'end', gap: 4 }}>
              <b className="tabular">{reais(i.contrato!.valor)}</b>
              {i.alerta && <Badge tone="warning">{i.alerta.split(' · ')[0]}</Badge>}
            </div>
          </Row>
        </Card>
      ))}
    </Stack>
  )
}
