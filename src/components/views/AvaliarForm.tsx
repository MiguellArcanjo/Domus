'use client'

import { useRouter } from 'next/navigation'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PhotoPicker, StarRating, Switch } from '@/components/ui/Controls'
import { TextArea } from '@/components/ui/Field'
import { Stack } from '@/components/ui/Stack'
import { BackBar, StickyActions } from '@/components/layout/PageHeader'
import type { Prestador } from '@/lib/types'

/** Avaliação verificada (M-08) com foto opcional (V-03), que pode ir para a vitrine. */
export function AvaliarForm({ prestador: p }: { prestador: Prestador }) {
  const router = useRouter()
  return (
    <form onSubmit={(e) => { e.preventDefault(); router.push('/app/explorar') }} style={{ maxWidth: 560 }}>
      <BackBar title="Avaliar" back="/app/meus-pedidos" />
      <Stack gap={4}>
        <div style={{ display: 'grid', justifyItems: 'center', textAlign: 'center', gap: 8 }}>
          <Avatar iniciais={p.iniciais} size={64} />
          <h2 style={{ fontSize: 22 }}>Como foi com {p.nome.split(' ')[0]}?</h2>
          <p style={{ color: 'var(--ink-muted)' }}>Sua avaliação vale porque o serviço foi pago pelo app.</p>
        </div>
        <StarRating initial={5} />
        <TextArea id="comentario" name="comentario" label="Comentário" rows={3} placeholder="Conte como foi o serviço" />
        <PhotoPicker label="Foto" />
        <Card><Switch name="vitrine" label="Mostrar na vitrine" detalhe="Aparece só o bairro, nunca o endereço." defaultChecked /></Card>
      </Stack>
      <StickyActions><Button type="submit" variant="primary" block>Publicar avaliação</Button></StickyActions>
    </form>
  )
}
