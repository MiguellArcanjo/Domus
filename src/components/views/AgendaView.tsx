'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Stack } from '@/components/ui/Stack'
import { PageHeader } from '@/components/layout/PageHeader'
import { AGENDA } from '@/lib/mock'

const DIAS = [['Qui', 24], ['Sex', 25], ['Sáb', 26], ['Dom', 27], ['Seg', 28], ['Ter', 29]] as const

/** Agenda do prestador (M-12): dias em cima e os horários do dia. */
export function AgendaView() {
  const [dia, setDia] = useState(0)
  const [bloqueado, setBloqueado] = useState(false)
  return (
    <Stack gap={4} style={{ maxWidth: 640 }}>
      <PageHeader title="Agenda" subtitle="Setembro" />
      <div role="tablist" aria-label="Dias" style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
        {DIAS.map(([w, d], i) => (
          <button key={d} type="button" role="tab" aria-selected={dia === i} onClick={() => setDia(i)} style={{ width: 50, height: 62, flexShrink: 0, borderRadius: 14, display: 'grid', placeItems: 'center', alignContent: 'center', gap: 2, border: dia === i ? 0 : '1px solid var(--line)', background: dia === i ? 'var(--tinta)' : 'var(--surface)', color: dia === i ? '#fff' : 'var(--ink)' }}>
            <span style={{ fontSize: 11 }}>{w}</span><b style={{ fontSize: 16 }}>{d}</b>
          </button>
        ))}
      </div>
      {dia === 0 ? AGENDA.map((a) => {
        const corpo = (
          <span style={{ display: 'grid', flexGrow: 1, padding: '10px 12px', borderRadius: 12, background: a.atual ? 'var(--brand-soft)' : 'var(--surface)', border: `1px solid ${a.atual ? 'var(--brand-soft)' : 'var(--line)'}` }}>
            <b style={{ fontSize: 14 }}>{a.pedidoId ? a.titulo : bloqueado ? 'Bloqueado' : a.titulo}</b>
            <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{a.pedidoId ? a.detalhe : bloqueado ? 'Toque para liberar' : a.detalhe}</span>
          </span>
        )
        return (
          <div key={a.hora} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ width: 48, fontSize: 13, color: 'var(--ink-muted)', paddingTop: 10 }} className="tabular">{a.hora}</span>
            {a.pedidoId ? (
              <Link href={a.atual ? `/app/agenda/${a.pedidoId}/concluir` : `/app/pedidos/${a.pedidoId}`} style={{ display: 'flex', flexGrow: 1 }}>{corpo}</Link>
            ) : (
              <button type="button" onClick={() => setBloqueado(!bloqueado)} style={{ display: 'flex', flexGrow: 1, padding: 0, border: 0, background: 'none', textAlign: 'left' }}>{corpo}</button>
            )}
          </div>
        )
      }) : <p style={{ color: 'var(--ink-muted)' }}>Nenhum serviço neste dia.</p>}
    </Stack>
  )
}
