'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BadgeCheck, Check, ChevronDown, Search } from 'lucide-react'
import { Chip } from '@/components/ui/Chip'
import { Dialog } from '@/components/ui/Dialog'
import { DropdownChip } from '@/components/ui/Dropdown'
import { CATEGORIAS, CATEGORIA_IDS } from '@/lib/categorias'
import { CIDADES } from '@/lib/mock'
import type { CategoriaId, Prestador } from '@/lib/types'
import s from './patterns.module.css'

export interface Filtros {
  categoria?: CategoriaId
  verificados: boolean
  precoMax?: '100' | '200' | '500'
  notaMin?: '4.5' | '4.8'
}

/** Aplica os filtros a um prestador (mesma regra para lista e mapa). */
export function passaFiltros(p: Prestador, f: Filtros) {
  const menor = Math.min(...p.precos.map((i) => i.preco))
  return (!f.categoria || p.categoria === f.categoria)
    && (!f.verificados || p.verificado)
    && (!f.precoMax || menor <= Number(f.precoMax))
    && (!f.notaMin || p.nota >= Number(f.notaMin))
}

/** Filtros compartilhados pela lista e pelo mapa (referência Event Discovery). */
export function FilterBar({ value, onChange, buscaHref = '/buscar' }: { value: Filtros; onChange: (f: Filtros) => void; buscaHref?: string }) {
  const [abrirCat, setAbrirCat] = useState(false)
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div className={s.filters} role="group" aria-label="Filtros">
        <Link href={buscaHref} className={s.lupa} aria-label="Buscar"><Search size={18} aria-hidden /></Link>
        <Chip dropdown selected={!!value.categoria} onClick={() => setAbrirCat(!abrirCat)}>
          {value.categoria ? CATEGORIAS[value.categoria].rotulo : 'Categoria'}
        </Chip>
        <Chip icon={BadgeCheck} selected={value.verificados} onClick={() => onChange({ ...value, verificados: !value.verificados })}>Verificados</Chip>
        <DropdownChip label="Preço" placeholder="Preço" value={value.precoMax} onChange={(v) => onChange({ ...value, precoMax: v })} options={[{ value: '100', label: 'Até R$ 100' }, { value: '200', label: 'Até R$ 200' }, { value: '500', label: 'Até R$ 500' }]} />
        <DropdownChip label="Nota" placeholder="Nota" value={value.notaMin} onChange={(v) => onChange({ ...value, notaMin: v })} options={[{ value: '4.5', label: 'Nota 4,5+' }, { value: '4.8', label: 'Nota 4,8+' }]} />
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

/** Cabeçalho com a cidade (referência Event Discovery). Só a cidade piloto está ativa. */
export function CityHeader({ cidade, action }: { cidade: string; action?: React.ReactNode }) {
  const [aberto, setAberto] = useState(false)
  return (
    <div className={s.city}>
      <button type="button" className={s.cityBtn} aria-haspopup="dialog" onClick={() => setAberto(true)}>
        Serviços em {cidade}<ChevronDown size={20} aria-hidden />
      </button>
      {action}
      <Dialog open={aberto} onClose={() => setAberto(false)} title="Escolha a cidade" description="O Domu começa por uma cidade. As outras chegam em breve." sheet>
        <ul style={{ display: 'grid' }}>
          {CIDADES.map((c) => (
            <li key={c.slug}>
              <button type="button" disabled={!c.ativa} onClick={() => setAberto(false)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 48, border: 0, borderBottom: '1px solid var(--line)', background: 'none', fontSize: 16, color: c.ativa ? 'var(--ink)' : 'var(--ink-muted)', cursor: c.ativa ? 'pointer' : 'not-allowed' }}>
                {c.nome}{c.nome === cidade ? <Check size={18} color="var(--brand)" aria-hidden /> : !c.ativa && <span style={{ fontSize: 12 }}>Em breve</span>}
              </button>
            </li>
          ))}
        </ul>
      </Dialog>
    </div>
  )
}
