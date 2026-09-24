import { Check } from 'lucide-react'
import s from './Steps.module.css'

export interface Passo { titulo: string; detalhe?: string }

/** Linha do tempo. Passo feito: check em brand. Passo atual: miolo trena (a luz acesa do logo). */
export function Steps({ passos, atual }: { passos: Passo[]; atual: number }) {
  return (
    <ol className={s.list}>
      {passos.map((p, i) => {
        const estado = i < atual ? s.feito : i === atual ? s.atual : s.depois
        return (
          <li key={p.titulo} className={`${s.step} ${estado}`} aria-current={i === atual ? 'step' : undefined}>
            <span className={s.dot} aria-hidden>{i < atual && <Check size={13} />}</span>
            <span className={s.txt}>
              <b>{p.titulo}</b>
              {p.detalhe && <span>{p.detalhe}</span>}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
