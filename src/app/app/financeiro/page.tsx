import type { Metadata } from 'next'
import { Financeiro } from '@/components/views/corretor/Financeiro'

export const metadata: Metadata = { title: 'Financeiro' }

export default function Page() {
  return <Financeiro />
}
