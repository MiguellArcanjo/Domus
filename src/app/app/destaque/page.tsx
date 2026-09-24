import type { Metadata } from 'next'
import { Destaque } from '@/components/views/prestador/Destaque'

export const metadata: Metadata = { title: 'Destaque' }

export default function Page() {
  return <Destaque />
}
