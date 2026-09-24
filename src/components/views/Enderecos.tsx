'use client'

import { useState } from 'react'
import { MapPin, Plus, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Confirm, Dialog, useToast } from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Field'
import { IconButton } from '@/components/ui/IconButton'
import { Row, Stack } from '@/components/ui/Stack'
import { BackBar } from '@/components/layout/PageHeader'
import { ENDERECOS } from '@/lib/mock'
import { useLocal } from '@/lib/store'

export type Endereco = (typeof ENDERECOS)[number]

/** Endereços do cliente para os pedidos. O prestador só vê o endereço completo depois de aceitar. */
export function Enderecos() {
  const toast = useToast()
  const [lista, setLista] = useLocal<Endereco[]>('enderecos', ENDERECOS)
  const [novo, setNovo] = useState(false)
  const [remover, setRemover] = useState<string | null>(null)
  return (
    <Stack gap={4} style={{ maxWidth: 640 }}>
      <BackBar title="Endereços" back="/app/conta" action={<IconButton icon={Plus} label="Novo endereço" tone="brand" onClick={() => setNovo(true)} />} />
      {lista.map((e) => (
        <Card key={e.id}>
          <Row start gap={3}>
            <MapPin size={20} color="var(--brand)" aria-hidden />
            <div style={{ flexGrow: 1 }}><b>{e.apelido}</b> {e.principal && <Badge tone="success">Principal</Badge>}<p style={{ fontSize: 14 }}>{e.linha}</p><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{e.bairro}</p></div>
            <IconButton icon={Trash2} label={`Remover ${e.apelido}`} tone="plain" onClick={() => setRemover(e.id)} />
          </Row>
          {!e.principal && <Button size="sm" variant="ghost" onClick={() => setLista((l) => l.map((x) => ({ ...x, principal: x.id === e.id })))}>Usar como principal</Button>}
        </Card>
      ))}
      <Dialog open={novo} onClose={() => setNovo(false)} title="Novo endereço" sheet>
        <form
          onSubmit={(ev) => {
            ev.preventDefault()
            const f = new FormData(ev.currentTarget)
            setLista((l) => [...l, { id: String(Date.now()), apelido: String(f.get('apelido')), linha: String(f.get('linha')), bairro: String(f.get('bairro')), principal: false }])
            setNovo(false)
            toast('Endereço salvo')
          }}
          style={{ display: 'grid', gap: 12 }}
        >
          <Input id="cep" name="cep" label="CEP" inputMode="numeric" required />
          <Input id="linha" name="linha" label="Rua, número e complemento" required />
          <Input id="bairro" name="bairro" label="Bairro" required />
          <Input id="apelido" name="apelido" label="Apelido" placeholder="Casa, trabalho…" required />
          <Button type="submit" variant="primary" block>Salvar endereço</Button>
        </form>
      </Dialog>
      <Confirm open={!!remover} onClose={() => setRemover(null)} onConfirm={() => { setLista((l) => l.filter((x) => x.id !== remover)); toast('Endereço removido') }} title="Remover este endereço?" confirmar="Remover" perigo />
    </Stack>
  )
}
