'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Chip, ChipRow } from '@/components/ui/Chip'
import { Eyebrow } from '@/components/ui/Meta'
import { Stack } from '@/components/ui/Stack'
import { useLocal } from '@/lib/store'

const MAIS_PEDIDOS = ['Troca de chuveiro', 'Desentupimento', 'Pintura de quarto', 'Instalação de tomada', 'Faxina pós-mudança', 'Vazamento']

/** Busca aberta (referência Event Discovery): recentes, mais pedidos e o campo com Cancelar. */
export function BuscaForm() {
  const router = useRouter()
  const [recentes, setRecentes] = useLocal<string[]>('buscasRecentes', ['Chuveiro', 'Pintor'])
  const ir = (q: string) => `/app/busca/resultados?q=${encodeURIComponent(q)}`
  const buscar = (q: string) => { if (q.trim()) setRecentes((l) => [q.trim(), ...l.filter((x) => x !== q.trim())].slice(0, 5)); router.push(ir(q)) }
  return (
    <Stack gap={4} style={{ maxWidth: 640 }}>
      <form role="search" onSubmit={(e) => { e.preventDefault(); buscar(String(new FormData(e.currentTarget).get('q') ?? '')) }} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <label style={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 8, height: 48, padding: '0 14px', borderRadius: 12, background: 'var(--surface-muted)' }}>
          <Search size={18} color="var(--ink-muted)" aria-hidden />
          <span className="sr-only">Buscar serviço</span>
          <input name="q" type="search" autoFocus placeholder="Que serviço você procura?" style={{ border: 0, background: 'transparent', outline: 0, flexGrow: 1, fontSize: 16 }} />
        </label>
        <Link href="/app/explorar" style={{ color: 'var(--brand)', fontWeight: 600, padding: '10px 4px' }}>Cancelar</Link>
      </form>
      {recentes.length > 0 && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><Eyebrow as="h2">Recentes</Eyebrow><button type="button" onClick={() => setRecentes([])} style={{ background: 'none', border: 0, color: 'var(--brand)', fontWeight: 600, fontSize: 13 }}>Limpar</button></div>
          <ChipRow wrap label="Buscas recentes">{recentes.map((t) => <Chip key={t} onClick={() => buscar(t)}>{t}</Chip>)}</ChipRow>
        </>
      )}
      <Eyebrow as="h2">Mais pedidos</Eyebrow>
      <ChipRow wrap label="Mais pedidos">{MAIS_PEDIDOS.map((t) => <Chip key={t} onClick={() => buscar(t)}>{t}</Chip>)}</ChipRow>
    </Stack>
  )
}
