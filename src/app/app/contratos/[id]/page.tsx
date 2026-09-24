import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ContratoDetalhe } from '@/components/views/corretor/ContratoDetalhe'
import { IMOVEIS, imovel } from '@/lib/mock'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return IMOVEIS.filter((i) => i.contrato).map((i) => ({ id: i.id }))
}

export const metadata: Metadata = { title: 'Contrato' }

/** O id do contrato é o do imóvel nos dados de exemplo (um contrato ativo por imóvel). */
export default async function Page({ params }: Props) {
  const i = imovel((await params).id)
  if (!i?.contrato) notFound()
  return <ContratoDetalhe imovel={i} />
}
