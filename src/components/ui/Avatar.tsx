import s from './Avatar.module.css'

export function Avatar({ iniciais, size = 40, label }: { iniciais: string; size?: number; label?: string }) {
  return (
    <span className={s.avatar} style={{ width: size, height: size, fontSize: Math.max(12, Math.round(size / 3)) }} aria-label={label} role={label ? 'img' : undefined} aria-hidden={label ? undefined : true}>
      {iniciais}
    </span>
  )
}

export function AvatarStack({ iniciais, size = 26 }: { iniciais: string[]; size?: number }) {
  return (
    <span className={s.stack} aria-hidden>
      {iniciais.map((i) => (
        <span key={i} className={s.ring}><Avatar iniciais={i} size={size} /></span>
      ))}
    </span>
  )
}
