import type { Metadata } from 'next'
import { Suspense } from 'react'
import { NovoImovelForm } from '@/components/views/NovoImovelForm'

export const metadata: Metadata = { title: 'Novo imóvel' }

export default function NovoImovel() {
  return <Suspense><NovoImovelForm /></Suspense>
}
