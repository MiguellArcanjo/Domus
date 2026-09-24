import s from './Field.module.css'

interface Base { id: string; label: string; hint?: string }

export function Input({ id, label, hint, ...rest }: Base & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'>) {
  return (
    <div className={s.field}>
      <label htmlFor={id} className={s.label}>{label}</label>
      <input id={id} className={s.input} aria-describedby={hint ? `${id}-hint` : undefined} {...rest} />
      {hint && <span id={`${id}-hint`} className={s.hint}>{hint}</span>}
    </div>
  )
}

export function TextArea({ id, label, hint, ...rest }: Base & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'>) {
  return (
    <div className={s.field}>
      <label htmlFor={id} className={s.label}>{label}</label>
      <textarea id={id} className={s.textarea} aria-describedby={hint ? `${id}-hint` : undefined} {...rest} />
      {hint && <span id={`${id}-hint`} className={s.hint}>{hint}</span>}
    </div>
  )
}

export { s as fieldStyles }
