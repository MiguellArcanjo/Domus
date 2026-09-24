'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import s from './domain.module.css'

/** Salvar post ou prestador. Por enquanto guarda só na tela. */
export function SaveButton({ label, plain, initial = false }: { label: string; plain?: boolean; initial?: boolean }) {
  const [on, setOn] = useState(initial)
  return (
    <button type="button" className={`${s.save} ${plain ? s.savePlain : ''}`} aria-pressed={on} aria-label={on ? `Remover ${label} dos salvos` : `Salvar ${label}`} onClick={() => setOn(!on)}>
      <Heart size={18} aria-hidden />
    </button>
  )
}
