'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Archive, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Chip, ChipRow } from '@/components/ui/Chip'
import { PhotoPicker } from '@/components/ui/Controls'
import { Confirm, useToast } from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Field'
import { Eyebrow } from '@/components/ui/Meta'
import { Row, Stack } from '@/components/ui/Stack'
import { BackBar, StickyActions } from '@/components/layout/PageHeader'
import type { Imovel } from '@/lib/types'

/** Editar um imóvel já cadastrado, arquivar (fica no histórico) ou excluir. */
export function EditarImovel({ imovel: i }: { imovel: Imovel }) {
  const router = useRouter()
  const toast = useToast()
  const [tipo, setTipo] = useState<string>(i.tipo)
  const [acao, setAcao] = useState<'arquivar' | 'excluir' | null>(null)
  const [end, compl] = i.nome.split(' · ')
  return (
    <form onSubmit={(e) => { e.preventDefault(); toast('Imóvel atualizado'); router.push(`/app/imoveis/${i.id}`) }} style={{ maxWidth: 640 }}>
      <BackBar title="Editar imóvel" back={`/app/imoveis/${i.id}`} />
      <Stack gap={4}>
        <Input id="apelido" label="Nome do imóvel" defaultValue={end} hint="Como ele aparece nas listas. Ex.: Ap 32" required />
        <Input id="complemento" label="Condomínio ou referência" defaultValue={compl} />
        <Input id="endereco" label="Endereço" defaultValue={i.endereco} required />
        <Input id="proprietario" label="Proprietário" defaultValue={i.proprietario} required />
        <ChipRow label="Tipo">{['Apartamento', 'Casa', 'Comercial'].map((t) => <Chip key={t} selected={tipo === t} onClick={() => setTipo(t)}>{t}</Chip>)}</ChipRow>
        <Eyebrow>Fotos</Eyebrow>
        <PhotoPicker exemplos={['Sala', 'Cozinha', 'Quarto']} />
        <Eyebrow>Zona de perigo</Eyebrow>
        <Row wrap gap={2}>
          <Button icon={Archive} onClick={() => setAcao('arquivar')}>Arquivar imóvel</Button>
          <Button icon={Trash2} variant="danger" onClick={() => setAcao('excluir')}>Excluir imóvel</Button>
        </Row>
      </Stack>
      <StickyActions><Button type="submit" variant="primary" block>Salvar alterações</Button></StickyActions>
      <Confirm open={acao === 'arquivar'} onClose={() => setAcao(null)} onConfirm={() => { toast('Imóvel arquivado'); router.push('/app/imoveis') }} title="Arquivar este imóvel?" description="Ele sai da lista e do painel, mas o histórico e os documentos continuam guardados." confirmar="Arquivar" />
      <Confirm open={acao === 'excluir'} onClose={() => setAcao(null)} onConfirm={() => { toast('Imóvel excluído'); router.push('/app/imoveis') }} title="Excluir este imóvel?" description="Só é possível sem contrato ativo. O histórico de chamados será apagado e não dá para desfazer." confirmar="Excluir" perigo />
    </form>
  )
}
