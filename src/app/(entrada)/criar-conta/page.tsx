import type { Metadata } from 'next'
import { Suspense } from 'react'
import { CriarContaForm } from './CriarContaForm'

export const metadata: Metadata = { title: 'Criar conta' }

export default function CriarConta() {
  return <Suspense><CriarContaForm /></Suspense>
}
