import type { Metadata } from 'next'
import { ContaView } from '@/components/views/ContaView'

export const metadata: Metadata = { title: 'Perfil' }

export default function Conta() {
  return <ContaView />
}
