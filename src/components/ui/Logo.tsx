/** Logo Domu (conceito Arco). O símbolo vem de brand/logo; o nome usa a Geist 750. */
export function Logo({ size = 22, tone = 'principal', simbolo }: { size?: number; tone?: 'principal' | 'negativo'; simbolo?: boolean }) {
  const arco = tone === 'negativo' ? 'var(--cal)' : 'var(--brand)'
  const texto = tone === 'negativo' ? '#FFFFFF' : 'var(--ink)'
  const mark = (
    <svg width={Math.round(size * 0.82)} height={Math.round(size * 0.95)} viewBox="13 12 38 44" aria-hidden>
      <path d="M17 52V31a15 15 0 0 1 30 0v21" fill="none" stroke={arco} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={32} cy={44} r={5} fill="var(--trena)" />
    </svg>
  )
  if (simbolo) return <span role="img" aria-label="Domu" style={{ display: 'inline-flex' }}>{mark}</span>
  return (
    <span role="img" aria-label="Domu" style={{ display: 'inline-flex', alignItems: 'center', gap: Math.round(size * 0.3), fontWeight: 750, fontSize: size, letterSpacing: '-0.05em', color: texto, lineHeight: 1 }}>
      {mark}
      <span aria-hidden>domu</span>
    </span>
  )
}
