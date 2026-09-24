import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Stack } from '@/components/ui/Stack'
import { Chat } from '@/components/views/Chat'
import { BackBar } from '@/components/layout/PageHeader'
import { PRESTADORES, prestador } from '@/lib/mock'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return PRESTADORES.map((p) => ({ slug: p.slug }))
}

export const metadata: Metadata = { title: 'Conversa' }

export default async function Conversa({ params }: Props) {
  const p = prestador((await params).slug)
  if (!p) notFound()
  return (
    <Stack gap={4} style={{ maxWidth: 640 }}>
      <BackBar title={p.nome} back="/app/mensagens" action={<Avatar iniciais={p.iniciais} size={36} />} />
      <Button size="sm" variant="primary" href={`/app/contratar/${p.slug}`}>Pedir orçamento a {p.nome.split(' ')[0]}</Button>
      <Chat slug={p.slug} nome={p.nome} />
    </Stack>
  )
}
