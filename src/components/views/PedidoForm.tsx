'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Chip, ChipRow } from '@/components/ui/Chip'
import { PhotoPicker } from '@/components/ui/Controls'
import { TextArea } from '@/components/ui/Field'
import { Eyebrow } from '@/components/ui/Meta'
import { Row, Stack } from '@/components/ui/Stack'
import { NomeVerificado } from '@/components/domain/Prestador'
import { BackBar, StickyActions } from '@/components/layout/PageHeader'
import { preco, reais } from '@/lib/format'
import type { Prestador } from '@/lib/types'

/** Pedido de serviço: item do catálogo, fotos, quando e detalhes. */
export function PedidoForm({ p }: { p: Prestador }) {
  const router = useRouter()
  const [item, setItem] = useState(p.precos[1]?.servico ?? p.precos[0].servico)
  const [quando, setQuando] = useState('Hoje')
  const escolhido = p.precos.find((i) => i.servico === item)!
  return (
    <form onSubmit={(e) => { e.preventDefault(); router.push(`/app/contratar/${p.slug}/pagamento?item=${encodeURIComponent(item)}&quando=${encodeURIComponent(quando)}`) }} style={{ maxWidth: 640 }}>
      <BackBar title="Pedir orçamento" back={`/app/prestadores/${p.slug}`} />
      <Stack gap={4}>
        <Row gap={3}><Avatar iniciais={p.iniciais} /><div><NomeVerificado p={p} size={15} /><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{p.oficio} · {p.bairro}</p></div></Row>
        <Eyebrow as="h2">1. O que você precisa</Eyebrow>
        <fieldset style={{ border: 0, padding: 0, margin: 0, display: 'grid' }}>
          <legend className="sr-only">Serviço</legend>
          {p.precos.map((i) => (
            <label key={i.servico} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--line)', cursor: 'pointer' }}>
              <input type="radio" name="item" value={i.servico} checked={item === i.servico} onChange={() => setItem(i.servico)} style={{ width: 20, height: 20, accentColor: 'var(--brand)' }} />
              <span style={{ flexGrow: 1 }}>{i.servico}</span>
              <b className="tabular" style={{ fontSize: 14 }}>{preco(i.preco, i.aPartirDe)}</b>
            </label>
          ))}
        </fieldset>
        <Eyebrow as="h2">2. Fotos do problema</Eyebrow>
        <PhotoPicker />
        <Eyebrow as="h2">3. Quando</Eyebrow>
        <ChipRow label="Quando">{['Hoje', 'Amanhã', 'Escolher data'].map((q) => <Chip key={q} selected={quando === q} onClick={() => setQuando(q)}>{q}</Chip>)}</ChipRow>
        <TextArea id="detalhes" name="detalhes" label="Detalhes (opcional)" rows={3} placeholder="Ex.: vazando embaixo da pia da cozinha" />
      </Stack>
      <StickyActions info={{ label: 'Estimativa', valor: reais(escolhido.preco) }}>
        <Button type="submit" variant="primary">Continuar</Button>
      </StickyActions>
    </form>
  )
}
