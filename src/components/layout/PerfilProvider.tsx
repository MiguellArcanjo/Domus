'use client'

import { createContext, useCallback, useContext, useSyncExternalStore } from 'react'
import { COOKIE_PERFIL } from '@/lib/nav'
import type { Perfil } from '@/lib/types'

/**
 * Perfil ativo (corretor, prestador ou cliente). Só front: fica no localStorage do navegador.
 * Quando houver backend, troque por o perfil da sessão.
 */
const PERFIS: Perfil[] = ['corretor', 'prestador', 'cliente']
const listeners = new Set<() => void>()

function ler(): Perfil {
  try {
    const v = localStorage.getItem(COOKIE_PERFIL)
    return PERFIS.includes(v as Perfil) ? (v as Perfil) : 'corretor'
  } catch {
    return 'corretor'
  }
}

function assinar(fn: () => void) {
  listeners.add(fn)
  window.addEventListener('storage', fn)
  return () => {
    listeners.delete(fn)
    window.removeEventListener('storage', fn)
  }
}

const Ctx = createContext<{ perfil: Perfil; setPerfil: (p: Perfil) => void }>({ perfil: 'corretor', setPerfil: () => {} })

export function PerfilProvider({ children }: { children: React.ReactNode }) {
  const perfil = useSyncExternalStore(assinar, ler, () => 'corretor' as Perfil)
  const setPerfil = useCallback((p: Perfil) => {
    try {
      localStorage.setItem(COOKIE_PERFIL, p)
    } catch {
      /* navegador sem storage: segue só nesta tela */
    }
    listeners.forEach((l) => l())
  }, [])
  return <Ctx.Provider value={{ perfil, setPerfil }}>{children}</Ctx.Provider>
}

export function usePerfil() {
  return useContext(Ctx)
}
