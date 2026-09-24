import type { Metadata } from 'next'
import { Droplet, FileText, Wallet, Zap } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Row, Stack } from '@/components/ui/Stack'
import { BackBar } from '@/components/layout/PageHeader'

export const metadata: Metadata = { title: 'Notificações' }

const ITENS = [
  { icone: Droplet, titulo: 'Novo chamado urgente: vazamento sob a pia', detalhe: 'Ap 32 · há 12 min', href: '/app/chamados/8f3k2' },
  { icone: Zap, titulo: 'Rafael agendou a troca da tomada', detalhe: 'Casa 4 · hoje, 17h', href: '/app/chamados/7c1m9' },
  { icone: FileText, titulo: 'Contrato do Ap 21 vence em 30 dias', detalhe: 'Lúcia Prado', href: '/app/imoveis/ap-21-acacias' },
  { icone: Wallet, titulo: 'Aluguel do Ap 32 recebido', detalhe: 'R$ 1.850 · 05 set', href: '/app/imoveis/ap-32-acacias' },
]

/** Central de notificações, agrupada por chamado (também enviadas por e-mail e push). */
export default function Notificacoes() {
  return (
    <Stack gap={3}>
      <BackBar title="Notificações" back="/app/painel" />
      {ITENS.map(({ icone: Icon, titulo, detalhe, href }) => (
        <Card key={titulo} href={href}>
          <Row start gap={3}><Icon size={18} color="var(--brand)" aria-hidden /><div><b style={{ fontSize: 14 }}>{titulo}</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{detalhe}</p></div></Row>
        </Card>
      ))}
    </Stack>
  )
}
