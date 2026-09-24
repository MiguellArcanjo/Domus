'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Chip, ChipRow } from '@/components/ui/Chip'
import { PhotoPicker } from '@/components/ui/Controls'
import { Input } from '@/components/ui/Field'
import { Eyebrow } from '@/components/ui/Meta'
import { Stack } from '@/components/ui/Stack'
import { BackBar, StickyActions } from '@/components/layout/PageHeader'

const ETAPAS = ['Endereço e tipo', 'Inquilino e contrato', 'Enviar o link']

/** Cadastro de imóvel (G-01) e contrato (G-02) em 3 etapas. Só front: ao terminar abre o imóvel de exemplo. */
export function NovoImovelForm() {
  const router = useRouter()
  const inicial = Number(useSearchParams().get('etapa') ?? 1) - 1
  const [etapa, setEtapa] = useState(Math.min(2, Math.max(0, inicial)))
  const [tipo, setTipo] = useState('Apartamento')
  const [indice, setIndice] = useState('IGP-M')

  function avancar(e: React.FormEvent) {
    e.preventDefault()
    if (etapa < 2) setEtapa(etapa + 1)
    else router.push('/app/imoveis/ap-32-acacias/link')
  }

  return (
    <form onSubmit={avancar} style={{ maxWidth: 560 }}>
      <BackBar title="Novo imóvel" back="/app/imoveis" action={<span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{etapa + 1} de 3</span>} />
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }} aria-hidden>
        {ETAPAS.map((e, i) => <span key={e} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= etapa ? 'var(--brand)' : 'var(--line)' }} />)}
      </div>
      <Stack gap={4}>
        <h2 style={{ fontSize: 22 }}>{ETAPAS[etapa]}</h2>
        {etapa === 0 && (
          <>
            <Input id="cep" label="CEP" inputMode="numeric" placeholder="00000-000" required />
            <Input id="endereco" label="Endereço" placeholder="Rua, número e complemento" required />
            <Input id="proprietario" label="Proprietário" placeholder="Nome de quem recebe o repasse" required />
            <ChipRow label="Tipo">{['Apartamento', 'Casa', 'Comercial'].map((t) => <Chip key={t} selected={tipo === t} onClick={() => setTipo(t)}>{t}</Chip>)}</ChipRow>
            <Eyebrow>Fotos</Eyebrow>
            <PhotoPicker />
          </>
        )}
        {etapa === 1 && (
          <>
            <Input id="inquilino" label="Nome do inquilino" required />
            <Input id="email-inquilino" label="E-mail do inquilino" type="email" placeholder="inquilino@email.com" required />
            <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
              <Input id="inicio" label="Início" type="date" required />
              <Input id="fim" label="Fim" type="date" required />
              <Input id="valor" label="Aluguel (R$)" inputMode="decimal" placeholder="1.850,00" required />
              <Input id="vencimento" label="Dia do vencimento" inputMode="numeric" placeholder="5" required />
            </div>
            <Eyebrow>Índice de reajuste</Eyebrow>
            <ChipRow label="Índice">{['IGP-M', 'IPCA'].map((t) => <Chip key={t} selected={indice === t} onClick={() => setIndice(t)}>{t}</Chip>)}</ChipRow>
          </>
        )}
        {etapa === 2 && (
          <p style={{ color: 'var(--ink-muted)' }}>Pronto. Na próxima tela você envia o link do contrato para o inquilino por e-mail ou copia o link. Por ele o inquilino abre chamados com foto.</p>
        )}
      </Stack>
      <StickyActions>
        {etapa > 0 && <Button onClick={() => setEtapa(etapa - 1)}>Voltar</Button>}
        <Button type="submit" variant="primary" block>{etapa < 2 ? 'Continuar' : 'Salvar e enviar o link'}</Button>
      </StickyActions>
    </form>
  )
}
