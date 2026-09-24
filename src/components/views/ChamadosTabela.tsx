'use client'

import { Badge, StatusBadge, UrgenteBadge } from '@/components/ui/Badge'
import { CategoriaIcon } from '@/components/domain/CategoriaIcon'
import { DataTable } from '@/components/patterns/DataTable'
import { imovel } from '@/lib/mock'
import type { Chamado } from '@/lib/types'

export function ChamadosTabela({ chamados, selecionado }: { chamados: Chamado[]; selecionado?: string }) {
  return (
    <DataTable
      label="Chamados"
      itens={chamados}
      selecionado={selecionado}
      href={(c) => `/app/chamados/${c.id}`}
      colunas={[
        { titulo: 'Chamado', celula: (c) => <span style={{ display: 'flex', gap: 10, alignItems: 'center' }}><CategoriaIcon categoria={c.categoria} size={32} /><b>{c.titulo}</b>{c.novo && <Badge tone="accent">Novo</Badge>}</span> },
        { titulo: 'Imóvel', celula: (c) => imovel(c.imovelId)?.nome.split(' · ')[0] },
        { titulo: 'Status', celula: (c) => <span style={{ display: 'flex', gap: 6 }}>{c.urgente && <UrgenteBadge />}<StatusBadge estado={c.estado} /></span> },
        { titulo: 'Aberto', celula: (c) => <span style={{ color: 'var(--ink-muted)' }}>{c.abertoEm}</span>, largura: '110px' },
      ]}
    />
  )
}
