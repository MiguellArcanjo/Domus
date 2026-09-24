import type { Metadata } from 'next'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { EmptyState } from '@/components/ui/Extras'
import { Stack } from '@/components/ui/Stack'
import { PageHeader } from '@/components/layout/PageHeader'
import { CONVERSAS, prestador } from '@/lib/mock'

export const metadata: Metadata = { title: 'Mensagens' }

/** Caixa de conversas com prestadores. */
export default function Mensagens() {
  return (
    <Stack gap={3} style={{ maxWidth: 640 }}>
      <PageHeader title="Mensagens" />
      {CONVERSAS.length === 0 && <EmptyState icon={MessageCircle} title="Nenhuma conversa">Fale com um prestador pelo perfil dele.</EmptyState>}
      <ul style={{ display: 'grid' }}>
        {CONVERSAS.map((c) => {
          const p = prestador(c.slug)!
          return (
            <li key={c.slug}>
              <Link href={`/app/mensagens/${c.slug}`} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
                <Avatar iniciais={p.iniciais} size={48} />
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <b>{p.nome}</b>
                  <p style={{ fontSize: 14, color: c.naoLidas ? 'var(--ink)' : 'var(--ink-muted)', fontWeight: c.naoLidas ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.ultima}</p>
                </div>
                <div style={{ display: 'grid', justifyItems: 'end', gap: 4 }}>
                  <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{c.quando}</span>
                  {c.naoLidas > 0 && <span style={{ minWidth: 20, height: 20, borderRadius: 10, background: 'var(--accent)', color: 'var(--on-accent)', fontSize: 12, fontWeight: 700, display: 'grid', placeItems: 'center' }} aria-label={`${c.naoLidas} não lida`}>{c.naoLidas}</span>}
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </Stack>
  )
}
