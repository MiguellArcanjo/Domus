'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Clock, List, Map as MapIcon, SearchX } from 'lucide-react'
import { EmptyState } from '@/components/ui/Extras'
import { Selo } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Meta } from '@/components/ui/Meta'
import { Photo } from '@/components/ui/Photo'
import { Tabs } from '@/components/ui/Tabs'
import { PostCard } from '@/components/domain/PostCard'
import { NomeVerificado } from '@/components/domain/Prestador'
import { SaveButton } from '@/components/domain/SaveButton'
import { CATEGORIAS } from '@/lib/categorias'
import { DISPONIBILIDADE } from '@/lib/estados'
import { km, reais } from '@/lib/format'
import { CIDADE, POSTS, PRESTADORES, prestador } from '@/lib/mock'
import { useSet } from '@/lib/store'
import type { Disponibilidade } from '@/lib/types'
import { CityHeader, FilterBar, passaFiltros, type Filtros } from './FilterBar'
import { MapView, type Selecao } from './MapView'
import s from './patterns.module.css'

const ABAS: Array<{ rotulo: string; disp?: Disponibilidade[] }> = [
  { rotulo: 'Todos' }, { rotulo: 'Hoje', disp: ['hoje'] }, { rotulo: 'Amanhã', disp: ['hoje', 'amanha'] }, { rotulo: 'Esta semana', disp: ['hoje', 'amanha', 'semana'] },
]

/**
 * Explorar: vitrine (lista) e mapa com o mesmo conteúdo e os mesmos filtros.
 * Celular: lista OU mapa, trocados pelo botão no canto. Computador: lista à esquerda e mapa à direita.
 */
export function Explorar({ inicial = 'lista' }: { inicial?: 'lista' | 'mapa' }) {
  const [visao, setVisao] = useState(inicial)
  const [filtros, setFiltros] = useState<Filtros>({ verificados: false })
  const [aba, setAba] = useState(0)
  const [selecao, setSelecao] = useState<Selecao>({ tipo: 'prestador', slug: 'joao-batista' })
  const seguindo = useSet('seguindo', ['ana-lima']).lista

  const { posts, prestadores } = useMemo(() => {
    const disp = ABAS[aba].disp
    const okP = PRESTADORES.filter((p) => passaFiltros(p, filtros) && (!disp || disp.includes(p.disponibilidade)))
    const slugs = new Set(okP.map((p) => p.slug))
    const posts = POSTS.filter((po) => slugs.has(po.prestadorSlug)).sort((a, b) => Number(seguindo.includes(b.prestadorSlug)) - Number(seguindo.includes(a.prestadorSlug)) || Number(!!b.destaque) - Number(!!a.destaque))
    return { prestadores: okP, posts }
  }, [filtros, aba, seguindo])

  const sel = selecao?.tipo === 'prestador' ? prestador(selecao.slug) : undefined
  const selPost = selecao?.tipo === 'post' ? POSTS.find((p) => p.id === selecao.id) : undefined

  return (
    <div className={s.explorar}>
      <div className={`${s.head}`} style={{ display: 'grid', gap: 12 }}>
        <CityHeader
          cidade={CIDADE}
          action={
            <span className={s.toggle}>
              {visao === 'lista'
                ? <IconButton icon={MapIcon} label="Ver no mapa" onClick={() => setVisao('mapa')} />
                : <IconButton icon={List} label="Ver em lista" onClick={() => setVisao('lista')} />}
            </span>
          }
        />
        <FilterBar value={filtros} onChange={setFiltros} />
        <Tabs tabs={ABAS.map((a) => a.rotulo)} value={aba} onChange={setAba} label="Disponibilidade" />
      </div>

      <section className={`${s.lista} ${visao === 'mapa' ? s.hidden : ''}`} aria-label="Vitrine">
        <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{posts.length} trabalhos · {prestadores.length} prestadores perto de você</p>
        <div className={s.grid}>
          {posts.map((p) => <PostCard key={p.id} post={p} href={`/app/post/${p.id}`} />)}
        </div>
        {posts.length === 0 && <EmptyState icon={SearchX} title="Nada com esses filtros" action={<Button onClick={() => { setFiltros({ verificados: false }); setAba(0) }}>Limpar filtros</Button>}>Tente outra categoria, um preço maior ou tire o filtro de dia.</EmptyState>}
      </section>

      <section className={`${s.mapWrap} ${visao === 'lista' ? s.hideMobile : ''}`} aria-label="Mapa">
        <MapView prestadores={prestadores} posts={posts} selecao={selecao} onSelect={setSelecao}>
          {sel && (
            <div className={s.preview}>
              <div className={s.previewTop}>
                <Photo legenda={`Foto de ${sel.nome}`} height={84} radius={12} showLabel={false} />
                <div style={{ display: 'grid', gap: 3, minWidth: 0 }}>
                  <NomeVerificado p={sel} size={15} />
                  <Meta icon={CATEGORIAS[sel.categoria].icone}>{sel.oficio} · {km(sel.distanciaKm)}</Meta>
                  <Meta icon={Clock} tone="brand">{DISPONIBILIDADE[sel.disponibilidade]}</Meta>
                  <b style={{ fontSize: 13 }}>a partir de {reais(Math.min(...sel.precos.map((i) => i.preco)))}</b>
                </div>
                <SaveButton id={sel.slug} tipo="prestadores" label={sel.nome} plain />
              </div>
              <div className={s.previewActions}>
                <Button href={`/app/prestadores/${sel.slug}`}>Ver perfil</Button>
                <Button variant="primary" href={`/app/contratar/${sel.slug}`}>Pedir orçamento</Button>
              </div>
            </div>
          )}
          {selPost && (
            <div className={s.preview}>
              <div className={s.previewTop}>
                <Photo legenda={selPost.fotoLegenda} height={84} radius={12} showLabel={false} />
                <div style={{ display: 'grid', gap: 3, minWidth: 0 }}>
                  <b style={{ fontSize: 15 }}>{selPost.titulo}</b>
                  <span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{prestador(selPost.prestadorSlug)?.nome} · {selPost.bairro}</span>
                  {selPost.verificado && <Selo />}
                </div>
                <b className="tabular">{reais(selPost.preco)}</b>
              </div>
              <div className={s.previewActions}>
                <Button href={`/app/post/${selPost.id}`}>Ver post</Button>
                <Button variant="primary" href={`/app/contratar/${selPost.prestadorSlug}?post=${selPost.id}`}>Quero um assim</Button>
              </div>
            </div>
          )}
        </MapView>
      </section>
      <Link href="/app/busca" className="sr-only">Buscar um serviço</Link>
    </div>
  )
}
