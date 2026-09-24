import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RepasseDetalhe } from '@/components/views/corretor/RepasseDetalhe'
import { REPASSES, repasse } from '@/lib/mock'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return REPASSES.map((r) => ({ id: r.proprietarioId }))
}

export const metadata: Metadata = { title: 'Repasse' }

export default async function Page({ params }: Props) {
  const r = repasse((await params).id)
  if (!r) notFound()
  return <RepasseDetalhe repasse={r} />
}
