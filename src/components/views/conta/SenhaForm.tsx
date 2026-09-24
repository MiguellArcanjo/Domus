'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Dialog'
import { PasswordInput } from '@/components/ui/PasswordInput'
import { Stack } from '@/components/ui/Stack'
import { BackBar } from '@/components/layout/PageHeader'

/** Alterar a senha estando logado (pede a senha atual). */
export function SenhaForm() {
  const router = useRouter()
  const toast = useToast()
  const [erro, setErro] = useState('')
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const f = new FormData(e.currentTarget)
        if (f.get('nova') !== f.get('confirmar')) return setErro('As senhas novas não são iguais.')
        if (f.get('nova') === f.get('atual')) return setErro('A senha nova precisa ser diferente da atual.')
        toast('Senha alterada. As outras sessões foram encerradas.')
        router.push('/app/conta')
      }}
      style={{ maxWidth: 560 }}
    >
      <BackBar title="Alterar senha" back="/app/conta" />
      <Stack gap={4}>
        <PasswordInput id="atual" label="Senha atual" autoComplete="current-password" />
        <PasswordInput id="nova" label="Senha nova" autoComplete="new-password" minLength={8} hint="Pelo menos 8 caracteres." />
        <PasswordInput id="confirmar" label="Confirme a senha nova" autoComplete="new-password" minLength={8} />
        {erro && <p role="alert" style={{ color: 'var(--danger)', fontSize: 14 }}>{erro}</p>}
        <Link href="/recuperar-senha" style={{ color: 'var(--brand)', fontWeight: 600, fontSize: 14 }}>Esqueci a senha atual</Link>
        <Button type="submit" variant="primary" block>Salvar senha</Button>
      </Stack>
    </form>
  )
}
