const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const brlInteiro = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

/** R$ 1.234,56 — com espaço comum depois do R$. */
export function reais(valor: number, centavos = false): string {
  return (centavos ? brl : brlInteiro).format(valor).replace(/ /g, ' ')
}

export function preco(valor: number, aPartirDe?: boolean): string {
  return `${aPartirDe ? 'a partir de ' : ''}${reais(valor)}`
}

export function km(valor: number): string {
  return `${valor.toLocaleString('pt-BR', { maximumFractionDigits: 1 })} km`
}

export function nota(valor: number): string {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
