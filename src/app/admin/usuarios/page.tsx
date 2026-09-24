import type { Metadata } from 'next'
import { UsuariosAdmin } from '@/components/views/admin/Usuarios'

export const metadata: Metadata = { title: 'Usuários' }

export default function Page() {
  return <UsuariosAdmin />
}
