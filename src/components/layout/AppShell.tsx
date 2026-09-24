'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronsUpDown } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/format'
import { USUARIO } from '@/lib/mock'
import { INICIO, NAV, PERFIS } from '@/lib/nav'
import { usePerfil } from './PerfilProvider'
import s from './AppShell.module.css'

function ativo(path: string, href: string) {
  return path === href || path.startsWith(`${href}/`)
}

/**
 * Casca do app web. Celular: barra de abas flutuante embaixo (aba ativa no círculo trena).
 * Tablet: barra lateral só com ícones. Computador: barra lateral com os nomes.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const { perfil } = usePerfil()
  const nav = NAV[perfil]

  return (
    <div className={s.shell}>
      <aside className={s.sidebar} aria-label="Menu do app">
        <Link href={INICIO[perfil]} className={s.logo} aria-label="Início do app">
          <span className={s.logoFull}><Logo size={22} /></span>
          <span className={s.logoMark}><Logo size={26} simbolo /></span>
        </Link>
        <nav aria-label="Principal" style={{ display: 'grid', gap: 4 }}>
          {nav.map(({ href, rotulo, icone: Icon }) => {
            const on = ativo(path, href)
            return (
              <Link key={href} href={href} className={cn(s.item, on && s.itemOn)} aria-current={on ? 'page' : undefined} title={rotulo}>
                <span className={s.itemIcon}><Icon size={18} aria-hidden /></span>
                <span className={s.navLabel}>{rotulo}</span>
              </Link>
            )
          })}
        </nav>
        <div className={s.spacer} />
        <Link href="/app/conta" className={s.perfil} title="Trocar perfil">
          <Avatar iniciais={USUARIO.iniciais} size={36} />
          <span className={s.perfilText}>
            <b>{USUARIO.nome}</b>
            <span>{PERFIS[perfil].rotulo.split(' ')[0]} · trocar perfil</span>
          </span>
          <ChevronsUpDown size={16} aria-hidden className={s.perfilText} style={{ display: 'block', color: 'var(--ink-muted)' }} />
        </Link>
      </aside>

      <main className={s.main} id="conteudo">{children}</main>

      <nav className={s.tabbar} aria-label="Navegação principal">
        {nav.filter((i) => !i.soLateral).map(({ href, rotulo, icone: Icon }) => {
          const on = ativo(path, href)
          return on ? (
            <Link key={href} href={href} aria-current="page" aria-label={rotulo} className={s.tabOn}><Icon size={22} aria-hidden /></Link>
          ) : (
            <Link key={href} href={href} className={s.tab}><Icon size={22} aria-hidden /><span>{rotulo}</span></Link>
          )
        })}
      </nav>
    </div>
  )
}
