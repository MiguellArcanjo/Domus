'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  BadgeCheck, Bell, Bookmark, CalendarRange, ChevronRight, CircleHelp, ClipboardCheck, CreditCard, FileText, KeyRound, Lock, LogOut,
  MapPin, MessageCircle, Repeat, Sparkles, Store, User, Users, Wallet, type LucideIcon,
} from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Card } from '@/components/ui/Card'
import { Confirm, useToast } from '@/components/ui/Dialog'
import { Eyebrow } from '@/components/ui/Meta'
import { Row, Stack } from '@/components/ui/Stack'
import { PageHeader } from '@/components/layout/PageHeader'
import { PerfilOpcao } from '@/components/layout/PerfilOpcao'
import { usePerfil } from '@/components/layout/PerfilProvider'
import { USUARIO } from '@/lib/mock'
import { INICIO } from '@/lib/nav'
import { useLocal } from '@/lib/store'
import type { Perfil } from '@/lib/types'
import { useState } from 'react'

type Item = { icone: LucideIcon; rotulo: string; href: string }

/** Atalhos de cada perfil (no celular é daqui que se chega às telas que não cabem na barra de abas). */
const DO_PERFIL: Record<Perfil, { titulo: string; itens: Item[] }> = {
  corretor: { titulo: 'Sua carteira', itens: [
    { icone: Wallet, rotulo: 'Financeiro: cobranças e repasses', href: '/app/financeiro' },
    { icone: FileText, rotulo: 'Contratos', href: '/app/contratos' },
    { icone: Repeat, rotulo: 'Reajustes', href: '/app/reajustes' },
    { icone: ClipboardCheck, rotulo: 'Vistorias', href: '/app/vistorias' },
    { icone: Users, rotulo: 'Meus prestadores', href: '/app/meus-prestadores' },
    { icone: CreditCard, rotulo: 'Assinatura', href: '/app/assinatura' },
  ] },
  prestador: { titulo: 'Seu negócio', itens: [
    { icone: Store, rotulo: 'Meu perfil público', href: '/app/meu-perfil' },
    { icone: Wallet, rotulo: 'Meus preços', href: '/app/meus-precos' },
    { icone: BadgeCheck, rotulo: 'Verificação', href: '/app/verificacao' },
    { icone: Sparkles, rotulo: 'Destaque', href: '/app/destaque' },
    { icone: CreditCard, rotulo: 'Dados de recebimento', href: '/app/carteira/recebimento' },
    { icone: MessageCircle, rotulo: 'Mensagens', href: '/app/mensagens' },
    { icone: CalendarRange, rotulo: 'Refazer cadastro', href: '/app/cadastro-prestador' },
  ] },
  cliente: { titulo: 'Seus serviços', itens: [
    { icone: MessageCircle, rotulo: 'Mensagens', href: '/app/mensagens' },
    { icone: MapPin, rotulo: 'Endereços', href: '/app/enderecos' },
    { icone: Bookmark, rotulo: 'Salvos e seguindo', href: '/app/salvos' },
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
  const [prestadorCadastrado] = useLocal('prestadorCadastrado', false)
  const [sair, setSair] = useState(false)
  const trocar = (p: Perfil) => {
    setPerfil(p)
    router.push(p === 'prestador' && !prestadorCadastrado ? '/app/cadastro-prestador' : INICIO[p])
  }
  return (
    <Stack gap={4} style={{ maxWidth: 640 }}>
      <PageHeader title="Perfil" />
      <Card href="/app/conta/dados"><Row gap={3}><Avatar iniciais={USUARIO.iniciais} size={56} /><div style={{ flexGrow: 1 }}><b style={{ fontSize: 17 }}>{USUARIO.nome}</b><p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{USUARIO.email}</p></div><ChevronRight size={18} color="var(--ink-muted)" aria-hidden /></Row></Card>
      <Eyebrow as="h2">{DO_PERFIL[perfil].titulo}</Eyebrow>
      <Lista itens={DO_PERFIL[perfil].itens} />
      <Eyebrow as="h2">Trocar perfil</Eyebrow>
      <Stack gap={2}>{(['corretor', 'prestador', 'cliente'] as Perfil[]).map((p) => <PerfilOpcao key={p} perfil={p} ativo={perfil === p} onClick={() => trocar(p)} />)}</Stack>
      <Eyebrow as="h2">Conta</Eyebrow>
      <Lista itens={CONTA} />
      <button type="button" onClick={() => setSair(true)} style={{ display: 'flex', gap: 10, alignItems: 'center', color: 'var(--danger)', fontWeight: 600, padding: '12px 0', background: 'none', border: 0 }}><LogOut size={18} aria-hidden />Sair</button>
      <Confirm open={sair} onClose={() => setSair(false)} onConfirm={() => { toast('Você saiu da conta'); router.push('/entrar') }} title="Sair da conta?" confirmar="Sair" />
    </Stack>
  )
}
