/**
 * Regra do PRD: nada de contato por fora. Oculta telefone, e-mail, @ e links em mensagens, legendas e comentários.
 * O backend deve aplicar a mesma regra; esta versão só dá o retorno imediato na tela.
 */
const PADROES = [
  /\(?\d{2}\)?\s?9?\d{4}[-\s]?\d{4}/g, // telefone
  /[\w.+-]+@[\w-]+\.[\w.]+/g, // e-mail
  /(^|\s)@[\w.]+/g, // @perfil
  /(https?:\/\/|www\.)\S+/gi, // link
]

export function mascararContato(texto: string): { texto: string; mascarado: boolean } {
  let out = texto
  for (const p of PADROES) out = out.replace(p, (m) => (m.startsWith(' ') ? ' ' : '') + '•••')
  return { texto: out, mascarado: out !== texto }
}
