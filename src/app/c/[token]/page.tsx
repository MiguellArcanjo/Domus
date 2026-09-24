import Link from 'next/link'
import { ArrowRight, Wrench } from 'lucide-react'
import { Badge, StatusBadge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Eyebrow } from '@/components/ui/Meta'
import { Row, Stack } from '@/components/ui/Stack'
import { CategoriaIcon } from '@/components/domain/CategoriaIcon'
import { reais } from '@/lib/format'
import { LinkInvalido } from '@/components/views/LinkInvalido'
import { CHAMADOS, USUARIO, imovel } from '@/lib/mock'

type Props = { params: Promise<{ token: string }> }

export function generateStaticParams() {
  return [{ token: 'demo' }]
}

/** Início do link do inquilino (G-04). Sem login: o token no link identifica o contrato. */
export default async function LinkInquilino({ params }: Props) {
  const { token } = await params
  if (token !== 'demo') return <LinkInvalido />
  const im = imovel('ap-32-acacias')!
  const chamados = CHAMADOS.filter((c) => c.imovelId === im.id && c.estado !== 'pago')
  return (
    <Stack gap={4}>
      <div><p style={{ color: 'var(--ink-muted)' }}>Olá, {im.contrato!.inquilino.nome.split(' ')[0]}</p><h1 style={{ fontSize: 28, lineHeight: 1.2 }}>{im.nome}</h1><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>Corretor: {USUARIO.nome}</p></div>
      <Link href={`/c/${token}/novo`} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--jade)', color: '#fff', borderRadius: 18, padding: 16 }}>
        <span style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,.15)', display: 'grid', placeItems: 'center' }}><Wrench size={24} aria-hidden /></span>
        <span style={{ display: 'grid', flexGrow: 1 }}><b style={{ fontSize: 17 }}>Algo quebrou?</b><span style={{ fontSize: 13, color: '#D5EAE2' }}>Abra um chamado com foto</span></span>
        <ArrowRight size={22} aria-hidden />
      </Link>
      <Eyebrow as="h2">Seus chamados</Eyebrow>
      {chamados.map((c) => (
        <Card key={c.id} href={`/c/${token}/chamados/${c.id}`}>
          <Row gap={3}><CategoriaIcon categoria={c.categoria} size={36} /><div style={{ flexGrow: 1 }}><b>{c.titulo}</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>Aberto {c.eventos[0].quando.toLowerCase()}</p></div><StatusBadge estado={c.estado} /></Row>
        </Card>
      ))}
      <Eyebrow as="h2">Aluguel</Eyebrow>
      <Card><Row between><div><b>Outubro · {reais(im.contrato!.valor)}</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>Vence dia {String(im.contrato!.diaVencimento).padStart(2, '0')}</p></div><Badge>Em breve: Pix</Badge></Row></Card>
    </Stack>
  )
}
