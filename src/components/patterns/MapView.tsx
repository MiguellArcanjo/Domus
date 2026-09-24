'use client'

import { Camera, Layers, LocateFixed, Plus, Search } from 'lucide-react'
import { IconButton } from '@/components/ui/IconButton'
import { CATEGORIAS } from '@/lib/categorias'
import { reais } from '@/lib/format'
import type { Post, Prestador } from '@/lib/types'
import s from './patterns.module.css'

export type Selecao = { tipo: 'prestador'; slug: string } | { tipo: 'post'; id: string } | null

/**
 * Mapa de exemplo, desenhado em SVG. Os pinos usam as posições dos dados de exemplo.
 * Troque por Mapbox ou Google Maps mantendo esta mesma interface (pinos, seleção e card).
 */
export function MapView({ prestadores, posts, selecao, onSelect, children }: {
  prestadores: Prestador[]
  posts: Post[]
  selecao: Selecao
  onSelect: (s: Selecao) => void
  children?: React.ReactNode
}) {
  return (
    <div className={s.map}>
      <svg className={s.mapBg} viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <rect width="600" height="800" fill="#EEF1EC" />
        <rect x="230" y="380" width="150" height="110" rx="18" fill="#DCEBD9" />
        <g fill="none" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round">
          <path d="M-10 120 C 200 150, 380 90, 640 140" />
          <path d="M-10 360 C 220 320, 420 400, 640 350" />
          <path d="M-10 620 C 200 590, 420 660, 640 600" />
          <path d="M140 -10 C 170 260, 90 520, 170 820" />
          <path d="M430 -10 C 400 260, 500 520, 440 820" />
        </g>
      </svg>
      <span className={s.me} aria-label="Você está aqui" role="img" />
      {prestadores.map((p) => {
        const Icon = CATEGORIAS[p.categoria].icone
        const menor = Math.min(...p.precos.map((i) => i.preco))
        const on = selecao?.tipo === 'prestador' && selecao.slug === p.slug
        return (
          <button key={p.slug} type="button" className={s.pin} style={{ left: `${p.mapa.x}%`, top: `${p.mapa.y}%` }} aria-pressed={on} aria-label={`${p.nome}, a partir de ${reais(menor)}`} onClick={() => onSelect(on ? null : { tipo: 'prestador', slug: p.slug })}>
            <span className={s.pinIcon}><Icon size={13} aria-hidden /></span>{reais(menor)}
          </button>
        )
      })}
      {posts.map((po) => {
        const on = selecao?.tipo === 'post' && selecao.id === po.id
        return (
          <button key={po.id} type="button" className={s.postPin} style={{ left: `${po.mapa.x}%`, top: `${po.mapa.y}%` }} aria-pressed={on} aria-label={`Post: ${po.titulo}, ${po.bairro}`} onClick={() => onSelect(on ? null : { tipo: 'post', id: po.id })}>
            <Camera size={16} aria-hidden />
          </button>
        )
      })}
      <button type="button" className={s.areaBtn}><Search size={16} aria-hidden />Buscar nesta área</button>
      <div className={s.controls}>
        <IconButton icon={Plus} label="Aproximar" />
        <IconButton icon={Layers} label="Camadas do mapa" />
        <IconButton icon={LocateFixed} label="Centralizar em mim" />
      </div>
      {children}
    </div>
  )
}
