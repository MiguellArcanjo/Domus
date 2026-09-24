import { ChevronLeft } from 'lucide-react'
import { IconButton } from '@/components/ui/IconButton'
import s from './PageHeader.module.css'

/** Título da tela com ações à direita. */
export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <header className={s.header}>
      <div className={s.title}>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {actions && <div className={s.actions}>{actions}</div>}
    </header>
  )
}

/** Barra de tela interna: voltar, título e uma ação. */
export function BackBar({ title, back, action }: { title: string; back: string; action?: React.ReactNode }) {
  return (
    <header className={s.bar}>
      <IconButton icon={ChevronLeft} label="Voltar" href={back} />
      <h1 className={s.barTitle}>{title}</h1>
      <div className={s.barSide}>{action}</div>
    </header>
  )
}

/** Ação principal presa ao pé da tela no celular. */
export function StickyActions({ children, info }: { children: React.ReactNode; info?: { label: string; valor: string } }) {
  return (
    <>
      <div className={s.stickyPad} aria-hidden />
      <div className={s.sticky}>
        {info && (
          <div className={s.stickyInfo}>
            <span>{info.label}</span>
            <b>{info.valor}</b>
          </div>
        )}
        {children}
      </div>
    </>
  )
}
