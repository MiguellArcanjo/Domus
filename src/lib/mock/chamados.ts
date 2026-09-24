import type { Chamado } from '../types'

export const CHAMADOS: Chamado[] = [
  { id: '8f3k2', codigo: '#8F3K2', titulo: 'Vazamento sob a pia', descricao: 'Tá vazando embaixo da pia, molhou o armário.', imovelId: 'ap-32-acacias', categoria: 'hidraulica',
    urgente: true, novo: true, estado: 'triado', abertoEm: 'há 12 min', fotos: 2,
    triagem: 'Hidráulica, urgente. Provável sifão ou flexível. Serviço sugerido: troca de sifão.',
    sugeridos: ['joao-batista', 'carlos-souza'],
    eventos: [{ estado: 'aberto', quando: 'Ontem, 23:04', detalhe: 'Pelo link do inquilino' }, { estado: 'triado', quando: 'Ontem, 23:04', detalhe: 'Hidráulica · urgente' }] },
  { id: '7c1m9', codigo: '#7C1M9', titulo: 'Tomada da sala sem energia', descricao: 'A tomada perto da TV parou de funcionar.', imovelId: 'casa-4-vila-nova', categoria: 'eletrica',
    urgente: false, estado: 'agendado', abertoEm: 'ontem', fotos: 1, triagem: 'Elétrica. Provável disjuntor ou tomada queimada.',
    sugeridos: ['rafael-freitas'], prestadorSlug: 'rafael-freitas', valor: 90,
    eventos: [{ estado: 'aberto', quando: 'Ontem, 9:12' }, { estado: 'triado', quando: 'Ontem, 9:12' }, { estado: 'prestador_atribuido', quando: 'Ontem, 10:40', detalhe: 'Rafael Freitas, eletricista' }, { estado: 'agendado', quando: 'Hoje, 17h' }] },
  { id: '5d2q8', codigo: '#5D2Q8', titulo: 'Mancha de umidade no quarto', descricao: 'Apareceu uma mancha escura no teto do quarto.', imovelId: 'ap-21-acacias', categoria: 'pintura',
    urgente: false, estado: 'aberto', abertoEm: '2 dias', fotos: 3, triagem: 'Pintura e umidade. Verificar infiltração antes de pintar.',
    sugeridos: ['ana-lima'], eventos: [{ estado: 'aberto', quando: 'Segunda, 18:20' }] },
  { id: '3a9x1', codigo: '#3A9X1', titulo: 'Troca de sifão', descricao: 'Pia pingando.', imovelId: 'ap-32-acacias', categoria: 'hidraulica',
    urgente: false, estado: 'pago', abertoEm: '12 set', fotos: 1, triagem: 'Hidráulica.', sugeridos: [], prestadorSlug: 'joao-batista', valor: 120,
    eventos: [{ estado: 'aberto', quando: '10 set' }, { estado: 'concluido', quando: '12 set' }, { estado: 'pago', quando: '12 set' }] },
]

export function chamado(id: string): Chamado | undefined {
  return CHAMADOS.find((c) => c.id === id)
}
