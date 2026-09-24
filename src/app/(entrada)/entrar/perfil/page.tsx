import type { Metadata } from 'next'
import { Suspense } from 'react'
import { EscolherPerfil } from './EscolherPerfil'

export const metadata: Metadata = { title: 'Escolher perfil' }

export default function Perfil() {
  return (
    <Suspense>
      <EscolherPerfil />
    </Suspense>
  )
}
