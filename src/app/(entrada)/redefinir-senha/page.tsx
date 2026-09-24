import type { Metadata } from 'next'
import { RedefinirSenhaForm } from './RedefinirSenhaForm'

export const metadata: Metadata = { title: 'Criar senha nova' }

export default function RedefinirSenha() {
  return <RedefinirSenhaForm />
}
