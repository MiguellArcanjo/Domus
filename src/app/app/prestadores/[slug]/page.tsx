import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Avatar } from '@/components/ui/Avatar'
import { Selo } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Photo } from '@/components/ui/Photo'
import { Row, Stack } from '@/components/ui/Stack'
import { TabPanels } from '@/components/ui/Tabs'
import { Depoimento, Disponibilidade, NomeVerificado, PriceList, RatingPill } from '@/components/domain/Prestador'
import { ShareButton } from '@/components/domain/ShareButton'
import { FollowButton, SaveButton } from '@/components/domain/SaveButton'
import { BackBar, StickyActions } from '@/components/layout/PageHeader'
import { POSTS, PRESTADORES, prestador } from '@/lib/mock'
import { Avaliacoes } from '@/components/domain/Avaliacoes'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return PRESTADORES.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: prestador((await params).slug)?.nome ?? 'Prestador' }
}

/** Perfil do prestador (referência Property Finder): nota em pílula, nome verificado, depoimento, preços e portfólio. */
export default async function PerfilPrestador({ params }: Props) {
  const p = prestador((await params).slug)
  if (!p) notFound()
  const posts = POSTS.filter((po) => po.prestadorSlug === p.slug)
  return (
    <Stack gap={4} style={{ maxWidth: 720 }}>
      <BackBar title="Perfil" back="/app/explorar" />
      <Row between start><Avatar iniciais={p.iniciais} size={72} /><Row gap={2}><RatingPill p={p} /><SaveButton id={p.slug} tipo="prestadores" label={p.nome} /></Row></Row>
      <div style={{ display: 'grid', gap: 6 }}>
        <h2><NomeVerificado p={p} size={24} /></h2>
        <p style={{ color: 'var(--ink-muted)' }}>{p.oficio} · {p.bairro} · atende até {p.raioKm} km</p>
        <Row wrap gap={2}><Disponibilidade p={p} />{p.verificado && <Selo tipo="prestador" />}<FollowButton slug={p.slug} nome={p.nome.split(' ')[0]} /></Row>
      </div>
      <Depoimento p={p} />
      <TabPanels label="Seções do perfil" tabs={['Preços', 'Portfólio', 'Avaliações']}>
        {[
          <PriceList key="precos" itens={p.precos} />,
          <div key="portfolio" style={{ display: 'grid', gap: 6, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
            {posts.map((po) => <Link key={po.id} href={`/app/post/${po.id}`}><Photo legenda={po.fotoLegenda} height={110} radius={10} /></Link>)}
          </div>,
          <Avaliacoes key="avaliacoes" p={p} />,
        ]}
      </TabPanels>
      <ShareButton titulo={`${p.nome} no Domu`} label="Compartilhar perfil" />
      <StickyActions>
        <Button href={`/app/mensagens/${p.slug}`}>Conversar</Button>
        <Button variant="primary" href={`/app/contratar/${p.slug}`}>Pedir orçamento</Button>
      </StickyActions>
    </Stack>
  )
}
