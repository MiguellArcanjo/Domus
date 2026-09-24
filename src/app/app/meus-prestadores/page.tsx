import type { Metadata } from 'next'
import { MeusPrestadores } from '@/components/views/corretor/MeusPrestadores'

export const metadata: Metadata = { title: 'Meus prestadores' }

export default function Page() {
  return <MeusPrestadores />
}
