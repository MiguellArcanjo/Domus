import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ShieldCheck } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Selo } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Photo } from '@/components/ui/Photo'
import { Depoimento, Disponibilidade, NomeVerificado, PriceList, RatingPill } from '@/components/domain/Prestador'
import { ShareButton } from '@/components/domain/ShareButton'
import { Section, siteStyles as s } from '@/components/site/Section'
import { POSTS, PRESTADORES, prestador } from '@/lib/mock'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return PRESTADORES.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = prestador((await params).slug)
  return { title: p ? `${p.nome}, ${p.oficio.toLowerCase()} em ${p.bairro}` : 'Prestador' }
}

/** Perfil público do prestador: portfólio à esquerda e preços fixos à direita. */
export default async function PerfilPublico({ params }: Props) {
  const p = prestador((await params).slug)
  if (!p) notFound()
  const posts = POSTS.filter((po) => po.prestadorSlug === p.slug)
  return (
    <Section label="Perfil do prestador">
      <div className={s.heroGrid} style={{ alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: 20 }}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
            <Avatar iniciais={p.iniciais} size={96} />
            <div style={{ display: 'grid', gap: 8 }}>
              <h1><NomeVerificado p={p} size={36} /></h1>
              <p style={{ color: 'var(--ink-muted)', fontSize: 16 }}>{p.oficio} · {p.bairro} · atende até {p.raioKm} km</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{p.verificado && <Selo tipo="prestador" />}<Disponibilidade p={p} /><RatingPill p={p} /></div>
            </div>
          </div>
          <Depoimento p={p} />
          <h2 style={{ fontSize: 22 }}>Portfólio</h2>
          <div className={s.gallery}>
            {posts.map((po) => (
              <Link key={po.id} href={`/post/${po.id}`} className={s.galleryItem}>
                <div className={s.galleryMedia}><Photo legenda={po.fotoLegenda} height={200} />{po.verificado && <span><Selo /></span>}</div>
                <b>{po.titulo}</b>
              </Link>
            ))}
          </div>
        </div>
        <aside style={{ position: 'sticky', top: 90, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 24, padding: 24, display: 'grid', gap: 14, boxShadow: 'var(--shadow-2)' }}>
          <h2 style={{ fontSize: 22 }}>Preços</h2>
          <PriceList itens={p.precos} />
          <p style={{ display: 'flex', gap: 8, fontSize: 13 }}><ShieldCheck size={20} color="var(--brand)" aria-hidden style={{ flexShrink: 0 }} />Pagamento protegido: o valor só vai para {p.nome.split(' ')[0]} depois que você confirmar.</p>
          <Button variant="primary" block href={`/entrar?proximo=/app/contratar/${p.slug}`}>Pedir orçamento</Button>
          <ShareButton titulo={`${p.nome} no Domu`} />
        </aside>
      </div>
    </Section>
  )
}
