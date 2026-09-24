import Link from 'next/link'
import { cn } from '@/lib/format'
import s from './Text.module.css'

export function Title({ level = 1, children, className, id }: { level?: 1 | 2 | 3; children: React.ReactNode; className?: string; id?: string }) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3'
  return <Tag id={id} className={cn(s[`h${level}`], className)}>{children}</Tag>
}

export function Text({ children, muted, small, strong, className }: { children: React.ReactNode; muted?: boolean; small?: boolean; strong?: boolean; className?: string }) {
  return <p className={cn(small ? s.small : s.body, muted && s.muted, strong && s.strong, className)}>{children}</p>
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className={s.link}>{children}</Link>
}

export { s as textStyles }
