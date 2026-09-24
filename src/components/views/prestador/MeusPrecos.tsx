'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Dialog'
import { Stack } from '@/components/ui/Stack'
import { BackBar, StickyActions } from '@/components/layout/PageHeader'
import { EU_PRESTADOR, prestador } from '@/lib/mock'
import { PrecosEditor, precosIniciais } from './PrecosEditor'

/** O prestador edita os preços do catálogo (M-05). */
export function MeusPrecos() {
  const router = useRouter()
  const toast = useToast()
  const p = prestador(EU_PRESTADOR)!
  return (
    <form onSubmit={(e) => { e.preventDefault(); toast('Preços salvos'); router.push('/app/conta') }} style={{ maxWidth: 640 }}>
      <BackBar title="Meus preços" back="/app/conta" />
      <Stack gap={4}>
        <p style={{ color: 'var(--ink-muted)' }}>Estes preços aparecem no seu card, no mapa e no seu perfil. Um pedido já aceito mantém o preço combinado.</p>
        <PrecosEditor categorias={[p.categoria]} inicial={precosIniciais(p.precos)} />
      </Stack>
      <StickyActions><Button type="submit" variant="primary" block>Salvar preços</Button></StickyActions>
    </form>
  )
}
