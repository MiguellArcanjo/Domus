'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/format'
import { LINKS_SITE } from './siteLinks'
import s from './SiteChrome.module.css'

export function SiteHeader({ dark }: { dark?: boolean }) {
  const [aberto, setAberto] = useState(false)
  return (
    <header className={cn(s.header, dark && s.dark)}>
      <div className={s.inner}>
        <Link href="/" aria-label="Domu, página inicial"><Logo size={24} tone={dark ? 'negativo' : 'principal'} /></Link>
        <nav className={s.nav} aria-label="Site">
          {LINKS_SITE.map((l) => <Link key={l.href} href={l.href}>{l.rotulo}</Link>)}
        </nav>
        <div className={s.actions}>
          <Link href="/entrar" className={s.entrar}>Entrar</Link>
          <span className={s.cta}><Button href="/entrar" variant={dark ? 'light' : 'dark'}>Começar grátis</Button></span>
          <button type="button" className={s.menu} aria-expanded={aberto} aria-controls="menu-site" aria-label={aberto ? 'Fechar menu' : 'Abrir menu'} onClick={() => setAberto(!aberto)} style={{ background: 'none', border: 0, padding: 10 }}>
            {aberto ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </div>
      </div>
      {aberto && (
        <nav id="menu-site" className={s.menuPanel} aria-label="Site">
          {LINKS_SITE.map((l) => <Link key={l.href} href={l.href} onClick={() => setAberto(false)}>{l.rotulo}</Link>)}
          <Button href="/entrar" variant="primary" block>Começar grátis</Button>
        </nav>
      )}
    </header>
  )
}
