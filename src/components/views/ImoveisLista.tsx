'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { SearchField } from '@/components/ui/SearchField'
import { Tabs } from '@/components/ui/Tabs'
import { ImovelCard } from '@/components/domain/Imovel'
import { PageHeader } from '@/components/layout/PageHeader'
import { DesktopOnly, MobileOnly, Panel } from '@/components/patterns/Responsive'
import { IMOVEIS } from '@/lib/mock'
import type { Imovel } from '@/lib/types'
import { ImoveisTabela } from './ImoveisTabela'

const FILTROS: Array<{ id: string; rotulo: string; ok: (i: Imovel) => boolean }> = [
  { id: 'todos', rotulo: 'Todos', ok: () => true },
  { id: 'ocupados', rotulo: 'Ocupados', ok: (i) => i.status === 'ocupado' },
  { id: 'vagos', rotulo: 'Vagos', ok: (i) => i.status === 'vago' },
  { id: 'atrasados', rotulo: 'Atrasados', ok: (i) => i.situacao === 'atrasado' },
]

export function ImoveisLista() {
  const params = useSearchParams()
  const inicial = Math.max(0, FILTROS.findIndex((f) => f.id === params.get('filtro')))
  const [filtro, setFiltro] = useState(inicial)
  const [busca, setBusca] = useState('')
  const lista = useMemo(() => {
    const q = busca.trim().toLowerCase()
    return IMOVEIS.filter(FILTROS[filtro].ok).filter((i) => !q || `${i.nome} ${i.endereco} ${i.contrato?.inquilino.nome ?? ''}`.toLowerCase().includes(q))
  }, [filtro, busca])

  return (
    <>
      <PageHeader
        title="Imóveis"
        subtitle={`${IMOVEIS.length} imóveis na sua carteira`}
        actions={
          <>
            <MobileOnly><IconButton icon={Plus} label="Novo imóvel" href="/app/imoveis/novo" tone="brand" /></MobileOnly>
            <DesktopOnly><Button variant="primary" icon={Plus} href="/app/imoveis/novo">Novo imóvel</Button></DesktopOnly>
          </>
        }
      />
      <div style={{ display: 'grid', gap: 14 }}>
        <div onChange={(e) => setBusca((e.target as HTMLInputElement).value)}>
          <SearchField placeholder="Buscar por endereço ou inquilino" />
        </div>
        <Tabs variant="pills" label="Filtrar imóveis" tabs={FILTROS.map((f) => `${f.rotulo} ${IMOVEIS.filter(f.ok).length}`)} value={filtro} onChange={setFiltro} />
        <MobileOnly>
          <div style={{ display: 'grid', gap: 12 }}>{lista.map((i) => <ImovelCard key={i.id} imovel={i} href={`/app/imoveis/${i.id}`} />)}</div>
        </MobileOnly>
        <DesktopOnly><Panel flush label="Tabela de imóveis"><ImoveisTabela imoveis={lista} /></Panel></DesktopOnly>
        {lista.length === 0 && <p style={{ color: 'var(--ink-muted)' }}>Nenhum imóvel encontrado. Confira a busca ou o filtro.</p>}
      </div>
    </>
  )
}
