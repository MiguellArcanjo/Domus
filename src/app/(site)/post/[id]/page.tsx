import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CalendarDays } from 'lucide-react'
import { Selo } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Meta } from '@/components/ui/Meta'
import { Photo } from '@/components/ui/Photo'
import { PrestadorCard } from '@/components/domain/Prestador'
import { ShareButton } from '@/components/domain/ShareButton'
import { Section, siteStyles as s } from '@/components/site/Section'
import { reais } from '@/lib/format'
import { POSTS, post, prestador } from '@/lib/mock'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return POSTS.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const po = post((await params).id)
  return { title: po?.titulo ?? 'Post', description: po?.descricao, openGraph: { title: po?.titulo, description: po?.descricao } }
}

/** Post público com prévia para redes sociais (V-08). */
export default async function PostPublico({ params }: Props) {
  const po = post((await params).id)
  if (!po) notFound()
  const p = prestador(po.prestadorSlug)!
  return (
    <Section label="Post">
      <div className={s.heroGrid} style={{ alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: 16 }}>
          <Photo legenda={po.fotoLegenda} height={420}>{po.verificado && <span style={{ position: 'absolute', left: 16, bottom: 16 }}><Selo /></span>}</Photo>
          <h1 style={{ fontSize: 32, letterSpacing: '-0.03em' }}>{po.titulo}</h1>
          <Meta icon={CalendarDays}>Feito em {po.feitoEm} · {po.bairro}</Meta>
          <p style={{ fontSize: 17 }}>{po.descricao}</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <b style={{ fontSize: 24 }} className="tabular">{reais(po.preco)}</b>
            <Button variant="primary" href={`/baixar?prestador=${p.slug}`}>Quero um serviço assim</Button>
            <ShareButton titulo={po.titulo} />
          </div>
        </div>
        <PrestadorCard p={p} href={`/p/${p.slug}`} ctaHref={`/baixar?prestador=${p.slug}`} />
      </div>
    </Section>
  )
}
