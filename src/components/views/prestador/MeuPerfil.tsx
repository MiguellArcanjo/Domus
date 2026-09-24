'use client'

import { useRouter } from 'next/navigation'
import { Camera, ExternalLink } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Chip, ChipRow } from '@/components/ui/Chip'
import { useToast } from '@/components/ui/Dialog'
import { Select } from '@/components/ui/Extras'
import { Input, TextArea } from '@/components/ui/Field'
import { Slider } from '@/components/ui/Slider'
import { Stack } from '@/components/ui/Stack'
import { BackBar, StickyActions } from '@/components/layout/PageHeader'
import { CATEGORIAS, CATEGORIA_IDS } from '@/lib/categorias'
import { BAIRROS, EU_PRESTADOR, prestador } from '@/lib/mock'
import { useState } from 'react'
import type { CategoriaId } from '@/lib/types'

/** Edição do perfil público do prestador: foto, nome, sobre, categorias, bairro e raio. */
export function MeuPerfil() {
  const router = useRouter()
  const toast = useToast()
  const p = prestador(EU_PRESTADOR)!
  const [cats, setCats] = useState<CategoriaId[]>([p.categoria])
  return (
    <form onSubmit={(e) => { e.preventDefault(); toast('Perfil atualizado'); router.push('/app/conta') }} style={{ maxWidth: 640 }}>
      <BackBar title="Meu perfil público" back="/app/conta" action={<Button size="sm" variant="ghost" icon={ExternalLink} href={`/p/${p.slug}`}>Ver</Button>} />
      <Stack gap={4}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Avatar iniciais={p.iniciais} size={72} />
          <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center', color: 'var(--brand)', fontWeight: 600, cursor: 'pointer', position: 'relative' }}>
            <Camera size={18} aria-hidden />Trocar foto
            <input type="file" accept="image/*" style={{ position: 'absolute', inset: 0, opacity: 0 }} aria-label="Trocar foto de perfil" />
          </label>
        </div>
        <Input id="nome" label="Nome" defaultValue={p.nome} required />
        <Input id="oficio" label="Ofício" defaultValue={p.oficio} required />
        <TextArea id="sobre" label="Sobre você" rows={3} defaultValue="Encanador há 12 anos, especialista em vazamentos e desentupimento." hint="Telefones, @ e links são removidos." />
        <ChipRow wrap label="Categorias">{CATEGORIA_IDS.map((c) => <Chip key={c} icon={CATEGORIAS[c].icone} selected={cats.includes(c)} onClick={() => setCats((l) => (l.includes(c) ? l.filter((x) => x !== c) : [...l, c]))}>{CATEGORIAS[c].rotulo}</Chip>)}</ChipRow>
        <Select id="bairro" label="Bairro" defaultValue={p.bairro}>{BAIRROS.map((b) => <option key={b}>{b}</option>)}</Select>
        <Slider id="raio" label="Raio de atendimento" min={2} max={30} defaultValue={p.raioKm} unidade=" km" />
      </Stack>
      <StickyActions><Button type="submit" variant="primary" block>Salvar perfil</Button></StickyActions>
    </form>
  )
}
