import { cn } from '@/lib/format'
import s from './Stack.module.css'

type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10
const gapVar = (g: Gap) => (g === 0 ? 0 : `var(--space-${g})`)

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  gap?: Gap
  as?: 'div' | 'section' | 'header' | 'footer' | 'ul' | 'form'
}

/** Pilha vertical com espaço dos tokens. */
export function Stack({ gap = 3, as: Tag = 'div', className, style, ...rest }: Props) {
  return <Tag className={cn(s.stack, className)} style={{ gap: gapVar(gap), ...style }} {...(rest as object)} />
}

/** Linha horizontal com espaço dos tokens. */
export function Row({ gap = 2, between, wrap, start, className, style, ...rest }: Props & { between?: boolean; wrap?: boolean; start?: boolean }) {
  return <div className={cn(s.row, between && s.between, wrap && s.wrap, start && s.start, className)} style={{ gap: gapVar(gap), ...style }} {...rest} />
}

export function Grow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn(s.grow, className)}>{children}</div>
}
