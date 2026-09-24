'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Bell, ChevronRight, CircleHelp, ClipboardList, CreditCard, FileBarChart, KeyRound, Landmark, Lock, LogOut, MapPin, Sparkles, Store, User, Wallet, type LucideIcon,
} from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Card } from '@/components/ui/Card'
import { Confirm, useToast } from '@/components/ui/Dialog'
import { Eyebrow } from '@/components/ui/Meta'
import { Row, Stack } from '@/components/ui/Stack'
import { BaixarApp } from '@/components/layout/BaixarApp'
import { PageHeader } from '@/components/layout/PageHeader'
import { PerfilOpcao } from '@/components/layout/PerfilOpcao'
import { usePerfil } from '@/components/layout/PerfilProvider'
import { USUARIO } from '@/lib/mock'
import { INICIO } from '@/lib/nav'
import type { Perfil } from '@/lib/types'
import { useState } from 'react'

type Item = { icone: LucideIcon; rotulo: string; href: string }

/** O que cada perfil gerencia pelo site: assinatura, destaque, relatórios e recebimento. O resto fica no app. */
const DO_PERFIL: Record<Perfil, { titulo: string; itens: Item[] }> = {
  corretor: { titulo: 'Assinatura e relatórios', itens: [
    { icone: CreditCard, rotulo: 'Assinatura, cartão e faturas', href: '/app/assinatura' },
    { icone: FileBarChart, rotulo: 'Relatórios: cobranças e repasses', href: '/app/financeiro' },
  ] },
  prestador: { titulo: 'Seu negócio', itens: [
    { icone: Sparkles, rotulo: 'Destaque na região', href: '/app/destaque' },
    { icone: Wallet, rotulo: 'Carteira e saques', href: '/app/carteira' },
    { icone: Landmark, rotulo: 'Dados de recebimento (Pix)', href: '/app/carteira/recebimento' },
    { icone: Store, rotulo: 'Perfil público', href: '/app/meu-perfil' },
  ] },
  cliente: { titulo: 'Seus serviços', itens: [
    { icone: ClipboardList, rotulo: 'Pedidos e recibos', href: '/app/meus-pedidos' },
    { icone: MapPin, rotulo: 'Endereços', href: '/app/enderecos' },
  ] },
}

const CONTA: Item[] = [
  { icone: User, rotulo: 'Seus dados', href: '/app/conta/dados' },
  { icone: KeyRound, rotulo: 'Alterar senha', href: '/app/conta/senha' },
  { icone: Bell, rotulo: 'Avisos', href: '/app/conta/notificacoes' },
  { icone: Lock, rotulo: 'Privacidade e dados (LGPD)', href: '/app/conta/privacidade' },
  { icone: CircleHelp, rotulo: 'Ajuda', href: '/ajuda' },
]

function Lista({ itens }: { itens: Item[] }) {
  return (
    <ul>
      {itens.map(({ icone: Icon, rotulo, href }) => (
        <li key={href}><Link href={href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: '1px solid var(--line)' }}><Icon size={18} color="var(--ink-muted)" aria-hidden /><span style={{ flexGrow: 1 }}>{rotulo}</span><ChevronRight size={18} color="var(--ink-muted)" aria-hidden /></Link></li>
      ))}
    </ul>
  )
}

/** Perfil e conta: dados, troca de perfil, atalhos do perfil e configurações. */
export function ContaView() {
  const router = useRouter()
  const toast = useToast()
  const { perfil, setPerfil } = usePerfil()
  const [sair, setSair] = useState(false)
  const trocar = (p: Perfil) => {
    setPerfil(p)
    router.push(INICIO[p])
  }
  return (
    <Stack gap={4} style={{ maxWidth: 640 }}>
      <PageHeader title="Conta" />
      <Card href="/app/conta/dados"><Row gap={3}><Avatar iniciais={USUARIO.iniciais} size={56} /><div style={{ flexGrow: 1 }}><b style={{ fontSize: 17 }}>{USUARIO.nome}</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{USUARIO.email}</p></div><ChevronRight size={18} color="var(--ink-muted)" aria-hidden /></Row></Card>
      <Eyebrow as="h2">{DO_PERFIL[perfil].titulo}</Eyebrow>
      <Lista itens={DO_PERFIL[perfil].itens} />
      <Eyebrow as="h2">Trocar perfil</Eyebrow>
      <Stack gap={2}>{(['corretor', 'prestador', 'cliente'] as Perfil[]).map((p) => <PerfilOpcao key={p} perfil={p} ativo={perfil === p} onClick={() => trocar(p)} />)}</Stack>
      <Eyebrow as="h2">Conta</Eyebrow>
      <Lista itens={CONTA} />
      <BaixarApp perfil={perfil} />
      <button type="button" onClick={() => setSair(true)} style={{ display: 'flex', gap: 10, alignItems: 'center', color: 'var(--danger)', fontWeight: 600, padding: '12px 0', background: 'none', border: 0 }}><LogOut size={18} aria-hidden />Sair</button>
      <Confirm open={sair} onClose={() => setSair(false)} onConfirm={() => { toast('Você saiu da conta'); router.push('/entrar') }} title="Sair da conta?" confirmar="Sair" />
    </Stack>
  )
}
