'use client'

import { useState } from 'react'
import { Mail, Repeat } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useToast } from '@/components/ui/Dialog'
import { Row, Stack } from '@/components/ui/Stack'
import { PageHeader } from '@/components/layout/PageHeader'
import { reais } from '@/lib/format'
import { REAJUSTES, imovel } from '@/lib/mock'

/** Reajuste automático por IGP-M ou IPCA (G-09): novo valor calculado e aviso ao inquilino. */
export function Reajustes() {
  const toast = useToast()
  const [lista, setLista] = useState(REAJUSTES)
  return (
    <Stack gap={4} style={{ maxWidth: 720 }}>
      <PageHeader title="Reajustes" subtitle="Calculados pelo índice do contrato nos últimos 12 meses" />
      {lista.map((r, n) => (
        <Card key={r.imovelId}>
          <Row between start><div><b>{imovel(r.imovelId)?.nome}</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{r.inquilino} · a partir de {r.data}</p></div>{r.avisado ? <Badge tone="success">Inquilino avisado</Badge> : <Badge tone="warning">Aviso pendente</Badge>}</Row>
          <Row gap={2}><Repeat size={18} color="var(--brand)" aria-hidden /><span style={{ fontSize: 15 }}><b className="tabular">{reais(r.valorAtual)}</b> → <b className="tabular">{reais(r.novoValor)}</b> · {r.indice} {r.percentual.toLocaleString('pt-BR')}%</span></Row>
          {!r.avisado && (
            <Row wrap gap={2}>
              <Button size="sm" variant="primary" icon={Mail} onClick={() => { setLista((l) => l.map((x, i) => (i === n ? { ...x, avisado: true } : x))); toast('Aviso de reajuste enviado ao inquilino') }}>Avisar o inquilino</Button>
              <Button size="sm" href={`/app/contratos/${r.imovelId}`}>Ver contrato</Button>
            </Row>
          )}
        </Card>
      ))}
    </Stack>
  )
}
