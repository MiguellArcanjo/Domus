'use client'

import { useSearchParams } from 'next/navigation'
import { ClipboardCheck, Columns2, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/Extras'
import { Row, Stack } from '@/components/ui/Stack'
import { PageHeader } from '@/components/layout/PageHeader'
import { IMOVEIS, VISTORIAS, imovel } from '@/lib/mock'

/** Lista de vistorias (G-12), por imóvel quando vem ?imovel=. */
export function Vistorias() {
  const id = useSearchParams().get('imovel')
  const im = id ? imovel(id) : undefined
  const lista = VISTORIAS.filter((v) => !id || v.imovelId === id)
  const temPar = lista.some((v) => v.tipo === 'entrada') && lista.some((v) => v.tipo === 'saida')
  return (
    <Stack gap={4} style={{ maxWidth: 720 }}>
      <PageHeader title="Vistorias" subtitle={im ? im.nome : 'Entrada e saída, por cômodo, com fotos'} actions={<Button size="sm" variant="primary" icon={Plus} href={`/app/vistorias/nova${id ? `?imovel=${id}` : ''}`}>Nova</Button>} />
      {temPar && id && <Button icon={Columns2} href={`/app/vistorias/comparar?imovel=${id}`}>Comparar entrada e saída</Button>}
      {lista.map((v) => (
        <Card key={v.id} href={`/app/vistorias/${v.id}`}>
          <Row between><div><b>{imovel(v.imovelId)?.nome}</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{v.comodos.length} cômodos · {v.data === '—' ? 'em andamento' : v.data}</p></div><Badge tone={v.tipo === 'entrada' ? 'info' : 'warning'}>{v.tipo === 'entrada' ? 'Entrada' : 'Saída'}</Badge></Row>
        </Card>
      ))}
      {lista.length === 0 && <EmptyState icon={ClipboardCheck} title="Nenhuma vistoria ainda" action={<Button variant="primary" href={`/app/vistorias/nova?imovel=${id ?? IMOVEIS[0].id}`}>Fazer vistoria de entrada</Button>}>Faça a vistoria de entrada antes de entregar as chaves.</EmptyState>}
    </Stack>
  )
}
