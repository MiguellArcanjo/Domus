import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ImoveisLista } from '@/components/views/ImoveisLista'

export const metadata: Metadata = { title: 'Imóveis' }

export default function Imoveis() {
  return <Suspense><ImoveisLista /></Suspense>
}
