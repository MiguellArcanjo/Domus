'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/format'
import s from './Chip.module.css'

export interface OpcaoMenu<T extends string> { value: T; label: string }

/** Chip com menu de opções (filtros Preço, Nota, Bairro, período dos gráficos). */
export function DropdownChip<T extends string>({ label, value, options, onChange, placeholder }: {
  label: string
  value?: T
  options: OpcaoMenu<T>[]
  onChange: (v: T | undefined) => void
  placeholder?: string
}) {
  const [aberto, setAberto] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()
  const atual = options.find((o) => o.value === value)
  useEffect(() => {
    if (!aberto) return
    const fora = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setAberto(false) }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setAberto(false) }
    const rolar = () => setAberto(false)
    document.addEventListener('mousedown', fora)
    document.addEventListener('keydown', esc)
    window.addEventListener('scroll', rolar, true)
    return () => { document.removeEventListener('mousedown', fora); document.removeEventListener('keydown', esc); window.removeEventListener('scroll', rolar, true) }
  }, [aberto])
  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      <button
        type="button"
        className={cn(s.chip, atual && s.on)}
        aria-haspopup="listbox"
        aria-expanded={aberto}
        aria-controls={id}
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          setPos({ top: r.bottom + 6, left: Math.min(r.left, window.innerWidth - 216) })
          setAberto(!aberto)
        }}
      >
        {atual ? atual.label : placeholder ?? label}
        <ChevronDown size={14} aria-hidden />
      </button>
      {aberto && (
        <ul id={id} role="listbox" aria-label={label} className={s.menu} style={{ position: 'fixed', top: pos.top, left: Math.max(8, pos.left) }}>
          <li>
            <button type="button" role="option" aria-selected={!value} onClick={() => { onChange(undefined); setAberto(false) }}>
              {placeholder ?? `Qualquer ${label.toLowerCase()}`}{!value && <Check size={16} aria-hidden />}
            </button>
          </li>
          {options.map((o) => (
            <li key={o.value}>
              <button type="button" role="option" aria-selected={o.value === value} onClick={() => { onChange(o.value); setAberto(false) }}>
                {o.label}{o.value === value && <Check size={16} aria-hidden />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
