'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { reais } from '@/lib/format'

/** Saque via Pix. Só front: mostra a confirmação na tela. */
export function SaqueButton({ valor }: { valor: number }) {
  const [feito, setFeito] = useState(false)
  if (feito) return <span role="status" style={{ fontSize: 13, color: 'var(--accent)' }}>Saque de {reais(valor, true)} pedido. Cai em até 1 hora.</span>
  return <Button variant="accent" size="sm" onClick={() => setFeito(true)}>Sacar via Pix</Button>
}
