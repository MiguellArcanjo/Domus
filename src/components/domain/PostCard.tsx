import Link from 'next/link'
import { Clock, Navigation, Wallet } from 'lucide-react'
import { Badge, Selo } from '@/components/ui/Badge'
import { Meta } from '@/components/ui/Meta'
import { Photo } from '@/components/ui/Photo'
import { km, reais } from '@/lib/format'
import { prestador } from '@/lib/mock'
import type { Post } from '@/lib/types'
import { SaveButton } from './SaveButton'
import s from './domain.module.css'

/** Card da vitrine (referência Event Discovery): foto grande, selo sobre a foto, preço e metadados. */
export function PostCard({ post, href, compact }: { post: Post; href: string; compact?: boolean }) {
  const p = prestador(post.prestadorSlug)
  return (
    <article className={s.post}>
      <div className={s.postMedia}>
        <Photo legenda={post.fotoLegenda} height={compact ? 150 : 190} />
        <div className={s.postBadge}>{post.destaque ? <Badge tone="accent">Destaque</Badge> : post.verificado ? <Selo /> : null}</div>
        <div className={s.postSave}><SaveButton label={post.titulo} /></div>
      </div>
      <Link href={href} className={s.postBody}>
        <div className={s.postTop}>
          <h3 className={s.postTitle}>{post.titulo}</h3>
          <span className={s.price}><Wallet size={14} aria-hidden />{reais(post.preco)}</span>
        </div>
        <Meta icon={Navigation}>{p?.nome} · {post.bairro}{p ? `, ${km(p.distanciaKm)}` : ''}</Meta>
        {!compact && <Meta icon={Clock}>Feito em {post.feitoEm}</Meta>}
      </Link>
    </article>
  )
}
