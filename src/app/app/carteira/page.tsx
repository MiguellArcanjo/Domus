import type { Metadata } from 'next'
import { Chip } from '@/components/ui/Chip'
import { Eyebrow } from '@/components/ui/Meta'
import { Row, Stack } from '@/components/ui/Stack'
import { BarChart } from '@/components/domain/Kpi'
import { SaqueButton } from '@/components/views/SaqueButton'
import { PageHeader } from '@/components/layout/PageHeader'
import { Panel } from '@/components/patterns/Responsive'
import { reais } from '@/lib/format'
import { CARTEIRA } from '@/lib/mock'

export const metadata: Metadata = { title: 'Carteira' }

/** Carteira do prestador (M-12): saldo, a liberar, atividade e lançamentos. */
export default function Carteira() {
  return (
    <Stack gap={4} style={{ maxWidth: 720 }}>
      <PageHeader title="Carteira" />
      <section aria-label="Saldo" style={{ background: 'var(--tinta)', color: '#fff', borderRadius: 18, padding: 18, display: 'grid', gap: 10 }}>
        <span style={{ fontSize: 13, color: '#C9D3CE' }}>Saldo disponível</span>
        <b style={{ fontSize: 32, letterSpacing: '-0.02em' }} className="tabular">{reais(CARTEIRA.disponivel, true)}</b>
        <Row between wrap><span style={{ fontSize: 13, color: '#C9D3CE' }}>A liberar: {reais(CARTEIRA.aLiberar, true)}</span><SaqueButton valor={CARTEIRA.disponivel} /></Row>
      </section>
      <Panel label="Atividade">
        <Row between><h2 style={{ fontSize: 20 }}>Atividade</h2><Chip dropdown>Últimos 30 dias</Chip></Row>
        <BarChart label="Ganhos por semana" dados={CARTEIRA.atividade.map((v, i) => ({ rotulo: `S${i + 1}`, valor: v }))} destaque={5} />
      </Panel>
      <Eyebrow as="h2">Lançamentos</Eyebrow>
      <ul>
        {CARTEIRA.lancamentos.map((l) => (
          <li key={`${l.descricao}-${l.data}`} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line)', fontSize: 14 }}>
            <span>{l.descricao} · {l.data}</span>
            <b className="tabular" style={{ color: l.valor < 0 ? 'var(--ink)' : 'var(--success)' }}>{l.valor < 0 ? '− ' : '+ '}{reais(Math.abs(l.valor), true)}</b>
          </li>
        ))}
      </ul>
    </Stack>
  )
}
