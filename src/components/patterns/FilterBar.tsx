'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BadgeCheck, ChevronDown, Search } from 'lucide-react'
import { Chip } from '@/components/ui/Chip'
import { CATEGORIAS, CATEGORIA_IDS } from '@/lib/categorias'
import type { CategoriaId } from '@/lib/types'
import s from './patterns.module.css'

export interface Filtros { categoria?: CategoriaId; verificados: boolean }

/** Filtros compartilhados pela lista e pelo mapa (referência Event Discovery). */
export function FilterBar({ value, onChange, buscaHref = '/app/busca' }: { value: Filtros; onChange: (f: Filtros) => void; buscaHref?: string }) {
  const [abrirCat, setAbrirCat] = useState(false)
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div className={s.filters} role="group" aria-label="Filtros">
        <Link href={buscaHref} className={s.lupa} aria-label="Buscar"><Search size={18} aria-hidden /></Link>
        <Chip dropdown selected={!!value.categoria} onClick={() => setAbrirCat(!abrirCat)}>
          {value.categoria ? CATEGORIAS[value.categoria].rotulo : 'Categoria'}
        </Chip>
        <Chip icon={BadgeCheck} selected={value.verificados} onClick={() => onChange({ ...value, verificados: !value.verificados })}>Verificados</Chip>
        <Chip dropdown>Preço</Chip>
        <Chip dropdown>Nota</Chip>
      </div>
      {abrirCat && (
        <div className={s.filters} role="listbox" aria-label="Categoria">
          <Chip selected={!value.categoria} onClick={() => { onChange({ ...value, categoria: undefined }); setAbrirCat(false) }}>Todas</Chip>
          {CATEGORIA_IDS.map((id) => (
            <Chip key={id} icon={CATEGORIAS[id].icone} selected={value.categoria === id} onClick={() => { onChange({ ...value, categoria: id }); setAbrirCat(false) }}>
              {CATEGORIAS[id].rotulo}
            </Chip>
          ))}
        </div>
      )}
    </div>
  )
}

export function CityHeader({ cidade, action }: { cidade: string; action?: React.ReactNode }) {
  return (
    <div className={s.city}>
      <button type="button" className={s.cityBtn} aria-label={`Cidade: ${cidade}. Trocar cidade`}>
        Serviços em {cidade}<ChevronDown size={20} aria-hidden />
      </button>
      {action}
    </div>
  )
}

export { ChevronDown }
