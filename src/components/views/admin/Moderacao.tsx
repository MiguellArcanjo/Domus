'use client'

import { useState } from 'react'
import { Flag } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useToast } from '@/components/ui/Dialog'
import { EmptyState } from '@/components/ui/Extras'
import { Photo } from '@/components/ui/Photo'
import { Row, Stack } from '@/components/ui/Stack'
import { PageHeader } from '@/components/layout/PageHeader'
import { FILA_MODERACAO, post, prestador } from '@/lib/mock'

/** Fila de moderação da vitrine (V-10): denúncias e o filtro automático. */
export function ModeracaoAdmin() {
  const toast = useToast()
  const [fila, setFila] = useState(FILA_MODERACAO)
  const decidir = (id: string, msg: string) => { setFila((l) => l.filter((x) => x.id !== id)); toast(msg) }
  return (
    <Stack gap={4} style={{ maxWidth: 900 }}>
      <PageHeader title="Moderação" subtitle={`${fila.length} itens na fila`} />
      {fila.length === 0 && <EmptyState icon={Flag} title="Fila vazia">Nenhum post esperando moderação.</EmptyState>}
      {fila.map((d) => {
        const po = post(d.postId)!
        return (
          <Card key={d.id}>
            <Row between><b>{po.titulo}</b><Badge tone={d.filtroAutomatico ? 'info' : 'warning'}>{d.denunciadoPor}</Badge></Row>
            <Row start gap={3}>
              <Photo legenda={po.fotoLegenda} height={120} width={160} radius={10} />
              <div style={{ display: 'grid', gap: 4 }}>
                <p style={{ fontSize: 14 }}><b>Motivo:</b> {d.motivo}</p>
                <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{prestador(po.prestadorSlug)?.nome} · {po.bairro} · {d.quando}</p>
                <p style={{ fontSize: 14 }}>{po.descricao}</p>
              </div>
            </Row>
            <Row wrap gap={2}>
              <Button onClick={() => decidir(d.id, 'Post mantido')}>Manter</Button>
              <Button onClick={() => decidir(d.id, 'Dados ocultados na foto')}>Ocultar dados e manter</Button>
              <Button variant="danger" onClick={() => decidir(d.id, 'Post removido e prestador avisado')}>Remover post</Button>
            </Row>
          </Card>
        )
      })}
    </Stack>
  )
}
