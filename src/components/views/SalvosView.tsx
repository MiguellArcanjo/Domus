'use client'

import { Bookmark, ChevronRight, Star, UserPlus } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { EmptyState } from '@/components/ui/Extras'
import { Row, Stack } from '@/components/ui/Stack'
import { TabPanels } from '@/components/ui/Tabs'
import { PostCard } from '@/components/domain/PostCard'
import { NomeVerificado } from '@/components/domain/Prestador'
import { PageHeader } from '@/components/layout/PageHeader'
import { km, nota } from '@/lib/format'
import { POSTS, PRESTADORES } from '@/lib/mock'
import { SALVOS_INICIAIS, useSet } from '@/lib/store'

/** Salvos e seguindo, lidos do que a pessoa marcou nas outras telas. */
export function SalvosView() {
  const prest = useSet('salvos:prestadores', SALVOS_INICIAIS.prestadores)
  const posts = useSet('salvos:posts', SALVOS_INICIAIS.posts)
  const seguindo = useSet('seguindo', ['ana-lima'])
  const lista = (slugs: string[]) => PRESTADORES.filter((p) => slugs.includes(p.slug))
  const vazio = <EmptyState icon={Bookmark} title="Nada por aqui" action={<Button href="/app/explorar">Explorar</Button>}>Toque no coração de um prestador ou de um post para guardar aqui.</EmptyState>
  const linha = (p: (typeof PRESTADORES)[number]) => (
    <Card key={p.slug} href={`/app/prestadores/${p.slug}`}>
      <Row gap={3}><Avatar iniciais={p.iniciais} size={44} /><div style={{ flexGrow: 1 }}><NomeVerificado p={p} size={15} /><p style={{ fontSize: 13, color: 'var(--ink-muted)', display: 'flex', gap: 4, alignItems: 'center' }}><Star size={13} aria-hidden />{nota(p.nota)} · {p.oficio} · {km(p.distanciaKm)}</p></div><ChevronRight size={20} color="var(--ink-muted)" aria-hidden /></Row>
    </Card>
  )
  return (
    <Stack gap={3} style={{ maxWidth: 720 }}>
      <PageHeader title="Salvos" />
      <TabPanels label="Salvos" tabs={['Prestadores', 'Posts', 'Seguindo']}>
        {[
          <Stack key="p" gap={3}>{lista(prest.lista).length ? lista(prest.lista).map(linha) : vazio}</Stack>,
          <Stack key="posts" gap={3}>{POSTS.filter((po) => posts.tem(po.id)).length ? POSTS.filter((po) => posts.tem(po.id)).map((po) => <PostCard key={po.id} post={po} href={`/app/post/${po.id}`} compact />) : vazio}</Stack>,
          <Stack key="s" gap={3}>{lista(seguindo.lista).length ? lista(seguindo.lista).map(linha) : <EmptyState icon={UserPlus} title="Você ainda não segue ninguém">Siga um prestador no perfil dele para ver os posts dele primeiro.</EmptyState>}</Stack>,
        ]}
      </TabPanels>
    </Stack>
  )
}
