import type { Metadata } from 'next'
import { CadastroPrestador } from '@/components/views/prestador/CadastroPrestador'

export const metadata: Metadata = { title: 'Cadastro de prestador' }

export default function Page() {
  return <CadastroPrestador />
}
