'use client'

import { useState } from 'react'
import s from './Extras.module.css'

/** Controle deslizante com o valor à vista (raio de atendimento, prazo). */
export function Slider({ id, label, min, max, step = 1, defaultValue, unidade = '', name, onChange }: {
  id: string; label: string; min: number; max: number; step?: number; defaultValue: number; unidade?: string; name?: string; onChange?: (v: number) => void
}) {
  const [v, setV] = useState(defaultValue)
  return (
    <div className={s.slider}>
      <div className={s.sliderTop}><label htmlFor={id} style={{ fontWeight: 600 }}>{label}</label><b>{v}{unidade}</b></div>
      <input id={id} name={name ?? id} type="range" min={min} max={max} step={step} value={v} onChange={(e) => { setV(Number(e.target.value)); onChange?.(Number(e.target.value)) }} aria-valuetext={`${v}${unidade}`} />
    </div>
  )
}
