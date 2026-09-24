import { cn } from '@/lib/format'
import s from './site.module.css'

export function Section({ children, tone, id, label }: { children: React.ReactNode; tone?: 'surface' | 'dark'; id?: string; label?: string }) {
  return (
    <section id={id} aria-label={label} className={cn(s.section, tone && s[tone])}>
      <div className={s.inner}>{children}</div>
    </section>
  )
}

export function SectionHead({ eyebrow, title, lead, as: Tag = 'h2' }: { eyebrow?: string; title: React.ReactNode; lead?: string; as?: 'h1' | 'h2' }) {
  return (
    <div className={s.head}>
      {eyebrow && <div className={s.eyebrow}>{eyebrow}</div>}
      <Tag className={Tag === 'h1' ? s.hero : s.big}>{title}</Tag>
      {lead && <p className={s.lead}>{lead}</p>}
    </div>
  )
}

export { s as siteStyles }
