'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, RefreshCw, Repeat, Send, Upload, XCircle } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Confirm, useToast } from '@/components/ui/Dialog'
import { Eyebrow } from '@/components/ui/Meta'
import { Row, Stack } from '@/components/ui/Stack'
import { BackBar } from '@/components/layout/PageHeader'
import { reais } from '@/lib/format'
import { COBRANCAS, REAJUSTES } from '@/lib/mock'
import type { Imovel } from '@/lib/types'

/** Detalhe do contrato: dados, cobranças, reajuste, documentos, renovar e encerrar. */
export function ContratoDetalhe({ imovel: i }: { imovel: Imovel }) {
  const router = useRouter()
  const toast = useToast()
  const [encerrar, setEncerrar] = useState(false)
  const [docs, setDocs] = useState(['Contrato assinado.pdf', 'Seguro fiança.pdf'])
  const c = i.contrato!
  const cobrancas = COBRANCAS.filter((x) => x.imovelId === i.id)
  const reajuste = REAJUSTES.find((r) => r.imovelId === i.id)
  const linha = (a: string, b: React.ReactNode) => <li style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--line)', fontSize: 14 }}><span style={{ color: 'var(--ink-muted)' }}>{a}</span><b style={{ textAlign: 'right' }}>{b}</b></li>
  return (
    <Stack gap={4} style={{ maxWidth: 720 }}>
      <BackBar title="Contrato" back="/app/contratos" />
      <Card>
        <Row gap={3}><Avatar iniciais={c.inquilino.iniciais} /><div style={{ flexGrow: 1 }}><b>{c.inquilino.nome}</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{i.nome} · {c.inquilino.email}</p></div><Badge tone="success">Ativo</Badge></Row>
      </Card>
      <ul>
        {linha('Vigência', `${c.inicio} a ${c.fim}`)}
        {linha('Aluguel', reais(c.valor))}
        {linha('Vencimento', `todo dia ${String(c.diaVencimento).padStart(2, '0')}`)}
        {linha('Índice de reajuste', c.indice)}
        {linha('Multa e juros', '2% + 1% ao mês')}
        {linha('Taxa de administração', '8%')}
        {linha('Proprietário', i.proprietario)}
      </ul>
      {reajuste && (
        <Card tone="warning">
          <Row start gap={2}><Repeat size={18} color="var(--warning)" aria-hidden /><div><b style={{ fontSize: 14 }}>Reajuste em {reajuste.data}: {reais(reajuste.valorAtual)} → {reais(reajuste.novoValor)}</b><p style={{ fontSize: 13 }}>{reajuste.indice} de {reajuste.percentual.toLocaleString('pt-BR')}% nos últimos 12 meses.</p></div></Row>
          <Button size="sm" href="/app/reajustes">Ver reajuste</Button>
        </Card>
      )}
      <Eyebrow as="h2">Cobranças</Eyebrow>
      {cobrancas.map((cb) => (
        <Card key={cb.id} href={`/app/financeiro/cobrancas/${cb.id}`}>
          <Row between><b style={{ fontSize: 14 }}>{cb.mes} · {reais(cb.valor)}</b><Badge tone={cb.situacao === 'paga' ? 'success' : cb.situacao === 'vencida' ? 'danger' : 'info'}>{cb.situacao === 'paga' ? 'Paga' : cb.situacao === 'vencida' ? `${cb.diasAtraso} dias de atraso` : 'Aguardando'}</Badge></Row>
        </Card>
      ))}
      <Eyebrow as="h2">Documentos</Eyebrow>
      {docs.map((d) => <Card key={d}><Row gap={2}><FileText size={18} aria-hidden /><span style={{ flexGrow: 1, fontSize: 14 }}>{d}</span><Badge>Criptografado</Badge></Row></Card>)}
      <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--brand)', fontWeight: 600, position: 'relative', cursor: 'pointer', justifySelf: 'start' }}>
        <Upload size={18} aria-hidden />Enviar documento
        <input type="file" accept="application/pdf,image/*" aria-label="Enviar documento" style={{ position: 'absolute', inset: 0, opacity: 0 }} onChange={(e) => { const f = e.target.files?.[0]; if (f) { setDocs((l) => [...l, f.name]); toast('Documento enviado') } }} />
      </label>
      <Row wrap gap={2}>
        <Button icon={Send} href={`/app/imoveis/${i.id}/link`}>Link do inquilino</Button>
        <Button icon={RefreshCw} href={`/app/contratos/novo?imovel=${i.id}&renovar=1`}>Renovar</Button>
        <Button icon={XCircle} variant="danger" onClick={() => setEncerrar(true)}>Encerrar contrato</Button>
      </Row>
      <Confirm open={encerrar} onClose={() => setEncerrar(false)} onConfirm={() => { toast('Contrato encerrado. Agende a vistoria de saída.'); router.push(`/app/vistorias/nova?imovel=${i.id}&tipo=saida`) }} title="Encerrar este contrato?" description="O link do inquilino deixa de funcionar e o imóvel fica vago. Em seguida você faz a vistoria de saída." confirmar="Encerrar" perigo />
    </Stack>
  )
}
