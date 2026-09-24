import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Comentarios } from '@/components/views/Comentarios'
import { POSTS, post } from '@/lib/mock'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return POSTS.map((p) => ({ id: p.id }))
}

export const metadata: Metadata = { title: 'Comentários' }

export default async function Page({ params }: Props) {
  const po = post((await params).id)
  if (!po) notFound()
  return <Comentarios postId={po.id} titulo={po.titulo} />
}
