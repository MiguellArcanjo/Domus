import type { Metadata } from 'next'
import { BadgeCheck, CalendarDays, Camera, Check, ShieldCheck, Star, Wallet, X } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Photo } from '@/components/ui/Photo'
import { PriceList } from '@/components/domain/Prestador'
import { Arch, Faq, Feature, PhoneMock, StepsRow } from '@/components/site/Blocks'
import { Section, SectionHead, siteStyles as s } from '@/components/site/Section'
import { PRESTADORES } from '@/lib/mock'

export const metadata: Metadata = {
  title: 'Para prestadores',
  description: 'Receba pedidos da sua região e só pague quando fechar o serviço. Cadastro e vitrine grátis.',
}

export default function ParaPrestadores() {
  const joao = PRESTADORES[0]
  return (
    <>
      <Section tone="dark" label="Apresentação">
        <div className={s.heroGrid}>
          <div className={s.heroCopy}>
            <SectionHead as="h1" eyebrow="Para prestadores" title="Aqui você só paga quando ganha." lead="Receba pedidos dos imóveis geridos no Domu e de clientes da sua região. Sem pagar por contato. Sem lead que não fecha." />
            <Button href="/entrar?perfil=prestador" variant="light" arrow>Quero receber pedidos</Button>
          </div>
          <div className={s.heroArt}>
            <div className={s.heroArch}><Arch color="#4FD1AC" /></div>
            <div className={s.heroPhone}>
              <PhoneMock>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Avatar iniciais={joao.iniciais} size={56} />
                  <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center', fontSize: 12, fontWeight: 600, padding: '4px 8px', borderRadius: 999, border: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--ink)' }}><Star size={12} /> 4,9 (38)</span>
                </div>
                <b style={{ fontSize: 18, color: 'var(--ink)', display: 'flex', gap: 4, alignItems: 'center' }}>{joao.nome}<BadgeCheck size={16} color="var(--brand)" /></b>
                <span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{joao.oficio} · {joao.bairro}</span>
                <div style={{ color: 'var(--ink)' }}><PriceList itens={joao.precos} max={3} /></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
                  {[1, 2, 3].map((i) => <Photo key={i} legenda="Trabalho" height={70} radius={8} showLabel={false} />)}
                </div>
              </PhoneMock>
            </div>
          </div>
        </div>
      </Section>

      <Section label="A diferença">
        <SectionHead eyebrow="A diferença" title="Você paga pelo serviço fechado, não pelo contato." />
        <div className={s.compare}>
          <div className={s.compareCol} style={{ background: 'var(--surface-muted)' }}>
            <b style={{ fontSize: 18, color: 'var(--ink-muted)' }}>Sites de orçamento</b>
            <ul style={{ display: 'grid', gap: 12 }}>
              {['Paga por cada contato', 'Disputa o cliente com vários prestadores', 'Sem garantia de receber'].map((t) => <li key={t}><X size={18} color="var(--danger)" aria-hidden />{t}</li>)}
            </ul>
          </div>
          <div className={s.compareCol} style={{ background: 'var(--surface)', border: '2px solid var(--brand)' }}>
            <b style={{ fontSize: 18, color: 'var(--brand)' }}>Domu</b>
            <ul style={{ display: 'grid', gap: 12 }}>
              {['Taxa de 8% a 10% só no serviço fechado', 'Pedidos de imóveis que já têm demanda todo mês', 'Pagamento garantido pelo app'].map((t) => <li key={t}><Check size={18} color="var(--brand)" aria-hidden />{t}</li>)}
            </ul>
          </div>
        </div>
        <div className={s.cols4}>
          <Feature icon={Wallet} titulo="Seus preços" texto="Defina o preço de cada serviço do catálogo, fixo ou “a partir de”." />
          <Feature icon={Camera} titulo="Vitrine de trabalhos" texto="Poste antes e depois. Trabalho pago pelo app ganha o selo verificado." />
          <Feature icon={CalendarDays} titulo="Agenda" texto="Aceite, agende e avise o cliente sem trocar mensagem." />
          <Feature icon={ShieldCheck} titulo="Pagamento garantido" texto="O cliente paga antes. Você recebe após a confirmação, com saque por Pix." />
        </div>
      </Section>

      <Section tone="surface" label="Como entrar">
        <SectionHead title="Como entrar" />
        <StepsRow passos={[
          ['Cadastre-se', 'Nome, foto, documento, categorias e raio de atendimento.'],
          ['Monte seus preços', 'Escolha os serviços do catálogo e o seu preço.'],
          ['Poste 3 trabalhos', 'Fotos de serviços antigos já mostram quem você é.'],
          ['Receba pedidos', 'No app, com aviso por e-mail e no celular.'],
        ]} />
      </Section>

      <Section label="Destaque">
        <div className={`${s.band} ${s.bandJade}`}>
          <SectionHead eyebrow="Destaque" title="Apareça primeiro na sua região." lead="Com o destaque, seu perfil e seus posts aparecem no topo da busca e da vitrine do seu bairro." />
          <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>
            <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em' }}>R$ 39<span style={{ fontSize: 18, fontWeight: 500 }}>/mês</span></div>
            <p style={{ color: '#D5EAE2' }}>Opcional. Cancele quando quiser.</p>
            <Button href="/entrar?perfil=prestador" variant="accent">Quero o destaque</Button>
          </div>
        </div>
      </Section>

      <Section label="Perguntas frequentes">
        <div className={s.twoCol}>
          <SectionHead title="Perguntas frequentes" />
          <Faq itens={[
            ['Quanto custa entrar?', 'Nada. Cadastro, perfil e vitrine são grátis.'],
            ['Quando recebo?', 'Depois que o cliente confirma o serviço, ou em alguns dias sem contestação. O saque é por Pix.'],
            ['Posso passar meu telefone ao cliente?', 'A conversa fica no app. Assim o pagamento, a garantia e a sua nota ficam protegidos.'],
          ]} />
        </div>
      </Section>
    </>
  )
}
