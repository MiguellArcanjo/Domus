import Link from 'next/link'
import { ArrowRight, MapPin, User } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Meta } from '@/components/ui/Meta'
import { Photo } from '@/components/ui/Photo'
import { reais } from '@/lib/format'
import type { Imovel, Tom } from '@/lib/types'
import s from './domain.module.css'

export function situacaoImovel(i: Imovel): { rotulo: string; tom: Tom } {
  if (i.status === 'vago') return { rotulo: 'Vago', tom: 'neutral' }
  if (i.situacao === 'atrasado') return { rotulo: `${i.diasAtraso} dias de atraso`, tom: 'danger' }
  if (i.alerta?.startsWith('Contrato vence')) return { rotulo: 'Vence em 30 dias', tom: 'warning' }
  if (i.situacao === 'em_aberto') return { rotulo: 'Em aberto', tom: 'info' }
  return { rotulo: 'Pago', tom: 'success' }
}

export function SituacaoBadge({ imovel }: { imovel: Imovel }) {
  const st = situacaoImovel(imovel)
  return <Badge tone={st.tom}>{st.rotulo}</Badge>
}

/** Card do imóvel (referência Property Finder: foto, selo sobre a foto e o círculo trena com seta). */
export function ImovelCard({ imovel, href }: { imovel: Imovel; href: string }) {
  return (
    <article className={s.imovel}>
      <div className={s.imovelMedia}>
        <Photo legenda={`Foto de ${imovel.nome}`} height={140} />
        <div className={s.imovelBadge}><SituacaoBadge imovel={imovel} /></div>
      </div>
      <div className={s.imovelBody}>
        <div style={{ display: 'grid', gap: 3, flexGrow: 1, minWidth: 0 }}>
          <b style={{ fontSize: 15 }}>{imovel.nome}</b>
          <Meta icon={MapPin}>{imovel.endereco}</Meta>
          <Meta icon={User}>{imovel.contrato ? `${imovel.contrato.inquilino.nome} · ${reais(imovel.contrato.valor)}` : 'Sem inquilino'}</Meta>
        </div>
        <Link href={href} className={s.arrowCircle} aria-label={`Abrir ${imovel.nome}`}><ArrowRight size={18} aria-hidden /></Link>
      </div>
    </article>
  )
}
