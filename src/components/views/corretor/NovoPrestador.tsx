'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Dialog'
import { Select } from '@/components/ui/Extras'
import { Input } from '@/components/ui/Field'
import { Stack } from '@/components/ui/Stack'
import { BackBar } from '@/components/layout/PageHeader'
import { CATEGORIAS, CATEGORIA_IDS } from '@/lib/categorias'
import { useLocal } from '@/lib/store'

/** O corretor cadastra um prestador que já conhece; ele recebe um convite por e-mail para entrar no Domu. */
export function NovoPrestador() {
  const router = useRouter()
  const toast = useToast()
  const [, setExtras] = useLocal<Array<{ nome: string; oficio: string; email: string }>>('prestadoresManuais', [])
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const f = new FormData(e.currentTarget)
        setExtras((l) => [...l, { nome: String(f.get('nome')), oficio: CATEGORIAS[f.get('categoria') as keyof typeof CATEGORIAS].oficio, email: String(f.get('email')) }])
        toast('Convite enviado por e-mail')
        router.push('/app/meus-prestadores')
      }}
      style={{ maxWidth: 560 }}
    >
      <BackBar title="Adicionar prestador" back="/app/meus-prestadores" />
      <Stack gap={4}>
        <p style={{ color: 'var(--ink-muted)' }}>Ele recebe um convite para criar o perfil no Domu. Enquanto isso, já aparece na sua lista para os chamados.</p>
        <Input id="nome" name="nome" label="Nome" required />
        <Input id="email" name="email" label="E-mail" type="email" required />
        <Select id="categoria" name="categoria" label="Categoria" defaultValue="hidraulica">{CATEGORIA_IDS.map((c) => <option key={c} value={c}>{CATEGORIAS[c].rotulo}</option>)}</Select>
        <Button type="submit" variant="primary" block>Enviar convite</Button>
      </Stack>
    </form>
  )
}
