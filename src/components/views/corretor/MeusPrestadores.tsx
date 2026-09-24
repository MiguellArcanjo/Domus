'use client'

import { Plus, Star } from 'lucide-react'
import Link from 'next/link'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Chip, ChipRow } from '@/components/ui/Chip'
import { Row, Stack } from '@/components/ui/Stack'
import { NomeVerificado } from '@/components/domain/Prestador'
import { PageHeader } from '@/components/layout/PageHeader'
import { CATEGORIAS, CATEGORIA_IDS } from '@/lib/categorias'
import { nota } from '@/lib/format'
import { PRESTADORES } from '@/lib/mock'
import { useLocal } from '@/lib/store'
import { useState } from 'react'
import type { CategoriaId } from '@/lib/types'

/** Lista curada do corretor (M-02): prestadores de confiança, por categoria e bairro. */
export function MeusPrestadores() {
  const [cat, setCat] = useState<CategoriaId | undefined>()
  const [extras] = useLocal<Array<{ nome: string; oficio: string; email: string }>>('prestadoresManuais', [])
  const lista = PRESTADORES.slice(0, 4).filter((p) => !cat || p.categoria === cat)
  return (
    <Stack gap={4} style={{ maxWidth: 720 }}>
      <PageHeader title="Meus prestadores" subtitle="Quem você chama primeiro nos chamados" actions={<Button size="sm" variant="primary" icon={Plus} href="/app/meus-prestadores/novo">Adicionar</Button>} />
      <ChipRow label="Categoria"><Chip selected={!cat} onClick={() => setCat(undefined)}>Todos</Chip>{CATEGORIA_IDS.map((c) => <Chip key={c} icon={CATEGORIAS[c].icone} selected={cat === c} onClick={() => setCat(c)}>{CATEGORIAS[c].rotulo}</Chip>)}</ChipRow>
      {extras.map((e) => (
        <div key={e.email} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 14, borderRadius: 14, border: '1px solid var(--line)', background: 'var(--surface)' }}>
          <Avatar iniciais={e.nome.split(' ').map((x) => x[0]).join('').slice(0, 2).toUpperCase()} size={44} />
          <div style={{ flexGrow: 1 }}><b>{e.nome}</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{e.oficio}</p></div>
          <Badge tone="info">Convite enviado</Badge>
        </div>
      ))}
      {lista.map((p) => (
        <Link key={p.slug} href={`/app/prestadores/${p.slug}`} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 14, borderRadius: 14, border: '1px solid var(--line)', background: 'var(--surface)' }}>
          <Avatar iniciais={p.iniciais} size={44} />
          <div style={{ flexGrow: 1, minWidth: 0 }}><NomeVerificado p={p} size={15} /><p style={{ fontSize: 13, color: 'var(--ink-muted)', display: 'flex', gap: 4, alignItems: 'center' }}><Star size={13} aria-hidden />{nota(p.nota)} · {p.oficio} · {p.bairro}</p></div>
          <Row gap={2}><Badge>{p.servicosPeloApp > 30 ? '5 serviços com você' : '2 serviços com você'}</Badge></Row>
        </Link>
      ))}
    </Stack>
  )
}
