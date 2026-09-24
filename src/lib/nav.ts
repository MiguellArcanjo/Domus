import {
  CalendarDays, ClipboardList, FileText, House, Inbox, KeyRound, Map, Plus, Bookmark, User, Wallet, type LucideIcon,
} from 'lucide-react'
import type { Perfil } from './types'

export interface ItemNav {
  href: string
  rotulo: string
  icone: LucideIcon
  /** some da barra de abas do celular (fica só na barra lateral) */
  soLateral?: boolean
}

/** Navegação de cada perfil. No celular vira a barra de abas; no computador, a barra lateral. */
export const NAV: Record<Perfil, ItemNav[]> = {
  corretor: [
    { href: '/app/painel', rotulo: 'Início', icone: House },
    { href: '/app/imoveis', rotulo: 'Imóveis', icone: KeyRound },
    { href: '/app/chamados', rotulo: 'Chamados', icone: Inbox },
    { href: '/app/explorar', rotulo: 'Explorar', icone: Map },
    { href: '/app/contratos', rotulo: 'Contratos', icone: FileText, soLateral: true },
    { href: '/app/conta', rotulo: 'Perfil', icone: User },
  ],
  prestador: [
    { href: '/app/pedidos', rotulo: 'Pedidos', icone: Inbox },
    { href: '/app/agenda', rotulo: 'Agenda', icone: CalendarDays },
    { href: '/app/postar', rotulo: 'Postar', icone: Plus },
    { href: '/app/carteira', rotulo: 'Carteira', icone: Wallet },
    { href: '/app/conta', rotulo: 'Perfil', icone: User },
  ],
  cliente: [
    { href: '/app/explorar', rotulo: 'Explorar', icone: Map },
    { href: '/app/meus-pedidos', rotulo: 'Pedidos', icone: ClipboardList },
    { href: '/app/salvos', rotulo: 'Salvos', icone: Bookmark },
    { href: '/app/conta', rotulo: 'Perfil', icone: User },
  ],
}

export const INICIO: Record<Perfil, string> = {
  corretor: '/app/painel',
  prestador: '/app/pedidos',
  cliente: '/app/explorar',
}

export const PERFIS: Record<Perfil, { rotulo: string; descricao: string }> = {
  corretor: { rotulo: 'Corretor ou proprietário', descricao: 'Imóveis, contratos, cobrança e chamados' },
  prestador: { rotulo: 'Prestador de serviço', descricao: 'Receba pedidos e só pague quando fechar' },
  cliente: { rotulo: 'Cliente', descricao: 'Ache um prestador confiável com preço' },
}

export const COOKIE_PERFIL = 'domu_perfil'
