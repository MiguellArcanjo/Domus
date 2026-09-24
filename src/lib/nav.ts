import { ClipboardList, CreditCard, FileBarChart, House, MapPin, Sparkles, Store, User, Wallet, type LucideIcon } from 'lucide-react'
import type { Perfil } from './types'

export interface ItemNav {
  href: string
  rotulo: string
  icone: LucideIcon
  /** some da barra de abas do celular (fica só na barra lateral) */
  soLateral?: boolean
}

/**
 * Navegação do site com login (versão reduzida). No celular vira a barra de abas; no computador, a barra lateral.
 * A operação do dia a dia (imóveis, chamados, pedidos, agenda, explorar, mensagens...) fica no app mobile.
 */
export const NAV: Record<Perfil, ItemNav[]> = {
  corretor: [
    { href: '/app/painel', rotulo: 'Início', icone: House },
    { href: '/app/financeiro', rotulo: 'Relatórios', icone: FileBarChart },
    { href: '/app/assinatura', rotulo: 'Assinatura', icone: CreditCard },
    { href: '/app/conta', rotulo: 'Conta', icone: User },
  ],
  prestador: [
    { href: '/app/painel', rotulo: 'Início', icone: House },
    { href: '/app/carteira', rotulo: 'Carteira', icone: Wallet },
    { href: '/app/destaque', rotulo: 'Destaque', icone: Sparkles },
    { href: '/app/meu-perfil', rotulo: 'Perfil público', icone: Store, soLateral: true },
    { href: '/app/conta', rotulo: 'Conta', icone: User },
  ],
  cliente: [
    { href: '/app/painel', rotulo: 'Início', icone: House },
    { href: '/app/meus-pedidos', rotulo: 'Pedidos', icone: ClipboardList },
    { href: '/app/enderecos', rotulo: 'Endereços', icone: MapPin, soLateral: true },
    { href: '/app/conta', rotulo: 'Conta', icone: User },
  ],
}

export const INICIO: Record<Perfil, string> = {
  corretor: '/app/painel',
  prestador: '/app/painel',
  cliente: '/app/painel',
}

export const PERFIS: Record<Perfil, { rotulo: string; descricao: string }> = {
  corretor: { rotulo: 'Corretor ou proprietário', descricao: 'Imóveis, contratos, cobrança e chamados' },
  prestador: { rotulo: 'Prestador de serviço', descricao: 'Receba pedidos e só pague quando fechar' },
  cliente: { rotulo: 'Cliente', descricao: 'Ache um prestador confiável com preço' },
}

export const COOKIE_PERFIL = 'domu_perfil'
