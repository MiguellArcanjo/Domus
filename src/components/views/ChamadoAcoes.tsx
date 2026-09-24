'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Row, Stack } from '@/components/ui/Stack'
import { TextLink } from '@/components/ui/Text'
import { PrestadorSugerido } from '@/components/domain/Prestador'
import { preco } from '@/lib/format'
import { prestador } from '@/lib/mock'
import type { Chamado } from '@/lib/types'

/** Escolha do prestador e aprovação do preço (M-03). Só front: aprovar volta para a caixa de chamados. */
export function ChamadoAcoes({ chamado: c }: { chamado: Chamado }) {
  const router = useRouter()
  const [escolhido, setEscolhido] = useState(c.sugeridos[0])
  const [cancelando, setCancelando] = useState(false)
  const p = escolhido ? prestador(escolhido) : undefined
  const atribuido = c.prestadorSlug ? prestador(c.prestadorSlug) : undefined

  if (atribuido) {
    return (
      <Stack gap={3}>
        <h3 style={{ fontSize: 16 }}>Prestador</h3>
        <PrestadorSugerido p={atribuido} perfilHref={`/app/prestadores/${atribuido.slug}`} selected />
        {c.valor && <p style={{ fontSize: 14 }}>Valor aprovado: <b>{preco(c.valor)}</b> · pagamento protegido</p>}
        <Button variant="danger" block>Abrir contestação</Button>
      </Stack>
    )
  }
  return (
    <Stack gap={3}>
      <Row between><h3 style={{ fontSize: 16 }}>Prestadores sugeridos</h3><TextLink href="/app/explorar">Buscar outro</TextLink></Row>
      <div role="radiogroup" aria-label="Prestadores sugeridos" style={{ display: 'grid', gap: 10 }}>
        {c.sugeridos.map((slug) => {
          const s = prestador(slug)!
          return (
            <div key={slug} role="radio" aria-checked={escolhido === slug} tabIndex={0} onClick={() => setEscolhido(slug)} onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && setEscolhido(slug)} style={{ cursor: 'pointer', borderRadius: 14 }}>
              <PrestadorSugerido p={s} perfilHref={`/app/prestadores/${s.slug}`} selected={escolhido === slug} />
            </div>
          )
        })}
      </div>
      {cancelando ? (
        <Card tone="danger">
          <p style={{ fontSize: 14 }}>Cancelar este chamado? O inquilino recebe um aviso.</p>
          <Row gap={2}><Button variant="danger" onClick={() => router.push('/app/chamados')}>Cancelar chamado</Button><Button variant="ghost" onClick={() => setCancelando(false)}>Voltar</Button></Row>
        </Card>
      ) : (
        <Stack gap={2}>
          {p && <Button variant="primary" block onClick={() => router.push('/app/chamados?aprovado=' + c.id)}>Aprovar {p.nome.split(' ')[0]} · {preco((p.precos[1] ?? p.precos[0]).preco)}</Button>}
          <Button block onClick={() => setCancelando(true)}>Cancelar chamado</Button>
        </Stack>
      )}
    </Stack>
  )
}
