import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Mail } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Row, Stack } from '@/components/ui/Stack'
import { CopyField } from '@/components/ui/CopyField'
import { BackBar } from '@/components/layout/PageHeader'
import { IMOVEIS, imovel } from '@/lib/mock'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return IMOVEIS.filter((i) => i.contrato).map((i) => ({ id: i.id }))
}

export const metadata: Metadata = { title: 'Link do inquilino' }

/** Link único por contrato (G-04), enviado por e-mail ou copiado. */
export default async function LinkInquilino({ params }: Props) {
  const i = imovel((await params).id)
  if (!i?.contrato) notFound()
  const token = 'demo'
  const url = `https://domu.app/c/${token}`
  const assunto = encodeURIComponent(`Link do seu contrato · ${i.nome}`)
  const texto = encodeURIComponent(`Olá, ${i.contrato.inquilino.nome.split(' ')[0]}. Se algo quebrar no imóvel, abra o chamado por este link, com foto: ${url}`)
  return (
    <Stack gap={4} style={{ maxWidth: 560 }}>
      <BackBar title="Link do inquilino" back={`/app/imoveis/${i.id}`} />
      <Card>
        <Row gap={3}><Avatar iniciais={i.contrato.inquilino.iniciais} /><div><b>{i.contrato.inquilino.nome}</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{i.nome} · {i.contrato.inquilino.email}</p></div></Row>
      </Card>
      <p style={{ color: 'var(--ink-muted)' }}>O inquilino abre chamados com foto por este link, sem baixar nada e sem senha. O link vale enquanto o contrato estiver ativo.</p>
      <CopyField valor={url} label="Link do contrato" />
      <Button variant="primary" icon={Mail} href={`mailto:${i.contrato.inquilino.email}?subject=${assunto}&body=${texto}`}>Enviar por e-mail</Button>
      <Button href={`/c/${token}`}>Ver como o inquilino vê</Button>
    </Stack>
  )
}
