import type { Prestador } from '../types'

export const PRESTADORES: Prestador[] = [
  {
    slug: 'joao-batista', nome: 'João Batista', iniciais: 'JB', oficio: 'Encanador', categoria: 'hidraulica',
    bairro: 'Vila Mariana', distanciaKm: 1.2, raioKm: 8, nota: 4.9, avaliacoes: 38, servicosPeloApp: 38,
    verificado: true, destaque: true, disponibilidade: 'hoje', proximoHorario: 'Hoje, entre 14h e 16h',
    precos: [
      { servico: 'Visita técnica', preco: 80 },
      { servico: 'Troca de sifão', preco: 120, aPartirDe: true },
      { servico: 'Desentupimento de pia', preco: 150, aPartirDe: true },
      { servico: 'Troca de registro', preco: 180, aPartirDe: true },
    ],
    depoimento: { texto: 'Chegou no horário, explicou o problema e deixou tudo limpo.', autor: 'Marina, Moema' },
    mapa: { x: 30, y: 38 },
  },
  {
    slug: 'carlos-souza', nome: 'Carlos Souza', iniciais: 'CS', oficio: 'Encanador', categoria: 'hidraulica',
    bairro: 'Ipiranga', distanciaKm: 3.1, raioKm: 10, nota: 4.7, avaliacoes: 21, servicosPeloApp: 21,
    verificado: true, disponibilidade: 'amanha', proximoHorario: 'Amanhã, 8h',
    precos: [
      { servico: 'Visita técnica', preco: 90 },
      { servico: 'Desentupimento de pia', preco: 130, aPartirDe: true },
      { servico: 'Troca de chuveiro', preco: 110 },
    ],
    mapa: { x: 64, y: 58 },
  },
  {
    slug: 'ana-lima', nome: 'Ana Lima', iniciais: 'AL', oficio: 'Pintora', categoria: 'pintura',
    bairro: 'Moema', distanciaKm: 2.4, raioKm: 12, nota: 4.8, avaliacoes: 27, servicosPeloApp: 27,
    verificado: true, destaque: true, disponibilidade: 'semana', proximoHorario: 'Sexta, 8h',
    precos: [
      { servico: 'Pintura de quarto até 12 m²', preco: 680, aPartirDe: true },
      { servico: 'Pintura de porta', preco: 150 },
      { servico: 'Tratamento de umidade', preco: 320, aPartirDe: true },
    ],
    mapa: { x: 70, y: 30 },
  },
  {
    slug: 'rafael-freitas', nome: 'Rafael Freitas', iniciais: 'RF', oficio: 'Eletricista', categoria: 'eletrica',
    bairro: 'Saúde', distanciaKm: 3.0, raioKm: 10, nota: 4.8, avaliacoes: 33, servicosPeloApp: 33,
    verificado: true, disponibilidade: 'hoje', proximoHorario: 'Hoje, 17h',
    precos: [
      { servico: 'Instalação de tomada', preco: 90 },
      { servico: 'Troca de disjuntor', preco: 140, aPartirDe: true },
      { servico: 'Instalação de chuveiro', preco: 120 },
    ],
    mapa: { x: 52, y: 20 },
  },
  {
    slug: 'rita-costa', nome: 'Rita Costa', iniciais: 'RC', oficio: 'Diarista', categoria: 'limpeza',
    bairro: 'Vila Mariana', distanciaKm: 1.8, raioKm: 6, nota: 5.0, avaliacoes: 44, servicosPeloApp: 44,
    verificado: true, disponibilidade: 'amanha', proximoHorario: 'Amanhã, 9h',
    precos: [
      { servico: 'Faxina pós-mudança', preco: 280, aPartirDe: true },
      { servico: 'Faxina de rotina (6 h)', preco: 180 },
    ],
    mapa: { x: 20, y: 64 },
  },
  {
    slug: 'marcio-alves', nome: 'Márcio Alves', iniciais: 'MA', oficio: 'Faz-tudo', categoria: 'reparos',
    bairro: 'Aclimação', distanciaKm: 4.2, raioKm: 8, nota: 4.6, avaliacoes: 12, servicosPeloApp: 12,
    verificado: false, disponibilidade: 'semana', proximoHorario: 'Segunda, 10h',
    precos: [
      { servico: 'Ajuste de porta', preco: 70 },
      { servico: 'Instalação de prateleira', preco: 90, aPartirDe: true },
    ],
    mapa: { x: 80, y: 76 },
  },
]

export function prestador(slug: string): Prestador | undefined {
  return PRESTADORES.find((p) => p.slug === slug)
}
