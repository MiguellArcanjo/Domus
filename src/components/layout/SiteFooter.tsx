import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import s from './SiteChrome.module.css'

const COLUNAS = [
  { titulo: 'Produto', links: [['Para corretores', '/para-corretores'], ['Para prestadores', '/para-prestadores'], ['Encontrar prestador', '/servicos/encanador/sao-paulo'], ['Preços', '/para-corretores#planos']] },
  { titulo: 'Serviços', links: [['Encanador', '/servicos/encanador/sao-paulo'], ['Eletricista', '/servicos/eletricista/sao-paulo'], ['Pintor', '/servicos/pintor/sao-paulo'], ['Diarista', '/servicos/diarista/sao-paulo']] },
  { titulo: 'Domu', links: [['Como funciona', '/#como-funciona'], ['Ajuda', '/ajuda'], ['Termos de uso', '/termos'], ['Privacidade (LGPD)', '/privacidade'], ['Entrar', '/entrar']] },
]

export function SiteFooter() {
  return (
    <footer className={s.footer}>
      <div className={s.footerInner}>
        <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
          <Logo size={26} tone="negativo" />
          <p>Aluguel em dia. Casa em ordem.</p>
          <p className={s.legal}>© Domu · [CNPJ] · [cidade]</p>
        </div>
        {COLUNAS.map((c) => (
          <nav key={c.titulo} className={s.footerCol} aria-label={c.titulo}>
            <b>{c.titulo}</b>
            {c.links.map(([rotulo, href]) => <Link key={rotulo} href={href}>{rotulo}</Link>)}
          </nav>
        ))}
      </div>
    </footer>
  )
}
