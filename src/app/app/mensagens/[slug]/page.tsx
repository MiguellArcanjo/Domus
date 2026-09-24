import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Send } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { IconButton } from '@/components/ui/IconButton'
import { Stack } from '@/components/ui/Stack'
import { BackBar } from '@/components/layout/PageHeader'
import { PRESTADORES, prestador } from '@/lib/mock'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return PRESTADORES.map((p) => ({ slug: p.slug }))
}

export const metadata: Metadata = { title: 'Conversa' }

/** Conversa dentro do app. Telefone, @ e links são bloqueados (PRD: contato por fora). */
export default async function Conversa({ params }: Props) {
  const p = prestador((await params).slug)
  if (!p) notFound()
  return (
    <Stack gap={4} style={{ maxWidth: 640, minHeight: '70dvh' }}>
      <BackBar title={p.nome} back={`/app/prestadores/${p.slug}`} action={<Avatar iniciais={p.iniciais} size={36} />} />
      <div style={{ alignSelf: 'flex-start', maxWidth: '80%', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '14px 14px 14px 4px', padding: '10px 12px' }}>Oi! Posso ajudar com o serviço. Me conte o que aconteceu.</div>
      <p style={{ fontSize: 12, color: 'var(--ink-muted)', textAlign: 'center' }}>Para sua segurança, telefones e links são ocultados. Combine e pague pelo app.</p>
      <form style={{ marginTop: 'auto', display: 'flex', gap: 8 }}>
        <label style={{ flexGrow: 1 }}><span className="sr-only">Mensagem</span><input placeholder="Escreva uma mensagem" style={{ width: '100%', height: 48, borderRadius: 24, border: '1px solid var(--line-strong)', padding: '0 16px', background: 'var(--surface)' }} /></label>
        <IconButton icon={Send} label="Enviar mensagem" tone="brand" />
      </form>
    </Stack>
  )
}
