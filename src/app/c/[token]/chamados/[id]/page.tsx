import { notFound } from 'next/navigation'
import { Mail, Star } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Row, Stack } from '@/components/ui/Stack'
import { Steps } from '@/components/ui/Steps'
import { NomeVerificado } from '@/components/domain/Prestador'
import { BackBar } from '@/components/layout/PageHeader'
import { nota } from '@/lib/format'
import { CHAMADOS, USUARIO, chamado, prestador } from '@/lib/mock'

type Props = { params: Promise<{ token: string; id: string }>; searchParams: Promise<{ novo?: string }> }

export function generateStaticParams() {
  return CHAMADOS.map((c) => ({ token: 'demo', id: c.id }))
}

/** Andamento do chamado, como o inquilino vê. Sem valores. */
export default async function ChamadoInquilino({ params, searchParams }: Props) {
  const { token, id } = await params
  const { novo } = await searchParams
  const c = chamado(id)
  if (!c) notFound()
  const p = prestador(c.sugeridos[0])
  return (
    <Stack gap={4}>
      <BackBar title={c.titulo} back={`/c/${token}`} />
      {novo && <Card tone="soft"><p role="status">Recebemos seu chamado. O corretor já foi avisado.</p></Card>}
      <Steps
        atual={3}
        passos={[
          { titulo: 'Aberto', detalhe: 'Ontem, 23:04' },
          { titulo: 'Triado', detalhe: 'Hidráulica · urgente' },
          { titulo: 'Prestador atribuído', detalhe: p ? `${p.nome}, ${p.oficio.toLowerCase()}` : undefined },
          { titulo: 'Agendado', detalhe: p?.proximoHorario },
          { titulo: 'Concluído' },
        ]}
      />
      {p && <Card><Row gap={3}><Avatar iniciais={p.iniciais} size={44} /><div><NomeVerificado p={p} size={15} /><p style={{ fontSize: 13, color: 'var(--ink-muted)', display: 'flex', gap: 4, alignItems: 'center' }}><Star size={13} aria-hidden />{nota(p.nota)} · {p.servicosPeloApp} serviços pelo app</p></div></Row></Card>}
      <Button icon={Mail} block href={`mailto:${USUARIO.email}?subject=${encodeURIComponent(`Chamado ${c.codigo}`)}`}>Falar com o corretor</Button>
    </Stack>
  )
}
