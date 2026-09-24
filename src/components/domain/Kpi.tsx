import Link from 'next/link'
import { ProgressBar } from '@/components/ui/Controls'
import { reais } from '@/lib/format'
import s from './domain.module.css'

/** O número principal do painel: aluguéis do mês. Fundo jade fixo nos dois temas. */
export function KpiCard({ mes, valor, pagos, total, emAtraso }: { mes: string; valor: number; pagos: number; total: number; emAtraso?: number }) {
  return (
    <section className={s.kpi} aria-label="Aluguéis do mês">
      <span className={s.kpiLabel}>A receber em {mes}</span>
      <b className={s.kpiValue}>{reais(valor)}</b>
      <ProgressBar valor={pagos / total} label={`${pagos} de ${total} aluguéis pagos`} />
      <span className={s.kpiLabel}>{pagos} de {total} aluguéis pagos{emAtraso ? ` · ${reais(emAtraso)} em atraso` : ''}</span>
    </section>
  )
}

export function StatCard({ label, valor, detalhe, href, tone }: { label: string; valor: string; detalhe?: string; href: string; tone?: 'danger' }) {
  return (
    <Link href={href} className={s.stat}>
      <span className={s.statLabel}>{label}</span>
      <b className={s.statValue} style={tone ? { color: 'var(--danger)' } : undefined}>{valor}</b>
      {detalhe && <span className={s.statLabel}>{detalhe}</span>}
    </Link>
  )
}

/** Barras simples de atividade. A última barra marcada é a do período atual. */
export function BarChart({ dados, destaque, label }: { dados: { rotulo: string; valor: number }[]; destaque?: number; label: string }) {
  const max = Math.max(...dados.map((d) => d.valor))
  return (
    <figure style={{ margin: 0 }}>
      <div className={s.chart} role="img" aria-label={label}>
        {dados.map((d, i) => (
          <div key={d.rotulo} className={s.bar} data-on={i === (destaque ?? dados.length - 1)}>
            <i style={{ height: `${Math.round((d.valor / max) * 120)}px` }} />
            <span>{d.rotulo}</span>
          </div>
        ))}
      </div>
    </figure>
  )
}
