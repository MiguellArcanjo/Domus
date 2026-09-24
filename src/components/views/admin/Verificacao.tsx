'use client'

import { useState } from 'react'
import { FileText, ShieldCheck } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Dialog, useToast } from '@/components/ui/Dialog'
import { EmptyState } from '@/components/ui/Extras'
import { TextArea } from '@/components/ui/Field'
import { Photo } from '@/components/ui/Photo'
import { Row, Stack } from '@/components/ui/Stack'
import { PageHeader } from '@/components/layout/PageHeader'
import { FILA_VERIFICACAO } from '@/lib/mock'

/** Curadoria: conferir documento e antecedentes e liberar o selo (M-10). */
export function VerificacaoAdmin() {
  const toast = useToast()
  const [fila, setFila] = useState(FILA_VERIFICACAO)
  const [reprovar, setReprovar] = useState<string | null>(null)
  const tirar = (slug: string) => setFila((l) => l.filter((x) => x.slug !== slug))
  return (
    <Stack gap={4} style={{ maxWidth: 900 }}>
      <PageHeader title="Verificação de prestadores" subtitle={`${fila.length} na fila`} />
      {fila.length === 0 && <EmptyState icon={ShieldCheck} title="Fila vazia">Nenhum prestador esperando verificação.</EmptyState>}
      {fila.map((p) => (
        <Card key={p.slug}>
          <Row between><Row gap={3}><Avatar iniciais={p.nome.split(' ').map((x) => x[0]).join('')} /><div><b>{p.nome}</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{p.oficio} · enviado {p.enviadoEm}</p></div></Row><Badge tone="info">Pendente</Badge></Row>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
            <Photo legenda={`Documento (${p.documento})`} height={110} radius={10} />
            <Photo legenda="Selfie com documento" height={110} radius={10} />
            <Photo legenda="Comprovante de endereço" height={110} radius={10} />
          </div>
          <Row gap={2}><FileText size={16} aria-hidden /><span style={{ fontSize: 14 }}>Antecedentes: <b>{p.antecedentes}</b></span></Row>
          <Row wrap gap={2}>
            <Button variant="primary" onClick={() => { tirar(p.slug); toast(`${p.nome} verificado. Selo liberado.`) }}>Aprovar e liberar selo</Button>
            <Button variant="danger" onClick={() => setReprovar(p.slug)}>Reprovar</Button>
          </Row>
        </Card>
      ))}
      <Dialog open={!!reprovar} onClose={() => setReprovar(null)} title="Reprovar verificação" description="O prestador recebe o motivo por e-mail e pode enviar de novo.">
        <form onSubmit={(e) => { e.preventDefault(); if (reprovar) tirar(reprovar); setReprovar(null); toast('Verificação reprovada') }} style={{ display: 'grid', gap: 12 }}>
          <TextArea id="motivo" label="Motivo" rows={3} required placeholder="Ex.: foto do documento ilegível" />
          <Button type="submit" variant="danger" block>Reprovar</Button>
        </form>
      </Dialog>
    </Stack>
  )
}
