'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Confirm, useToast } from '@/components/ui/Dialog'
import { Stack } from '@/components/ui/Stack'
import { PageHeader } from '@/components/layout/PageHeader'
import { Panel } from '@/components/patterns/Responsive'
import { USUARIOS_ADMIN } from '@/lib/mock'

/** Busca de usuários e suspensão de conta. */
export function UsuariosAdmin() {
  const toast = useToast()
  const [q, setQ] = useState('')
  const [lista, setLista] = useState(USUARIOS_ADMIN)
  const [suspender, setSuspender] = useState<string | null>(null)
  const filtrados = lista.filter((u) => `${u.nome} ${u.email}`.toLowerCase().includes(q.toLowerCase()))
  return (
    <Stack gap={4} style={{ maxWidth: 1000 }}>
      <PageHeader title="Usuários" />
      <label><span className="sr-only">Buscar usuário</span><input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nome ou e-mail" style={{ width: '100%', height: 48, borderRadius: 999, border: '1px solid var(--line)', padding: '0 16px', background: 'var(--surface)' }} /></label>
      <Panel flush label="Usuários">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead><tr>{['Nome', 'E-mail', 'Perfis', 'Desde', 'Status', ''].map((t) => <th key={t} style={{ textAlign: 'left', padding: '10px 16px', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', color: 'var(--ink-muted)', fontWeight: 500 }}>{t}</th>)}</tr></thead>
            <tbody>
              {filtrados.map((u) => (
                <tr key={u.email}>
                  {[<b key="n">{u.nome}</b>, u.email, u.perfis, u.criadoEm, <Badge key="s" tone={u.status === 'Ativo' ? 'success' : u.status === 'Suspenso' ? 'danger' : 'info'}>{u.status}</Badge>,
                    u.status !== 'Suspenso' ? <Button key="a" size="sm" variant="danger" onClick={() => setSuspender(u.email)}>Suspender</Button> : null].map((c, i) => <td key={i} style={{ padding: '10px 16px', borderBottom: '1px solid var(--line)' }}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
      <Confirm open={!!suspender} onClose={() => setSuspender(null)} onConfirm={() => { setLista((l) => l.map((u) => (u.email === suspender ? { ...u, status: 'Suspenso' } : u))); toast('Conta suspensa') }} title="Suspender esta conta?" description="A pessoa não consegue mais entrar. Pedidos em andamento continuam com a operação." confirmar="Suspender" perigo />
    </Stack>
  )
}
