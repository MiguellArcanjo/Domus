import type { Metadata } from 'next'
import { SenhaForm } from '@/components/views/conta/SenhaForm'

export const metadata: Metadata = { title: 'Alterar senha' }

export default function Page() {
  return <SenhaForm />
}
