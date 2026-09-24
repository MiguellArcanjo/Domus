import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BackBar } from '@/components/layout/PageHeader'
import { DesktopOnly, Panel, Split } from '@/components/patterns/Responsive'
import { ImoveisTabela } from '@/components/views/ImoveisTabela'
import { ImovelDetalhe } from '@/components/views/ImovelDetalhe'
import { IMOVEIS, imovel } from '@/lib/mock'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return IMOVEIS.map((i) => ({ id: i.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: imovel((await params).id)?.nome ?? 'Imóvel' }
}

/** Celular: só o detalhe. Computador: a tabela com o imóvel escolhido e o detalhe ao lado. */
export default async function ImovelPage({ params }: Props) {
  const i = imovel((await params).id)
  if (!i) notFound()
  return (
    <>
      <BackBar title="Imóveis" back="/app/imoveis" />
      <Split>
        <DesktopOnly><Panel flush label="Tabela de imóveis"><ImoveisTabela imoveis={IMOVEIS} selecionado={i.id} /></Panel></DesktopOnly>
        <Panel label={i.nome}><ImovelDetalhe imovel={i} /></Panel>
      </Split>
    </>
  )
}
