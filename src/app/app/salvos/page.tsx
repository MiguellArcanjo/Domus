import type { Metadata } from 'next'
import { ChevronRight, Star } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Card } from '@/components/ui/Card'
import { Row, Stack } from '@/components/ui/Stack'
import { TabPanels } from '@/components/ui/Tabs'
import { PostCard } from '@/components/domain/PostCard'
import { NomeVerificado } from '@/components/domain/Prestador'
import { PageHeader } from '@/components/layout/PageHeader'
import { km, nota } from '@/lib/format'
import { POSTS, PRESTADORES } from '@/lib/mock'

export const metadata: Metadata = { title: 'Salvos' }

export default function Salvos() {
  return (
    <Stack gap={3} style={{ maxWidth: 720 }}>
      <PageHeader title="Salvos" />
      <TabPanels label="Salvos" tabs={['Prestadores', 'Posts']}>
        {[
          <Stack key="p" gap={3}>
            {PRESTADORES.slice(0, 3).map((p) => (
              <Card key={p.slug} href={`/app/prestadores/${p.slug}`}>
                <Row gap={3}><Avatar iniciais={p.iniciais} size={44} /><div style={{ flexGrow: 1 }}><NomeVerificado p={p} size={15} /><p style={{ fontSize: 13, color: 'var(--ink-muted)', display: 'flex', gap: 4, alignItems: 'center' }}><Star size={13} aria-hidden />{nota(p.nota)} · {p.oficio} · {km(p.distanciaKm)}</p></div><ChevronRight size={20} color="var(--ink-muted)" aria-hidden /></Row>
              </Card>
            ))}
          </Stack>,
          <Stack key="posts" gap={3}>{POSTS.slice(0, 2).map((po) => <PostCard key={po.id} post={po} href={`/app/post/${po.id}`} compact />)}</Stack>,
        ]}
      </TabPanels>
    </Stack>
  )
}
