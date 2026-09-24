import { Link2Off } from 'lucide-react'

/** Link do inquilino com token inválido, trocado ou de contrato encerrado. */
export function LinkInvalido() {
  return (
    <div role="alert" style={{ display: 'grid', gap: 14, justifyItems: 'start', paddingTop: 24 }}>
      <Link2Off size={40} color="var(--ink-muted)" aria-hidden />
      <h1 style={{ fontSize: 26, lineHeight: 1.2 }}>Este link não vale mais</h1>
      <p style={{ color: 'var(--ink-muted)' }}>O contrato pode ter terminado ou o corretor gerou um link novo. Peça o link atualizado ao seu corretor.</p>
    </div>
  )
}
