import type { Metadata } from 'next'
import { Bell, ClipboardList, Droplet, FileText, House, MessageCircle, Sparkles, Wallet } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { KpiCard } from '@/components/domain/Kpi'
import { Faq, Feature, PriceCard, StepsRow } from '@/components/site/Blocks'
import { Section, SectionHead, siteStyles as s } from '@/components/site/Section'
import { RESUMO_MES } from '@/lib/mock'

export const metadata: Metadata = {
  title: 'Para corretores e proprietários',
  description: 'Imóveis, contratos, cobrança, repasse e manutenção num painel só. Grátis até 2 imóveis.',
}

export default function ParaCorretores() {
  return (
    <>
      <Section label="Apresentação">
        <div className={s.heroGrid}>
          <div className={s.heroCopy}>
            <SectionHead as="h1" eyebrow="Para corretores e proprietários" title="Saia da planilha. Seus aluguéis num painel só." lead="Imóveis, contratos, cobrança, repasse e manutenção, feito para quem cuida de 1 a 30 imóveis." />
            <div className={s.ctaRow}>
              <Button href="/entrar" variant="dark" arrow>Começar grátis</Button>
              <Button href="/app/painel" size="lg">Ver o painel</Button>
            </div>
            <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>Grátis até 2 imóveis. Sem cartão.</p>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 24, padding: 20, display: 'grid', gap: 12, boxShadow: 'var(--shadow-2)' }} aria-hidden>
            <KpiCard mes={RESUMO_MES.mes} valor={RESUMO_MES.aReceber} pagos={RESUMO_MES.pagos} total={RESUMO_MES.total} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, border: '1px solid var(--line)', borderRadius: 14 }}>
              <Droplet size={18} color="var(--brand)" /><b style={{ flexGrow: 1, fontSize: 14 }}>Vazamento sob a pia · Ap 32</b><Badge tone="danger">Urgente</Badge>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, borderRadius: 14, background: 'var(--warning-bg)' }}>
              <FileText size={18} color="var(--warning)" /><b style={{ fontSize: 14 }}>Contrato do Ap 21 vence em 30 dias</b>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="surface" label="Funções">
        <SectionHead title="Tudo que hoje está espalhado em planilha e mensagens." />
        <div className={s.cols3}>
          <Feature icon={House} titulo="Painel do mês" texto="Ocupados, vagos, a receber, inadimplentes e chamados abertos, logo ao entrar." />
          <Feature icon={MessageCircle} titulo="Link do inquilino" texto="Um link por contrato, enviado por e-mail. O inquilino abre chamado com foto, sem baixar nada." />
          <Feature icon={Sparkles} titulo="Triagem por IA" texto="Cada chamado chega classificado por categoria e urgência, com 3 prestadores próximos." />
          <Feature icon={ClipboardList} titulo="Histórico do imóvel" texto="O que quebrou, quem consertou, quanto custou e a garantia." />
          <Feature icon={Bell} titulo="Alertas de contrato" texto="Aviso 60 e 30 dias antes do vencimento e do reajuste." />
          <Feature icon={Wallet} titulo="Cobrança e repasse" texto="Pix e boleto com régua de atraso, e o extrato de cada proprietário." />
        </div>
      </Section>

      <Section label="Como começar">
        <SectionHead eyebrow="Em 10 minutos" title="Comece com o que você já tem." />
        <StepsRow passos={[
          ['Cadastre os imóveis', 'Endereço, proprietário e fotos.'],
          ['Adicione os contratos', 'Início, fim, valor, vencimento e índice.'],
          ['Envie o link', 'O inquilino recebe por e-mail e passa a abrir chamados por ali.'],
          ['Resolva os chamados', 'Aprove o prestador e o preço em um toque.'],
        ]} />
      </Section>

      <Section id="planos" label="Planos">
        <SectionHead eyebrow="Planos" title="Pague pelo tamanho da sua carteira." />
        <div className={s.cols3}>
          <PriceCard titulo="Começo" valor="Grátis" texto="Até 2 imóveis." itens={['Painel e contratos', 'Link do inquilino', 'Chamados com triagem']} cta="Começar grátis" href="/entrar" />
          <PriceCard titulo="Por imóvel" valor="R$ 15" unidade=" /imóvel/mês" texto="Para quem tem de 3 a 6 imóveis." itens={['Tudo do Começo', 'Alertas de contrato', 'Documentos']} cta="Escolher Por imóvel" href="/entrar?plano=por-imovel" />
          <PriceCard titulo="Carteira" valor="R$ 99" unidade=" /mês" texto="Até 15 imóveis. A melhor escolha a partir de 7." itens={['Tudo do Por imóvel', 'Cobrança Pix e repasse', 'Reajuste automático']} cta="Escolher Carteira" href="/entrar?plano=carteira" destaque />
        </div>
      </Section>

      <Section label="Perguntas frequentes">
        <div className={s.twoCol}>
          <SectionHead eyebrow="Dúvidas" title="Perguntas frequentes" />
          <Faq itens={[
            ['O inquilino precisa baixar o app?', 'Não. Ele recebe um link por e-mail e abre os chamados pelo navegador.'],
            ['Posso usar meus próprios prestadores?', 'Pode. Cadastre quem você já conhece ou escolha entre os verificados da região.'],
            ['Como o custo do conserto chega ao proprietário?', 'O valor pago entra no histórico do imóvel e é descontado no repasse, com extrato.'],
            ['Meus dados ficam seguros?', 'Documentos são criptografados e cada pessoa só vê o que o perfil dela permite, conforme a LGPD.'],
          ]} />
        </div>
      </Section>
    </>
  )
}
