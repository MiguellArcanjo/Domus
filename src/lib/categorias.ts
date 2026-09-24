import { Droplet, PaintRoller, Sparkles, Wrench, Zap, type LucideIcon } from 'lucide-react'
import type { CategoriaId } from './types'

/** Cada categoria tem rótulo, ofício e ícone fixos em todo o produto. */
export const CATEGORIAS: Record<CategoriaId, { rotulo: string; oficio: string; slug: string; icone: LucideIcon }> = {
  hidraulica: { rotulo: 'Hidráulica', oficio: 'Encanador', slug: 'encanador', icone: Droplet },
  eletrica: { rotulo: 'Elétrica', oficio: 'Eletricista', slug: 'eletricista', icone: Zap },
  pintura: { rotulo: 'Pintura', oficio: 'Pintor', slug: 'pintor', icone: PaintRoller },
  limpeza: { rotulo: 'Limpeza', oficio: 'Diarista', slug: 'diarista', icone: Sparkles },
  reparos: { rotulo: 'Reparos gerais', oficio: 'Faz-tudo', slug: 'reparos', icone: Wrench },
}

export const CATEGORIA_IDS = Object.keys(CATEGORIAS) as CategoriaId[]

export function categoriaPorSlug(slug: string): CategoriaId | undefined {
  return CATEGORIA_IDS.find((id) => CATEGORIAS[id].slug === slug)
}
