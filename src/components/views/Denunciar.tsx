'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { RadioList } from '@/components/ui/Controls'
import { useToast } from '@/components/ui/Dialog'
import { TextArea } from '@/components/ui/Field'
import { Stack } from '@/components/ui/Stack'
import { BackBar } from '@/components/layout/PageHeader'

/** Denúncia de post (V-10). Vai para a fila de moderação da operação. */
export function Denunciar({ postId }: { postId: string }) {
  const router = useRouter()
  const toast = useToast()
  const [enviando, setEnviando] = useState(false)
  return (
    <form onSubmit={(e) => { e.preventDefault(); setEnviando(true); toast('Denúncia enviada. Vamos analisar em até 24 horas.'); router.push(`/app/post/${postId}`) }} style={{ maxWidth: 560 }}>
      <BackBar title="Denunciar post" back={`/app/post/${postId}`} />
      <Stack gap={4}>
        <RadioList name="motivo" label="Motivo" defaultValue="dados" options={[
          { value: 'dados', label: 'Mostra dados pessoais (rosto, placa, número da casa)' },
          { value: 'contato', label: 'Tem telefone ou link para contratar por fora' },
          { value: 'falso', label: 'O trabalho não é deste prestador' },
          { value: 'impróprio', label: 'Conteúdo impróprio ou ofensivo' },
          { value: 'outro', label: 'Outro motivo' },
        ]} />
        <TextArea id="detalhe" name="detalhe" label="Detalhes (opcional)" rows={3} />
        <Button type="submit" variant="danger" block disabled={enviando}>Enviar denúncia</Button>
      </Stack>
    </form>
  )
}
