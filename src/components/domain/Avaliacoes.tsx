import { Star } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Selo } from '@/components/ui/Badge'
import { nota } from '@/lib/format'
import type { Prestador } from '@/lib/types'

const EXEMPLOS = [
  { autor: 'Marina', iniciais: 'MA', nota: 5, texto: 'Chegou no horário, explicou o problema e deixou tudo limpo.', quando: '12 set', servico: 'Troca de sifão' },
  { autor: 'Carlos', iniciais: 'CA', nota: 5, texto: 'Resolveu na primeira visita.', quando: '03 set', servico: 'Desentupimento de pia' },
  { autor: 'Lúcia', iniciais: 'LU', nota: 4, texto: 'Bom serviço, atrasou 20 minutos mas avisou.', quando: '28 ago', servico: 'Troca de registro' },
]

/** Avaliações verificadas (M-08): só de quem contratou e pagou pelo app. */
export function Avaliacoes({ p }: { p: Prestador }) {
  const dist = [5, 4, 3, 2, 1].map((n) => ({ n, pct: n === 5 ? 82 : n === 4 ? 14 : n === 3 ? 4 : 0 }))
  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}><b style={{ fontSize: 36 }}>{nota(p.nota)}</b><p style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{p.avaliacoes} avaliações</p></div>
        <ul style={{ flexGrow: 1, display: 'grid', gap: 4 }}>
          {dist.map((d) => <li key={d.n} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}><span style={{ width: 10 }}>{d.n}</span><span style={{ flexGrow: 1, height: 6, borderRadius: 3, background: 'var(--surface-muted)' }}><span style={{ display: 'block', height: 6, borderRadius: 3, width: `${d.pct}%`, background: 'var(--accent)' }} /></span></li>)}
        </ul>
      </div>
      {EXEMPLOS.map((a) => (
        <article key={a.autor} style={{ display: 'grid', gap: 6, paddingBottom: 14, borderBottom: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar iniciais={a.iniciais} size={32} />
            <b style={{ fontSize: 14, flexGrow: 1 }}>{a.autor}</b>
            <span style={{ display: 'inline-flex', gap: 2 }} aria-label={`${a.nota} de 5`}>{Array.from({ length: 5 }, (_, i) => <Star key={i} size={13} aria-hidden style={{ color: 'var(--warning)', fill: i < a.nota ? 'var(--accent)' : 'transparent' }} />)}</span>
          </div>
          <p style={{ fontSize: 14 }}>{a.texto}</p>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'var(--ink-muted)' }}><Selo />{a.servico} · {a.quando}</div>
        </article>
      ))}
    </div>
  )
}
