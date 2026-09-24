import type { Metadata } from 'next'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/Extras'
import { Photo } from '@/components/ui/Photo'
import { Stack } from '@/components/ui/Stack'
import { TOM_ESTADO } from '@/components/views/corretor/VistoriaDetalhe'
import { BackBar } from '@/components/layout/PageHeader'
import { Columns2 } from 'lucide-react'
import { VISTORIAS, imovel } from '@/lib/mock'

export const metadata: Metadata = { title: 'Comparar vistorias' }

type Props = { searchParams: Promise<{ imovel?: string }> }

/** Entrada e saída lado a lado, cômodo por cômodo (G-12). */
export default async function Page({ searchParams }: Props) {
  const id = (await searchParams).imovel ?? 'ap-32-acacias'
  const ent = VISTORIAS.find((v) => v.imovelId === id && v.tipo === 'entrada')
  const sai = VISTORIAS.find((v) => v.imovelId === id && v.tipo === 'saida')
  return (
    <Stack gap={4} style={{ maxWidth: 900 }}>
      <BackBar title="Comparar vistorias" back={`/app/vistorias?imovel=${id}`} />
      <b>{imovel(id)?.nome}</b>
      {!ent || !sai ? (
        <EmptyState icon={Columns2} title="Falta uma das vistorias">Para comparar, o imóvel precisa da vistoria de entrada e da de saída.</EmptyState>
      ) : (
        ent.comodos.map((c) => {
          const s = sai.comodos.find((x) => x.nome === c.nome)
          const mudou = s && s.estado !== c.estado
          return (
            <section key={c.nome} aria-label={c.nome} style={{ display: 'grid', gap: 10, padding: 14, borderRadius: 16, border: `${mudou ? 2 : 1}px solid ${mudou ? 'var(--warning)' : 'var(--line)'}`, background: 'var(--surface)' }}>
              <b>{c.nome}{mudou && <span style={{ marginLeft: 8 }}><Badge tone="warning">Mudou</Badge></span>}</b>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[['Entrada', c], ['Saída', s]].map(([rot, x]) => x && typeof x === 'object' ? (
                  <div key={rot as string} style={{ display: 'grid', gap: 6 }}>
                    <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{rot as string}</span>
                    <Photo legenda={`${c.nome} na ${(rot as string).toLowerCase()}`} height={110} radius={10} />
                    <Badge tone={TOM_ESTADO[x.estado].tom}>{TOM_ESTADO[x.estado].rotulo}</Badge>
                    <p style={{ fontSize: 13 }}>{x.obs}</p>
                  </div>
                ) : null)}
              </div>
            </section>
          )
        })
      )}
    </Stack>
  )
}
