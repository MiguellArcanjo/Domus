'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { IconButton } from '@/components/ui/IconButton'
import { PerfilOpcao } from '@/components/layout/PerfilOpcao'
import { usePerfil } from '@/components/layout/PerfilProvider'
import { useLocal } from '@/lib/store'
import { INICIO } from '@/lib/nav'
import type { Perfil } from '@/lib/types'

export function EscolherPerfil() {
  const router = useRouter()
  const params = useSearchParams()
  const { setPerfil } = usePerfil()
  const [prestadorCadastrado] = useLocal('prestadorCadastrado', false)
  const sugerido = params.get('perfil')
  const proximo = params.get('proximo')

  function escolher(p: Perfil) {
    setPerfil(p)
    if (p === 'prestador' && !prestadorCadastrado) return router.push('/app/cadastro-prestador')
    router.push(proximo && proximo.startsWith('/app') ? proximo : INICIO[p])
  }

  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <IconButton icon={ChevronLeft} label="Voltar" href="/entrar" />
      <h1 style={{ fontSize: 28, lineHeight: 1.2 }}>Como você vai usar o Domu?</h1>
      <p style={{ color: 'var(--ink-muted)' }}>Você pode ter mais de um perfil e trocar depois em Perfil.</p>
      {(['corretor', 'prestador', 'cliente'] as Perfil[]).map((p) => (
        <PerfilOpcao key={p} perfil={p} destaque={sugerido === p || (!!proximo && p === 'cliente')} onClick={() => escolher(p)} />
      ))}
      <p style={{ fontSize: 13, color: 'var(--ink-muted)' }}>Inquilino não precisa de conta: o corretor envia um link do contrato.</p>
    </div>
  )
}
