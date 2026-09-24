'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { CircleCheck, X } from 'lucide-react'
import { cn } from '@/lib/format'
import s from './Dialog.module.css'

/** Janela modal acessível (usa <dialog> nativo: foco preso e Esc fecha). `sheet` sobe de baixo no celular. */
export function Dialog({ open, onClose, title, description, children, actions, sheet }: {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children?: React.ReactNode
  actions?: React.ReactNode
  sheet?: boolean
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])
  return (
    <dialog ref={ref} className={cn(s.dialog, sheet && s.sheet)} onClose={onClose} onClick={(e) => { if (e.target === ref.current) onClose() }} aria-labelledby="dialog-titulo">
      {open && (
        <div className={s.inner}>
          <div className={s.head}>
            <div>
              <h2 id="dialog-titulo">{title}</h2>
              {description && <p>{description}</p>}
            </div>
            <button type="button" className={s.close} aria-label="Fechar" onClick={onClose}><X size={18} aria-hidden /></button>
          </div>
          {children}
          {actions && <div className={s.actions}>{actions}</div>}
        </div>
      )}
    </dialog>
  )
}

/** Confirmação para ações que não têm volta (excluir, cancelar, encerrar). */
export function Confirm({ open, onClose, onConfirm, title, description, confirmar = 'Confirmar', perigo }: {
  open: boolean; onClose: () => void; onConfirm: () => void; title: string; description?: string; confirmar?: string; perigo?: boolean
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      actions={
        <>
          <button type="button" onClick={onClose} style={btn('var(--surface)', 'var(--ink)', 'var(--line-strong)')}>Voltar</button>
          <button type="button" onClick={() => { onConfirm(); onClose() }} style={perigo ? btn('var(--danger)', '#fff', 'var(--danger)') : btn('var(--brand)', 'var(--on-brand)', 'var(--brand)')}>{confirmar}</button>
        </>
      }
    />
  )
}

function btn(bg: string, fg: string, bd: string): React.CSSProperties {
  return { minHeight: 44, padding: '0 20px', borderRadius: 999, border: `1px solid ${bd}`, background: bg, color: fg, fontWeight: 600 }
}

/* ---------- Toast ---------- */
const ToastCtx = createContext<(msg: string) => void>(() => {})

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [msgs, setMsgs] = useState<Array<{ id: number; msg: string }>>([])
  const show = useCallback((msg: string) => {
    const id = Date.now() + Math.random()
    setMsgs((m) => [...m, { id, msg }])
    setTimeout(() => setMsgs((m) => m.filter((x) => x.id !== id)), 3200)
  }, [])
  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div className={s.toasts} role="status" aria-live="polite">
        {msgs.map((m) => <div key={m.id} className={s.toast}><CircleCheck size={18} aria-hidden />{m.msg}</div>)}
      </div>
    </ToastCtx.Provider>
  )
}

/** Mostra um aviso rápido de confirmação ("Salvo", "Link copiado"). */
export function useToast() {
  return useContext(ToastCtx)
}
