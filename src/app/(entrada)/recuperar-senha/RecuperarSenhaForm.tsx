'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, MailCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { IconButton } from '@/components/ui/IconButton'

/** Pede o e-mail e avisa que o link de redefinição foi enviado. */
export function RecuperarSenhaForm() {
  const [enviado, setEnviado] = useState('')
  return (
    <div style={{ display: 'grid', gap: 18, alignContent: 'start' }}>
      <IconButton icon={ChevronLeft} label="Voltar" href="/entrar" />
      {!enviado ? (
        <>
          <h1 style={{ fontSize: 28, lineHeight: 1.2 }}>Recuperar senha</h1>
          <p style={{ color: 'var(--ink-muted)' }}>Digite o e-mail da sua conta. Enviamos um link para você criar uma senha nova.</p>
          <form onSubmit={(e) => { e.preventDefault(); setEnviado(String(new FormData(e.currentTarget).get('email'))) }} style={{ display: 'grid', gap: 16 }}>
            <Input id="email" name="email" label="E-mail" type="email" autoComplete="email" placeholder="voce@email.com" required />
            <Button type="submit" variant="primary" block>Enviar link</Button>
          </form>
        </>
      ) : (
        <div role="status" style={{ display: 'grid', gap: 14, justifyItems: 'start' }}>
          <span style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--brand-soft)', color: 'var(--on-brand-soft)', display: 'grid', placeItems: 'center' }}><MailCheck size={28} aria-hidden /></span>
          <h1 style={{ fontSize: 28, lineHeight: 1.2 }}>Confira seu e-mail</h1>
          <p style={{ color: 'var(--ink-muted)' }}>Se existir uma conta com <b style={{ color: 'var(--ink)' }}>{enviado}</b>, você vai receber um link para criar uma senha nova. O link vale por 1 hora.</p>
          <Button href="/redefinir-senha?token=demo" variant="primary" block>Abrir o link (demonstração)</Button>
          <button type="button" onClick={() => setEnviado('')} style={{ background: 'none', border: 0, color: 'var(--brand)', fontWeight: 600, padding: 0 }}>Usar outro e-mail</button>
        </div>
      )}
      <Link href="/entrar" style={{ fontSize: 15, textAlign: 'center', color: 'var(--brand)', fontWeight: 600 }}>Voltar para o login</Link>
    </div>
  )
}
