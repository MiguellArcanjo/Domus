import type { CategoriaId } from '../types'

/** Catálogo de serviços padronizados por categoria (M-04). O prestador define o preço de cada item (M-05). */
export const CATALOGO: Array<{ id: string; categoria: CategoriaId; nome: string; precoMedio: number }> = [
  { id: 'visita', categoria: 'hidraulica', nome: 'Visita técnica', precoMedio: 85 },
  { id: 'sifao', categoria: 'hidraulica', nome: 'Troca de sifão', precoMedio: 125 },
  { id: 'desentupimento', categoria: 'hidraulica', nome: 'Desentupimento de pia', precoMedio: 160 },
  { id: 'registro', categoria: 'hidraulica', nome: 'Troca de registro', precoMedio: 190 },
  { id: 'chuveiro-h', categoria: 'hidraulica', nome: 'Troca de chuveiro', precoMedio: 110 },
  { id: 'tomada', categoria: 'eletrica', nome: 'Instalação de tomada', precoMedio: 95 },
  { id: 'disjuntor', categoria: 'eletrica', nome: 'Troca de disjuntor', precoMedio: 150 },
  { id: 'chuveiro-e', categoria: 'eletrica', nome: 'Instalação de chuveiro', precoMedio: 125 },
  { id: 'luminaria', categoria: 'eletrica', nome: 'Instalação de luminária', precoMedio: 80 },
  { id: 'quarto', categoria: 'pintura', nome: 'Pintura de quarto até 12 m²', precoMedio: 700 },
  { id: 'porta', categoria: 'pintura', nome: 'Pintura de porta', precoMedio: 160 },
  { id: 'umidade', categoria: 'pintura', nome: 'Tratamento de umidade', precoMedio: 340 },
  { id: 'faxina-mudanca', categoria: 'limpeza', nome: 'Faxina pós-mudança', precoMedio: 300 },
  { id: 'faxina-rotina', categoria: 'limpeza', nome: 'Faxina de rotina (6 h)', precoMedio: 190 },
  { id: 'ajuste-porta', categoria: 'reparos', nome: 'Ajuste de porta', precoMedio: 75 },
  { id: 'prateleira', categoria: 'reparos', nome: 'Instalação de prateleira', precoMedio: 95 },
]

export const CIDADES = [
  { slug: 'sao-paulo', nome: 'São Paulo', ativa: true },
  { slug: 'campinas', nome: 'Campinas', ativa: false },
  { slug: 'santos', nome: 'Santos', ativa: false },
]

export const BAIRROS = ['Vila Mariana', 'Moema', 'Saúde', 'Ipiranga', 'Aclimação', 'Jabaquara']
