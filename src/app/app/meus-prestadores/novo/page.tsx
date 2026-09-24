import type { Metadata } from 'next'
import { NovoPrestador } from '@/components/views/corretor/NovoPrestador'

export const metadata: Metadata = { title: 'Adicionar prestador' }

export default function Page() {
  return <NovoPrestador />
}
