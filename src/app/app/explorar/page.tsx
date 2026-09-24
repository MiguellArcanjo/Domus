import type { Metadata } from 'next'
import { Explorar } from '@/components/patterns/Explorar'

export const metadata: Metadata = { title: 'Explorar' }

/** Vitrine (lista) e mapa. No celular, o botão no canto troca a visão; no computador, as duas ficam lado a lado. */
export default function ExplorarPage() {
  return <Explorar />
}
