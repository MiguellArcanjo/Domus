'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Download, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Confirm, useToast } from '@/components/ui/Dialog'
import { Checkbox } from '@/components/ui/Extras'
import { Eyebrow } from '@/components/ui/Meta'
import { Stack } from '@/components/ui/Stack'
import { TextLink } from '@/components/ui/Text'
import { BackBar } from '@/components/layout/PageHeader'

/** Privacidade e dados (LGPD): consentimentos, exportar dados e excluir a conta. */
export function Privacidade() {
  const router = useRouter()
  const toast = useToast()
  const [excluir, setExcluir] = useState(false)
  return (
    <Stack gap={4} style={{ maxWidth: 640 }}>
      <BackBar title="Privacidade e dados" back="/app/conta" />
      <p style={{ color: 'var(--ink-muted)' }}>Você controla o que o Domu guarda sobre você. Leia a <TextLink href="/privacidade">Política de Privacidade</TextLink>.</p>
      <Eyebrow as="h2">Consentimentos</Eyebrow>
      <Card>
        <Checkbox defaultChecked disabled label="Termos de uso e Política de Privacidade (aceito no cadastro, necessário para usar o Domu)" />
        <Checkbox defaultChecked label="Mostrar meus trabalhos e avaliações na vitrine pública (só o bairro aparece)" />
        <Checkbox label="Receber novidades e ofertas por e-mail" />
      </Card>
      <Eyebrow as="h2">Seus dados</Eyebrow>
      <Button icon={Download} onClick={() => toast('Pedido recebido. Enviamos o arquivo para o seu e-mail em até 48 horas.')}>Exportar meus dados</Button>
      <Button icon={Trash2} variant="danger" onClick={() => setExcluir(true)}>Excluir minha conta</Button>
      <Confirm open={excluir} onClose={() => setExcluir(false)} onConfirm={() => { toast('Conta marcada para exclusão'); router.push('/') }} title="Excluir sua conta?" description="Seus dados pessoais são apagados em até 15 dias. Contratos, cobranças e notas fiscais ficam guardados pelo prazo que a lei exige. Não dá para desfazer." confirmar="Excluir conta" perigo />
    </Stack>
  )
}
