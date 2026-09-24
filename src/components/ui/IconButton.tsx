import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/format'
import s from './IconButton.module.css'

interface Props {
  icon: LucideIcon
  label: string
  href?: string
  onClick?: () => void
  tone?: 'default' | 'brand' | 'accent' | 'plain'
  /** ponto trena de notificação */
  dot?: boolean
  pressed?: boolean
  className?: string
}

/** Botão só com ícone. Sempre com `label` para leitores de tela. */
export function IconButton({ icon: Icon, label, href, onClick, tone = 'default', dot, pressed, className }: Props) {
  const cls = cn(s.btn, tone !== 'default' && s[tone], className)
  const inner = (
    <>
      <Icon size={20} aria-hidden />
      {dot && <span className={s.dot} aria-hidden />}
    </>
  )
  if (href) return <Link href={href} aria-label={label} className={cls}>{inner}</Link>
  return <button type="button" aria-label={label} aria-pressed={pressed} onClick={onClick} className={cls}>{inner}</button>
}
