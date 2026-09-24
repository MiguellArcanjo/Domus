import type { Metadata } from 'next'
import { Denunciar } from '@/components/views/Denunciar'
import { POSTS } from '@/lib/mock'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return POSTS.map((p) => ({ id: p.id }))
}

export const metadata: Metadata = { title: 'Denunciar post' }

export default async function Page({ params }: Props) {
  return <Denunciar postId={(await params).id} />
}
