import type { EstadoChamado, Tom } from './types'

/** Estados do chamado (PRD). O nome e o tom são fixos: use sempre este mapa. */
export const ESTADOS: Record<EstadoChamado, { rotulo: string; tom: Tom }> = {
  aberto: { rotulo: 'Aberto', tom: 'info' },
  triado: { rotulo: 'Triado', tom: 'info' },
  prestador_atribuido: { rotulo: 'Prestador atribuído', tom: 'neutral' },
  agendado: { rotulo: 'Agendado', tom: 'neutral' },
  concluido: { rotulo: 'Concluído', tom: 'success' },
  pago: { rotulo: 'Pago', tom: 'success' },
  avaliado: { rotulo: 'Avaliado', tom: 'success' },
  cancelado: { rotulo: 'Cancelado', tom: 'neutral' },
  em_disputa: { rotulo: 'Em disputa', tom: 'danger' },
}

/** Ordem do fluxo feliz, usada na linha do tempo. */
export const FLUXO: EstadoChamado[] = ['aberto', 'triado', 'prestador_atribuido', 'agendado', 'concluido', 'pago', 'avaliado']

export const DISPONIBILIDADE = { hoje: 'Pode ir hoje', amanha: 'Pode ir amanhã', semana: 'Esta semana' } as const
