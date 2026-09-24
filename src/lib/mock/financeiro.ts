/** Cobrança (G-10), repasse (G-11) e reajuste (G-09). */
export type SituacaoCobranca = 'paga' | 'aguardando' | 'vencida'

export interface Cobranca {
  id: string
  imovelId: string
  inquilino: string
  mes: string
  valor: number
  vencimento: string
  situacao: SituacaoCobranca
  diasAtraso?: number
  pagaEm?: string
  forma?: 'Pix' | 'Boleto'
  lembretes: Array<{ quando: string; canal: 'E-mail' | 'Push'; texto: string }>
}

export const COBRANCAS: Cobranca[] = [
  { id: 'cb-ap32-set', imovelId: 'ap-32-acacias', inquilino: 'Carla Mendes', mes: 'Setembro', valor: 1850, vencimento: '05/09', situacao: 'paga', pagaEm: '04/09', forma: 'Pix', lembretes: [{ quando: '02/09', canal: 'E-mail', texto: 'Lembrete: aluguel vence em 3 dias' }] },
  { id: 'cb-casa4-set', imovelId: 'casa-4-vila-nova', inquilino: 'Pedro Alves', mes: 'Setembro', valor: 2300, vencimento: '10/09', situacao: 'vencida', diasAtraso: 6, lembretes: [{ quando: '07/09', canal: 'E-mail', texto: 'Lembrete: aluguel vence em 3 dias' }, { quando: '11/09', canal: 'E-mail', texto: 'Aluguel em atraso: 1 dia' }, { quando: '14/09', canal: 'Push', texto: 'Aluguel em atraso: 4 dias' }] },
  { id: 'cb-ap21-set', imovelId: 'ap-21-acacias', inquilino: 'Lúcia Prado', mes: 'Setembro', valor: 1700, vencimento: '05/09', situacao: 'paga', pagaEm: '05/09', forma: 'Boleto', lembretes: [] },
  { id: 'cb-sala3-set', imovelId: 'sala-3-centro', inquilino: 'Ótica Visão', mes: 'Setembro', valor: 3100, vencimento: '15/09', situacao: 'aguardando', lembretes: [{ quando: '12/09', canal: 'E-mail', texto: 'Lembrete: aluguel vence em 3 dias' }] },
]

export const REGUA_ATRASO = [
  { dia: -3, acao: 'Lembrete antes do vencimento', canal: 'E-mail', ativo: true },
  { dia: 0, acao: 'Aviso no dia do vencimento', canal: 'E-mail e push', ativo: true },
  { dia: 1, acao: 'Aviso de atraso', canal: 'E-mail', ativo: true },
  { dia: 5, acao: 'Segundo aviso, com multa e juros', canal: 'E-mail e push', ativo: true },
  { dia: 15, acao: 'Aviso ao corretor para contato direto', canal: 'Push', ativo: false },
]

export interface Repasse {
  proprietarioId: string
  proprietario: string
  mes: string
  aluguel: number
  taxaAdm: number
  manutencoes: number
  status: 'a_pagar' | 'pago'
  imoveis: string[]
  itens: Array<{ descricao: string; valor: number }>
}

export const REPASSES: Repasse[] = [
  { proprietarioId: 'paulo-ribeiro', proprietario: 'Paulo Ribeiro', mes: 'Setembro', aluguel: 4150, taxaAdm: 332, manutencoes: 120, status: 'a_pagar', imoveis: ['ap-32-acacias', 'casa-4-vila-nova', 'sala-3-centro'],
    itens: [{ descricao: 'Aluguel Ap 32', valor: 1850 }, { descricao: 'Aluguel Casa 4 (em atraso)', valor: 0 }, { descricao: 'Aluguel Sala 3', valor: 2300 }, { descricao: 'Taxa de administração (8%)', valor: -332 }, { descricao: 'Troca de sifão · Ap 32 · João Batista', valor: -120 }] },
  { proprietarioId: 'sonia-lopes', proprietario: 'Sônia Lopes', mes: 'Setembro', aluguel: 1700, taxaAdm: 136, manutencoes: 0, status: 'pago', imoveis: ['ap-21-acacias', 'ap-11-sol'],
    itens: [{ descricao: 'Aluguel Ap 21', valor: 1700 }, { descricao: 'Taxa de administração (8%)', valor: -136 }] },
]

export function repasse(id: string) {
  return REPASSES.find((r) => r.proprietarioId === id)
}

export const REAJUSTES = [
  { imovelId: 'casa-4-vila-nova', inquilino: 'Pedro Alves', indice: 'IGP-M', percentual: 3.09, valorAtual: 2300, novoValor: 2371, data: '10/10', avisado: false },
  { imovelId: 'ap-32-acacias', inquilino: 'Carla Mendes', indice: 'IGP-M', percentual: 3.09, valorAtual: 1850, novoValor: 1907, data: '05/03', avisado: false },
  { imovelId: 'sala-3-centro', inquilino: 'Ótica Visão', indice: 'IPCA', percentual: 4.42, valorAtual: 3100, novoValor: 3237, data: '15/01', avisado: true },
]

export const ASSINATURA = {
  plano: 'carteira' as 'gratis' | 'por_imovel' | 'carteira',
  imoveisUsados: 5,
  limite: 15,
  proximaCobranca: '01/10',
  valor: 99,
  cartao: 'Cartão final 4242',
  faturas: [{ mes: 'Setembro', valor: 99, status: 'Paga' }, { mes: 'Agosto', valor: 99, status: 'Paga' }, { mes: 'Julho', valor: 75, status: 'Paga' }],
}
