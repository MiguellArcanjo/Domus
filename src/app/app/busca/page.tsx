import type { Metadata } from 'next'
import { BuscaForm } from '@/components/views/BuscaForm'

export const metadata: Metadata = { title: 'Buscar serviço' }

export default function Busca() {
  return <BuscaForm />
}
