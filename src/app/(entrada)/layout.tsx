/** Telas de entrada: coluna estreita, centralizada no computador. */
export default function EntradaLayout({ children }: { children: React.ReactNode }) {
  return <main id="conteudo" style={{ maxWidth: 460, margin: '0 auto', padding: '16px var(--gutter) 32px', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>{children}</main>
}
