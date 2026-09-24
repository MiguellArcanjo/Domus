'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BadgeCheck, Flag, Gauge, List, Scale, Users } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/format'
import s from './AppShell.module.css'

const NAV = [
  { href: '/admin', rotulo: 'Visão geral', icone: Gauge },
  { href: '/admin/verificacao', rotulo: 'Verificação', icone: BadgeCheck },
  { href: '/admin/moderacao', rotulo: 'Moderação', icone: Flag },
  { href: '/admin/disputas', rotulo: 'Disputas', icone: Scale },
  { href: '/admin/catalogo', rotulo: 'Catálogo', icone: List },
  { href: '/admin/usuarios', rotulo: 'Usuários', icone: Users },
]

/** Casca da área interna da operação. Pensada para computador; no celular vira uma barra de abas rolável. */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const on = (href: string) => (href === '/admin' ? path === href : path.startsWith(href))
  return (
    <div className={s.shell}>
      <aside className={s.sidebar} aria-label="Menu da operação">
        <Link href="/admin" className={s.logo}><span className={s.logoFull}><Logo size={22} /></span><span className={s.logoMark}><Logo size={26} simbolo /></span></Link>
        <span className={s.navLabel} style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--ink-muted)', padding: '0 8px 8px' }}>Operação</span>
        <nav aria-label="Operação" style={{ display: 'grid', gap: 4 }}>
          {NAV.map(({ href, rotulo, icone: Icon }) => (
            <Link key={href} href={href} className={cn(s.item, on(href) && s.itemOn)} aria-current={on(href) ? 'page' : undefined} title={rotulo}>
              <span className={s.itemIcon}><Icon size={18} aria-hidden /></span><span className={s.navLabel}>{rotulo}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <main className={s.main} id="conteudo">{children}</main>
      <nav className={s.tabbar} aria-label="Operação" style={{ overflowX: 'auto', justifyContent: 'flex-start', gap: 4 }}>
        {NAV.map(({ href, rotulo, icone: Icon }) => (
          <Link key={href} href={href} className={on(href) ? s.tabOn : s.tab} aria-label={rotulo} aria-current={on(href) ? 'page' : undefined} style={{ flexShrink: 0 }}><Icon size={22} aria-hidden />{!on(href) && <span>{rotulo}</span>}</Link>
        ))}
      </nav>
    </div>
  )
}
