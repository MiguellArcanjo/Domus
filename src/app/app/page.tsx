'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { usePerfil } from '@/components/layout/PerfilProvider'
import { INICIO } from '@/lib/nav'

/** /app leva para o início do perfil ativo (é o start_url do PWA). */
export default function AppIndex() {
  const router = useRouter()
  const { perfil } = usePerfil()
  useEffect(() => { router.replace(INICIO[perfil]) }, [perfil, router])
  return null
}
