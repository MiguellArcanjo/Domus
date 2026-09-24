import type { Imovel } from '../types'

export const IMOVEIS: Imovel[] = [
  { id: 'ap-32-acacias', nome: 'Ap 32 · Edifício Acácias', endereco: 'Rua das Acácias, 120', tipo: 'Apartamento', proprietario: 'Paulo Ribeiro', status: 'ocupado', situacao: 'pago',
    contrato: { inicio: '03/2024', fim: '03/2027', valor: 1850, diaVencimento: 5, indice: 'IGP-M', inquilino: { nome: 'Carla Mendes', iniciais: 'CM', email: 'carla.mendes@email.com' } } },
  { id: 'casa-4-vila-nova', nome: 'Casa 4 · Vila Nova', endereco: 'Rua do Bosque, 45', tipo: 'Casa', proprietario: 'Paulo Ribeiro', status: 'ocupado', situacao: 'atrasado', diasAtraso: 6, alerta: 'Reajuste em outubro (IGP-M) · novo valor R$ 2.371',
    contrato: { inicio: '10/2023', fim: '10/2026', valor: 2300, diaVencimento: 10, indice: 'IGP-M', inquilino: { nome: 'Pedro Alves', iniciais: 'PA', email: 'pedro.alves@email.com' } } },
  { id: 'ap-21-acacias', nome: 'Ap 21 · Edifício Acácias', endereco: 'Rua das Acácias, 120', tipo: 'Apartamento', proprietario: 'Sônia Lopes', status: 'ocupado', situacao: 'pago', alerta: 'Contrato vence em 30 dias',
    contrato: { inicio: '10/2024', fim: '10/2025', valor: 1700, diaVencimento: 5, indice: 'IPCA', inquilino: { nome: 'Lúcia Prado', iniciais: 'LP', email: 'lucia.prado@email.com' } } },
  { id: 'ap-11-sol', nome: 'Ap 11 · Residencial Sol', endereco: 'Av. Jabaquara, 900', tipo: 'Apartamento', proprietario: 'Sônia Lopes', status: 'vago' },
  { id: 'sala-3-centro', nome: 'Sala 3 · Centro', endereco: 'Rua Direita, 33', tipo: 'Comercial', proprietario: 'Paulo Ribeiro', status: 'ocupado', situacao: 'em_aberto',
    contrato: { inicio: '01/2025', fim: '01/2028', valor: 3100, diaVencimento: 15, indice: 'IPCA', inquilino: { nome: 'Ótica Visão', iniciais: 'OV', email: 'contato@oticavisao.com.br' } } },
]

export function imovel(id: string): Imovel | undefined {
  return IMOVEIS.find((i) => i.id === id)
}

export const RESUMO_MES = {
  mes: 'setembro',
  aReceber: 18450,
  pagos: 12,
  total: 14,
  emAtraso: 2590,
  ocupados: 14,
  imoveis: 16,
  vagos: 2,
  atrasados: 2,
  recebidoPorMes: [
    { mes: 'abr', valor: 15200 }, { mes: 'mai', valor: 16100 }, { mes: 'jun', valor: 16900 },
    { mes: 'jul', valor: 16400 }, { mes: 'ago', valor: 17800 }, { mes: 'set', valor: 15860 },
  ],
}
