import type { Metadata } from 'next'
import Link from 'next/link'
import { BadgeCheck, Flag, Scale } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Row, Stack } from '@/components/ui/Stack'
import { PageHeader } from '@/components/layout/PageHeader'
import { DISPUTAS, FILA_MODERACAO, FILA_VERIFICACAO, METRICAS_PILOTO } from '@/lib/mock'

export const metadata: Metadata = { title: 'Visão geral' }

/** Filas de trabalho e as métricas do piloto (PRD). */
export default function AdminHome() {
  const filas = [
    { href: '/admin/verificacao', rotulo: 'Prestadores para verificar', n: FILA_VERIFICACAO.length, icone: BadgeCheck },
    { href: '/admin/moderacao', rotulo: 'Posts denunciados', n: FILA_MODERACAO.length, icone: Flag },
    { href: '/admin/disputas', rotulo: 'Disputas abertas', n: DISPUTAS.filter((d) => d.status === 'aberta').length, icone: Scale },
  ]
  return (
    <Stack gap={5} style={{ maxWidth: 1100 }}>
      <PageHeader title="Operação" subtitle="Filas de trabalho e métricas do piloto (dados de exemplo)" />
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {filas.map(({ href, rotulo, n, icone: Icon }) => (
          <Link key={href} href={href} style={{ display: 'grid', gap: 6, padding: 18, borderRadius: 18, border: '1px solid var(--line)', background: 'var(--surface)' }}>
            <Icon size={20} color="var(--brand)" aria-hidden /><b style={{ fontSize: 30 }}>{n}</b><span style={{ fontSize: 14, color: 'var(--ink-muted)' }}>{rotulo}</span>
          </Link>
        ))}
      </div>
      <h2 style={{ fontSize: 20 }}>Metas do piloto</h2>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {METRICAS_PILOTO.map((m) => (
          <Card key={m.rotulo}><span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{m.rotulo}</span><Row between><b style={{ fontSize: 24 }}>{m.valor}</b><Badge>Meta {m.meta}</Badge></Row></Card>
        ))}
      </div>
    </Stack>
  )
}
