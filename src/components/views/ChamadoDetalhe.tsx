import { Sparkles } from 'lucide-react'
import { Badge, StatusBadge, UrgenteBadge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Eyebrow } from '@/components/ui/Meta'
import { Photo } from '@/components/ui/Photo'
import { Row, Stack } from '@/components/ui/Stack'
import { Steps } from '@/components/ui/Steps'
import { CATEGORIAS } from '@/lib/categorias'
import { ESTADOS, FLUXO } from '@/lib/estados'
import { imovel } from '@/lib/mock'
import type { Chamado } from '@/lib/types'

/** Detalhe do chamado: o que o inquilino escreveu, fotos, triagem da IA (G-05) e linha do tempo. */
export function ChamadoDetalhe({ chamado: c }: { chamado: Chamado }) {
  const im = imovel(c.imovelId)
  const atual = FLUXO.indexOf(c.estado)
  const passos = FLUXO.slice(0, 5).map((e) => ({ titulo: ESTADOS[e].rotulo, detalhe: c.eventos.find((ev) => ev.estado === e)?.detalhe ?? c.eventos.find((ev) => ev.estado === e)?.quando }))
  const Icon = CATEGORIAS[c.categoria].icone
  return (
    <Stack gap={4}>
      <Row wrap gap={2}>
        {c.urgente && <UrgenteBadge />}
        <StatusBadge estado={c.estado} />
        <Badge icon={Icon}>{CATEGORIAS[c.categoria].rotulo}</Badge>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-muted)' }}>{c.codigo}</span>
      </Row>
      <h2 style={{ fontSize: 22 }}>{c.titulo}</h2>
      <p>“{c.descricao}” <span style={{ color: 'var(--ink-muted)' }}>— {im?.contrato?.inquilino.nome.split(' ')[0]}, {im?.nome.split(' · ')[0]}</span></p>
      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: `repeat(${Math.min(c.fotos, 3)}, minmax(0, 1fr))` }}>
        {Array.from({ length: Math.min(c.fotos, 3) }, (_, n) => <Photo key={n} legenda={`Foto ${n + 1} do inquilino`} height={120} />)}
      </div>
      <Card tone="soft">
        <Row start gap={2}><Sparkles size={18} color="var(--brand)" aria-hidden style={{ flexShrink: 0 }} /><p style={{ fontSize: 14 }}><b>Triagem da IA:</b> {c.triagem}</p></Row>
      </Card>
      <Eyebrow as="h3">Linha do tempo</Eyebrow>
      <Steps passos={passos} atual={atual} />
    </Stack>
  )
}
