'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Camera } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Chip, ChipRow } from '@/components/ui/Chip'
import { PhotoPicker } from '@/components/ui/Controls'
import { TextArea } from '@/components/ui/Field'
import { Eyebrow } from '@/components/ui/Meta'
import { Row, Stack } from '@/components/ui/Stack'
import { BackBar, StickyActions } from '@/components/layout/PageHeader'
import type { PedidoPrestador } from '@/lib/types'

/** Concluir com fotos de antes e depois; depois sugere postar na vitrine (V-02). */
export function ConcluirForm({ pedido }: { pedido: PedidoPrestador }) {
  const router = useRouter()
  const [garantia, setGarantia] = useState(true)
  return (
    <form onSubmit={(e) => { e.preventDefault(); router.push(`/app/postar?pedido=${pedido.id}`) }} style={{ maxWidth: 640 }}>
      <BackBar title="Concluir serviço" back="/app/agenda" />
      <Stack gap={4}>
        <h2 style={{ fontSize: 22 }}>{pedido.servico} · {pedido.bairro}</h2>
        <Eyebrow as="h3">Fotos do antes e do depois</Eyebrow>
        <PhotoPicker exemplos={['Antes', 'Depois']} />
        <TextArea id="feito" name="feito" label="O que foi feito" rows={3} required defaultValue="" placeholder="Ex.: troquei o sifão e refiz a vedação" />
        <ChipRow label="Garantia"><Chip selected={garantia} onClick={() => setGarantia(true)}>Garantia de 90 dias</Chip><Chip selected={!garantia} onClick={() => setGarantia(false)}>Sem garantia</Chip></ChipRow>
        <Card tone="soft"><Row start gap={2}><Camera size={18} color="var(--brand)" aria-hidden /><p style={{ fontSize: 13 }}>Depois de concluir, você pode postar este trabalho na vitrine com o selo Serviço verificado.</p></Row></Card>
      </Stack>
      <StickyActions>
        <Button variant="primary" block type="submit">Concluir e postar na vitrine</Button>
      </StickyActions>
    </form>
  )
}
