/** Tipos do domínio do Domu. Os nomes seguem o PRD. */

export type Perfil = 'corretor' | 'prestador' | 'cliente'

export type CategoriaId = 'hidraulica' | 'eletrica' | 'pintura' | 'limpeza' | 'reparos'

export type EstadoChamado =
  | 'aberto'
  | 'triado'
  | 'prestador_atribuido'
  | 'agendado'
  | 'concluido'
  | 'pago'
  | 'avaliado'
  | 'cancelado'
  | 'em_disputa'

export type Tom = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent'

export type Disponibilidade = 'hoje' | 'amanha' | 'semana'

export interface ItemPreco {
  servico: string
  preco: number
  aPartirDe?: boolean
}

export interface Prestador {
  slug: string
  nome: string
  iniciais: string
  oficio: string
  categoria: CategoriaId
  bairro: string
  distanciaKm: number
  raioKm: number
  nota: number
  avaliacoes: number
  servicosPeloApp: number
  verificado: boolean
  destaque?: boolean
  disponibilidade: Disponibilidade
  proximoHorario: string
  precos: ItemPreco[]
  depoimento?: { texto: string; autor: string }
  /** posição no mapa de exemplo, em % da largura e da altura */
  mapa: { x: number; y: number }
}

export interface Post {
  id: string
  titulo: string
  prestadorSlug: string
  categoria: CategoriaId
  bairro: string
  preco: number
  feitoEm: string
  descricao: string
  verificado: boolean
  destaque?: boolean
  fotoLegenda: string
  curtidas: number
  comentarios: number
  mapa: { x: number; y: number }
}

export interface Inquilino {
  nome: string
  iniciais: string
  email: string
}

export interface Contrato {
  inicio: string
  fim: string
  valor: number
  diaVencimento: number
  indice: 'IGP-M' | 'IPCA'
  inquilino: Inquilino
}

export type SituacaoAluguel = 'pago' | 'em_aberto' | 'atrasado'

export interface Imovel {
  id: string
  nome: string
  endereco: string
  tipo: 'Apartamento' | 'Casa' | 'Comercial'
  proprietario: string
  status: 'ocupado' | 'vago'
  contrato?: Contrato
  situacao?: SituacaoAluguel
  diasAtraso?: number
  alerta?: string
}

export interface EventoChamado {
  estado: EstadoChamado
  quando: string
  detalhe?: string
}

export interface Chamado {
  id: string
  codigo: string
  titulo: string
  descricao: string
  imovelId: string
  categoria: CategoriaId
  urgente: boolean
  novo?: boolean
  estado: EstadoChamado
  abertoEm: string
  fotos: number
  triagem: string
  sugeridos: string[]
  prestadorSlug?: string
  valor?: number
  eventos: EventoChamado[]
}

export interface PedidoPrestador {
  id: string
  codigo: string
  servico: string
  valor: number
  bairro: string
  distanciaKm: number
  quando: string
  urgente: boolean
  origem: 'corretor' | 'cliente'
  descricao: string
  status: 'novo' | 'aceito' | 'concluido'
}

export interface PedidoCliente {
  id: string
  codigo: string
  servico: string
  prestadorSlug: string
  valor: number
  quando: string
  endereco: string
  estado: EstadoChamado
  eventos: EventoChamado[]
}

export interface Lancamento {
  descricao: string
  data: string
  valor: number
}
