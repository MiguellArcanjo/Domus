import type { Metadata } from 'next'
import { Suspense } from 'react'
import { EntrarForm } from './EntrarForm'

export const metadata: Metadata = { title: 'Entrar' }

export default function Entrar() {
  return (
    <Suspense>
      <EntrarForm />
    </Suspense>
  )
}
