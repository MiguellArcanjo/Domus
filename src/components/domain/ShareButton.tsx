'use client'

import { useState } from 'react'
import { Check, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

/** Compartilhar: usa o menu do celular quando existe; senão copia o link. */
export function ShareButton({ titulo, label = 'Compartilhar' }: { titulo: string; label?: string }) {
  const [copiado, setCopiado] = useState(false)
  async function compartilhar() {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: titulo, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch {
      /* cancelado pela pessoa */
    }
  }
  return <Button icon={copiado ? Check : Share2} onClick={compartilhar}>{copiado ? 'Link copiado' : label}</Button>
}
