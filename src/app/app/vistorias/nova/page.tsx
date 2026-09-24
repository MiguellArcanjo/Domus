import type { Metadata } from 'next'
import { Suspense } from 'react'
import { NovaVistoria } from '@/components/views/corretor/NovaVistoria'

export const metadata: Metadata = { title: 'Nova vistoria' }

export default function Page() {
  return <Suspense><NovaVistoria /></Suspense>
}
