import type { Metadata } from 'next'
import { CatalogoAdmin } from '@/components/views/admin/Catalogo'

export const metadata: Metadata = { title: 'Catálogo' }

export default function Page() {
  return <CatalogoAdmin />
}
