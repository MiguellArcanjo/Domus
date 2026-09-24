'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Dialog'
import { Select } from '@/components/ui/Extras'
import { Input } from '@/components/ui/Field'
import { Stack } from '@/components/ui/Stack'
import { BackBar } from '@/components/layout/PageHeader'

/** Chave Pix para os saques da carteira. A titularidade deve bater com o CPF ou CNPJ do cadastro. */
export function Recebimento() {
  const router = useRouter()
  const toast = useToast()
  return (
    <form onSubmit={(e) => { e.preventDefault(); toast('Chave Pix salva'); router.push('/app/carteira') }} style={{ maxWidth: 560 }}>
      <BackBar title="Dados de recebimento" back="/app/carteira" />
      <Stack gap={4}>
        <p style={{ color: 'var(--ink-muted)' }}>Os saques caem nesta chave Pix. Ela precisa estar no mesmo CPF ou CNPJ do seu cadastro.</p>
        <Select id="tipo-chave" label="Tipo de chave" defaultValue="cpf"><option value="cpf">CPF</option><option value="cnpj">CNPJ</option><option value="email">E-mail</option><option value="celular">Celular</option><option value="aleatoria">Chave aleatória</option></Select>
        <Input id="chave" label="Chave Pix" required placeholder="000.000.000-00" />
        <Input id="titular" label="Nome do titular" defaultValue="João Batista" required />
        <Button type="submit" variant="primary" block>Salvar chave</Button>
      </Stack>
    </form>
  )
}
