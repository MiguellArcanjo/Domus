import type { Metadata } from 'next'
import { SalvosView } from '@/components/views/SalvosView'

export const metadata: Metadata = { title: 'Salvos' }

export default function Salvos() {
  return <SalvosView />
}
