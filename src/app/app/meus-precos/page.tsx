import type { Metadata } from 'next'
import { MeusPrecos } from '@/components/views/prestador/MeusPrecos'

export const metadata: Metadata = { title: 'Meus preços' }

export default function Page() {
  return <MeusPrecos />
}
