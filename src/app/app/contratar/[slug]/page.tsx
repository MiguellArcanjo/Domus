import type { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { PedidoForm } from '@/components/views/PedidoForm'
import { PRESTADORES, prestador } from '@/lib/mock'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return PRESTADORES.map((p) => ({ slug: p.slug }))
}

export const metadata: Metadata = { title: 'Pedir orçamento' }

export default async function Contratar({ params }: Props) {
  const p = prestador((await params).slug)
  if (!p) notFound()
  return <Suspense><PedidoForm p={p} /></Suspense>
}
