'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Chip, ChipRow } from '@/components/ui/Chip'
import { PhotoPicker } from '@/components/ui/Controls'
import { useToast } from '@/components/ui/Dialog'
import { Select } from '@/components/ui/Extras'
import { TextArea } from '@/components/ui/Field'
import { IconButton } from '@/components/ui/IconButton'
import { Row, Stack } from '@/components/ui/Stack'
import { BackBar, StickyActions } from '@/components/layout/PageHeader'
import { COMODOS_PADRAO, IMOVEIS } from '@/lib/mock'

/** Vistoria por cômodo: estado, observação e fotos (G-12). */
export function NovaVistoria() {
  const router = useRouter()
  const toast = useToast()
  const params = useSearchParams()
  const [tipo, setTipo] = useState(params.get('tipo') === 'saida' ? 'saida' : 'entrada')
  const [comodos, setComodos] = useState(COMODOS_PADRAO.map((nome) => ({ nome, estado: 'bom' })))
  const [novo, setNovo] = useState('')
  return (
    <form onSubmit={(e) => { e.preventDefault(); toast('Vistoria salva. O inquilino recebe uma cópia por e-mail.'); router.push(`/app/vistorias?imovel=${params.get('imovel') ?? IMOVEIS[0].id}`) }} style={{ maxWidth: 720 }}>
      <BackBar title="Nova vistoria" back="/app/vistorias" />
      <Stack gap={4}>
        <Select id="imovel" label="Imóvel" defaultValue={params.get('imovel') ?? IMOVEIS[0].id}>{IMOVEIS.map((i) => <option key={i.id} value={i.id}>{i.nome}</option>)}</Select>
        <ChipRow label="Tipo"><Chip selected={tipo === 'entrada'} onClick={() => setTipo('entrada')}>Entrada</Chip><Chip selected={tipo === 'saida'} onClick={() => setTipo('saida')}>Saída</Chip></ChipRow>
        {comodos.map((c, n) => (
          <fieldset key={`${c.nome}-${n}`} style={{ border: '1px solid var(--line)', borderRadius: 16, padding: 14, margin: 0, display: 'grid', gap: 12, background: 'var(--surface)' }}>
            <legend style={{ padding: '0 6px', fontWeight: 650 }}>{c.nome}</legend>
            <Row between>
              <ChipRow label={`Estado de ${c.nome}`}>{(['bom', 'regular', 'ruim'] as const).map((e) => <Chip key={e} selected={c.estado === e} onClick={() => setComodos((l) => l.map((x, i) => (i === n ? { ...x, estado: e } : x)))}>{e === 'bom' ? 'Bom' : e === 'regular' ? 'Regular' : 'Ruim'}</Chip>)}</ChipRow>
              <IconButton icon={Trash2} label={`Remover ${c.nome}`} onClick={() => setComodos((l) => l.filter((_, i) => i !== n))} tone="plain" />
            </Row>
            <TextArea id={`obs-${n}`} label="Observações" rows={2} placeholder="Ex.: paredes pintadas, piso sem riscos" />
            <PhotoPicker label="Fotos" />
          </fieldset>
        ))}
        <Row gap={2}>
          <label style={{ flexGrow: 1 }}><span className="sr-only">Nome do cômodo</span><input value={novo} onChange={(e) => setNovo(e.target.value)} placeholder="Outro cômodo (ex.: Varanda)" style={{ width: '100%', height: 44, borderRadius: 12, border: '1px solid var(--line-strong)', padding: '0 12px', background: 'var(--surface)' }} /></label>
          <Button icon={Plus} onClick={() => { if (novo.trim()) { setComodos((l) => [...l, { nome: novo.trim(), estado: 'bom' }]); setNovo('') } }}>Adicionar</Button>
        </Row>
      </Stack>
      <StickyActions><Button type="submit" variant="primary" block>Concluir vistoria</Button></StickyActions>
    </form>
  )
}
