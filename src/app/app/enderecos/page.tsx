import type { Metadata } from 'next'
import { Enderecos } from '@/components/views/Enderecos'

export const metadata: Metadata = { title: 'Endereços' }

export default function Page() {
  return <Enderecos />
}
