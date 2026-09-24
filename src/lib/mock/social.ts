/** Conversas, comentários, endereços e notificações (dados de exemplo). */
export const CONVERSAS = [
  { slug: 'joao-batista', ultima: 'Posso ir hoje entre 14h e 16h.', quando: '10:32', naoLidas: 1 },
  { slug: 'rita-costa', ultima: 'Obrigada pela avaliação.', quando: 'ontem', naoLidas: 0 },
  { slug: 'ana-lima', ultima: 'Mando o orçamento da pintura amanhã.', quando: 'seg', naoLidas: 0 },
]

export const MENSAGENS_INICIAIS: Record<string, Array<{ de: 'eu' | 'ele'; texto: string; quando: string }>> = {
  'joao-batista': [
    { de: 'ele', texto: 'Oi! Vi seu pedido da troca de sifão.', quando: '10:30' },
    { de: 'eu', texto: 'Oi, João. Está vazando embaixo da pia.', quando: '10:31' },
    { de: 'ele', texto: 'Posso ir hoje entre 14h e 16h.', quando: '10:32' },
  ],
}

export const COMENTARIOS_INICIAIS: Record<string, Array<{ autor: string; iniciais: string; texto: string; quando: string }>> = {
  p1: [
    { autor: 'Marina', iniciais: 'MA', texto: 'Ficou ótimo. Ele fez o mesmo aqui em casa.', quando: '2 d' },
    { autor: 'Rafael', iniciais: 'RA', texto: 'Quanto tempo levou?', quando: '1 d' },
    { autor: 'João Batista', iniciais: 'JB', texto: 'Uns 40 minutos, Rafael.', quando: '1 d' },
  ],
}

export const ENDERECOS = [
  { id: 'casa', apelido: 'Casa', linha: 'Rua das Acácias, 120 · Ap 32', bairro: 'Vila Mariana', principal: true },
  { id: 'trabalho', apelido: 'Trabalho', linha: 'Av. Paulista, 900 · Sala 12', bairro: 'Bela Vista', principal: false },
]

export const PREFERENCIAS_AVISO = [
  { id: 'chamados', rotulo: 'Chamados novos e mudanças de status', email: true, push: true },
  { id: 'pagamentos', rotulo: 'Pagamentos e repasses', email: true, push: true },
  { id: 'contratos', rotulo: 'Vencimento e reajuste de contratos', email: true, push: false },
  { id: 'mensagens', rotulo: 'Mensagens', email: false, push: true },
  { id: 'novidades', rotulo: 'Novidades do Domu', email: false, push: false },
]
