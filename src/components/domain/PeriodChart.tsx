'use client'

import { useState } from 'react'
import { DropdownChip } from '@/components/ui/Dropdown'
import { BarChart } from './Kpi'

/** Gráfico de barras com a escolha do período. Só front: recorta a série de exemplo. */
export function PeriodChart({ titulo, label, dados, periodos }: { titulo: string; label: string; dados: { rotulo: string; valor: number }[]; periodos: Array<{ value: string; label: string; n: number }> }) {
  const [p, setP] = useState<string | undefined>(periodos[periodos.length - 1].value)
  const n = periodos.find((x) => x.value === p)?.n ?? dados.length
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <h2 style={{ fontSize: 20 }}>{titulo}</h2>
        <DropdownChip label="Período" placeholder="Tudo" value={p} onChange={setP} options={periodos.map(({ value, label }) => ({ value, label }))} />
      </div>
      <BarChart label={label} dados={dados.slice(-n)} />
    </div>
  )
}
