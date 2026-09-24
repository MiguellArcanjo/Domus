'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { IconButton } from '@/components/ui/IconButton'
import { PasswordInput } from '@/components/ui/PasswordInput'

/** Criação de conta com nome, e-mail e senha. Depois a pessoa escolhe o perfil. */
export function CriarContaForm() {
  const router = useRouter()
  const query = useSearchParams().toString()
  const [erro, setErro] = useState('')

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    if (f.get('senha') !== f.get('confirmar')) {
      setErro('As senhas não são iguais. Digite a mesma senha nos dois campos.')
      return
    }
    router.push(`/confirmar-email?email=${encodeURIComponent(String(f.get('email')))}${query ? `&${query}` : ''}`)
  }

  return (
    <div style={{ display: 'grid', gap: 18, alignContent: 'start' }}>
      <IconButton icon={ChevronLeft} label="Voltar" href="/entrar" />
      <h1 style={{ fontSize: 28, lineHeight: 1.2 }}>Criar conta</h1>
      <p style={{ color: 'var(--ink-muted)' }}>Grátis. Leva um minuto.</p>
      <form onSubmit={enviar} style={{ display: 'grid', gap: 16 }}>
        <Input id="nome" name="nome" label="Nome completo" autoComplete="name" required />
        <Input id="email" name="email" label="E-mail" type="email" autoComplete="email" placeholder="voce@email.com" required />
        <PasswordInput id="senha" label="Senha" autoComplete="new-password" minLength={8} hint="Pelo menos 8 caracteres." />
        <PasswordInput id="confirmar" label="Confirme a senha" autoComplete="new-password" minLength={8} />
        <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13 }}>
          <input type="checkbox" name="termos" required style={{ width: 20, height: 20, marginTop: 1, accentColor: 'var(--brand)' }} />
          <span>Li e aceito os <Link href="/termos" style={{ textDecoration: 'underline' }}>Termos de uso</Link> e a <Link href="/privacidade" style={{ textDecoration: 'underline' }}>Política de Privacidade</Link> (LGPD).</span>
        </label>
        {erro && <p role="alert" style={{ color: 'var(--danger)', fontSize: 14 }}>{erro}</p>}
        <Button type="submit" variant="primary" block>Criar conta</Button>
      </form>
      <p style={{ fontSize: 15, textAlign: 'center' }}>Já tem conta? <Link href="/entrar" style={{ color: 'var(--brand)', fontWeight: 600 }}>Entrar</Link></p>
    </div>
  )
}
