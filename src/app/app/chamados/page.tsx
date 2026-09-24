import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Stack } from '@/components/ui/Stack'
import { PageHeader } from '@/components/layout/PageHeader'
import { ChamadosLista } from '@/components/views/ChamadosLista'

export const metadata: Metadata = { title: 'Chamados' }

export default function Chamados() {
  return (
    <Stack gap={3} style={{ maxWidth: 720 }}>
      <PageHeader title="Chamados" subtitle="Abertos pelos inquilinos, com triagem por IA" />
      <Suspense><ChamadosLista busca /></Suspense>
    </Stack>
  )
}
