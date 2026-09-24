'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Lock, MapPin } from 'lucide-react'
import { Badge, Selo } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PhotoPicker } from '@/components/ui/Controls'
import { TextArea } from '@/components/ui/Field'
import { Row, Stack } from '@/components/ui/Stack'
import { BackBar, StickyActions } from '@/components/layout/PageHeader'
import { CATEGORIAS } from '@/lib/categorias'

/** Post na vitrine (V-01). Vindo de um serviço concluído, herda categoria, preço e o selo verificado (V-02). */
export function NovoPostForm() {
  const router = useRouter()
  const doServico = !!useSearchParams().get('pedido')
  const Icon = CATEGORIAS.hidraulica.icone
  return (
    <form onSubmit={(e) => { e.preventDefault(); router.push('/app/post/p1') }} style={{ maxWidth: 640 }}>
      <BackBar title="Novo post" back="/app/pedidos" />
      <Stack gap={4}>
        <PhotoPicker exemplos={doServico ? ['Antes', 'Depois'] : []} label="Até 10 fotos" />
        <TextArea id="legenda" name="legenda" label="Legenda" rows={3} required placeholder="Ex.: troca de sifão e vedação da pia. 40 minutos." />
        <Row wrap gap={2}><Badge icon={Icon}>Hidráulica</Badge><Badge icon={MapPin}>Vila Mariana</Badge>{doServico && <Selo />}</Row>
        <Card><Row start gap={2}><Lock size={18} color="var(--ink-muted)" aria-hidden style={{ flexShrink: 0 }} /><p style={{ fontSize: 12, color: 'var(--ink-muted)' }}>Mostramos só o bairro. Rostos, placas e números de casa são ocultados. Telefones, @ e links na legenda são bloqueados.</p></Row></Card>
      </Stack>
      <StickyActions><Button type="submit" variant="primary" block>Publicar na vitrine</Button></StickyActions>
    </form>
  )
}
