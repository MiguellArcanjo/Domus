'use client'

import { useState } from 'react'
import { Camera, Star } from 'lucide-react'
import s from './Controls.module.css'

/** Nota de 1 a 5. */
export function StarRating({ name = 'nota', initial = 0 }: { name?: string; initial?: number }) {
  const [nota, setNota] = useState(initial)
  return (
    <div className={s.stars} role="radiogroup" aria-label="Nota">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" role="radio" aria-checked={nota === n} aria-label={`${n} de 5`} className={s.star} data-on={n <= nota} onClick={() => setNota(n)}>
          <Star size={36} aria-hidden />
        </button>
      ))}
      <input type="hidden" name={name} value={nota} />
    </div>
  )
}

export interface Opcao { value: string; label: string; detalhe?: string }

export function RadioList({ name, options, defaultValue, label }: { name: string; options: Opcao[]; defaultValue?: string; label: string }) {
  return (
    <fieldset className={s.radioList} style={{ border: 0, padding: 0, margin: 0 }}>
      <legend className="sr-only">{label}</legend>
      {options.map((o) => (
        <label key={o.value} className={s.radio}>
          <input type="radio" name={name} value={o.value} defaultChecked={o.value === defaultValue} />
          <span className={s.radioDot} aria-hidden />
          <span className={s.radioLabel}>{o.label}</span>
          {o.detalhe && <span className={s.radioValue}>{o.detalhe}</span>}
        </label>
      ))}
    </fieldset>
  )
}

export function Switch({ label, detalhe, defaultChecked, name }: { label: string; detalhe?: string; defaultChecked?: boolean; name?: string }) {
  return (
    <label className={s.switch}>
      <input type="checkbox" role="switch" name={name} defaultChecked={defaultChecked} />
      <span className={s.track} aria-hidden />
      <span style={{ display: 'grid' }}>
        <b style={{ fontSize: 14 }}>{label}</b>
        {detalhe && <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{detalhe}</span>}
      </span>
    </label>
  )
}

/** Seletor de fotos: mostra miniaturas dos arquivos escolhidos. */
export function PhotoPicker({ name = 'fotos', label = 'Adicionar', exemplos = [] as string[], max = 10 }) {
  const [arquivos, setArquivos] = useState<string[]>([])
  const todas = [...exemplos, ...arquivos]
  return (
    <div className={s.photos}>
      {todas.map((f, i) => (
        <span key={`${f}-${i}`} className={s.thumb}>{f}</span>
      ))}
      {todas.length < max && (
        <label className={s.addPhoto}>
          <Camera size={22} aria-hidden />
          <span>{label}</span>
          <input type="file" name={name} accept="image/*" multiple aria-label="Adicionar fotos" onChange={(e) => setArquivos((a) => [...a, ...Array.from(e.target.files ?? []).map((f) => f.name)])} />
        </label>
      )}
    </div>
  )
}

export function ProgressBar({ valor, label }: { valor: number; label: string }) {
  const pct = Math.round(Math.min(1, Math.max(0, valor)) * 100)
  return (
    <div className={s.progress} role="progressbar" aria-label={label} aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
      <span style={{ width: `${pct}%` }} />
    </div>
  )
}
