import { Camera } from 'lucide-react'
import { Badge, StatusBadge, UrgenteBadge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { CATEGORIAS } from '@/lib/categorias'
import { imovel } from '@/lib/mock'
import type { Chamado } from '@/lib/types'
import { CategoriaIcon } from './CategoriaIcon'
import s from './domain.module.css'

/** Um chamado na lista do corretor. O card inteiro abre o chamado. */
export function ChamadoCard({ chamado, href, selected }: { chamado: Chamado; href?: string; selected?: boolean }) {
  const im = imovel(chamado.imovelId)
  return (
    <Card href={selected ? undefined : href} tone={selected ? 'soft' : 'default'} as="article">
      <div className={s.chamado}>
        <CategoriaIcon categoria={chamado.categoria} />
        <div style={{ display: 'grid', gap: 6, minWidth: 0 }}>
          <div className={s.chamadoTop}>
            <h3 className={s.chamadoTitle}>{chamado.titulo}</h3>
            {chamado.novo && <Badge tone="accent">Novo</Badge>}
          </div>
          <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
            {im?.nome.split(' · ')[0]} · {CATEGORIAS[chamado.categoria].rotulo} · {chamado.abertoEm}
          </p>
          <div className={s.badges}>
            {chamado.urgente && <UrgenteBadge />}
            <StatusBadge estado={chamado.estado} />
            {chamado.fotos > 0 && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--ink-muted)' }}>
                <Camera size={14} aria-hidden />{chamado.fotos} {chamado.fotos > 1 ? 'fotos' : 'foto'}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
