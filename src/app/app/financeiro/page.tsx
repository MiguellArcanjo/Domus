import type { Metadata } from 'next'
import { Financeiro } from '@/components/views/corretor/Financeiro'

export const metadata: Metadata = { title: 'Relatórios' }

export default function Page() {
  return <Financeiro />
}
