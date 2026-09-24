import type { Lancamento, PedidoCliente, PedidoPrestador } from '../types'

export const PEDIDOS_PRESTADOR: PedidoPrestador[] = [
  { id: '8f3k2', codigo: '#8F3K2', servico: 'Troca de sifão', valor: 120, bairro: 'Vila Mariana', distanciaKm: 1.2, quando: 'Hoje, 14h–16h', urgente: true, origem: 'corretor', descricao: 'Tá vazando embaixo da pia, molhou o armário.', status: 'novo' },
  { id: '9h4t2', codigo: '#9H4T2', servico: 'Desentupimento de pia', valor: 150, bairro: 'Moema', distanciaKm: 2.8, quando: 'Amanhã', urgente: false, origem: 'cliente', descricao: 'Pia da cozinha entupida, água não desce.', status: 'novo' },
  { id: '2b7n5', codigo: '#2B7N5', servico: 'Instalação de tomada', valor: 90, bairro: 'Moema', distanciaKm: 2.6, quando: 'Hoje, 9h', urgente: false, origem: 'cliente', descricao: 'Tomada nova ao lado da geladeira.', status: 'aceito' },
  { id: '1k8p3', codigo: '#1K8P3', servico: 'Troca de registro', valor: 180, bairro: 'Vila Mariana', distanciaKm: 1.0, quando: '08 set', urgente: false, origem: 'corretor', descricao: 'Registro do chuveiro não fecha.', status: 'concluido' },
]

export const AGENDA = [
  { hora: '09:00', titulo: 'Instalação de tomada', detalhe: 'Moema · Ana (cliente)', pedidoId: '2b7n5' },
  { hora: '14:00', titulo: 'Troca de sifão', detalhe: 'Vila Mariana · via corretor Marcos', pedidoId: '8f3k2', atual: true },
  { hora: '17:30', titulo: 'Livre', detalhe: 'Toque para bloquear o horário' },
]

export const CARTEIRA = {
  disponivel: 1240,
  aLiberar: 540,
  mes: 3280,
  taxa: 0.08,
  atividade: [35, 60, 45, 80, 55, 95, 40],
  lancamentos: [
    { descricao: 'Troca de sifão', data: '12 set', valor: 110.4 },
    { descricao: 'Instalação de tomada', data: '10 set', valor: 82.8 },
    { descricao: 'Saque via Pix', data: '08 set', valor: -900 },
    { descricao: 'Troca de registro', data: '08 set', valor: 165.6 },
  ] satisfies Lancamento[],
}

export const PEDIDOS_CLIENTE: PedidoCliente[] = [
  { id: 'c8f3k2', codigo: '#8F3K2', servico: 'Troca de sifão', prestadorSlug: 'joao-batista', valor: 120, quando: 'Hoje, entre 14h e 16h', endereco: 'Rua das Acácias, 120', estado: 'agendado',
    eventos: [{ estado: 'aberto', quando: 'Hoje, 10:12', detalhe: 'Pedido enviado' }, { estado: 'prestador_atribuido', quando: 'Hoje, 10:30', detalhe: 'João aceitou' }, { estado: 'agendado', quando: 'Hoje, entre 14h e 16h' }] },
  { id: 'c4r7w1', codigo: '#4R7W1', servico: 'Faxina pós-mudança', prestadorSlug: 'rita-costa', valor: 280, quando: '02 set', endereco: 'Rua das Acácias, 120', estado: 'concluido',
    eventos: [{ estado: 'aberto', quando: '30 ago' }, { estado: 'agendado', quando: '02 set' }, { estado: 'concluido', quando: '02 set' }] },
]

export function pedidoPrestador(id: string) {
  return PEDIDOS_PRESTADOR.find((p) => p.id === id)
}
export function pedidoCliente(id: string) {
  return PEDIDOS_CLIENTE.find((p) => p.id === id)
}
