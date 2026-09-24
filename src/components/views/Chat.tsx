'use client'

import { useEffect, useRef, useState } from 'react'
import { Send } from 'lucide-react'
import { mascararContato } from '@/lib/moderacao'
import { MENSAGENS_INICIAIS } from '@/lib/mock'
import { useLocal } from '@/lib/store'

type Msg = { de: 'eu' | 'ele'; texto: string; quando: string }
const PADRAO: Msg[] = [{ de: 'ele', texto: 'Oi! Posso ajudar com o serviço. Me conte o que aconteceu.', quando: 'agora' }]

/** Conversa dentro do app. Telefone, e-mail, @ e links são ocultados (PRD: contato por fora). */
export function Chat({ slug, nome }: { slug: string; nome: string }) {
  const [msgs, setMsgs] = useLocal<Msg[]>(`chat:${slug}`, MENSAGENS_INICIAIS[slug] ?? PADRAO)
  const [texto, setTexto] = useState('')
  const [aviso, setAviso] = useState('')
  const fim = useRef<HTMLDivElement>(null)
  useEffect(() => { fim.current?.scrollIntoView({ block: 'end' }) }, [msgs.length])
  function enviar(e: React.FormEvent) {
    e.preventDefault()
    if (!texto.trim()) return
    const { texto: limpo, mascarado } = mascararContato(texto.trim())
    setAviso(mascarado ? 'Ocultamos o contato. Para sua segurança, combine e pague pelo app.' : '')
    const hora = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    setMsgs((l) => [...l, { de: 'eu', texto: limpo, quando: hora }])
    setTexto('')
  }
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div role="log" aria-label={`Conversa com ${nome}`} style={{ display: 'grid', gap: 8 }}>
        {msgs.map((m, n) => (
          <div key={n} style={{ justifySelf: m.de === 'eu' ? 'end' : 'start', maxWidth: '80%', padding: '10px 12px', fontSize: 15, borderRadius: m.de === 'eu' ? '14px 14px 4px 14px' : '14px 14px 14px 4px', background: m.de === 'eu' ? 'var(--brand)' : 'var(--surface)', color: m.de === 'eu' ? 'var(--on-brand)' : 'var(--ink)', border: m.de === 'eu' ? 0 : '1px solid var(--line)' }}>
            {m.texto}<span style={{ display: 'block', fontSize: 11, opacity: 0.7, textAlign: 'right', marginTop: 2 }}>{m.quando}</span>
          </div>
        ))}
        <div ref={fim} />
      </div>
      <p style={{ fontSize: 12, color: aviso ? 'var(--warning)' : 'var(--ink-muted)', textAlign: 'center' }} role="status">{aviso || 'Para sua segurança, telefones e links são ocultados. Combine e pague pelo app.'}</p>
      <form onSubmit={enviar} style={{ display: 'flex', gap: 8, position: 'sticky', bottom: 90 }}>
        <label style={{ flexGrow: 1 }}><span className="sr-only">Mensagem</span><input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Escreva uma mensagem" style={{ width: '100%', height: 48, borderRadius: 24, border: '1px solid var(--line-strong)', padding: '0 16px', background: 'var(--surface)' }} /></label>
        <button type="submit" aria-label="Enviar mensagem" style={{ width: 48, height: 48, borderRadius: 24, border: 0, background: 'var(--brand)', color: 'var(--on-brand)', display: 'grid', placeItems: 'center', flexShrink: 0 }}><Send size={20} aria-hidden /></button>
      </form>
    </div>
  )
}
