'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Camera } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Field'
import { Stack } from '@/components/ui/Stack'
import { BackBar } from '@/components/layout/PageHeader'
import { USUARIO } from '@/lib/mock'

/** Dados pessoais. Trocar o e-mail pede confirmação no endereço novo. */
export function DadosForm() {
  const router = useRouter()
  const toast = useToast()
  const [email, setEmail] = useState(USUARIO.email)
  return (
    <form onSubmit={(e) => { e.preventDefault(); toast(email !== USUARIO.email ? `Enviamos um link de confirmação para ${email}` : 'Dados salvos'); router.push('/app/conta') }} style={{ maxWidth: 560 }}>
      <BackBar title="Seus dados" back="/app/conta" />
      <Stack gap={4}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Avatar iniciais={USUARIO.iniciais} size={72} />
          <label style={{ display: 'inline-flex', gap: 8, alignItems: 'center', color: 'var(--brand)', fontWeight: 600, cursor: 'pointer', position: 'relative' }}><Camera size={18} aria-hidden />Trocar foto<input type="file" accept="image/*" aria-label="Trocar foto" style={{ position: 'absolute', inset: 0, opacity: 0 }} /></label>
        </div>
        <Input id="nome" label="Nome completo" defaultValue={USUARIO.nome} autoComplete="name" required />
        <Input id="email" label="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required hint="Se você trocar, enviamos um link de confirmação para o e-mail novo." />
        <Input id="cpf" label="CPF" inputMode="numeric" placeholder="000.000.000-00" hint="Necessário para emitir cobranças e receber repasses." />
        <Button type="submit" variant="primary" block>Salvar</Button>
      </Stack>
    </form>
  )
}
