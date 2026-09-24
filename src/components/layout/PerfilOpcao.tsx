import { ChevronRight, KeyRound, Search, Wrench } from 'lucide-react'
import { PERFIS } from '@/lib/nav'
import type { Perfil } from '@/lib/types'

const ICONE = { corretor: KeyRound, prestador: Wrench, cliente: Search }

/** Opção de perfil (entrada e troca de perfil em Conta). */
export function PerfilOpcao({ perfil, onClick, destaque, ativo }: { perfil: Perfil; onClick: () => void; destaque?: boolean; ativo?: boolean }) {
  const Icon = ICONE[perfil]
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={ativo ? 'true' : undefined}
      style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left', padding: 14, borderRadius: 14, background: 'var(--surface)', border: destaque || ativo ? '2px solid var(--brand)' : '1px solid var(--line)' }}
    >
      <span style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--brand-soft)', color: 'var(--on-brand-soft)', display: 'grid', placeItems: 'center', flexShrink: 0 }}><Icon size={22} aria-hidden /></span>
      <span style={{ display: 'grid', flexGrow: 1 }}>
        <b style={{ fontSize: 16 }}>{PERFIS[perfil].rotulo}</b>
        <span style={{ fontSize: 13, color: 'var(--ink-muted)' }}>{ativo ? 'Perfil ativo' : PERFIS[perfil].descricao}</span>
      </span>
      <ChevronRight size={20} color="var(--ink-muted)" aria-hidden />
    </button>
  )
}
