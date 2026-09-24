import type { Metadata } from 'next'
import { Chip, ChipRow } from '@/components/ui/Chip'
import { SearchField } from '@/components/ui/SearchField'
import { Stack } from '@/components/ui/Stack'
import { ResultRow } from '@/components/domain/Prestador'
import { BackBar } from '@/components/layout/PageHeader'
import { CATEGORIAS } from '@/lib/categorias'
import { PRESTADORES } from '@/lib/mock'

export const metadata: Metadata = { title: 'Resultados' }

type Props = { searchParams: Promise<{ q?: string }> }

/** Resultados da busca: linhas com miniatura e "Outros serviços perto de você". Só front: filtra os dados de exemplo pelo texto. */
export default async function Resultados({ searchParams }: Props) {
  const q = ((await searchParams).q ?? '').trim()
  const termo = q.toLowerCase()
  const achados = PRESTADORES.filter((p) => !termo || `${p.oficio} ${CATEGORIAS[p.categoria].rotulo} ${p.precos.map((i) => i.servico).join(' ')}`.toLowerCase().includes(termo.slice(0, 6)))
  const outros = PRESTADORES.filter((p) => !achados.includes(p)).slice(0, 3)
  return (
    <Stack gap={4} style={{ maxWidth: 720 }}>
      <BackBar title="Resultados" back="/app/busca" />
      <form action="/app/busca/resultados"><SearchField placeholder="Buscar serviço" defaultValue={q} /></form>
      <ChipRow label="Filtros"><Chip selected removable>{q || 'Todos'}</Chip><Chip dropdown>Hoje</Chip><Chip dropdown>Preço</Chip><Chip dropdown>Nota</Chip></ChipRow>
      <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{achados.length} prestadores perto de você</p>
      {achados.map((p) => <ResultRow key={p.slug} p={p} href={`/app/prestadores/${p.slug}`} />)}
      {achados.length === 0 && <p>Nada encontrado para “{q}”. Tente outra palavra, como “encanador” ou “tomada”.</p>}
      <h2 style={{ fontSize: 18 }}>Outros serviços perto de você</h2>
      {outros.map((p) => <ResultRow key={p.slug} p={p} href={`/app/prestadores/${p.slug}`} />)}
    </Stack>
  )
}
