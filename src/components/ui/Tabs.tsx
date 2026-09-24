'use client'

import { useState } from 'react'
import s from './Tabs.module.css'

interface Props {
  tabs: string[]
  /** controlado: índice ativo */
  value?: number
  onChange?: (i: number) => void
  label: string
  variant?: 'underline' | 'pills'
}

/** Abas sublinhadas (referência Event Discovery) ou pílulas (referência Property Finder). */
export function Tabs({ tabs, value, onChange, label, variant = 'underline' }: Props) {
  const [interno, setInterno] = useState(0)
  const ativo = value ?? interno
  const set = (i: number) => {
    setInterno(i)
    onChange?.(i)
  }
  return (
    <div role="tablist" aria-label={label} className={variant === 'pills' ? s.pills : s.underline}>
      {tabs.map((t, i) => (
        <button key={t} type="button" role="tab" aria-selected={i === ativo} className={variant === 'pills' ? s.pill : s.tab} onClick={() => set(i)}>
          {t}
        </button>
      ))}
    </div>
  )
}

/** Abas com painéis: mostra o painel da aba ativa. */
export function TabPanels({ tabs, label, children }: { tabs: string[]; label: string; children: React.ReactNode[] }) {
  const [ativo, setAtivo] = useState(0)
  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <Tabs tabs={tabs} label={label} value={ativo} onChange={setAtivo} />
      <div role="tabpanel" aria-label={tabs[ativo]}>{children[ativo]}</div>
    </div>
  )
}
