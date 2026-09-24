import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CobrancaDetalhe } from '@/components/views/corretor/CobrancaDetalhe'
import { COBRANCAS } from '@/lib/mock'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return COBRANCAS.map((c) => ({ id: c.id }))
}

export const metadata: Metadata = { title: 'Cobrança' }

export default async function Page({ params }: Props) {
  const { id } = await params
  const c = COBRANCAS.find((x) => x.id === id)
  if (!c) notFound()
  return <CobrancaDetalhe cobranca={c} />
}
