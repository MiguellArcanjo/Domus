import type { Metadata } from 'next'
import { ResultadosView } from '@/components/views/ResultadosView'

export const metadata: Metadata = { title: 'Resultados' }

type Props = { searchParams: Promise<{ q?: string }> }

export default async function Resultados({ searchParams }: Props) {
  const q = ((await searchParams).q ?? '').trim()
  return <ResultadosView key={q} q={q} />
}
