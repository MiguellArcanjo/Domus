import type { Metadata } from 'next'
import { ModeracaoAdmin } from '@/components/views/admin/Moderacao'

export const metadata: Metadata = { title: 'Moderação' }

export default function Page() {
  return <ModeracaoAdmin />
}
