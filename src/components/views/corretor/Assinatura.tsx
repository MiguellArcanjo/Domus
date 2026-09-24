'use client'

import { useState } from 'react'
import { CreditCard, Download } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/Controls'
import { Confirm, useToast } from '@/components/ui/Dialog'
import { Eyebrow } from '@/components/ui/Meta'
import { Row, Stack } from '@/components/ui/Stack'
import { PageHeader } from '@/components/layout/PageHeader'
import { Input } from '@/components/ui/Field'
import { reais } from '@/lib/format'
import { ASSINATURA } from '@/lib/mock'

const PLANOS = [
  { id: 'gratis', nome: 'Começo', preco: 'Grátis', detalhe: 'Até 2 imóveis' },
  { id: 'por_imovel', nome: 'Por imóvel', preco: 'R$ 15/imóvel', detalhe: 'De 3 a 6 imóveis' },
  { id: 'carteira', nome: 'Carteira', preco: 'R$ 99/mês', detalhe: 'Até 15 imóveis' },
] as const

/** Assinatura do corretor: plano, uso, troca de plano, forma de pagamento e faturas. */
export function Assinatura() {
  const toast = useToast()
  const [plano, setPlano] = useState<string>(ASSINATURA.plano)
  const [trocar, setTrocar] = useState<string | null>(null)
  const [cancelar, setCancelar] = useState(false)
  return (
    <Stack gap={4} style={{ maxWidth: 720 }}>
      <PageHeader title="Assinatura" />
      <Card>
        <Row between><b style={{ fontSize: 17 }}>Plano {PLANOS.find((p) => p.id === plano)?.nome}</b><Badge tone="success">Ativo</Badge></Row>
        <p style={{ fontSize: 14 }}>{ASSINATURA.imoveisUsados} de {ASSINATURA.limite} imóveis usados</p>
        <div style={{ background: 'var(--surface-muted)', borderRadius: 3 }}><ProgressBar valor={ASSINATURA.imoveisUsados / ASSINATURA.limite} label="Imóveis usados" /></div>
        <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>Próxima cobrança em {ASSINATURA.proximaCobranca}: {reais(ASSINATURA.valor)}</p>
      </Card>
      <Eyebrow as="h2">Planos</Eyebrow>
      <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        {PLANOS.map((p) => (
          <button key={p.id} type="button" onClick={() => p.id !== plano && setTrocar(p.id)} aria-pressed={p.id === plano} style={{ textAlign: 'left', padding: 16, borderRadius: 16, background: 'var(--surface)', border: p.id === plano ? '2px solid var(--brand)' : '1px solid var(--line)', display: 'grid', gap: 4 }}>
            <b>{p.nome}</b><span style={{ fontSize: 20, fontWeight: 700 }}>{p.preco}</span><span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{p.detalhe}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--brand)' }}>{p.id === plano ? 'Plano atual' : 'Mudar para este'}</span>
          </button>
        ))}
      </div>
      <Eyebrow as="h2">Forma de pagamento</Eyebrow>
      <Card><Row between><Row gap={2}><CreditCard size={18} aria-hidden /><span>{ASSINATURA.cartao}</span></Row><Button size="sm" onClick={() => toast('Cartão atualizado')}>Trocar</Button></Row></Card>
      <Eyebrow as="h2">Faturas</Eyebrow>
      <ul>{ASSINATURA.faturas.map((f) => <li key={f.mes} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line)', fontSize: 14 }}><span>{f.mes}</span><span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}><b className="tabular">{reais(f.valor)}</b><Badge tone="success">{f.status}</Badge><Button size="sm" variant="ghost" icon={Download} onClick={() => toast(`Nota fiscal de ${f.mes} enviada para o seu e-mail`)}>Nota</Button></span></li>)}</ul>
      <Eyebrow as="h2">Dados para a nota fiscal</Eyebrow>
      <form onSubmit={(e) => { e.preventDefault(); toast('Dados de faturamento salvos') }} style={{ display: 'grid', gap: 12 }}>
        <Input id="razao" label="Nome ou razão social" defaultValue="Marcos Silva" required />
        <Input id="doc" label="CPF ou CNPJ" placeholder="000.000.000-00" inputMode="numeric" />
        <Input id="email-nf" label="E-mail para as notas" type="email" defaultValue="marcos@exemplo.com.br" required />
        <div><Button type="submit">Salvar dados</Button></div>
      </form>
      <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>A assinatura é gerenciada só aqui no site. O app mostra seus imóveis, mas não faz cobranças de plano.</p>
      <Button variant="danger" onClick={() => setCancelar(true)}>Cancelar assinatura</Button>
      <Confirm open={!!trocar} onClose={() => setTrocar(null)} onConfirm={() => { if (trocar) setPlano(trocar); toast('Plano alterado') }} title={`Mudar para o plano ${PLANOS.find((p) => p.id === trocar)?.nome}?`} description="A diferença é calculada proporcionalmente na próxima fatura." confirmar="Mudar plano" />
      <Confirm open={cancelar} onClose={() => setCancelar(false)} onConfirm={() => toast('Assinatura cancelada. Seus dados continuam guardados.')} title="Cancelar a assinatura?" description="Você volta para o plano Começo no fim do mês e mantém só 2 imóveis ativos. Os outros ficam arquivados." confirmar="Cancelar assinatura" perigo />
    </Stack>
  )
}
