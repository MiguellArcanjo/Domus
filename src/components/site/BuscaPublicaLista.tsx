'use client'

import { useState } from 'react'
import { SearchX } from 'lucide-react'
import { Chip, ChipRow } from '@/components/ui/Chip'
import { DropdownChip } from '@/components/ui/Dropdown'
import { EmptyState } from '@/components/ui/Extras'
import { PrestadorCard } from '@/components/domain/Prestador'
import { passaFiltros, type Filtros } from '@/components/patterns/FilterBar'
import { BAIRROS, PRESTADORES } from '@/lib/mock'
import type { CategoriaId } from '@/lib/types'

/** Lista da busca pública com filtros que funcionam na tela. */
export function BuscaPublicaLista({ categoria }: { categoria: CategoriaId }) {
  const [hoje, setHoje] = useState(false)
  const [bairro, setBairro] = useState<string | undefined>()
  const [f, setF] = useState<Filtros>({ verificados: false, categoria })
  const lista = PRESTADORES.filter((p) => passaFiltros(p, f) && (!hoje || p.disponibilidade === 'hoje') && (!bairro || p.bairro === bairro))
  return (
    <>
      <ChipRow label="Filtros">
        <Chip selected={hoje} onClick={() => setHoje(!hoje)}>Hoje</Chip>
        <Chip selected={f.verificados} onClick={() => setF({ ...f, verificados: !f.verificados })}>Verificados</Chip>
        <DropdownChip label="Preço" placeholder="Preço" value={f.precoMax} onChange={(v) => setF({ ...f, precoMax: v })} options={[{ value: '100', label: 'Até R$ 100' }, { value: '200', label: 'Até R$ 200' }, { value: '500', label: 'Até R$ 500' }]} />
        <DropdownChip label="Nota" placeholder="Nota" value={f.notaMin} onChange={(v) => setF({ ...f, notaMin: v })} options={[{ value: '4.5', label: 'Nota 4,5+' }, { value: '4.8', label: 'Nota 4,8+' }]} />
        <DropdownChip label="Bairro" placeholder="Bairro" value={bairro} onChange={setBairro} options={BAIRROS.map((b) => ({ value: b, label: b }))} />
      </ChipRow>
      {lista.map((p) => <PrestadorCard key={p.slug} p={p} href={`/p/${p.slug}`} ctaHref={`/baixar?prestador=${p.slug}`} />)}
      {lista.length === 0 && <EmptyState icon={SearchX} title="Nenhum prestador com esses filtros">Tire um filtro ou veja outros serviços abaixo.</EmptyState>}
    </>
  )
}
