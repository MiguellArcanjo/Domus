import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ConcluirForm } from '@/components/views/ConcluirForm'
import { PEDIDOS_PRESTADOR, pedidoPrestador } from '@/lib/mock'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return PEDIDOS_PRESTADOR.map((p) => ({ id: p.id }))
}

export const metadata: Metadata = { title: 'Concluir serviço' }

export default async function Concluir({ params }: Props) {
  const p = pedidoPrestador((await params).id)
  if (!p) notFound()
  return <ConcluirForm pedido={p} />
}
