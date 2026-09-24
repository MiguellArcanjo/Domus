'use client'

import { useEffect } from 'react'

/** Registra o service worker em produção (tela sem conexão e avisos push). */
export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return
    navigator.serviceWorker.register('/sw.js').catch(() => { /* navegador sem suporte */ })
  }, [])
  return null
}
