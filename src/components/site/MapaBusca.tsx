'use client'

import { useState } from 'react'
import { MapView, type Selecao } from '@/components/patterns/MapView'
import { POSTS, PRESTADORES } from '@/lib/mock'

export function MapaBusca({ slugs }: { slugs: string[] }) {
  const [sel, setSel] = useState<Selecao>(slugs[0] ? { tipo: 'prestador', slug: slugs[0] } : null)
  const prestadores = PRESTADORES.filter((p) => slugs.includes(p.slug))
  return (
    <div style={{ position: 'sticky', top: 90, height: 'min(80dvh, 720px)', borderRadius: 24, overflow: 'hidden', border: '1px solid var(--line)' }}>
      <MapView prestadores={prestadores} posts={POSTS.filter((p) => slugs.includes(p.prestadorSlug))} selecao={sel} onSelect={setSel} />
    </div>
  )
}
