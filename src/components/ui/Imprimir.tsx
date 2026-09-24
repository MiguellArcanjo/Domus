'use client'

import { Printer } from 'lucide-react'
import { Button } from './Button'

/** Abre a impressão do navegador (dá para salvar como PDF). */
export function Imprimir({ children = 'Imprimir' }: { children?: string }) {
  return <Button size="sm" icon={Printer} onClick={() => window.print()}>{children}</Button>
}
