import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Vistorias } from '@/components/views/corretor/Vistorias'

export const metadata: Metadata = { title: 'Vistorias' }

export default function Page() {
  return <Suspense><Vistorias /></Suspense>
}
