'use client'

import { useState } from 'react'
import { MapView, type Selecao } from '@/components/patterns/MapView'
import { POSTS, PRESTADORES } from '@/lib/mock'

/** Mapa de demonstração na página inicial: os pinos respondem ao toque. */
export function MapaDemo() {
  const [sel, setSel] = useState<Selecao>({ tipo: 'prestador', slug: 'joao-batista' })
  return (
    <div style={{ position: 'relative', height: 400, borderRadius: 20, overflow: 'hidden' }}>
      <MapView prestadores={PRESTADORES} posts={POSTS.slice(0, 3)} selecao={sel} onSelect={setSel} />
    </div>
  )
}
