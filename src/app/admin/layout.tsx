import type { Metadata } from 'next'
import { AdminShell } from '@/components/layout/AdminShell'

export const metadata: Metadata = { title: { default: 'Operação', template: '%s · Operação Domu' }, robots: { index: false } }

/** Área interna da equipe Domu. O backend deve exigir o papel de operação para todas estas rotas. */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>
}
