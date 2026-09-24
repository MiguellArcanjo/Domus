import type { Metadata } from 'next'
import { AgendaView } from '@/components/views/AgendaView'

export const metadata: Metadata = { title: 'Agenda' }

export default function Agenda() {
  return <AgendaView />
}
