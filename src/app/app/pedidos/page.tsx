import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PedidosPrestador } from '@/components/views/PedidosPrestador'

export const metadata: Metadata = { title: 'Pedidos' }

export default function Pedidos() {
  return <Suspense><PedidosPrestador /></Suspense>
}
