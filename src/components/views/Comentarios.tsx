'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { Stack } from '@/components/ui/Stack'
import { BackBar } from '@/components/layout/PageHeader'
import { mascararContato } from '@/lib/moderacao'
import { COMENTARIOS_INICIAIS, USUARIO } from '@/lib/mock'
import { useLocal } from '@/lib/store'

/** Comentários do post (V-07). Comentar exige conta; telefone, @ e links são ocultados. */
export function Comentarios({ postId, titulo }: { postId: string; titulo: string }) {
  const [lista, setLista] = useLocal(`comentarios:${postId}`, COMENTARIOS_INICIAIS[postId] ?? [])
  const [texto, setTexto] = useState('')
  const [aviso, setAviso] = useState('')
  function enviar(e: React.FormEvent) {
    e.preventDefault()
    if (!texto.trim()) return
    const { texto: limpo, mascarado } = mascararContato(texto.trim())
    setAviso(mascarado ? 'Tiramos o contato do comentário. Combine tudo pelo app.' : '')
    setLista((l) => [...l, { autor: USUARIO.primeiroNome, iniciais: USUARIO.iniciais, texto: limpo, quando: 'agora' }])
    setTexto('')
  }
  return (
    <Stack gap={4} style={{ maxWidth: 640 }}>
      <BackBar title="Comentários" back={`/app/post/${postId}`} />
      <p style={{ fontWeight: 600 }}>{titulo}</p>
      {lista.length === 0 && <p style={{ color: 'var(--ink-muted)' }}>Seja o primeiro a comentar.</p>}
      <ul style={{ display: 'grid', gap: 14 }}>
        {lista.map((c, n) => (
          <li key={n} style={{ display: 'flex', gap: 10 }}>
            <Avatar iniciais={c.iniciais} size={36} />
            <div><b style={{ fontSize: 14 }}>{c.autor}</b> <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{c.quando}</span><p style={{ fontSize: 14 }}>{c.texto}</p></div>
          </li>
        ))}
      </ul>
      {aviso && <p role="status" style={{ fontSize: 13, color: 'var(--warning)' }}>{aviso}</p>}
      <form onSubmit={enviar} style={{ display: 'flex', gap: 8, position: 'sticky', bottom: 90 }}>
        <label style={{ flexGrow: 1 }}><span className="sr-only">Comentário</span><input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Escreva um comentário" style={{ width: '100%', height: 48, borderRadius: 24, border: '1px solid var(--line-strong)', padding: '0 16px', background: 'var(--surface)' }} /></label>
        <button type="submit" aria-label="Publicar comentário" style={{ width: 48, height: 48, borderRadius: 24, border: 0, background: "var(--brand)", color: "var(--on-brand)", display: "grid", placeItems: "center", flexShrink: 0 }}><Send size={20} aria-hidden /></button>
      </form>
    </Stack>
  )
}
