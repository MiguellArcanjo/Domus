import type { Metadata } from 'next'
import { CalendarDays } from 'lucide-react'
import { Badge, StatusBadge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Meta } from '@/components/ui/Meta'
import { Photo } from '@/components/ui/Photo'
import { Row, Stack } from '@/components/ui/Stack'
import { PageHeader } from '@/components/layout/PageHeader'
import { PEDIDOS_CLIENTE, prestador } from '@/lib/mock'

export const metadata: Metadata = { title: 'Pedidos' }

export default function MeusPedidos() {
  return (
    <Stack gap={3} style={{ maxWidth: 720 }}>
      <PageHeader title="Pedidos" />
      {PEDIDOS_CLIENTE.map((p) => {
        const pr = prestador(p.prestadorSlug)
        const avaliar = p.estado === 'concluido'
        return (
          <Card key={p.id} href={avaliar ? `/app/meus-pedidos/${p.id}/avaliar` : `/app/meus-pedidos/${p.id}`}>
            <Row start gap={3}>
              <Photo legenda="" height={56} width={56} radius={10} showLabel={false} />
              <div style={{ display: 'grid', gap: 4 }}>
                <b>{p.servico}</b>
                <Meta icon={CalendarDays}>{p.quando} · {pr?.nome}</Meta>
                <Row gap={2}><StatusBadge estado={p.estado} />{avaliar && <Badge tone="accent">Avaliar</Badge>}</Row>
              </div>
            </Row>
          </Card>
        )
      })}
    </Stack>
  )
}
