'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CircleCheck, MailCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'

/**
 * Sem token: avisa que o link foi enviado e deixa reenviar.
 * Com ?token= (link do e-mail): confirma e segue para a escolha do perfil.
 */
export function ConfirmarEmail() {
  const params = useSearchParams()
  const token = params.get('token')
  const email = params.get('email') ?? 'seu e-mail'
  const [reenviado, setReenviado] = useState(false)
  const resto = new URLSearchParams(params)
  resto.delete('token'); resto.delete('email')
  const proximo = `/entrar/perfil${resto.toString() ? `?${resto}` : ''}`

  if (token) {
    return (
      <div role="status" style={{ display: 'grid', gap: 14, justifyItems: 'start', paddingTop: 40 }}>
        <CircleCheck size={40} color="var(--brand)" aria-hidden />
        <h1 style={{ fontSize: 28 }}>E-mail confirmado</h1>
        <p style={{ color: 'var(--ink-muted)' }}>Sua conta está pronta.</p>
        <Button href={proximo} variant="primary" block>Continuar</Button>
      </div>
    )
  }
  return (
    <div style={{ display: 'grid', gap: 14, justifyItems: 'start', paddingTop: 40 }}>
      <span style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--brand-soft)', color: 'var(--on-brand-soft)', display: 'grid', placeItems: 'center' }}><MailCheck size={28} aria-hidden /></span>
      <h1 style={{ fontSize: 28, lineHeight: 1.2 }}>Confirme seu e-mail</h1>
      <p style={{ color: 'var(--ink-muted)' }}>Enviamos um link para <b style={{ color: 'var(--ink)' }}>{email}</b>. Abra o e-mail e toque no link para ativar a conta.</p>
      <Button href={`/confirmar-email?token=demo${resto.toString() ? `&${resto}` : ''}`} variant="primary" block>Abrir o link (demonstração)</Button>
      <button type="button" onClick={() => setReenviado(true)} disabled={reenviado} style={{ background: 'none', border: 0, color: 'var(--brand)', fontWeight: 600, padding: 0 }}>{reenviado ? 'Link reenviado' : 'Reenviar o link'}</button>
      <p role="status" style={{ fontSize: 13, color: 'var(--ink-muted)' }}>Não chegou? Confira a caixa de spam.</p>
    </div>
  )
}
