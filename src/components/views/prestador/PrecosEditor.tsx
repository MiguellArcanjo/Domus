'use client'

import { useState } from 'react'
import { Chip, ChipRow } from '@/components/ui/Chip'
import { Checkbox } from '@/components/ui/Extras'
import { CATEGORIAS } from '@/lib/categorias'
import { reais } from '@/lib/format'
import { CATALOGO } from '@/lib/mock'
import type { CategoriaId } from '@/lib/types'

export interface PrecoEditado { id: string; ativo: boolean; preco: string; aPartirDe: boolean }

/**
 * Editor do preço por item do catálogo (M-05): liga o item, define o valor e se é "a partir de".
 * Mostra o preço médio da região para orientar.
 */
export function PrecosEditor({ categorias, inicial }: { categorias: CategoriaId[]; inicial?: Record<string, PrecoEditado> }) {
  const [cat, setCat] = useState<CategoriaId>(categorias[0])
  const [precos, setPrecos] = useState<Record<string, PrecoEditado>>(inicial ?? {})
  const itens = CATALOGO.filter((c) => c.categoria === cat)
  const get = (id: string, medio: number): PrecoEditado => precos[id] ?? { id, ativo: false, preco: String(medio), aPartirDe: false }
  const set = (id: string, medio: number, parcial: Partial<PrecoEditado>) => setPrecos((p) => ({ ...p, [id]: { ...get(id, medio), ...parcial } }))

  return (
    <div style={{ display: 'grid', gap: 14 }}>
      {categorias.length > 1 && (
        <ChipRow label="Categoria">{categorias.map((c) => <Chip key={c} icon={CATEGORIAS[c].icone} selected={cat === c} onClick={() => setCat(c)}>{CATEGORIAS[c].rotulo}</Chip>)}</ChipRow>
      )}
      <ul style={{ display: 'grid', gap: 10 }}>
        {itens.map((i) => {
          const v = get(i.id, i.precoMedio)
          return (
            <li key={i.id} style={{ border: '1px solid var(--line)', borderRadius: 14, padding: 12, display: 'grid', gap: 10, background: v.ativo ? 'var(--surface)' : 'var(--surface-muted)' }}>
              <Checkbox label={<><b>{i.nome}</b><br /><span style={{ color: 'var(--ink-muted)', fontSize: 12 }}>Média na região: {reais(i.precoMedio)}</span></>} checked={v.ativo} onChange={(e) => set(i.id, i.precoMedio, { ativo: e.target.checked })} />
              {v.ativo && (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, border: '1px solid var(--line-strong)', borderRadius: 12, height: 44, padding: '0 12px', background: 'var(--surface)' }}>
                    <span style={{ color: 'var(--ink-muted)' }}>R$</span>
                    <span className="sr-only">Preço de {i.nome}</span>
                    <input name={`preco-${i.id}`} inputMode="decimal" value={v.preco} onChange={(e) => set(i.id, i.precoMedio, { preco: e.target.value.replace(/[^\d,]/g, '') })} style={{ border: 0, outline: 0, width: 80, fontSize: 16, fontWeight: 600, background: 'transparent' }} />
                  </label>
                  <Checkbox label="A partir de" checked={v.aPartirDe} onChange={(e) => set(i.id, i.precoMedio, { aPartirDe: e.target.checked })} />
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/** Preços atuais do prestador de exemplo, no formato do editor. */
export function precosIniciais(precos: Array<{ servico: string; preco: number; aPartirDe?: boolean }>): Record<string, PrecoEditado> {
  const out: Record<string, PrecoEditado> = {}
  for (const p of precos) {
    const item = CATALOGO.find((c) => c.nome === p.servico)
    if (item) out[item.id] = { id: item.id, ativo: true, preco: String(p.preco), aPartirDe: !!p.aPartirDe }
  }
  return out
}
