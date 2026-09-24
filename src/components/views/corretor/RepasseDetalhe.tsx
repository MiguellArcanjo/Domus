'use client'

import { useState } from 'react'
import { Download, Send } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Confirm, useToast } from '@/components/ui/Dialog'
import { Row, Stack } from '@/components/ui/Stack'
import { BackBar } from '@/components/layout/PageHeader'
import { reais } from '@/lib/format'
import type { Repasse } from '@/lib/mock/financeiro'

/** Extrato do repasse por proprietário (G-11): aluguel − taxa − manutenções. */
export function RepasseDetalhe({ repasse }: { repasse: Repasse }) {
  const toast = useToast()
  const [pago, setPago] = useState(repasse.status === 'pago')
  const [confirmar, setConfirmar] = useState(false)
  const liquido = repasse.aluguel - repasse.taxaAdm - repasse.manutencoes
  return (
    <Stack gap={4} style={{ maxWidth: 640 }}>
      <BackBar title="Repasse" back="/app/financeiro" />
      <Card>
        <Row between><div><b style={{ fontSize: 17 }}>{repasse.proprietario}</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{repasse.mes} · {repasse.imoveis.length} imóveis</p></div><Badge tone={pago ? 'success' : 'warning'}>{pago ? 'Repassado' : 'A repassar'}</Badge></Row>
      </Card>
      <ul>
        {repasse.itens.map((it) => (
          <li key={it.descricao} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--line)', fontSize: 14 }}>
            <span>{it.descricao}</span><b className="tabular" style={{ color: it.valor < 0 ? 'var(--ink)' : undefined }}>{it.valor < 0 ? '− ' : ''}{reais(Math.abs(it.valor), true)}</b>
          </li>
        ))}
        <li style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', fontSize: 17 }}><b>A repassar</b><b className="tabular">{reais(liquido, true)}</b></li>
      </ul>
      <Row wrap gap={2}>
        <Button icon={Download} onClick={() => toast('Extrato em PDF gerado')}>Baixar extrato</Button>
        <Button icon={Send} onClick={() => toast('Extrato enviado ao proprietário por e-mail')}>Enviar ao proprietário</Button>
        {!pago && <Button variant="primary" onClick={() => setConfirmar(true)}>Repassar {reais(liquido)}</Button>}
      </Row>
      <Confirm open={confirmar} onClose={() => setConfirmar(false)} onConfirm={() => { setPago(true); toast('Repasse enviado por Pix') }} title={`Repassar ${reais(liquido, true)}?`} description={`O valor vai por Pix para a conta cadastrada de ${repasse.proprietario}.`} confirmar="Repassar" />
    </Stack>
  )
}
