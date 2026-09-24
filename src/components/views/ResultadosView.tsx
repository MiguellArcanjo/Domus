'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SearchX } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Chip, ChipRow } from '@/components/ui/Chip'
import { DropdownChip } from '@/components/ui/Dropdown'
import { EmptyState } from '@/components/ui/Extras'
import { SearchField } from '@/components/ui/SearchField'
import { Stack } from '@/components/ui/Stack'
import { ResultRow } from '@/components/domain/Prestador'
import { BackBar } from '@/components/layout/PageHeader'
import { passaFiltros, type Filtros } from '@/components/patterns/FilterBar'
import { CATEGORIAS } from '@/lib/categorias'
import { PRESTADORES } from '@/lib/mock'

/** Resultados da busca com filtros de dia, preço e nota. Só front: casa o texto com ofício, categoria e serviços. */
export function ResultadosView({ q }: { q: string }) {
  const router = useRouter()
  const [hoje, setHoje] = useState(false)
  const [f, setF] = useState<Filtros>({ verificados: false })
  const termo = q.toLowerCase().slice(0, 6)
  const achados = useMemo(() => PRESTADORES.filter((p) => (!termo || `${p.oficio} ${CATEGORIAS[p.categoria].rotulo} ${p.precos.map((i) => i.servico).join(' ')}`.toLowerCase().includes(termo)) && passaFiltros(p, f) && (!hoje || p.disponibilidade === 'hoje')), [termo, f, hoje])
  const outros = PRESTADORES.filter((p) => !achados.includes(p)).slice(0, 3)
  return (
    <Stack gap={4} style={{ maxWidth: 720 }}>
      <BackBar title="Resultados" back="/app/busca" />
      <form action="/app/busca/resultados"><SearchField placeholder="Buscar serviço" defaultValue={q} /></form>
      <ChipRow label="Filtros">
        {q && <Chip selected removable onClick={() => router.push('/app/busca/resultados')}>{q}</Chip>}
        <Chip selected={hoje} onClick={() => setHoje(!hoje)}>Hoje</Chip>
        <Chip selected={f.verificados} onClick={() => setF({ ...f, verificados: !f.verificados })}>Verificados</Chip>
        <DropdownChip label="Preço" placeholder="Preço" value={f.precoMax} onChange={(v) => setF({ ...f, precoMax: v })} options={[{ value: '100', label: 'Até R$ 100' }, { value: '200', label: 'Até R$ 200' }, { value: '500', label: 'Até R$ 500' }]} />
        <DropdownChip label="Nota" placeholder="Nota" value={f.notaMin} onChange={(v) => setF({ ...f, notaMin: v })} options={[{ value: '4.5', label: 'Nota 4,5+' }, { value: '4.8', label: 'Nota 4,8+' }]} />
      </ChipRow>
      <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{achados.length} prestadores perto de você</p>
      {achados.map((p) => <ResultRow key={p.slug} p={p} href={`/app/prestadores/${p.slug}`} />)}
      {achados.length === 0 && <EmptyState icon={SearchX} title={`Nada encontrado${q ? ` para “${q}”` : ''}`} action={<Button onClick={() => { setF({ verificados: false }); setHoje(false) }}>Limpar filtros</Button>}>Tente outra palavra, como “encanador” ou “tomada”, ou tire os filtros.</EmptyState>}
      <h2 style={{ fontSize: 18 }}>Outros serviços perto de você</h2>
      {outros.map((p) => <ResultRow key={p.slug} p={p} href={`/app/prestadores/${p.slug}`} />)}
    </Stack>
  )
}
