import type { Metadata } from 'next'
import Link from 'next/link'
import { Bell, FileText, Plus, Repeat, Send, TriangleAlert } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { IconButton } from '@/components/ui/IconButton'
import { Row, Stack } from '@/components/ui/Stack'
import { Title, TextLink } from '@/components/ui/Text'
import { ChamadoCard } from '@/components/domain/ChamadoCard'
import { BarChart, KpiCard, StatCard } from '@/components/domain/Kpi'
import { DesktopOnly, MobileOnly, Panel, Split } from '@/components/patterns/Responsive'
import { ChamadosTabela } from '@/components/views/ChamadosTabela'
import { reais } from '@/lib/format'
import { CHAMADOS, IMOVEIS, RESUMO_MES, USUARIO } from '@/lib/mock'

export const metadata: Metadata = { title: 'Painel' }

/** Painel do corretor (G-03). */
export default function Painel() {
  const abertos = CHAMADOS.filter((c) => !['pago', 'avaliado', 'cancelado'].includes(c.estado))
  const atrasado = IMOVEIS.find((i) => i.situacao === 'atrasado')
  return (
    <Stack gap={5}>
      <Row gap={3}>
        <Avatar iniciais={USUARIO.iniciais} size={44} />
        <div style={{ flexGrow: 1 }}>
          <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>Bom dia,</span>
          <Title level={1} className="">{USUARIO.primeiroNome}</Title>
        </div>
        <IconButton icon={Bell} label="Notificações" href="/app/notificacoes" dot />
      </Row>

      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(96px, 1fr))' }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <KpiCard mes={RESUMO_MES.mes} valor={RESUMO_MES.aReceber} pagos={RESUMO_MES.pagos} total={RESUMO_MES.total} emAtraso={RESUMO_MES.emAtraso} />
        </div>
        <StatCard label="Ocupados" valor={String(RESUMO_MES.ocupados)} detalhe={`de ${RESUMO_MES.imoveis}`} href="/app/imoveis?filtro=ocupados" />
        <StatCard label="Vagos" valor={String(RESUMO_MES.vagos)} href="/app/imoveis?filtro=vagos" />
        <StatCard label="Atrasados" valor={String(RESUMO_MES.atrasados)} detalhe={reais(RESUMO_MES.emAtraso)} href="/app/imoveis?filtro=atrasados" tone="danger" />
      </div>

      <Split>
        <Panel label="Chamados abertos">
          <Row between><Title level={2}>Chamados abertos</Title><TextLink href="/app/chamados">Ver todos</TextLink></Row>
          <MobileOnly><Stack gap={3}>{abertos.slice(0, 2).map((c) => <ChamadoCard key={c.id} chamado={c} href={`/app/chamados/${c.id}`} />)}</Stack></MobileOnly>
          <DesktopOnly><ChamadosTabela chamados={abertos} /></DesktopOnly>
        </Panel>
        <Panel label="Atenção">
          <Title level={2}>Atenção</Title>
          <Card tone="warning" href="/app/imoveis/ap-21-acacias">
            <Row start gap={3}><FileText size={18} color="var(--warning)" aria-hidden /><div><b style={{ fontSize: 14 }}>Contrato do Ap 21 vence em 30 dias</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>Renovar ou avisar o inquilino</p></div></Row>
          </Card>
          <Card tone="warning" href="/app/imoveis/casa-4-vila-nova">
            <Row start gap={3}><Repeat size={18} color="var(--warning)" aria-hidden /><div><b style={{ fontSize: 14 }}>Reajuste da Casa 4 em outubro</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>IGP-M · novo valor R$ 2.371</p></div></Row>
          </Card>
          {atrasado && (
            <Card tone="danger" href={`/app/imoveis/${atrasado.id}`}>
              <Row start gap={3}><TriangleAlert size={18} color="var(--danger)" aria-hidden /><div><b style={{ fontSize: 14 }}>{atrasado.contrato?.inquilino.nome} · {atrasado.diasAtraso} dias de atraso</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{atrasado.nome} · {reais(atrasado.contrato!.valor)}</p></div></Row>
            </Card>
          )}
        </Panel>
      </Split>

      <Split>
        <Panel label="Recebido por mês">
          <Row between><Title level={2}>Recebido por mês</Title><Chip dropdown>6 meses</Chip></Row>
          <BarChart label="Aluguel recebido nos últimos 6 meses" dados={RESUMO_MES.recebidoPorMes.map((m) => ({ rotulo: m.mes, valor: m.valor }))} />
        </Panel>
        <Panel label="Ações rápidas">
          <Title level={2}>Ações rápidas</Title>
          <Row wrap gap={2}>
            <Button variant="primary" icon={Plus} href="/app/imoveis/novo">Novo imóvel</Button>
            <Button icon={Send} href="/app/imoveis/ap-32-acacias/link">Enviar link ao inquilino</Button>
            <Button href="/app/explorar">Encontrar prestador</Button>
          </Row>
          <Link href="/app/contratos" style={{ fontSize: 14, color: 'var(--brand)', fontWeight: 600 }}>Ver contratos</Link>
        </Panel>
      </Split>
    </Stack>
  )
}
