import type { Metadata } from 'next'
import { RecuperarSenhaForm } from './RecuperarSenhaForm'

export const metadata: Metadata = { title: 'Recuperar senha' }

export default function RecuperarSenha() {
  return <RecuperarSenhaForm />
}
