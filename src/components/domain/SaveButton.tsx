'use client'

import { Heart } from 'lucide-react'
import { useToast } from '@/components/ui/Dialog'
import { SALVOS_INICIAIS, useSet } from '@/lib/store'
import s from './domain.module.css'

/** Salvar post ou prestador. Só front: fica guardado no navegador e aparece em Salvos. */
export function SaveButton({ id, tipo, label, plain }: { id: string; tipo: 'posts' | 'prestadores'; label: string; plain?: boolean }) {
  const { tem, alternar } = useSet(`salvos:${tipo}`, SALVOS_INICIAIS[tipo])
  const toast = useToast()
  const on = tem(id)
  return (
    <button
      type="button"
      className={`${s.save} ${plain ? s.savePlain : ''}`}
      aria-pressed={on}
      aria-label={on ? `Remover ${label} dos salvos` : `Salvar ${label}`}
      onClick={() => { alternar(id); toast(on ? 'Removido dos salvos' : 'Salvo') }}
    >
      <Heart size={18} aria-hidden />
    </button>
  )
}

/** Seguir prestador (V-09): os posts dele aparecem primeiro. */
export function FollowButton({ slug, nome }: { slug: string; nome: string }) {
  const { tem, alternar } = useSet('seguindo', ['ana-lima'])
  const toast = useToast()
  const on = tem(slug)
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => { alternar(slug); toast(on ? `Você deixou de seguir ${nome}` : `Você segue ${nome}`) }}
      style={{ minHeight: 36, padding: '0 14px', borderRadius: 999, fontSize: 13, fontWeight: 600, border: on ? '1px solid var(--line-strong)' : '1px solid var(--brand)', background: on ? 'var(--surface)' : 'var(--brand)', color: on ? 'var(--ink)' : 'var(--on-brand)' }}
    >
      {on ? 'Seguindo' : 'Seguir'}
    </button>
  )
}
