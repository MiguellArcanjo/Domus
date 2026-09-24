import type { Metadata } from 'next'
import { Suspense } from 'react'
import { NovoPostForm } from '@/components/views/NovoPostForm'

export const metadata: Metadata = { title: 'Novo post' }

export default function Postar() {
  return <Suspense><NovoPostForm /></Suspense>
}
