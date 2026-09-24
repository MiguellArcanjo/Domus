import s from './patterns.module.css'

/** Mostra o conteúdo só no celular e tablet (< 1024 px). */
export function MobileOnly({ children }: { children: React.ReactNode }) {
  return <div className={s.mobileOnly}>{children}</div>
}

/** Mostra o conteúdo só no computador (≥ 1024 px). */
export function DesktopOnly({ children }: { children: React.ReactNode }) {
  return <div className={s.desktopOnly}>{children}</div>
}

/** Duas colunas no computador (conteúdo + lateral); uma no celular. */
export function Split({ children, three }: { children: React.ReactNode; three?: boolean }) {
  return <div className={`${s.split} ${three ? s.split3 : ''}`}>{children}</div>
}

export function Panel({ children, flush, label }: { children: React.ReactNode; flush?: boolean; label?: string }) {
  return <section aria-label={label} className={`${s.panel} ${flush ? s.panelFlush : ''}`}>{children}</section>
}
