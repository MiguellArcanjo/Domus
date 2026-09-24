import { Skeleton } from '@/components/ui/Extras'

/** Enquanto a tela do app carrega. */
export default function Carregando() {
  return (
    <div style={{ display: 'grid', gap: 14, maxWidth: 720 }} aria-busy="true" aria-label="Carregando">
      <Skeleton height={34} width="45%" />
      <Skeleton height={120} radius={18} />
      <Skeleton height={86} radius={14} />
      <Skeleton height={86} radius={14} />
      <Skeleton height={86} radius={14} />
    </div>
  )
}
