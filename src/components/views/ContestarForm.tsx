'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PhotoPicker } from '@/components/ui/Controls'
import { TextArea } from '@/components/ui/Field'
import { Stack } from '@/components/ui/Stack'
import { BackBar } from '@/components/layout/PageHeader'

/** Contestação com fotos (M-11): o pagamento fica retido até a resolução. */
export function ContestarForm({ id }: { id: string }) {
  const [enviado, setEnviado] = useState(false)
  return (
    <Stack gap={4} style={{ maxWidth: 640 }}>
      <BackBar title="Contestar serviço" back={`/app/meus-pedidos/${id}`} />
      {enviado ? (
        <Card tone="soft"><p role="status">Contestação aberta. O pagamento fica guardado até a resolução, e a equipe Domu responde em até 2 dias úteis.</p><Button href="/app/meus-pedidos">Voltar aos pedidos</Button></Card>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setEnviado(true) }} style={{ display: 'grid', gap: 16 }}>
          <TextArea id="motivo" name="motivo" label="O que deu errado?" rows={4} required placeholder="Ex.: o vazamento voltou no dia seguinte" />
          <PhotoPicker />
          <Button type="submit" variant="danger" block>Abrir contestação</Button>
        </form>
      )}
    </Stack>
  )
}
