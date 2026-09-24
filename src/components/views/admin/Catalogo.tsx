'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Dialog, useToast } from '@/components/ui/Dialog'
import { Select } from '@/components/ui/Extras'
import { Input } from '@/components/ui/Field'
import { Stack } from '@/components/ui/Stack'
import { PageHeader } from '@/components/layout/PageHeader'
import { Panel } from '@/components/patterns/Responsive'
import { CATEGORIAS, CATEGORIA_IDS } from '@/lib/categorias'
import { reais } from '@/lib/format'
import { CATALOGO } from '@/lib/mock'
import type { CategoriaId } from '@/lib/types'

/** Catálogo de serviços padronizados (M-04), mantido pela operação. */
export function CatalogoAdmin() {
  const toast = useToast()
  const [lista, setLista] = useState(CATALOGO)
  const [novo, setNovo] = useState(false)
  return (
    <Stack gap={4} style={{ maxWidth: 1000 }}>
      <PageHeader title="Catálogo de serviços" subtitle={`${lista.length} itens`} actions={<Button variant="primary" size="sm" icon={Plus} onClick={() => setNovo(true)}>Novo item</Button>} />
      <Panel flush label="Itens do catálogo">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead><tr>{['Serviço', 'Categoria', 'Preço médio na região', 'Prestadores'].map((t) => <th key={t} style={{ textAlign: 'left', padding: '10px 16px', borderBottom: '1px solid var(--line)', fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', color: 'var(--ink-muted)', fontWeight: 500 }}>{t}</th>)}</tr></thead>
            <tbody>{lista.map((c, n) => <tr key={c.id}><td style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}><b>{c.nome}</b></td><td style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>{CATEGORIAS[c.categoria].rotulo}</td><td style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }} className="tabular">{reais(c.precoMedio)}</td><td style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>{(n % 4) + 1}</td></tr>)}</tbody>
          </table>
        </div>
      </Panel>
      <Dialog open={novo} onClose={() => setNovo(false)} title="Novo item do catálogo">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const f = new FormData(e.currentTarget)
            setLista((l) => [...l, { id: String(Date.now()), nome: String(f.get('nome')), categoria: f.get('categoria') as CategoriaId, precoMedio: Number(f.get('preco')) || 0 }])
            setNovo(false)
            toast('Item adicionado ao catálogo')
          }}
          style={{ display: 'grid', gap: 12 }}
        >
          <Input id="nome" name="nome" label="Nome do serviço" required />
          <Select id="categoria" name="categoria" label="Categoria" defaultValue="hidraulica">{CATEGORIA_IDS.map((c) => <option key={c} value={c}>{CATEGORIAS[c].rotulo}</option>)}</Select>
          <Input id="preco" name="preco" label="Preço de referência (R$)" inputMode="numeric" required />
          <Button type="submit" variant="primary" block>Adicionar</Button>
        </form>
      </Dialog>
    </Stack>
  )
}
