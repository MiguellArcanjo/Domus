import { BadgeCheck, TriangleAlert, type LucideIcon } from 'lucide-react'
import { ESTADOS } from '@/lib/estados'
import type { EstadoChamado, Tom } from '@/lib/types'
import s from './Badge.module.css'

/** Etiqueta de status. `accent` (trena) só para "Novo" e "Destaque". */
export function Badge({ tone = 'neutral', icon: Icon, children }: { tone?: Tom; icon?: LucideIcon; children: React.ReactNode }) {
  return (
    <span className={`${s.badge} ${s[tone]}`}>
      {Icon && <Icon size={14} aria-hidden />}
      {children}
    </span>
  )
}

/** O estado do chamado, com o nome e a cor fixos. */
export function StatusBadge({ estado }: { estado: EstadoChamado }) {
  const e = ESTADOS[estado]
  return <Badge tone={e.tom}>{e.rotulo}</Badge>
}

export function UrgenteBadge() {
  return <Badge tone="danger" icon={TriangleAlert}>Urgente</Badge>
}

/** Os dois selos de confiança. `compact` mostra só o ícone ao lado do nome. */
export function Selo({ tipo = 'servico', compact }: { tipo?: 'servico' | 'prestador'; compact?: boolean }) {
  const texto = tipo === 'prestador' ? 'Prestador verificado' : 'Serviço verificado'
  if (compact) {
    return (
      <span className={s.seloIcon} title={texto}>
        <BadgeCheck size={18} aria-hidden />
        <span className="sr-only">{texto}</span>
      </span>
    )
  }
  return (
    <span className={s.selo}>
      <BadgeCheck size={14} aria-hidden />
      {texto}
    </span>
  )
}
