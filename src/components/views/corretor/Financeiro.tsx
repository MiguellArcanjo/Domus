'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Download } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useToast } from '@/components/ui/Dialog'
import { DropdownChip } from '@/components/ui/Dropdown'
import { Eyebrow } from '@/components/ui/Meta'
import { Row, Stack } from '@/components/ui/Stack'
import { TabPanels } from '@/components/ui/Tabs'
import { KpiCard } from '@/components/domain/Kpi'
import { PageHeader } from '@/components/layout/PageHeader'
import { reais } from '@/lib/format'
import { COBRANCAS, REGUA_ATRASO, REPASSES, RESUMO_MES, imovel } from '@/lib/mock'
import type { Cobranca } from '@/lib/mock/financeiro'

function tomCobranca(c: Cobranca) {
  return c.situacao === 'paga' ? { tom: 'success' as const, rotulo: `Paga em ${c.pagaEm}` } : c.situacao === 'vencida' ? { tom: 'danger' as const, rotulo: `${c.diasAtraso} dias de atraso` } : { tom: 'info' as const, rotulo: `Vence ${c.vencimento}` }
}

/** Baixa as cobranças do mês em CSV (abre no Excel e no Google Planilhas). Com backend: GET /relatorios/cobrancas.csv. */
function exportarCsv() {
  const linhas = [['Imóvel', 'Inquilino', 'Mês', 'Valor', 'Vencimento', 'Situação', 'Pago em', 'Forma']]
  COBRANCAS.forEach((c) => linhas.push([imovel(c.imovelId)?.nome ?? '', c.inquilino, c.mes, String(c.valor).replace('.', ','), c.vencimento, c.situacao, c.pagaEm ?? '', c.forma ?? '']))
  const csv = '\uFEFF' + linhas.map((l) => l.map((v) => `"${v.replace(/"/g, '""')}"`).join(';')).join('\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  a.download = 'domu-cobrancas.csv'
  a.click()
  URL.revokeObjectURL(a.href)
}

/**
 * Relatórios do corretor no site: cobranças (só leitura, com exportação), extratos de repasse e régua de atraso.
 * Cobrar, marcar como paga e lembrar o inquilino ficam no app.
 */
export function Financeiro() {
  const toast = useToast()
  const [mes, setMes] = useState<string | undefined>('set')
  const [regua, setRegua] = useState(REGUA_ATRASO)
  return (
    <Stack gap={4} style={{ maxWidth: 900 }}>
      <PageHeader title="Relatórios" actions={<DropdownChip label="Mês" value={mes} onChange={setMes} placeholder="Todos os meses" options={[{ value: 'set', label: 'Setembro' }, { value: 'ago', label: 'Agosto' }, { value: 'jul', label: 'Julho' }]} />} />
      <KpiCard mes={RESUMO_MES.mes} valor={RESUMO_MES.aReceber} pagos={RESUMO_MES.pagos} total={RESUMO_MES.total} emAtraso={RESUMO_MES.emAtraso} />
      <TabPanels label="Financeiro" tabs={['Cobranças', 'Repasses', 'Régua de atraso']}>
        {[
          <Stack key="cob" gap={3}>
            {COBRANCAS.map((c) => {
              const t = tomCobranca(c)
              return (
                <Card key={c.id}>
                  <Row between><div><b style={{ fontSize: 15 }}>{imovel(c.imovelId)?.nome.split(' · ')[0]} · {c.inquilino}</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{c.mes} · {c.forma ?? 'Pix ou boleto'}</p></div><div style={{ display: 'grid', justifyItems: 'end', gap: 4 }}><b className="tabular">{reais(c.valor)}</b><Badge tone={t.tom}>{t.rotulo}</Badge></div></Row>
                </Card>
              )
            })}
            <Button icon={Download} onClick={() => { exportarCsv(); toast('Planilha baixada') }}>Baixar planilha (CSV)</Button>
          </Stack>,
          <Stack key="rep" gap={3}>
            {REPASSES.map((r) => (
              <Link key={r.proprietarioId} href={`/app/financeiro/repasses/${r.proprietarioId}`} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderRadius: 14, border: '1px solid var(--line)', background: 'var(--surface)' }}>
                <div style={{ flexGrow: 1 }}><b>{r.proprietario}</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{r.imoveis.length} imóveis · {r.mes}</p></div>
                <div style={{ display: 'grid', justifyItems: 'end', gap: 4 }}><b className="tabular">{reais(r.aluguel - r.taxaAdm - r.manutencoes)}</b><Badge tone={r.status === 'pago' ? 'success' : 'warning'}>{r.status === 'pago' ? 'Repassado' : 'A repassar'}</Badge></div>
                <ChevronRight size={18} color="var(--ink-muted)" aria-hidden />
              </Link>
            ))}
          </Stack>,
          <Stack key="regua" gap={3}>
            <p style={{ color: 'var(--ink-muted)', fontSize: 14 }}>Avisos automáticos para o inquilino antes e depois do vencimento. Ligue só os que quiser.</p>
            {regua.map((r, n) => (
              <label key={r.dia} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 14, border: '1px solid var(--line)', background: 'var(--surface)', cursor: 'pointer' }}>
                <Eyebrow>{r.dia < 0 ? `${r.dia} d` : r.dia === 0 ? 'Dia' : `+${r.dia} d`}</Eyebrow>
                <span style={{ flexGrow: 1 }}><b style={{ fontSize: 14 }}>{r.acao}</b><br /><span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{r.canal}</span></span>
                <input type="checkbox" role="switch" checked={r.ativo} onChange={() => setRegua((l) => l.map((x, i) => (i === n ? { ...x, ativo: !x.ativo } : x)))} style={{ width: 22, height: 22, accentColor: 'var(--brand)' }} />
              </label>
            ))}
            <Button variant="primary" onClick={() => toast('Régua de atraso salva')}>Salvar régua</Button>
          </Stack>,
        ]}
      </TabPanels>
    </Stack>
  )
}
