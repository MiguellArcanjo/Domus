'use client'

import { useState } from 'react'
import { Barcode, Check, Copy, Mail, QrCode } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Confirm, useToast } from '@/components/ui/Dialog'
import { Eyebrow } from '@/components/ui/Meta'
import { Row, Stack } from '@/components/ui/Stack'
import { BackBar } from '@/components/layout/PageHeader'
import { reais } from '@/lib/format'
import { imovel } from '@/lib/mock'
import type { Cobranca } from '@/lib/mock/financeiro'
import { tomCobranca } from './Financeiro'

/** Detalhe da cobrança: Pix copia e cola, boleto, lembretes enviados, baixa manual. */
export function CobrancaDetalhe({ cobranca }: { cobranca: Cobranca }) {
  const toast = useToast()
  const [c, setC] = useState(cobranca)
  const [baixa, setBaixa] = useState(false)
  const [copiado, setCopiado] = useState(false)
  const t = tomCobranca(c)
  const pix = '00020126580014BR.GOV.BCB.PIX0136domu-demo-pix-copia-e-cola5204000053039865406' + c.valor.toFixed(2)
  const multa = c.situacao === 'vencida' ? c.valor * 0.02 + c.valor * 0.01 * ((c.diasAtraso ?? 0) / 30) : 0
  return (
    <Stack gap={4} style={{ maxWidth: 640 }}>
      <BackBar title={`Cobrança · ${c.mes}`} back="/app/financeiro" />
      <Card>
        <Row between><div><b>{imovel(c.imovelId)?.nome}</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{c.inquilino} · vence {c.vencimento}</p></div><Badge tone={t.tom}>{t.rotulo}</Badge></Row>
        <ul style={{ display: 'grid', fontSize: 14 }}>
          <li style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}><span>Aluguel</span><b className="tabular">{reais(c.valor, true)}</b></li>
          {multa > 0 && <li style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}><span>Multa (2%) e juros (1% ao mês)</span><b className="tabular">{reais(multa, true)}</b></li>}
          <li style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 16 }}><b>Total</b><b className="tabular">{reais(c.valor + multa, true)}</b></li>
        </ul>
      </Card>
      {c.situacao !== 'paga' && (
        <>
          <Eyebrow as="h2">Pagamento</Eyebrow>
          <Card>
            <Row gap={3} start><div style={{ width: 120, height: 120, borderRadius: 12, background: 'var(--surface-muted)', display: 'grid', placeItems: 'center', flexShrink: 0 }} role="img" aria-label="QR Code do Pix"><QrCode size={72} aria-hidden /></div>
              <div style={{ display: 'grid', gap: 8, minWidth: 0 }}>
                <b>Pix copia e cola</b>
                <code style={{ fontSize: 11, wordBreak: 'break-all', color: 'var(--ink-muted)' }}>{pix.slice(0, 64)}…</code>
                <Button size="sm" icon={copiado ? Check : Copy} onClick={async () => { try { await navigator.clipboard.writeText(pix); setCopiado(true); toast('Código Pix copiado') } catch { /* sem permissão */ } }}>{copiado ? 'Copiado' : 'Copiar código'}</Button>
              </div>
            </Row>
          </Card>
          <Row wrap gap={2}>
            <Button icon={Barcode} onClick={() => toast('Boleto gerado e enviado por e-mail')}>Gerar boleto</Button>
            <Button icon={Mail} onClick={() => { setC((x) => ({ ...x, lembretes: [...x.lembretes, { quando: 'agora', canal: 'E-mail', texto: 'Lembrete enviado pelo corretor' }] })); toast('Lembrete enviado') }}>Enviar lembrete</Button>
            <Button variant="primary" onClick={() => setBaixa(true)}>Registrar pagamento</Button>
          </Row>
        </>
      )}
      <Eyebrow as="h2">Avisos enviados</Eyebrow>
      {c.lembretes.length === 0 && <p style={{ color: 'var(--ink-muted)', fontSize: 14 }}>Nenhum aviso enviado.</p>}
      <ul style={{ display: 'grid', gap: 8 }}>{c.lembretes.map((l, n) => <li key={n} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '8px 0', borderBottom: '1px solid var(--line)' }}><span>{l.texto}</span><span style={{ color: 'var(--ink-muted)' }}>{l.canal} · {l.quando}</span></li>)}</ul>
      <Confirm open={baixa} onClose={() => setBaixa(false)} onConfirm={() => { setC((x) => ({ ...x, situacao: 'paga', pagaEm: 'hoje', forma: x.forma ?? 'Pix' })); toast('Pagamento registrado') }} title="Registrar pagamento feito por fora?" description="Use quando o inquilino pagou direto a você. A cobrança fica como paga e entra no repasse." confirmar="Registrar" />
    </Stack>
  )
}
