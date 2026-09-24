import Link from 'next/link'
import { ArrowRight, Check, Plus, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/format'
import s from './site.module.css'

export function AudienceCard({ icon: Icon, titulo, texto, cta, href, tone = 'soft' }: { icon: LucideIcon; titulo: string; texto: string; cta: string; href: string; tone?: 'brand' | 'soft' | 'accent' }) {
  const bg = { brand: ['var(--brand)', 'var(--on-brand)'], soft: ['var(--brand-soft)', 'var(--on-brand-soft)'], accent: ['var(--accent)', 'var(--on-accent)'] }[tone]
  return (
    <Link href={href} className={cn(s.card, s.cardLink)}>
      <span className={s.cardIcon} style={{ background: bg[0], color: bg[1] }}><Icon size={26} aria-hidden /></span>
      <b className={s.cardTitle}>{titulo}</b>
      <p className={s.cardText}>{texto}</p>
      <span className={s.cardMore}>{cta}<ArrowRight size={16} aria-hidden /></span>
    </Link>
  )
}

export function Feature({ icon: Icon, titulo, texto }: { icon: LucideIcon; titulo: string; texto: string }) {
  return (
    <div className={s.feature}>
      <span className={s.cardIcon} style={{ width: 48, height: 48, borderRadius: 14 }}><Icon size={24} aria-hidden /></span>
      <b>{titulo}</b>
      <p>{texto}</p>
    </div>
  )
}

export function StepsRow({ passos }: { passos: Array<[string, string]> }) {
  return (
    <ol className={s.cols4}>
      {passos.map(([t, d], i) => (
        <li key={t} className={s.step}>
          <span>{String(i + 1).padStart(2, '0')}</span>
          <b>{t}</b>
          <p>{d}</p>
        </li>
      ))}
    </ol>
  )
}

export function PriceCard({ titulo, valor, unidade, texto, itens, cta, href, destaque }: { titulo: string; valor: string; unidade?: string; texto: string; itens?: string[]; cta: string; href: string; destaque?: boolean }) {
  return (
    <div className={cn(s.price, destaque && s.priceFeatured)}>
      <b style={{ fontSize: 17 }}>{titulo}</b>
      <div className={s.priceValue}>{valor}{unidade && <small>{unidade}</small>}</div>
      <p style={{ fontSize: 15, color: 'var(--ink-muted)' }}>{texto}</p>
      {itens && <ul className={s.priceList}>{itens.map((i) => <li key={i}><Check size={16} aria-hidden />{i}</li>)}</ul>}
      <Button href={href} variant={destaque ? 'primary' : 'secondary'} block>{cta}</Button>
    </div>
  )
}

export function Faq({ itens }: { itens: Array<[string, string]> }) {
  return (
    <div className={s.faq}>
      {itens.map(([q, a]) => (
        <details key={q}>
          <summary>{q}<Plus size={20} aria-hidden /></summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  )
}

/** O Arco do logo em tamanho grande, como elemento gráfico. */
export function Arch({ width = 460, height = 540, stroke = 64, color = 'var(--brand)' }: { width?: number; height?: number; stroke?: number; color?: string }) {
  const r = (width - stroke) / 2
  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} style={{ maxWidth: width }} aria-hidden>
      <path d={`M${stroke / 2} ${height}V${r + stroke / 2}a${r} ${r} 0 0 1 ${2 * r} 0V${height}`} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" />
      <circle cx={width / 2} cy={height * 0.8} r={stroke * 0.55} fill="var(--trena)" />
    </svg>
  )
}

export function PhoneMock({ children }: { children: React.ReactNode }) {
  return (
    <div className={s.phone} aria-hidden>
      <div className={s.phoneScreen}>{children}</div>
    </div>
  )
}
