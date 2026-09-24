import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SearchField } from '@/components/ui/SearchField'
import { Stack } from '@/components/ui/Stack'
import { PageHeader } from '@/components/layout/PageHeader'
import { ChamadosLista } from '@/components/views/ChamadosLista'

export const metadata: Metadata = { title: 'Chamados' }

export default function Chamados() {
  return (
    <Stack gap={3} style={{ maxWidth: 720 }}>
      <PageHeader title="Chamados" subtitle="Abertos pelos inquilinos, com triagem por IA" />
      <SearchField placeholder="Buscar chamado ou imóvel" />
      <Suspense><ChamadosLista /></Suspense>
    </Stack>
  )
}
