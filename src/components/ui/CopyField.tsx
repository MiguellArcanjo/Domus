'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import s from './Field.module.css'

export function CopyField({ valor, label }: { valor: string; label: string }) {
  const [ok, setOk] = useState(false)
  return (
    <div className={s.field}>
      <label htmlFor="copiar" className={s.label}>{label}</label>
      <div style={{ display: 'flex', gap: 8 }}>
        <input id="copiar" className={s.input} value={valor} readOnly onFocus={(e) => e.target.select()} />
        <button
          type="button"
          aria-label="Copiar link"
          onClick={async () => { try { await navigator.clipboard.writeText(valor); setOk(true); setTimeout(() => setOk(false), 2000) } catch { /* sem permissão */ } }}
          style={{ width: 48, flexShrink: 0, borderRadius: 12, border: '1px solid var(--line-strong)', background: 'var(--surface)', display: 'grid', placeItems: 'center' }}
        >
          {ok ? <Check size={18} color="var(--brand)" /> : <Copy size={18} />}
        </button>
      </div>
      <span role="status" className={s.hint}>{ok ? 'Link copiado' : ''}</span>
    </div>
  )
}
