import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib/format'
import s from './Photo.module.css'

interface Props {
  /** o que a foto mostra; vira o texto alternativo quando houver imagem real */
  legenda: string
  height?: number | string
  width?: number | string
  radius?: number
  className?: string
  children?: React.ReactNode
  showLabel?: boolean
}

/** Espaço para foto real de serviço (nunca banco de imagens). Mostra a legenda até a foto existir. */
export function Photo({ legenda, height = 180, width = '100%', radius, className, children, showLabel = true }: Props) {
  return (
    <div className={cn(s.photo, className)} style={{ height, width, borderRadius: radius }} role="img" aria-label={legenda}>
      <ImageIcon size={22} aria-hidden />
      {showLabel && <span aria-hidden>{legenda}</span>}
      {children && <div className={s.overlay}>{children}</div>}
    </div>
  )
}
