import type { Metadata } from 'next'
import { DadosForm } from '@/components/views/conta/DadosForm'

export const metadata: Metadata = { title: 'Seus dados' }

export default function Page() {
  return <DadosForm />
}
