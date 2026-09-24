import { CATEGORIAS } from '@/lib/categorias'
import type { CategoriaId } from '@/lib/types'
import s from './domain.module.css'

export function CategoriaIcon({ categoria, size = 40 }: { categoria: CategoriaId; size?: number }) {
  const Icon = CATEGORIAS[categoria].icone
  return (
    <span className={s.catIcon} style={{ width: size, height: size }} aria-hidden>
      <Icon size={Math.round(size / 2)} />
    </span>
  )
}
