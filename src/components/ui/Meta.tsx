import type { LucideIcon } from 'lucide-react'
import s from './Meta.module.css'

/** Linha de metadado com ícone: local, data, distância. */
export function Meta({ icon: Icon, children, tone }: { icon: LucideIcon; children: React.ReactNode; tone?: 'brand' | 'ink' }) {
  return (
    <div className={`${s.meta} ${tone ? s[tone] : ''}`}>
      <Icon size={14} aria-hidden style={{ flexShrink: 0 }} />
      <span>{children}</span>
    </div>
  )
}

/** Rótulo de seção em Geist Mono, caixa alta. */
export function Eyebrow({ children, as: Tag = 'div' }: { children: React.ReactNode; as?: 'div' | 'h2' | 'h3' }) {
  return <Tag className={s.eyebrow}>{children}</Tag>
}
