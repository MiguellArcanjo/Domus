'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Chip, ChipRow } from '@/components/ui/Chip'
import { useToast } from '@/components/ui/Dialog'
import { Select } from '@/components/ui/Extras'
import { Input } from '@/components/ui/Field'
import { Eyebrow } from '@/components/ui/Meta'
import { Stack } from '@/components/ui/Stack'
import { BackBar, StickyActions } from '@/components/layout/PageHeader'
import { IMOVEIS } from '@/lib/mock'

/** Novo contrato (G-02) para um imóvel vago, ou renovação de um contrato. */
export function ContratoForm({ imovelId, renovar }: { imovelId?: string; renovar?: boolean }) {
  const router = useRouter()
  const toast = useToast()
  const [indice, setIndice] = useState('IGP-M')
  const [garantia, setGarantia] = useState('Seguro fiança')
  const im = IMOVEIS.find((i) => i.id === imovelId)
  const c = renovar ? im?.contrato : undefined
  return (
    <form onSubmit={(e) => { e.preventDefault(); toast(renovar ? 'Contrato renovado' : 'Contrato criado'); router.push(`/app/imoveis/${imovelId ?? 'ap-11-sol'}/link`) }} style={{ maxWidth: 640 }}>
      <BackBar title={renovar ? 'Renovar contrato' : 'Novo contrato'} back={imovelId ? `/app/contratos/${imovelId}` : '/app/contratos'} />
      <Stack gap={4}>
        <Select id="imovel" label="Imóvel" defaultValue={imovelId ?? 'ap-11-sol'}>{IMOVEIS.map((i) => <option key={i.id} value={i.id}>{i.nome}</option>)}</Select>
        <Eyebrow>Inquilino</Eyebrow>
        <Input id="inq-nome" label="Nome completo" defaultValue={c?.inquilino.nome} required />
        <Input id="inq-email" label="E-mail" type="email" defaultValue={c?.inquilino.email} required hint="O link do contrato vai para este e-mail." />
        <Input id="inq-doc" label="CPF ou CNPJ" inputMode="numeric" required />
        <Eyebrow>Contrato</Eyebrow>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr' }}>
          <Input id="inicio" label="Início" type="date" required />
          <Input id="fim" label="Fim" type="date" required />
          <Input id="valor" label="Aluguel (R$)" inputMode="decimal" defaultValue={c ? String(c.valor) : ''} required />
          <Input id="venc" label="Dia do vencimento" inputMode="numeric" defaultValue={c ? String(c.diaVencimento) : ''} required />
          <Input id="multa" label="Multa por atraso (%)" inputMode="decimal" defaultValue="2" />
          <Input id="juros" label="Juros ao mês (%)" inputMode="decimal" defaultValue="1" />
        </div>
        <Eyebrow>Índice de reajuste</Eyebrow>
        <ChipRow label="Índice">{['IGP-M', 'IPCA'].map((t) => <Chip key={t} selected={indice === t} onClick={() => setIndice(t)}>{t}</Chip>)}</ChipRow>
        <Eyebrow>Garantia</Eyebrow>
        <ChipRow wrap label="Garantia">{['Seguro fiança', 'Caução', 'Fiador', 'Sem garantia'].map((t) => <Chip key={t} selected={garantia === t} onClick={() => setGarantia(t)}>{t}</Chip>)}</ChipRow>
        <Input id="taxa-adm" label="Taxa de administração (%)" inputMode="decimal" defaultValue="8" hint="Descontada no repasse ao proprietário." />
      </Stack>
      <StickyActions><Button type="submit" variant="primary" block>{renovar ? 'Salvar renovação' : 'Criar contrato e enviar o link'}</Button></StickyActions>
    </form>
  )
}
