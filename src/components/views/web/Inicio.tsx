'use client'

import { BadgeCheck, CalendarDays, ChevronRight, CreditCard, FileBarChart, MapPin, Sparkles, Store, TriangleAlert, Wallet } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Badge, StatusBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/Controls'
import { Row, Stack } from '@/components/ui/Stack'
import { Title } from '@/components/ui/Text'
import { KpiCard, StatCard } from '@/components/domain/Kpi'
import { BaixarApp } from '@/components/layout/BaixarApp'
import { usePerfil } from '@/components/layout/PerfilProvider'
import { reais, nota } from '@/lib/format'
import { ASSINATURA, CARTEIRA, EU_PRESTADOR, IMOVEIS, PEDIDOS_CLIENTE, RESUMO_MES, USUARIO, prestador } from '@/lib/mock'
import { useLocal } from '@/lib/store'

const NOME_PLANO = { gratis: 'Começo', por_imovel: 'Por imóvel', carteira: 'Carteira' }

function Cabecalho({ nome, iniciais, texto }: { nome: string; iniciais: string; texto: string }) {
  return (
    <Row gap={3}>
      <Avatar iniciais={iniciais} size={44} />
      <div><span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{texto}</span><Title level={1}>Olá, {nome}</Title></div>
    </Row>
  )
}

function Atalho({ href, icone: Icone, titulo, detalhe }: { href: string; icone: typeof Wallet; titulo: string; detalhe: string }) {
  return (
    <Card href={href}>
      <Row gap={3}>
        <span style={{ display: 'grid', placeItems: 'center', width: 40, height: 40, borderRadius: 12, background: 'var(--brand-soft)', color: 'var(--brand)', flexShrink: 0 }}><Icone size={18} aria-hidden /></span>
        <div style={{ flexGrow: 1 }}><b>{titulo}</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{detalhe}</p></div>
        <ChevronRight size={18} color="var(--ink-muted)" aria-hidden />
      </Row>
    </Card>
  )
}

/** Início do corretor no site: resumo do mês (só leitura), assinatura e relatórios. */
function Corretor() {
  const atrasados = IMOVEIS.filter((i) => i.situacao === 'atrasado')
  return (
    <Stack gap={5}>
      <Cabecalho nome={USUARIO.primeiroNome} iniciais={USUARIO.iniciais} texto={`Resumo de ${RESUMO_MES.mes}`} />
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
        <div style={{ gridColumn: '1 / -1' }}><KpiCard mes={RESUMO_MES.mes} valor={RESUMO_MES.aReceber} pagos={RESUMO_MES.pagos} total={RESUMO_MES.total} emAtraso={RESUMO_MES.emAtraso} /></div>
        <StatCard label="Ocupados" valor={String(RESUMO_MES.ocupados)} detalhe={`de ${RESUMO_MES.imoveis}`} href="/app/financeiro" />
        <StatCard label="Vagos" valor={String(RESUMO_MES.vagos)} href="/app/financeiro" />
        <StatCard label="Atrasados" valor={String(RESUMO_MES.atrasados)} detalhe={reais(RESUMO_MES.emAtraso)} href="/app/financeiro" tone="danger" />
      </div>
      {atrasados.map((i) => (
        <Card key={i.id} tone="danger"><Row start gap={3}><TriangleAlert size={18} color="var(--danger)" aria-hidden /><div><b style={{ fontSize: 14 }}>{i.contrato?.inquilino.nome} · {i.diasAtraso} dias de atraso</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{i.nome} · {reais(i.contrato!.valor)}. O aviso automático já foi enviado.</p></div></Row></Card>
      ))}
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <Card href="/app/assinatura">
          <Row between><b>Plano {NOME_PLANO[ASSINATURA.plano]}</b><Badge tone="success">Ativo</Badge></Row>
          <p style={{ fontSize: 14 }}>{ASSINATURA.imoveisUsados} de {ASSINATURA.limite} imóveis</p>
          <div style={{ background: 'var(--surface-muted)', borderRadius: 3 }}><ProgressBar valor={ASSINATURA.imoveisUsados / ASSINATURA.limite} label="Imóveis usados" /></div>
          <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>Próxima cobrança em {ASSINATURA.proximaCobranca}: {reais(ASSINATURA.valor)}</p>
        </Card>
        <Stack gap={3}>
          <Atalho href="/app/financeiro" icone={FileBarChart} titulo="Relatórios" detalhe="Cobranças, repasses e régua de avisos" />
          <Atalho href="/app/assinatura" icone={CreditCard} titulo="Assinatura e faturas" detalhe="Plano, cartão e notas" />
        </Stack>
      </div>
      <BaixarApp perfil="corretor" />
    </Stack>
  )
}

/** Início do prestador no site: ganhos, destaque e perfil. */
function Prestador() {
  const p = prestador(EU_PRESTADOR)!
  const [destaque] = useLocal('destaqueAtivo', false)
  return (
    <Stack gap={5}>
      <Cabecalho nome={p.nome.split(' ')[0]} iniciais={p.iniciais} texto={p.oficio} />
      <section aria-label="Saldo" style={{ background: 'var(--tinta)', color: '#fff', borderRadius: 18, padding: 18, display: 'grid', gap: 8 }}>
        <span style={{ fontSize: 13, color: '#C9D3CE' }}>Saldo disponível</span>
        <b style={{ fontSize: 32, letterSpacing: '-0.02em' }} className="tabular">{reais(CARTEIRA.disponivel, true)}</b>
        <Row between wrap><span style={{ fontSize: 13, color: '#C9D3CE' }}>Recebido no mês: {reais(CARTEIRA.mes)}</span><Button size="sm" variant="primary" href="/app/carteira">Ver carteira</Button></Row>
      </section>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        <Card href="/app/destaque" tone={destaque ? 'soft' : 'default'}>
          <Row between><Row gap={2}><Sparkles size={18} color="var(--brand)" aria-hidden /><b>Destaque na região</b></Row>{destaque ? <Badge tone="success">Ativo</Badge> : <Badge>Desligado</Badge>}</Row>
          <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>{destaque ? 'Seu card aparece primeiro no seu bairro.' : 'Apareça primeiro na busca e no mapa do seu bairro.'}</p>
        </Card>
        <Card href={`/p/${p.slug}`}>
          <Row gap={2}><BadgeCheck size={18} color="var(--brand)" aria-hidden /><b>{p.verificado ? 'Perfil verificado' : 'Verificação pendente'}</b></Row>
          <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>Nota {nota(p.nota)} · {p.avaliacoes} avaliações · {p.servicosPeloApp} serviços</p>
        </Card>
      </div>
      <Stack gap={3}>
        <Atalho href="/app/meu-perfil" icone={Store} titulo="Perfil público" detalhe="Foto, apresentação, bairro e raio" />
        <Atalho href="/app/carteira/recebimento" icone={Wallet} titulo="Dados de recebimento" detalhe="Chave Pix para os saques" />
      </Stack>
      <BaixarApp perfil="prestador" />
    </Stack>
  )
}

/** Início do cliente no site: pedidos e endereços. */
function Cliente() {
  const ativos = PEDIDOS_CLIENTE.filter((p) => !['concluido', 'pago', 'avaliado', 'cancelado'].includes(p.estado))
  return (
    <Stack gap={5}>
      <Cabecalho nome={USUARIO.primeiroNome} iniciais={USUARIO.iniciais} texto="Sua conta Domu" />
      {ativos.length ? (
        <Stack gap={3}>
          <Title level={2}>Em andamento</Title>
          {ativos.map((p) => {
            const pr = prestador(p.prestadorSlug)
            return (
              <Card key={p.id} href={`/app/meus-pedidos/${p.id}`}>
                <Row between><div><b>{p.servico}</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}><CalendarDays size={13} aria-hidden style={{ verticalAlign: -2 }} /> {p.quando} · {pr?.nome}</p></div><StatusBadge estado={p.estado} /></Row>
              </Card>
            )
          })}
        </Stack>
      ) : null}
      <Stack gap={3}>
        <Atalho href="/app/meus-pedidos" icone={FileBarChart} titulo="Pedidos e recibos" detalhe="Histórico dos serviços contratados" />
        <Atalho href="/app/enderecos" icone={MapPin} titulo="Endereços" detalhe="Onde os serviços são feitos" />
      </Stack>
      <BaixarApp perfil="cliente" />
    </Stack>
  )
}

export function Inicio() {
  const { perfil } = usePerfil()
  return <div style={{ maxWidth: 880 }}>{perfil === 'corretor' ? <Corretor /> : perfil === 'prestador' ? <Prestador /> : <Cliente />}</div>
}
