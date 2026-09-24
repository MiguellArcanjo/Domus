import { AbrirChamadoForm } from '@/components/views/AbrirChamadoForm'

type Props = { params: Promise<{ token: string }> }

export function generateStaticParams() {
  return [{ token: 'demo' }]
}

export default async function AbrirChamado({ params }: Props) {
  return <AbrirChamadoForm token={(await params).token} />
}
