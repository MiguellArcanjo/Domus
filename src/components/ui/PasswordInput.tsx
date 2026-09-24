'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import s from './Field.module.css'

/** Campo de senha com o botão de mostrar e esconder. */
export function PasswordInput({ id, label, hint, autoComplete = 'current-password', minLength }: { id: string; label: string; hint?: string; autoComplete?: string; minLength?: number }) {
  const [ver, setVer] = useState(false)
  return (
    <div className={s.field}>
      <label htmlFor={id} className={s.label}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input id={id} name={id} type={ver ? 'text' : 'password'} className={s.input} autoComplete={autoComplete} minLength={minLength} required aria-describedby={hint ? `${id}-hint` : undefined} style={{ paddingRight: 52 }} />
        <button type="button" onClick={() => setVer(!ver)} aria-label={ver ? 'Esconder senha' : 'Mostrar senha'} aria-pressed={ver} style={{ position: 'absolute', right: 2, top: 2, width: 44, height: 44, border: 0, background: 'none', display: 'grid', placeItems: 'center', color: 'var(--ink-muted)' }}>
          {ver ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {hint && <span id={`${id}-hint`} className={s.hint}>{hint}</span>}
    </div>
  )
}
