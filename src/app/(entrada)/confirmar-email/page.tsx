import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ConfirmarEmail } from './ConfirmarEmail'

export const metadata: Metadata = { title: 'Confirme seu e-mail' }

export default function Page() {
  return <Suspense><ConfirmarEmail /></Suspense>
}
