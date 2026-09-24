'use client'

import { useState } from 'react'
import { BadgeCheck, Clock, FileText, ShieldCheck } from 'lucide-react'
import { Badge, Selo } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Checkbox } from '@/components/ui/Extras'
import { Row, Stack } from '@/components/ui/Stack'
import { Steps } from '@/components/ui/Steps'
import { BackBar } from '@/components/layout/PageHeader'

/** Envio de documentos e antecedentes para o selo Prestador verificado (M-10). */
export function Verificacao() {
  const [enviado, setEnviado] = useState(false)
  const [docs, setDocs] = useState<Record<string, string>>({})
  const itens = [
    { id: 'doc', rotulo: 'Documento com foto (RG ou CNH)', icone: FileText },
    { id: 'selfie', rotulo: 'Selfie segurando o documento', icone: BadgeCheck },
    { id: 'endereco', rotulo: 'Comprovante de endereço', icone: FileText },
  ]
  return (
    <Stack gap={4} style={{ maxWidth: 640 }}>
      <BackBar title="Verificação" back="/app/conta" />
      <Card tone="soft"><Row start gap={3}><ShieldCheck size={22} color="var(--brand)" aria-hidden style={{ flexShrink: 0 }} /><div><b>Ganhe o selo</b> <Selo tipo="prestador" /><p style={{ fontSize: 13, marginTop: 6 }}>Prestadores verificados aparecem com o selo no card, no mapa e no perfil. Checamos o documento e os antecedentes criminais.</p></div></Row></Card>
      {enviado ? (
        <>
          <Steps atual={1} passos={[{ titulo: 'Documentos enviados', detalhe: 'Agora' }, { titulo: 'Em análise', detalhe: 'Até 2 dias úteis' }, { titulo: 'Selo liberado' }]} />
          <Card><Row gap={2}><Clock size={18} color="var(--info)" aria-hidden /><span>Status: <Badge tone="info">Em análise</Badge></span></Row><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>Avisamos por e-mail quando terminar.</p></Card>
        </>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setEnviado(true) }} style={{ display: 'grid', gap: 12 }}>
          {itens.map(({ id, rotulo, icone: Icon }) => (
            <label key={id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderRadius: 14, border: '1px solid var(--line)', background: 'var(--surface)', cursor: 'pointer', position: 'relative' }}>
              <Icon size={20} color="var(--brand)" aria-hidden />
              <span style={{ flexGrow: 1 }}><b style={{ fontSize: 14 }}>{rotulo}</b><br /><span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{docs[id] ?? 'Foto ou PDF, até 10 MB'}</span></span>
              {docs[id] ? <Badge tone="success">Anexado</Badge> : <Badge>Anexar</Badge>}
              <input type="file" accept="image/*,application/pdf" required style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} aria-label={rotulo} onChange={(e) => { const f = e.target.files?.[0]; if (f) setDocs((d) => ({ ...d, [id]: f.name })) }} />
            </label>
          ))}
          <Checkbox required label="Autorizo a consulta de antecedentes criminais para a verificação (LGPD)." />
          <Button type="submit" variant="primary" block>Enviar para análise</Button>
        </form>
      )}
    </Stack>
  )
}
