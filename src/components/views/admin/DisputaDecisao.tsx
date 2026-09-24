'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { RadioList } from '@/components/ui/Controls'
import { useToast } from '@/components/ui/Dialog'
import { TextArea } from '@/components/ui/Field'
import { reais } from '@/lib/format'

/** Decisão da disputa: liberar ao prestador, reembolsar o cliente ou dividir. */
export function DisputaDecisao({ valor }: { valor: number }) {
  const router = useRouter()
  const toast = useToast()
  const [enviando, setEnviando] = useState(false)
  return (
    <form onSubmit={(e) => { e.preventDefault(); setEnviando(true); toast('Decisão registrada. As partes foram avisadas por e-mail.'); router.push('/admin/disputas') }} style={{ display: 'grid', gap: 14 }}>
      <RadioList name="decisao" label="Decisão" defaultValue="parcial" options={[
        { value: 'prestador', label: 'Liberar tudo ao prestador', detalhe: reais(valor) },
        { value: 'cliente', label: 'Reembolsar o cliente', detalhe: reais(valor) },
        { value: 'parcial', label: 'Dividir (50% cada)', detalhe: reais(valor / 2) },
      ]} />
      <TextArea id="justificativa" label="Justificativa (vai para as duas partes)" rows={3} required />
      <Button type="submit" variant="primary" disabled={enviando}>Registrar decisão</Button>
    </form>
  )
}
