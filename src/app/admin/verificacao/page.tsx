import type { Metadata } from 'next'
import { VerificacaoAdmin } from '@/components/views/admin/Verificacao'

export const metadata: Metadata = { title: 'Verificação' }

export default function Page() {
  return <VerificacaoAdmin />
}
