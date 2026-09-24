'use client'

import { useState, useSyncExternalStore } from 'react'
import { BellRing } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useToast } from '@/components/ui/Dialog'
import { Row, Stack } from '@/components/ui/Stack'
import { BackBar } from '@/components/layout/PageHeader'
import { PREFERENCIAS_AVISO } from '@/lib/mock'
import { useLocal } from '@/lib/store'

/** Preferências de aviso por e-mail e push, por tipo de evento. */
export function PreferenciasAvisos() {
  const toast = useToast()
  const [prefs, setPrefs] = useLocal('preferenciasAviso', PREFERENCIAS_AVISO)
  const permissao = useSyncExternalStore(() => () => {}, () => (typeof Notification === 'undefined' ? 'indisponivel' : Notification.permission), () => 'indisponivel' as const)
  const [pedido, setPush] = useState<NotificationPermission | null>(null)
  const push = pedido ?? permissao
  const alternar = (id: string, canal: 'email' | 'push') => setPrefs((l) => l.map((p) => (p.id === id ? { ...p, [canal]: !p[canal] } : p)))
  return (
    <Stack gap={4} style={{ maxWidth: 640 }}>
      <BackBar title="Avisos" back="/app/conta" />
      {push !== 'granted' && push !== 'indisponivel' && (
        <Card tone="soft">
          <Row start gap={3}><BellRing size={20} color="var(--brand)" aria-hidden /><div style={{ flexGrow: 1 }}><b>Receba avisos no celular</b><p style={{ fontSize: 13 }}>{push === 'denied' ? 'Os avisos estão bloqueados no navegador. Libere nas configurações do site.' : 'Instale o Domu na tela inicial e ative os avisos.'}</p></div></Row>
          {push === 'default' && <Button size="sm" variant="primary" onClick={async () => { try { setPush(await Notification.requestPermission()) } catch { setPush('denied') } }}>Ativar avisos</Button>}
        </Card>
      )}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead><tr><th style={{ textAlign: 'left', padding: '8px 0', color: 'var(--ink-muted)', fontWeight: 500 }}>Aviso</th><th style={{ width: 70, color: 'var(--ink-muted)', fontWeight: 500 }}>E-mail</th><th style={{ width: 70, color: 'var(--ink-muted)', fontWeight: 500 }}>Push</th></tr></thead>
        <tbody>
          {prefs.map((p) => (
            <tr key={p.id} style={{ borderTop: '1px solid var(--line)' }}>
              <td style={{ padding: '12px 0' }}>{p.rotulo}</td>
              <td style={{ textAlign: 'center' }}><input type="checkbox" role="switch" aria-label={`${p.rotulo} por e-mail`} checked={p.email} onChange={() => alternar(p.id, 'email')} style={{ width: 22, height: 22, accentColor: 'var(--brand)' }} /></td>
              <td style={{ textAlign: 'center' }}><input type="checkbox" role="switch" aria-label={`${p.rotulo} por push`} checked={p.push} onChange={() => alternar(p.id, 'push')} style={{ width: 22, height: 22, accentColor: 'var(--brand)' }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="primary" onClick={() => toast('Preferências salvas')}>Salvar</Button>
    </Stack>
  )
}
