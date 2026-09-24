import Link from 'next/link'
import { cn } from '@/lib/format'
import s from './Card.module.css'

interface Props {
  children: React.ReactNode
  tone?: 'default' | 'soft' | 'warning' | 'danger'
  selected?: boolean
  flush?: boolean
  href?: string
  className?: string
  as?: 'div' | 'article' | 'section' | 'li'
}

export function Card({ children, tone = 'default', selected, flush, href, className, as: Tag = 'div' }: Props) {
  const cls = cn(s.card, tone !== 'default' && s[tone], selected && s.selected, flush && s.flush, href && s.link, className)
  if (href) return <Link href={href} className={cls}>{children}</Link>
  return <Tag className={cls}>{children}</Tag>
}
