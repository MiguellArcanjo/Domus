/** Operação interna: curadoria, moderação, disputas e usuários (dados de exemplo). */
export const FILA_VERIFICACAO = [
  { slug: 'marcio-alves', nome: 'Márcio Alves', oficio: 'Faz-tudo', enviadoEm: 'há 2 h', documento: 'CPF', antecedentes: 'Sem registros', status: 'pendente' as const },
  { slug: 'novo-1', nome: 'Paula Reis', oficio: 'Eletricista', enviadoEm: 'ontem', documento: 'CNPJ', antecedentes: 'Aguardando consulta', status: 'pendente' as const },
]

export const FILA_MODERACAO = [
  { id: 'd1', postId: 'p6', motivo: 'Mostra o número da casa', denunciadoPor: 'Cliente', quando: 'há 1 h', filtroAutomatico: false },
  { id: 'd2', postId: 'p3', motivo: 'Legenda com telefone', denunciadoPor: 'Filtro automático', quando: 'há 3 h', filtroAutomatico: true },
]

export const DISPUTAS = [
  { id: 'ds1', codigo: '#4R7W1', servico: 'Faxina pós-mudança', cliente: 'Carla Mendes', prestadorSlug: 'rita-costa', valor: 280, motivo: 'A cozinha ficou sem limpar.', abertaEm: '03 set', status: 'aberta' as const, fotos: 3 },
  { id: 'ds2', codigo: '#6T2Y8', servico: 'Instalação de tomada', cliente: 'Lúcia Prado', prestadorSlug: 'rafael-freitas', valor: 90, motivo: 'A tomada parou no dia seguinte.', abertaEm: '28 ago', status: 'resolvida' as const, fotos: 1 },
]

export function disputa(id: string) {
  return DISPUTAS.find((d) => d.id === id)
}

export const USUARIOS_ADMIN = [
  { nome: 'Marcos Silva', email: 'marcos@exemplo.com.br', perfis: 'Corretor, Cliente', criadoEm: '02/06', status: 'Ativo' },
  { nome: 'João Batista', email: 'joao@exemplo.com.br', perfis: 'Prestador', criadoEm: '10/06', status: 'Ativo' },
  { nome: 'Ana Lima', email: 'ana@exemplo.com.br', perfis: 'Prestador', criadoEm: '12/06', status: 'Ativo' },
  { nome: 'Paula Reis', email: 'paula@exemplo.com.br', perfis: 'Prestador', criadoEm: '23/09', status: 'Em verificação' },
]

export const METRICAS_PILOTO = [
  { rotulo: 'Corretores pagantes', valor: '12', meta: '10–20' },
  { rotulo: 'Imóveis cadastrados', valor: '214', meta: '300+' },
  { rotulo: 'Prestadores ativos', valor: '41', meta: '50+' },
  { rotulo: 'Chamados resolvidos pelo app', valor: '64%', meta: '60%+' },
  { rotulo: 'Tempo até prestador aceitar', valor: '3,2 h', meta: '< 4 h' },
  { rotulo: 'Nota média', valor: '4,7', meta: '≥ 4,5' },
]
