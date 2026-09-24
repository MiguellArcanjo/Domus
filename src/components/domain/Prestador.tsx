import Link from 'next/link'
import { Clock, MapPin, Star } from 'lucide-react'
import { Avatar, AvatarStack } from '@/components/ui/Avatar'
import { Badge, Selo } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Meta } from '@/components/ui/Meta'
import { Photo } from '@/components/ui/Photo'
import { DISPONIBILIDADE } from '@/lib/estados'
import { km, nota, preco } from '@/lib/format'
import type { ItemPreco, Prestador } from '@/lib/types'
import s from './domain.module.css'

export function NomeVerificado({ p, size = 16 }: { p: Prestador; size?: number }) {
  return (
    <span className={s.name} style={{ fontSize: size }}>
      {p.nome}
      {p.verificado && <Selo tipo="prestador" compact />}
    </span>
  )
}

export function Rating({ p }: { p: Prestador }) {
  return (
    <span className={s.rating}>
      <Star size={14} className={s.star} aria-hidden />
      <b>{nota(p.nota)}</b> · {p.servicosPeloApp} serviços pelo app
    </span>
  )
}

/** Pílula de nota (referência Property Finder). */
export function RatingPill({ p }: { p: Prestador }) {
  return (
    <span className={s.ratingPill}>
      <Star size={14} className={s.star} aria-hidden />
      {nota(p.nota)} <span>({p.avaliacoes} avaliações)</span>
    </span>
  )
}

export function PriceList({ itens, max }: { itens: ItemPreco[]; max?: number }) {
  return (
    <ul className={s.prices}>
      {itens.slice(0, max).map((i) => (
        <li key={i.servico}><span>{i.servico}</span><b>{preco(i.preco, i.aPartirDe)}</b></li>
      ))}
    </ul>
  )
}

export function Disponibilidade({ p }: { p: Prestador }) {
  return <Badge tone="success" icon={Clock}>{DISPONIBILIDADE[p.disponibilidade]}</Badge>
}

/** Card do prestador no marketplace (M-07). */
export function PrestadorCard({ p, href, ctaHref }: { p: Prestador; href: string; ctaHref?: string }) {
  return (
    <Card as="article">
      <div className={s.prest}>
        <div className={s.prestHead}>
          <Avatar iniciais={p.iniciais} size={52} />
          <Link href={href} style={{ display: 'grid', gap: 2, minWidth: 0 }}>
            <NomeVerificado p={p} />
            <span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{p.oficio} · {p.bairro}</span>
            <Rating p={p} />
          </Link>
          {p.destaque && <Badge tone="accent">Destaque</Badge>}
        </div>
        <PriceList itens={p.precos} max={3} />
        <div className={s.foot}>
          <Meta icon={MapPin}>Atende até {p.raioKm} km · {km(p.distanciaKm)} de você</Meta>
          <Meta icon={Clock} tone="brand">{DISPONIBILIDADE[p.disponibilidade]}</Meta>
        </div>
        {ctaHref && <Button variant="primary" block href={ctaHref}>Pedir orçamento</Button>}
      </div>
    </Card>
  )
}

/** Prestador sugerido num chamado, com preço e link para o perfil. */
export function PrestadorSugerido({ p, servico, selected, perfilHref }: { p: Prestador; servico?: string; selected?: boolean; perfilHref: string }) {
  const item = p.precos.find((i) => i.servico === servico) ?? p.precos[1] ?? p.precos[0]
  return (
    <Card selected={selected}>
      <div className={s.sug}>
        <Avatar iniciais={p.iniciais} size={40} />
        <div style={{ display: 'grid', gap: 1, minWidth: 0 }}>
          <NomeVerificado p={p} size={14} />
          <span className={s.rating}><Star size={13} className={s.star} aria-hidden /><b>{nota(p.nota)}</b> · {km(p.distanciaKm)}</span>
          <span style={{ fontSize: 12, color: 'var(--brand)', fontWeight: 600 }}>{p.proximoHorario}</span>
        </div>
        <div className={s.sugRight}>
          <b style={{ fontSize: 15 }} className="tabular">{preco(item.preco)}</b>
          <Link href={perfilHref} style={{ fontSize: 12, color: 'var(--brand)', fontWeight: 600 }}>Ver perfil</Link>
        </div>
      </div>
    </Card>
  )
}

/** Linha de resultado de busca: miniatura com etiqueta, título e metadados. */
export function ResultRow({ p, href }: { p: Prestador; href: string }) {
  const item = p.precos[1] ?? p.precos[0]
  return (
    <Link href={href} className={s.result}>
      <div className={s.resultMedia}>
        <Photo legenda={`Trabalho de ${p.nome}`} height={80} radius={12} showLabel={false} />
        <div className={s.resultBadge}>{p.verificado ? <Selo tipo="prestador" compact /> : null}</div>
      </div>
      <div style={{ display: 'grid', gap: 3, minWidth: 0 }}>
        <b style={{ fontSize: 15 }}>{item.servico}</b>
        <Meta icon={Clock}>{DISPONIBILIDADE[p.disponibilidade]}</Meta>
        <Meta icon={MapPin}>{p.nome} · {km(p.distanciaKm)}</Meta>
        <b style={{ fontSize: 13 }}>{preco(item.preco, item.aPartirDe)}</b>
      </div>
    </Link>
  )
}

/** Depoimento com prova social (referência Property Finder). */
export function Depoimento({ p }: { p: Prestador }) {
  if (!p.depoimento) return null
  return (
    <Card>
      <div className={s.proof}><AvatarStack iniciais={['MS', 'AL', 'RC']} /><b>Contratado por {p.servicosPeloApp} clientes pelo app</b></div>
      <p style={{ fontSize: 15 }}>“{p.depoimento.texto}” <span style={{ color: 'var(--ink-muted)' }}>— {p.depoimento.autor}</span></p>
    </Card>
  )
}
