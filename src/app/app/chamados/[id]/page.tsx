import type { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { BackBar } from '@/components/layout/PageHeader'
import { DesktopOnly, Panel, Split } from '@/components/patterns/Responsive'
import { ChamadoAcoes } from '@/components/views/ChamadoAcoes'
import { ChamadoDetalhe } from '@/components/views/ChamadoDetalhe'
import { ChamadosLista } from '@/components/views/ChamadosLista'
import { CHAMADOS, chamado } from '@/lib/mock'

type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return CHAMADOS.map((c) => ({ id: c.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: chamado((await params).id)?.titulo ?? 'Chamado' }
}

/** Celular: detalhe e ações. Computador: lista, detalhe e prestadores sugeridos em 3 colunas. */
export default async function ChamadoPage({ params }: Props) {
  const c = chamado((await params).id)
  if (!c) notFound()
  return (
    <>
      <BackBar title={`Chamado ${c.codigo}`} back="/app/chamados" />
      <Split three>
        <DesktopOnly><Suspense><ChamadosLista selecionado={c.id} /></Suspense></DesktopOnly>
        <Panel label="Detalhe do chamado"><ChamadoDetalhe chamado={c} /></Panel>
        <Panel label="Prestador"><ChamadoAcoes chamado={c} /></Panel>
      </Split>
    </>
  )
}
