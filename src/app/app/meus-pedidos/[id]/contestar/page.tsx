import type { Metadata } from 'next'
import { ContestarForm } from '@/components/views/ContestarForm'
import { PEDIDOS_CLIENTE } from '@/lib/mock'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return PEDIDOS_CLIENTE.map((p) => ({ id: p.id }))
}

export const metadata: Metadata = { title: 'Contestar serviço' }

export default async function Contestar({ params }: Props) {
  return <ContestarForm id={(await params).id} />
}
