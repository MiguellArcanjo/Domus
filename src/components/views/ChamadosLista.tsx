'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CircleCheck } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Row, Stack } from '@/components/ui/Stack'
import { Tabs } from '@/components/ui/Tabs'
import { ChamadoCard } from '@/components/domain/ChamadoCard'
import { CHAMADOS, prestador } from '@/lib/mock'

const GRUPOS = [
  { rotulo: 'Abertos', estados: ['aberto', 'triado'] },
  { rotulo: 'Em andamento', estados: ['prestador_atribuido', 'agendado', 'concluido', 'em_disputa'] },
  { rotulo: 'Concluídos', estados: ['pago', 'avaliado', 'cancelado'] },
]

/** Lista de chamados por grupo de estado. Usada sozinha no celular e como primeira coluna no computador. */
export function ChamadosLista({ selecionado }: { selecionado?: string }) {
  const aprovado = useSearchParams().get('aprovado')
  const [aba, setAba] = useState(0)
  const lista = CHAMADOS.filter((c) => GRUPOS[aba].estados.includes(c.estado))
  const cAprovado = CHAMADOS.find((c) => c.id === aprovado)
  return (
    <Stack gap={3}>
      {cAprovado && (
        <Card tone="soft">
          <Row gap={2}><CircleCheck size={18} color="var(--brand)" aria-hidden /><span role="status" style={{ fontSize: 14 }}>Prestador aprovado para “{cAprovado.titulo}”. {prestador(cAprovado.sugeridos[0])?.nome.split(' ')[0]} recebeu o pedido.</span></Row>
        </Card>
      )}
      <Tabs label="Grupos de chamados" tabs={GRUPOS.map((g) => `${g.rotulo} ${CHAMADOS.filter((c) => g.estados.includes(c.estado)).length}`)} value={aba} onChange={setAba} />
      {lista.map((c) => <ChamadoCard key={c.id} chamado={c} href={`/app/chamados/${c.id}`} selected={c.id === selecionado} />)}
      {lista.length === 0 && <p style={{ color: 'var(--ink-muted)' }}>Nenhum chamado aqui.</p>}
    </Stack>
  )
}
