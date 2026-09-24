import type { Metadata } from 'next'
import { MeuPerfil } from '@/components/views/prestador/MeuPerfil'

export const metadata: Metadata = { title: 'Meu perfil público' }

export default function Page() {
  return <MeuPerfil />
}
