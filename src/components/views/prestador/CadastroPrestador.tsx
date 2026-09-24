'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, FileCheck2 } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Chip, ChipRow } from '@/components/ui/Chip'
import { PhotoPicker } from '@/components/ui/Controls'
import { Checkbox, Select } from '@/components/ui/Extras'
import { Input, TextArea } from '@/components/ui/Field'
import { Eyebrow } from '@/components/ui/Meta'
import { Slider } from '@/components/ui/Slider'
import { Stack } from '@/components/ui/Stack'
import { BackBar, StickyActions } from '@/components/layout/PageHeader'
import { CATEGORIAS, CATEGORIA_IDS } from '@/lib/categorias'
import { BAIRROS } from '@/lib/mock'
import { useLocal } from '@/lib/store'
import type { CategoriaId } from '@/lib/types'
import { PrecosEditor } from './PrecosEditor'

const ETAPAS = ['Seus dados', 'O que você faz', 'Onde você atende', 'Seus preços', 'Seus trabalhos']

/** Cadastro do prestador (M-01) em 5 etapas, até os primeiros posts da vitrine. */
export function CadastroPrestador() {
  const router = useRouter()
  const [etapa, setEtapa] = useState(0)
  const [cats, setCats] = useState<CategoriaId[]>(['hidraulica'])
  const [, setCadastrado] = useLocal('prestadorCadastrado', false)

  function avancar(e: React.FormEvent) {
    e.preventDefault()
    if (etapa < ETAPAS.length - 1) return setEtapa(etapa + 1)
    setCadastrado(true)
    router.push('/app/pedidos?bemvindo=1')
  }
  const alternarCat = (c: CategoriaId) => setCats((l) => (l.includes(c) ? (l.length > 1 ? l.filter((x) => x !== c) : l) : [...l, c]))

  return (
    <form onSubmit={avancar} style={{ maxWidth: 640 }}>
      <BackBar title="Cadastro de prestador" back="/app/conta" action={<span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{etapa + 1} de {ETAPAS.length}</span>} />
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }} aria-hidden>{ETAPAS.map((e, i) => <span key={e} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= etapa ? 'var(--brand)' : 'var(--line)' }} />)}</div>
      <Stack gap={4}>
        <h2 style={{ fontSize: 22 }}>{ETAPAS[etapa]}</h2>
        {etapa === 0 && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Avatar iniciais="JB" size={72} />
              <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center', color: 'var(--brand)', fontWeight: 600, cursor: 'pointer', position: 'relative' }}>
                <Camera size={18} aria-hidden />Adicionar foto de rosto
                <input type="file" accept="image/*" style={{ position: 'absolute', inset: 0, opacity: 0 }} aria-label="Foto de perfil" />
              </label>
            </div>
            <Input id="nome-publico" label="Nome que aparece para os clientes" defaultValue="João Batista" required />
            <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
              <Select id="tipo-doc" label="Documento" defaultValue="cpf"><option value="cpf">CPF</option><option value="cnpj">CNPJ</option></Select>
              <Input id="documento" label="Número" inputMode="numeric" placeholder="000.000.000-00" required />
            </div>
            <Input id="telefone-contato" label="Celular (só o Domu vê)" type="tel" inputMode="tel" placeholder="(11) 90000-0000" hint="Usamos para avisos importantes. Os clientes falam com você pelo app." />
          </>
        )}
        {etapa === 1 && (
          <>
            <p style={{ color: 'var(--ink-muted)' }}>Escolha uma ou mais categorias.</p>
            <ChipRow wrap label="Categorias">{CATEGORIA_IDS.map((c) => <Chip key={c} icon={CATEGORIAS[c].icone} selected={cats.includes(c)} onClick={() => alternarCat(c)}>{CATEGORIAS[c].rotulo}</Chip>)}</ChipRow>
            <TextArea id="sobre" name="sobre" label="Sobre você" rows={3} placeholder="Ex.: encanador há 12 anos, especialista em vazamentos." hint="Telefones, @ e links são removidos." />
          </>
        )}
        {etapa === 2 && (
          <>
            <Select id="bairro" label="Bairro de onde você sai" defaultValue="Vila Mariana">{BAIRROS.map((b) => <option key={b}>{b}</option>)}</Select>
            <Slider id="raio" label="Até onde você atende" min={2} max={30} defaultValue={8} unidade=" km" />
            <Eyebrow>Dias e horários</Eyebrow>
            <ChipRow wrap label="Dias">{['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((d, i) => <DiaChip key={d} dia={d} inicial={i < 6} />)}</ChipRow>
            <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
              <Input id="hora-ini" label="Das" type="time" defaultValue="08:00" />
              <Input id="hora-fim" label="Até" type="time" defaultValue="18:00" />
            </div>
          </>
        )}
        {etapa === 3 && (
          <>
            <p style={{ color: 'var(--ink-muted)' }}>Preço antes de contratar é o que faz o cliente escolher você. Ligue os serviços que você faz e defina o valor.</p>
            <PrecosEditor categorias={cats} />
          </>
        )}
        {etapa === 4 && (
          <>
            <p style={{ color: 'var(--ink-muted)' }}>Poste de 3 a 5 trabalhos que você já fez. Eles aparecem na vitrine e no seu perfil (sem o selo verificado, que vem com os serviços pagos pelo app).</p>
            <PhotoPicker label="Fotos" />
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: 12, borderRadius: 14, background: 'var(--brand-soft)' }}>
              <FileCheck2 size={20} color="var(--brand)" aria-hidden style={{ flexShrink: 0 }} />
              <p style={{ fontSize: 13 }}>Depois do cadastro, envie os documentos em Verificação para ganhar o selo Prestador verificado.</p>
            </div>
            <Checkbox required label="Concordo em combinar e receber pelo app. Taxa de 8% só sobre o serviço fechado." />
          </>
        )}
      </Stack>
      <StickyActions>
        {etapa > 0 && <Button onClick={() => setEtapa(etapa - 1)}>Voltar</Button>}
        <Button type="submit" variant="primary">{etapa < ETAPAS.length - 1 ? 'Continuar' : 'Concluir cadastro'}</Button>
      </StickyActions>
    </form>
  )
}

function DiaChip({ dia, inicial }: { dia: string; inicial: boolean }) {
  const [on, setOn] = useState(inicial)
  return <Chip selected={on} onClick={() => setOn(!on)}>{dia}</Chip>
}
