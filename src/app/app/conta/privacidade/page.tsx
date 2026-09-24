import type { Metadata } from 'next'
import { Privacidade } from '@/components/views/conta/Privacidade'

export const metadata: Metadata = { title: 'Privacidade e dados' }

export default function Page() {
  return <Privacidade />
}
