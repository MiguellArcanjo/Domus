import type { Metadata } from 'next'
import { Reajustes } from '@/components/views/corretor/Reajustes'

export const metadata: Metadata = { title: 'Reajustes' }

export default function Page() {
  return <Reajustes />
}
