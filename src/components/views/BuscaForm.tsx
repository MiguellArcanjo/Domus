'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Chip, ChipRow } from '@/components/ui/Chip'
import { Eyebrow } from '@/components/ui/Meta'
import { Stack } from '@/components/ui/Stack'

const RECENTES = ['Chuveiro', 'Pintor']
const MAIS_PEDIDOS = ['Troca de chuveiro', 'Desentupimento', 'Pintura de quarto', 'Instalação de tomada', 'Faxina pós-mudança', 'Vazamento']

/** Busca aberta (referência Event Discovery): recentes, mais pedidos e o campo com Cancelar. */
export function BuscaForm() {
  const router = useRouter()
  const ir = (q: string) => `/app/busca/resultados?q=${encodeURIComponent(q)}`
  return (
    <Stack gap={4} style={{ maxWidth: 640 }}>
      <form role="search" onSubmit={(e) => { e.preventDefault(); router.push(ir(String(new FormData(e.currentTarget).get('q') ?? ''))) }} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <label style={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 8, height: 48, padding: '0 14px', borderRadius: 12, background: 'var(--surface-muted)' }}>
          <Search size={18} color="var(--ink-muted)" aria-hidden />
          <span className="sr-only">Buscar serviço</span>
          <input name="q" type="search" autoFocus placeholder="Que serviço você procura?" style={{ border: 0, background: 'transparent', outline: 0, flexGrow: 1, fontSize: 16 }} />
        </label>
        <Link href="/app/explorar" style={{ color: 'var(--brand)', fontWeight: 600, padding: '10px 4px' }}>Cancelar</Link>
      </form>
      <Eyebrow as="h2">Recentes</Eyebrow>
      <ChipRow wrap label="Buscas recentes">{RECENTES.map((t) => <Chip key={t} href={ir(t)}>{t}</Chip>)}</ChipRow>
      <Eyebrow as="h2">Mais pedidos</Eyebrow>
      <ChipRow wrap label="Mais pedidos">{MAIS_PEDIDOS.map((t) => <Chip key={t} href={ir(t)}>{t}</Chip>)}</ChipRow>
    </Stack>
  )
}
