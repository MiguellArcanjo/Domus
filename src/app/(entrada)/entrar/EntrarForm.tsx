'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { IconButton } from '@/components/ui/IconButton'
import { PasswordInput } from '@/components/ui/PasswordInput'

/**
 * Login por e-mail e senha.
 * Só front: qualquer e-mail e senha avançam. O backend confere as credenciais e cria a sessão.
 */
export function EntrarForm() {
  const router = useRouter()
  const params = useSearchParams()
  const query = params.toString()

  return (
    <div style={{ display: 'grid', gap: 18, alignContent: 'start' }}>
      <IconButton icon={ChevronLeft} label="Voltar" href="/" />
      <h1 style={{ fontSize: 28, lineHeight: 1.2 }}>Entrar no Domu</h1>
      <p style={{ color: 'var(--ink-muted)' }}>Use o e-mail e a senha da sua conta.</p>
      <form onSubmit={(e) => { e.preventDefault(); router.push(`/entrar/perfil${query ? `?${query}` : ''}`) }} style={{ display: 'grid', gap: 16 }}>
        <Input id="email" name="email" label="E-mail" type="email" autoComplete="email" placeholder="voce@email.com" required />
        <PasswordInput id="senha" label="Senha" autoComplete="current-password" />
        <Link href="/recuperar-senha" style={{ color: 'var(--brand)', fontWeight: 600, fontSize: 14, justifySelf: 'start' }}>Esqueci minha senha</Link>
        <Button type="submit" variant="primary" block>Entrar</Button>
      </form>
      <p style={{ fontSize: 15, textAlign: 'center' }}>
        Ainda não tem conta? <Link href={`/criar-conta${query ? `?${query}` : ''}`} style={{ color: 'var(--brand)', fontWeight: 600 }}>Criar conta</Link>
      </p>
    </div>
  )
}
