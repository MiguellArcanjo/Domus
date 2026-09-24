'use client'

import { useState } from 'react'
import { Check, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { RadioList } from '@/components/ui/Controls'
import { Confirm, useToast } from '@/components/ui/Dialog'
import { Row, Stack } from '@/components/ui/Stack'
import { PrestadorCard } from '@/components/domain/Prestador'
import { PageHeader } from '@/components/layout/PageHeader'
import { EU_PRESTADOR, prestador } from '@/lib/mock'
import { useLocal } from '@/lib/store'

/** Contratar e cancelar o destaque na região (M-13), R$ 39 por mês. */
export function Destaque() {
  const toast = useToast()
  const [ativo, setAtivo] = useLocal('destaqueAtivo', false)
  const [cancelar, setCancelar] = useState(false)
  const p = prestador(EU_PRESTADOR)!
  return (
    <Stack gap={4} style={{ maxWidth: 640 }}>
      <PageHeader title="Destaque" />
      <Card tone={ativo ? 'soft' : 'default'}>
        <Row between><b style={{ fontSize: 18 }}>Destaque na região</b>{ativo ? <Badge tone="success">Ativo</Badge> : <Badge>Desligado</Badge>}</Row>
        <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em' }}>R$ 39<span style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink-muted)' }}> /mês</span></div>
        <ul style={{ display: 'grid', gap: 8 }}>
          {['Seu card aparece primeiro na busca e no mapa do seu bairro', 'Seus posts ficam no topo da vitrine da região', 'Etiqueta "Destaque" no card', 'Cancele quando quiser'].map((t) => <li key={t} style={{ display: 'flex', gap: 8, fontSize: 14 }}><Check size={16} color="var(--brand)" aria-hidden />{t}</li>)}
        </ul>
      </Card>
      <p style={{ fontWeight: 600 }}>Como seu card aparece</p>
      <PrestadorCard p={{ ...p, destaque: true }} href={`/p/${p.slug}`} />
      {ativo ? (
        <>
          <Card><Row gap={2}><TrendingUp size={18} color="var(--brand)" aria-hidden /><p style={{ fontSize: 14 }}>Próxima cobrança em 01/10 no cartão final 4242.</p></Row></Card>
          <Button variant="danger" onClick={() => setCancelar(true)}>Cancelar destaque</Button>
        </>
      ) : (
        <>
          <RadioList name="pagamento" label="Forma de pagamento" defaultValue="saldo" options={[{ value: 'saldo', label: 'Descontar do saldo da carteira' }, { value: 'cartao', label: 'Cartão de crédito' }, { value: 'pix', label: 'Pix mensal' }]} />
          <Button variant="primary" block onClick={() => { setAtivo(true); toast('Destaque ativado') }}>Ativar destaque por R$ 39/mês</Button>
        </>
      )}
      <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>O destaque é contratado e cancelado só aqui no site. No app ele aparece no seu card automaticamente.</p>
      <Confirm open={cancelar} onClose={() => setCancelar(false)} onConfirm={() => { setAtivo(false); toast('Destaque cancelado') }} title="Cancelar o destaque?" description="Ele continua até o fim do mês já pago." confirmar="Cancelar destaque" perigo />
    </Stack>
  )
}
