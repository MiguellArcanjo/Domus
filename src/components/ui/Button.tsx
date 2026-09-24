import Link from 'next/link'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/format'
import s from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'dark' | 'light' | 'accent'

interface Common {
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  icon?: LucideIcon
  /** pílula com o círculo trena e a seta, como no onboarding das referências */
  arrow?: boolean
  className?: string
  children: React.ReactNode
}

type AsLink = Common & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'className' | 'children'>
type AsButton = Common & { href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>

/** Botão da marca. Com `href` vira link. Uma ação `primary` por tela. */
export function Button(props: AsLink | AsButton) {
  const { variant = 'secondary', size = 'md', block, icon: Icon, arrow, className, children, ...rest } = props
  const cls = cn(s.btn, s[variant], size !== 'md' && s[size], block && s.block, arrow && s.arrow, className)
  const inner = (
    <>
      {Icon && <Icon size={size === 'sm' ? 16 : 18} aria-hidden />}
      <span>{children}</span>
      {arrow && (
        <span className={s.arrowCircle} aria-hidden>
          <ArrowRight size={20} />
        </span>
      )}
    </>
  )
  if ('href' in rest && rest.href !== undefined) {
    const { href, ...a } = rest as AsLink
    return <Link href={href} className={cls} {...a}>{inner}</Link>
  }
  const b = rest as Omit<AsButton, keyof Common>
  return <button type="button" className={cls} {...b}>{inner}</button>
}
