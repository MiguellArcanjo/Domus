'use client'

import { Photo } from '@/components/ui/Photo'
import { SituacaoBadge } from '@/components/domain/Imovel'
import { DataTable } from '@/components/patterns/DataTable'
import { reais } from '@/lib/format'
import type { Imovel } from '@/lib/types'

export function ImoveisTabela({ imoveis, selecionado }: { imoveis: Imovel[]; selecionado?: string }) {
  return (
    <DataTable
      label="Imóveis"
      itens={imoveis}
      selecionado={selecionado}
      href={(i) => `/app/imoveis/${i.id}`}
      colunas={[
        { titulo: 'Imóvel', celula: (i) => <span style={{ display: 'flex', gap: 10, alignItems: 'center' }}><Photo legenda="" height={36} width={48} radius={8} showLabel={false} /><b>{i.nome}</b></span> },
        { titulo: 'Inquilino', celula: (i) => i.contrato?.inquilino.nome ?? '—' },
        { titulo: 'Aluguel', celula: (i) => <span className="tabular">{i.contrato ? reais(i.contrato.valor) : '—'}</span> },
        { titulo: 'Venc.', celula: (i) => (i.contrato ? String(i.contrato.diaVencimento).padStart(2, '0') : '—'), largura: '70px' },
        { titulo: 'Situação', celula: (i) => <SituacaoBadge imovel={i} /> },
      ]}
    />
  )
}
