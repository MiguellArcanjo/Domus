import type { Metadata } from 'next'
import { Assinatura } from '@/components/views/corretor/Assinatura'

export const metadata: Metadata = { title: 'Assinatura' }

export default function Page() {
  return <Assinatura />
}
