import type { Metadata } from 'next'
import { Recebimento } from '@/components/views/prestador/Recebimento'

export const metadata: Metadata = { title: 'Dados de recebimento' }

export default function Page() {
  return <Recebimento />
}
