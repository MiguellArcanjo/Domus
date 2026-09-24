'use client'

import { useRouter } from 'next/navigation'
import s from './patterns.module.css'

export interface Coluna<T> { titulo: string; celula: (item: T) => React.ReactNode; largura?: string }

/** Tabela do computador. A linha inteira abre o item (e o primeiro campo é um link de verdade para o teclado). */
export function DataTable<T extends { id: string }>({ itens, colunas, href, selecionado, label }: { itens: T[]; colunas: Coluna<T>[]; href: (item: T) => string; selecionado?: string; label: string }) {
  const router = useRouter()
  return (
    <div className={s.tableWrap}>
      <table className={s.table} aria-label={label}>
        <thead>
          <tr>{colunas.map((c) => <th key={c.titulo} style={{ width: c.largura }}>{c.titulo}</th>)}</tr>
        </thead>
        <tbody>
          {itens.map((item) => (
            <tr key={item.id} aria-selected={item.id === selecionado} onClick={() => router.push(href(item))}>
              {colunas.map((c) => <td key={c.titulo}>{c.celula(item)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
