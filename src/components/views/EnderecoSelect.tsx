'use client'

import Link from 'next/link'
import { Select } from '@/components/ui/Extras'
import { ENDERECOS } from '@/lib/mock'
import { useLocal } from '@/lib/store'
import type { Endereco } from './Enderecos'

/** Escolha do endereço do serviço no pagamento. */
export function EnderecoSelect() {
  const [lista] = useLocal<Endereco[]>('enderecos', ENDERECOS)
  const principal = lista.find((e) => e.principal) ?? lista[0]
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      <Select id="endereco" name="endereco" label="Endereço do serviço" defaultValue={principal?.id}>
        {lista.map((e) => <option key={e.id} value={e.id}>{e.apelido} · {e.linha}</option>)}
      </Select>
      <Link href="/app/enderecos" style={{ fontSize: 13, color: 'var(--brand)', fontWeight: 600 }}>Gerenciar endereços</Link>
    </div>
  )
}
