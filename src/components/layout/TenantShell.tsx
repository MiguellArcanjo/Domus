import { Logo } from '@/components/ui/Logo'

/** Casca do link do inquilino: sem login, estreita e leve (funciona em 3G). */
export function TenantShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '16px var(--gutter) 32px', minHeight: '100dvh' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <Logo size={20} />
        <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>link seguro do seu contrato</span>
      </header>
      {children}
    </div>
  )
}
