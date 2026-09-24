import { LinkInvalido } from '@/components/views/LinkInvalido'
import { AbrirChamadoForm } from '@/components/views/AbrirChamadoForm'

type Props = { params: Promise<{ token: string }> }

export function generateStaticParams() {
  return [{ token: 'demo' }]
}

export default async function AbrirChamado({ params }: Props) {
  const { token } = await params
  if (token !== 'demo') return <LinkInvalido />
  return <AbrirChamadoForm token={token} />
}
