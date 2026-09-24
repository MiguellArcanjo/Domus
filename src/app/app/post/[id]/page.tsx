import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Badge, Selo } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Meta } from '@/components/ui/Meta'
import { Photo } from '@/components/ui/Photo'
import { Row, Stack } from '@/components/ui/Stack'
import { NomeVerificado, Rating } from '@/components/domain/Prestador'
import { SaveButton } from '@/components/domain/SaveButton'
import { ShareButton } from '@/components/domain/ShareButton'
import { SocialProof } from '@/components/domain/Trust'
import { StickyActions } from '@/components/layout/PageHeader'
import { CATEGORIAS } from '@/lib/categorias'
import { reais } from '@/lib/format'
import { POSTS, post, prestador } from '@/lib/mock'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return POSTS.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: post((await params).id)?.titulo ?? 'Post' }
}

/** Detalhe do post da vitrine (referência Event Discovery): foto, prova social e "Quero um serviço assim" (V-06). */
export default async function PostApp({ params }: Props) {
  const po = post((await params).id)
  if (!po) notFound()
  const p = prestador(po.prestadorSlug)!
  return (
    <Stack gap={4} style={{ maxWidth: 720 }}>
      <Photo legenda={`${po.fotoLegenda} (arraste para ver mais)`} height={320}>
        <span style={{ position: 'absolute', top: 12, left: 12 }}><IconButton icon={ChevronLeft} label="Voltar" href="/app/explorar" /></span>
        <span style={{ position: 'absolute', top: 12, right: 12 }}><SaveButton id={po.id} tipo="posts" label={po.titulo} /></span>
        {po.verificado && <span style={{ position: 'absolute', bottom: 12, left: 12 }}><Selo /></span>}
      </Photo>
      <h1 style={{ fontSize: 24, lineHeight: 1.2 }}>{po.titulo}</h1>
      <Meta icon={CalendarDays}>Feito em {po.feitoEm} · {po.bairro}</Meta>
      <Link href={`/app/prestadores/${p.slug}`} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 12, borderRadius: 14, border: '1px solid var(--line)', background: 'var(--surface)' }}>
        <Avatar iniciais={p.iniciais} size={44} />
        <span style={{ display: 'grid', flexGrow: 1 }}><NomeVerificado p={p} size={15} /><Rating p={p} /></span>
        <ChevronRight size={20} color="var(--ink-muted)" aria-hidden />
      </Link>
      <SocialProof><b>{po.curtidas} vizinhos</b> curtiram · {p.disponibilidade === 'hoje' ? '2 horários livres hoje' : p.proximoHorario}</SocialProof>
      <p style={{ fontSize: 15 }}>{po.descricao}</p>
      <Row wrap gap={2}><Badge icon={CATEGORIAS[po.categoria].icone}>{CATEGORIAS[po.categoria].rotulo}</Badge>{po.verificado && <Badge tone="success">Garantia de 90 dias</Badge>}</Row>
      <Row wrap gap={2}><ShareButton titulo={po.titulo} /><Button variant="ghost" href={`/app/post/${po.id}/comentarios`}>Ver {po.comentarios} comentários</Button><Button variant="ghost" href={`/app/post/${po.id}/denunciar`}>Denunciar</Button></Row>
      <StickyActions info={{ label: 'Preço do serviço', valor: reais(po.preco) }}>
        <Button variant="primary" href={`/app/contratar/${p.slug}?post=${po.id}`}>Quero um serviço assim</Button>
      </StickyActions>
    </Stack>
  )
}
