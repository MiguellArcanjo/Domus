'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Chip, ChipRow } from '@/components/ui/Chip'
import { PhotoPicker } from '@/components/ui/Controls'
import { TextArea } from '@/components/ui/Field'
import { Eyebrow } from '@/components/ui/Meta'
import { Stack } from '@/components/ui/Stack'
import { BackBar } from '@/components/layout/PageHeader'

/** O inquilino abre o chamado com texto e foto. A categoria vem da triagem por IA, não do inquilino. */
export function AbrirChamadoForm({ token }: { token: string }) {
  const router = useRouter()
  const [urgente, setUrgente] = useState(true)
  return (
    <form onSubmit={(e) => { e.preventDefault(); router.push(`/c/${token}/chamados/8f3k2?novo=1`) }}>
      <BackBar title="Abrir chamado" back={`/c/${token}`} />
      <Stack gap={4}>
        <TextArea id="oque" name="descricao" label="O que aconteceu?" rows={3} required placeholder="Ex.: tá vazando embaixo da pia" />
        <Eyebrow as="h2">Fotos</Eyebrow>
        <PhotoPicker />
        <Eyebrow as="h2">É urgente?</Eyebrow>
        <ChipRow label="Urgência"><Chip selected={urgente} onClick={() => setUrgente(true)}>Sim, está piorando</Chip><Chip selected={!urgente} onClick={() => setUrgente(false)}>Pode esperar</Chip></ChipRow>
        <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>Não precisa escolher categoria. A gente identifica e avisa o corretor.</p>
        <Button type="submit" variant="primary" block>Enviar chamado</Button>
      </Stack>
    </form>
  )
}
