import type { Metadata } from 'next'
import { ContratoForm } from '@/components/views/corretor/ContratoForm'

export const metadata: Metadata = { title: 'Novo contrato' }

type Props = { searchParams: Promise<{ imovel?: string; renovar?: string }> }

export default async function Page({ searchParams }: Props) {
  const { imovel, renovar } = await searchParams
  return <ContratoForm imovelId={imovel} renovar={!!renovar} />
}
