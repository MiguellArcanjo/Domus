import type { Metadata } from 'next'
import { TenantShell } from '@/components/layout/TenantShell'

export const metadata: Metadata = { title: 'Seu imóvel', robots: { index: false } }

export default function InquilinoLayout({ children }: { children: React.ReactNode }) {
  return <TenantShell>{children}</TenantShell>
}
