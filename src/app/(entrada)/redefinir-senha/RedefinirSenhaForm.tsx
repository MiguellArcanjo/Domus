'use client'

import { useState } from 'react'
import { CircleCheck } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PasswordInput } from '@/components/ui/PasswordInput'

/** Tela aberta pelo link do e-mail de recuperação (o token vem na URL). */
export function RedefinirSenhaForm() {
  const [erro, setErro] = useState('')
  const [pronto, setPronto] = useState(false)

  if (pronto) {
    return (
      <div role="status" style={{ display: 'grid', gap: 14, justifyItems: 'start', paddingTop: 40 }}>
        <CircleCheck size={40} color="var(--brand)" aria-hidden />
        <h1 style={{ fontSize: 28 }}>Senha alterada</h1>
        <p style={{ color: 'var(--ink-muted)' }}>Use a senha nova para entrar.</p>
        <Button href="/entrar" variant="primary" block>Entrar</Button>
      </div>
    )
  }
  return (
    <div style={{ display: 'grid', gap: 18, alignContent: 'start', paddingTop: 40 }}>
      <h1 style={{ fontSize: 28, lineHeight: 1.2 }}>Criar senha nova</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const f = new FormData(e.currentTarget)
          if (f.get('senha') !== f.get('confirmar')) return setErro('As senhas não são iguais. Digite a mesma senha nos dois campos.')
          setPronto(true)
        }}
        style={{ display: 'grid', gap: 16 }}
      >
        <PasswordInput id="senha" label="Senha nova" autoComplete="new-password" minLength={8} hint="Pelo menos 8 caracteres." />
        <PasswordInput id="confirmar" label="Confirme a senha nova" autoComplete="new-password" minLength={8} />
        {erro && <p role="alert" style={{ color: 'var(--danger)', fontSize: 14 }}>{erro}</p>}
        <Button type="submit" variant="primary" block>Salvar senha</Button>
      </form>
    </div>
  )
}
