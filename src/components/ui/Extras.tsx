import type { LucideIcon } from 'lucide-react'
import s from './Extras.module.css'
import f from './Field.module.css'

/** Estado vazio: ícone, título, explicação e a ação que resolve. */
export function EmptyState({ icon: Icon, title, children, action }: { icon: LucideIcon; title: string; children?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className={s.empty}>
      <span><Icon size={24} aria-hidden /></span>
      <b style={{ fontSize: 17 }}>{title}</b>
      {children && <p>{children}</p>}
      {action}
    </div>
  )
}

/** Bloco cinza enquanto carrega. */
export function Skeleton({ height = 16, width = '100%', radius }: { height?: number | string; width?: number | string; radius?: number }) {
  return <div className={s.skeleton} style={{ height, width, borderRadius: radius }} aria-hidden />
}

export function Select({ id, label, children, ...rest }: { id: string; label: string; children: React.ReactNode } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={f.field}>
      <label htmlFor={id} className={f.label}>{label}</label>
      <select id={id} className={s.select} {...rest}>{children}</select>
    </div>
  )
}

export function Checkbox({ label, ...rest }: { label: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={s.check}>
      <input type="checkbox" {...rest} />
      <span>{label}</span>
    </label>
  )
}

export { s as extrasStyles }
