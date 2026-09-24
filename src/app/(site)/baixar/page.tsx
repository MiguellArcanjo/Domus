import type { Metadata } from 'next'
import { Smartphone } from 'lucide-react'
import { BotoesLojas } from '@/components/layout/BaixarApp'
import { NO_APP } from '@/lib/app'
import { prestador } from '@/lib/mock'
import type { Perfil } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Baixe o app',
  description: 'Contrate prestadores verificados, acompanhe serviços e cuide dos seus imóveis pelo app Domu, para iPhone e Android.',
}

type Props = { searchParams: Promise<{ prestador?: string }> }

/** Página pública "Baixe o app". Os botões de contratar do site trazem para cá (?prestador=slug). */
export default async function Baixar({ searchParams }: Props) {
  const { prestador: slug } = await searchParams
  const p = slug ? prestador(slug) : undefined
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '48px 16px', display: 'grid', gap: 32 }}>
      <section style={{ display: 'grid', gap: 16, justifyItems: 'start' }}>
        <span style={{ display: 'grid', placeItems: 'center', width: 56, height: 56, borderRadius: 16, background: 'var(--brand)', color: 'var(--on-brand)' }}><Smartphone size={28} aria-hidden /></span>
        <h1 style={{ fontSize: 'clamp(30px, 5vw, 44px)', lineHeight: 1.1, letterSpacing: '-0.03em' }}>{p ? `Para contratar ${p.nome.split(' ')[0]}, use o app Domu` : 'O Domu no seu celular'}</h1>
        <p style={{ fontSize: 17, color: 'var(--ink-muted)', maxWidth: 620 }}>
          {p ? `No app você escolhe o serviço, o horário e paga com segurança: ${p.nome.split(' ')[0]} só recebe depois que você confirmar.` : 'Contratar, acompanhar serviços, cuidar dos imóveis e receber pedidos: tudo isso fica no app. No site ficam sua conta, a assinatura e os relatórios.'}
        </p>
        <BotoesLojas />
      </section>
      <section style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {(Object.keys(NO_APP) as Perfil[]).map((k) => (
          <div key={k} style={{ padding: 20, borderRadius: 18, border: '1px solid var(--line)', background: 'var(--surface)', display: 'grid', gap: 10, alignContent: 'start' }}>
            <b style={{ fontSize: 17 }}>{NO_APP[k].titulo}</b>
            <ul style={{ display: 'grid', gap: 6, fontSize: 14, color: 'var(--ink-muted)' }}>{NO_APP[k].itens.map((t) => <li key={t}>· {t}</li>)}</ul>
          </div>
        ))}
      </section>
      <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>Já tem conta? <a href="/entrar" style={{ color: 'var(--brand)', fontWeight: 600 }}>Entre no site</a> para ver sua conta, assinatura e relatórios.</p>
    </div>
  )
}
