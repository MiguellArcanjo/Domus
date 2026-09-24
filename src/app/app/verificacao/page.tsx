import type { Metadata } from 'next'
import { Verificacao } from '@/components/views/prestador/Verificacao'

export const metadata: Metadata = { title: 'Verificação' }

export default function Page() {
  return <Verificacao />
}
