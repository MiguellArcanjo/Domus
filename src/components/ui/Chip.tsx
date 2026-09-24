import Link from 'next/link'
import { ChevronDown, X, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/format'
import s from './Chip.module.css'

interface Props {
  children: React.ReactNode
  selected?: boolean
  dropdown?: boolean
  /** chip de filtro aplicado, com o X para remover */
  removable?: boolean
  icon?: LucideIcon
  href?: string
  onClick?: () => void
}

export function Chip({ children, selected, dropdown, removable, icon: Icon, href, onClick }: Props) {
  const cls = cn(s.chip, selected && (removable ? s.filled : s.on))
  const inner = (
    <>
      {Icon && <Icon size={16} aria-hidden />}
      {children}
      {dropdown && <ChevronDown size={14} aria-hidden />}
      {removable && selected && <X size={14} aria-hidden />}
    </>
  )
  if (href) return <Link href={href} className={cls}>{inner}</Link>
  return (
    <button type="button" className={cls} aria-pressed={dropdown ? undefined : !!selected} aria-haspopup={dropdown ? 'listbox' : undefined} onClick={onClick}>
      {inner}
    </button>
  )
}

/** Linha de chips com rolagem horizontal no celular. */
export function ChipRow({ children, wrap, label }: { children: React.ReactNode; wrap?: boolean; label?: string }) {
  return <div className={wrap ? s.wrap : s.row} role="group" aria-label={label}>{children}</div>
}
