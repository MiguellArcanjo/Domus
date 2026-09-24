import type { Metadata } from 'next'
import { Inicio } from '@/components/views/web/Inicio'

export const metadata: Metadata = { title: 'Início' }

/** Início do site com login (reduzido). A operação do dia a dia fica no app mobile. */
export default function Page() {
  return <Inicio />
}
