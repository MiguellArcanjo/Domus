import type { Metadata } from 'next'
import { PedidosPrestador } from '@/components/views/PedidosPrestador'

export const metadata: Metadata = { title: 'Pedidos' }

export default function Pedidos() {
  return <PedidosPrestador />
}
