'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Bell, ChevronRight, KeyRound, Lock, LogOut, CircleHelp, Wallet } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Card } from '@/components/ui/Card'
import { Eyebrow } from '@/components/ui/Meta'
import { Row, Stack } from '@/components/ui/Stack'
import { PageHeader } from '@/components/layout/PageHeader'
import { PerfilOpcao } from '@/components/layout/PerfilOpcao'
import { usePerfil } from '@/components/layout/PerfilProvider'
import { USUARIO } from '@/lib/mock'
import { INICIO } from '@/lib/nav'
import type { Perfil } from '@/lib/types'

const ITENS = [
  { icone: Bell, rotulo: 'Notificações', href: '/app/notificacoes' },
  { icone: KeyRound, rotulo: 'Alterar senha', href: '/recuperar-senha' },
  { icone: Wallet, rotulo: 'Assinatura e pagamentos', href: '/para-corretores#planos' },
  { icone: Lock, rotulo: 'Privacidade e dados (LGPD)', href: '/#confianca' },
  { icone: CircleHelp, rotulo: 'Ajuda', href: '/#como-funciona' },
]

/** Perfil e conta: dados, troca de perfil e configurações. */
export function ContaView() {
  const router = useRouter()
  const { perfil, setPerfil } = usePerfil()
  const trocar = (p: Perfil) => { setPerfil(p); router.push(INICIO[p]) }
  return (
    <Stack gap={4} style={{ maxWidth: 640 }}>
      <PageHeader title="Perfil" />
      <Card><Row gap={3}><Avatar iniciais={USUARIO.iniciais} size={56} /><div><b style={{ fontSize: 17 }}>{USUARIO.nome}</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{USUARIO.email}</p></div></Row></Card>
      <Eyebrow as="h2">Trocar perfil</Eyebrow>
      <Stack gap={2}>{(['corretor', 'prestador', 'cliente'] as Perfil[]).map((p) => <PerfilOpcao key={p} perfil={p} ativo={perfil === p} onClick={() => trocar(p)} />)}</Stack>
      <Eyebrow as="h2">Conta</Eyebrow>
      <ul>
        {ITENS.map(({ icone: Icon, rotulo, href }) => (
          <li key={rotulo}><Link href={href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: '1px solid var(--line)' }}><Icon size={18} color="var(--ink-muted)" aria-hidden /><span style={{ flexGrow: 1 }}>{rotulo}</span><ChevronRight size={18} color="var(--ink-muted)" aria-hidden /></Link></li>
        ))}
      </ul>
      <Link href="/entrar" style={{ display: 'flex', gap: 10, alignItems: 'center', color: 'var(--danger)', fontWeight: 600, padding: '12px 0' }}><LogOut size={18} aria-hidden />Sair</Link>
    </Stack>
  )
}
