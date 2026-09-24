'use client'

import { useCallback, useSyncExternalStore } from 'react'

/**
 * Estado local persistido no navegador (só front).
 * Guarda o que a pessoa faz na tela — salvos, curtidas, seguindo, comentários, mensagens —
 * para as telas reagirem de verdade. O backend substitui isto pelas rotas descritas em docs/backend.md.
 */
const listeners = new Set<() => void>()
const cache = new Map<string, unknown>()

function ler<T>(key: string, inicial: T): T {
  if (cache.has(key)) return cache.get(key) as T
  let v = inicial
  try {
    const raw = localStorage.getItem(`domu:${key}`)
    if (raw) v = JSON.parse(raw) as T
  } catch {
    /* sem storage */
  }
  cache.set(key, v)
  return v
}

function assinar(fn: () => void) {
  listeners.add(fn)
  return () => { listeners.delete(fn) }
}

export function useLocal<T>(key: string, inicial: T): [T, (v: T | ((a: T) => T)) => void] {
  const valor = useSyncExternalStore(assinar, () => ler(key, inicial), () => inicial)
  const set = useCallback((v: T | ((a: T) => T)) => {
    const atual = ler(key, inicial)
    const novo = typeof v === 'function' ? (v as (a: T) => T)(atual) : v
    cache.set(key, novo)
    try { localStorage.setItem(`domu:${key}`, JSON.stringify(novo)) } catch { /* sem storage */ }
    listeners.forEach((l) => l())
  }, [key, inicial])
  return [valor, set]
}

const VAZIO: string[] = []

/** Conjunto de ids (salvos, curtidas, seguindo). */
export function useSet(key: string, inicial: string[] = VAZIO) {
  const [lista, setLista] = useLocal<string[]>(key, inicial)
  const tem = useCallback((id: string) => lista.includes(id), [lista])
  const alternar = useCallback((id: string) => setLista((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id])), [setLista])
  return { lista, tem, alternar }
}

export const SALVOS_INICIAIS = { prestadores: ['joao-batista', 'ana-lima'], posts: ['p1'] }
