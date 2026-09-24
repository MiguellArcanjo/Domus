import Link from 'next/link'
import { BadgeCheck, KeyRound, Lock, MessageCircle, Navigation, ShieldCheck, Wallet, Wrench } from 'lucide-react'
import { Badge, Selo } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Meta } from '@/components/ui/Meta'
import { Photo } from '@/components/ui/Photo'
import { TrustBadge } from '@/components/domain/Trust'
import { Arch, AudienceCard, Feature, PhoneMock, PriceCard, StepsRow } from '@/components/site/Blocks'
import { Section, SectionHead, siteStyles as s } from '@/components/site/Section'
import { MapaDemo } from '@/components/site/MapaDemo'
import { reais } from '@/lib/format'
import { CIDADE, POSTS, prestador } from '@/lib/mock'

export default function Home() {
  return (
    <>
      <Section label="Apresentação">
        <div className={s.heroGrid}>
          <div className={s.heroCopy}>
            <TrustBadge>Prestadores verificados em {CIDADE}</TrustBadge>
            <h1 className={s.hero}>Aluguel em dia.<br />Casa em ordem.</h1>
            <p className={s.lead}>O Domu organiza seus aluguéis e resolve a manutenção dos seus imóveis com prestadores da região, com preço antes de contratar e pagamento protegido.</p>
            <div className={s.ctaRow}>
              <Button href="/para-corretores" variant="dark" arrow>Sou corretor ou proprietário</Button>
              <Button href="/servicos/encanador/sao-paulo" size="lg">Preciso de um serviço</Button>
            </div>
            <Link href="/para-prestadores" style={{ color: 'var(--brand)', fontWeight: 600 }}>Sou prestador de serviço →</Link>
          </div>
          <div className={s.heroArt}>
            <div className={s.heroArch}><Arch /></div>
            <div className={s.heroPhone}>
              <PhoneMock>
                <b style={{ fontSize: 15 }}>Serviços em {CIDADE}</b>
                <div style={{ display: 'flex', gap: 6 }}><Badge>Categoria</Badge><Badge tone="success">Verificados</Badge></div>
                <Photo legenda="Antes e depois do serviço" height={150}><span style={{ position: 'absolute', top: 8, right: 8 }}><Selo /></span></Photo>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><b style={{ fontSize: 14 }}>Troca de sifão</b><b style={{ fontSize: 14 }}>R$ 120</b></div>
                <Meta icon={Navigation}>João Batista · 1,2 km</Meta>
                <Photo legenda="Quarto pintado" height={120}><span style={{ position: 'absolute', top: 8, right: 8 }}><Badge tone="accent">Destaque</Badge></span></Photo>
              </PhoneMock>
            </div>
          </div>
        </div>
      </Section>

      <Section label="Para quem é">
        <SectionHead eyebrow="Para quem é" title="Um lugar para quem aluga, mora e conserta." />
        <div className={s.cols3}>
          <AudienceCard icon={KeyRound} tone="brand" titulo="Corretor e proprietário" texto="Imóveis, contratos, cobrança e repasse num painel. Chamados de manutenção resolvidos em poucos toques." cta="Conhecer o painel" href="/para-corretores" />
          <AudienceCard icon={MessageCircle} titulo="Inquilino" texto="Algo quebrou? Abra o chamado com foto pelo link do contrato. Sem baixar nada e sem senha." cta="Ver como funciona" href="/#como-funciona" />
          <AudienceCard icon={Wrench} tone="accent" titulo="Prestador" texto="Receba pedidos dos imóveis da região e mostre seus trabalhos. Você só paga quando fecha o serviço." cta="Quero receber pedidos" href="/para-prestadores" />
        </div>
      </Section>

      <Section tone="surface" id="como-funciona" label="Como funciona">
        <SectionHead eyebrow="Como funciona" title="Do vazamento às 23h ao serviço pago, sem planilha e sem troca de mensagens." />
        <StepsRow passos={[
          ['O inquilino abre o chamado', 'Pelo link do contrato, com foto e texto.'],
          ['A IA faz a triagem', 'Categoria e urgência, com 3 prestadores próximos e o preço de cada um.'],
          ['Você aprova em um toque', 'O prestador aceita, agenda e avisa o inquilino.'],
          ['Pagamento protegido', 'O valor só é liberado depois da confirmação, e o custo entra no repasse.'],
        ]} />
      </Section>

      <Section label="Vitrine">
        <div className={s.heroGrid} style={{ alignItems: 'start' }}>
          <div className={s.heroCopy}>
            <SectionHead eyebrow="Vitrine" title="Veja o trabalho antes de contratar." lead="Fotos reais de serviços feitos na sua região. O selo Serviço verificado aparece só em trabalhos pagos pelo Domu, e as avaliações vêm só de quem contratou." />
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><Selo /><Selo tipo="prestador" /></div>
            <Button href="/servicos/encanador/sao-paulo" variant="dark" arrow>Explorar a vitrine</Button>
          </div>
          <div className={s.gallery}>
            {POSTS.map((p) => (
              <Link key={p.id} href={`/post/${p.id}`} className={s.galleryItem}>
                <div className={s.galleryMedia}>
                  <Photo legenda={p.fotoLegenda} height={190} />
                  <span>{p.destaque ? <Badge tone="accent">Destaque</Badge> : p.verificado ? <Selo /> : null}</span>
                </div>
                <b>{p.titulo} · {reais(p.preco)}</b>
                <Meta icon={Navigation}>{prestador(p.prestadorSlug)?.nome.split(' ')[0]} · {p.bairro}</Meta>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section label="Mapa">
        <div className={`${s.band} ${s.bandJade}`}>
          <div style={{ display: 'grid', gap: 20, justifyItems: 'start' }}>
            <SectionHead eyebrow="Mapa" title="Quem está perto, quanto custa e quando pode ir." lead="Busque “troca de chuveiro” e veja no mapa os prestadores da região com preço, nota e disponibilidade para hoje." />
            <Button href="/servicos/encanador/sao-paulo" variant="light" arrow>Buscar um serviço</Button>
          </div>
          <MapaDemo />
        </div>
      </Section>

      <Section id="confianca" label="Confiança">
        <SectionHead eyebrow="Confiança" title="Feito para não dar dor de cabeça." />
        <div className={s.cols4}>
          <Feature icon={ShieldCheck} titulo="Pagamento protegido" texto="O dinheiro fica guardado até você confirmar o serviço. Se algo der errado, abra uma contestação com fotos." />
          <Feature icon={BadgeCheck} titulo="Prestador verificado" texto="Checamos documento e antecedentes antes de dar o selo." />
          <Feature icon={Wallet} titulo="Preço antes de contratar" texto="Cada prestador publica o preço de cada serviço do catálogo." />
          <Feature icon={Lock} titulo="Privacidade" texto="Na vitrine aparece só o bairro. Rostos, placas e números de casa são ocultados." />
        </div>
      </Section>

      <Section label="Preços">
        <SectionHead eyebrow="Preços" title="Você só paga quando o Domu trabalha para você." />
        <div className={s.cols3}>
          <PriceCard titulo="Corretor e proprietário" valor="Grátis" texto="até 2 imóveis. Depois, R$ 15 por imóvel ou R$ 99 por mês até 15 imóveis." cta="Começar grátis" href="/entrar" destaque />
          <PriceCard titulo="Prestador" valor="8% a 10%" texto="só sobre o serviço fechado pelo app. Cadastro e vitrine grátis." cta="Quero receber pedidos" href="/para-prestadores" />
          <PriceCard titulo="Inquilino e cliente" valor="Grátis" texto="para abrir chamados e buscar prestadores. Você paga só o serviço." cta="Buscar um serviço" href="/servicos/encanador/sao-paulo" />
        </div>
      </Section>

      <Section label="Comece agora">
        <div className={`${s.band} ${s.bandTrena}`}>
          <div style={{ display: 'grid', gap: 10 }}>
            <h2 className={s.big}>Seus imóveis em ordem a partir de hoje.</h2>
            <p className={s.lead}>Grátis até 2 imóveis. Sem cartão.</p>
          </div>
          <Button href="/entrar" variant="dark" size="lg">Começar grátis</Button>
        </div>
      </Section>
    </>
  )
}
