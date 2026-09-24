import type { Metadata } from 'next'
import { PreferenciasAvisos } from '@/components/views/conta/PreferenciasAvisos'

export const metadata: Metadata = { title: 'Avisos' }

export default function Page() {
  return <PreferenciasAvisos />
}
