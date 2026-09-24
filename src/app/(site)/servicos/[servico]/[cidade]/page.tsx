import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Chip, ChipRow } from '@/components/ui/Chip'
import { Eyebrow } from '@/components/ui/Meta'
import { BuscaPublicaLista } from '@/components/site/BuscaPublicaLista'
import { MapaBusca } from '@/components/site/MapaBusca'
import { Section, siteStyles as s } from '@/components/site/Section'
import { CATEGORIAS, CATEGORIA_IDS, categoriaPorSlug } from '@/lib/categorias'
import { preco } from '@/lib/format'
import { CIDADE, PRESTADORES } from '@/lib/mock'

type Props = { params: Promise<{ servico: string; cidade: string }> }

export function generateStaticParams() {
  return CATEGORIA_IDS.map((id) => ({ servico: CATEGORIAS[id].slug, cidade: 'sao-paulo' }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { servico } = await params
  const cat = categoriaPorSlug(servico)
  return { title: cat ? `${CATEGORIAS[cat].oficio} em ${CIDADE}` : 'Serviços', description: `Prestadores verificados perto de você, com preço antes de contratar e pagamento protegido.` }
}

/** Busca pública (SEO): lista à esquerda, mapa à direita, preço médio da cidade. */
export default async function BuscaPublica({ params }: Props) {
  const { servico } = await params
  const cat = categoriaPorSlug(servico)
  if (!cat) notFound()
  const lista = PRESTADORES.filter((p) => p.categoria === cat)
  const itens = lista.flatMap((p) => p.precos)
  return (
    <Section label="Resultados">
      <div className={s.heroGrid} style={{ alignItems: 'start', gridTemplateColumns: undefined }}>
        <div style={{ display: 'grid', gap: 16 }}>
          <nav aria-label="Trilha" style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
            <Link href="/">Domu</Link> / Serviços / {CATEGORIAS[cat].rotulo} / <b style={{ color: 'var(--ink)' }}>{CATEGORIAS[cat].oficio} em {CIDADE}</b>
          </nav>
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 44px)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>{CATEGORIAS[cat].oficio} em {CIDADE}</h1>
          <p style={{ color: 'var(--ink-muted)', fontSize: 16 }}>Prestadores verificados perto de você, com preço antes de contratar e pagamento protegido.</p>
          <BuscaPublicaLista categoria={cat} />
          {itens.length > 0 && (
            <>
              <Eyebrow as="h2">Preços em {CIDADE}</Eyebrow>
              <ul style={{ borderTop: '1px solid var(--line)' }}>
                {itens.map((i, n) => (
                  <li key={`${i.servico}-${n}`} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line)', fontSize: 14 }}>
                    <span>{i.servico}</span><b className="tabular">{preco(i.preco, i.aPartirDe)}</b>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <MapaBusca slugs={lista.map((p) => p.slug)} />
      </div>
      <div style={{ display: 'grid', gap: 14 }}>
        <h2 style={{ fontSize: 22 }}>Outros serviços em {CIDADE}</h2>
        <ChipRow wrap label="Outros serviços">
          {CATEGORIA_IDS.filter((id) => id !== cat).map((id) => <Chip key={id} icon={CATEGORIAS[id].icone} href={`/servicos/${CATEGORIAS[id].slug}/sao-paulo`}>{CATEGORIAS[id].oficio}</Chip>)}
        </ChipRow>
      </div>
    </Section>
  )
}
