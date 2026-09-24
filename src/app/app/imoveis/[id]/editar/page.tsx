import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { EditarImovel } from '@/components/views/corretor/EditarImovel'
import { IMOVEIS, imovel } from '@/lib/mock'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return IMOVEIS.map((i) => ({ id: i.id }))
}

export const metadata: Metadata = { title: 'Editar imóvel' }

export default async function Page({ params }: Props) {
  const i = imovel((await params).id)
  if (!i) notFound()
  return <EditarImovel imovel={i} />
}
