import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AvaliarForm } from '@/components/views/AvaliarForm'
import { PEDIDOS_CLIENTE, pedidoCliente, prestador } from '@/lib/mock'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return PEDIDOS_CLIENTE.map((p) => ({ id: p.id }))
}

export const metadata: Metadata = { title: 'Avaliar' }

export default async function Avaliar({ params }: Props) {
  const ped = pedidoCliente((await params).id)
  if (!ped) notFound()
  return <AvaliarForm prestador={prestador(ped.prestadorSlug)!} />
}
