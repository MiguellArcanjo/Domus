import type { Post } from '../types'

export const POSTS: Post[] = [
  { id: 'p1', titulo: 'Troca de sifão e vedação da pia', prestadorSlug: 'joao-batista', categoria: 'hidraulica', bairro: 'Vila Mariana', preco: 120, feitoEm: '12 set', verificado: true,
    descricao: 'Vazamento sob a pia da cozinha. Troquei o sifão e refiz a vedação da válvula. Levou 40 minutos.', fotoLegenda: 'Antes e depois do sifão', curtidas: 24, comentarios: 3, mapa: { x: 42, y: 46 } },
  { id: 'p2', titulo: 'Pintura de quarto 12 m²', prestadorSlug: 'ana-lima', categoria: 'pintura', bairro: 'Moema', preco: 680, feitoEm: '10 set', verificado: true, destaque: true,
    descricao: 'Duas demãos de tinta acrílica fosca, com massa corrida nos cantos. Entregue em um dia.', fotoLegenda: 'Quarto pintado', curtidas: 41, comentarios: 6, mapa: { x: 76, y: 44 } },
  { id: 'p3', titulo: 'Instalação de tomada 20 A', prestadorSlug: 'rafael-freitas', categoria: 'eletrica', bairro: 'Saúde', preco: 90, feitoEm: '09 set', verificado: true,
    descricao: 'Tomada nova para o micro-ondas, com circuito separado no quadro.', fotoLegenda: 'Tomada nova na cozinha', curtidas: 12, comentarios: 1, mapa: { x: 58, y: 70 } },
  { id: 'p4', titulo: 'Faxina pós-mudança', prestadorSlug: 'rita-costa', categoria: 'limpeza', bairro: 'Vila Mariana', preco: 280, feitoEm: '05 set', verificado: true,
    descricao: 'Apartamento de 2 quartos entregue pronto para o novo inquilino.', fotoLegenda: 'Sala limpa', curtidas: 18, comentarios: 2, mapa: { x: 26, y: 78 } },
  { id: 'p5', titulo: 'Troca de chuveiro e resistência', prestadorSlug: 'carlos-souza', categoria: 'hidraulica', bairro: 'Ipiranga', preco: 110, feitoEm: '03 set', verificado: true,
    descricao: 'Chuveiro novo de 7500 W e ajuste da fiação.', fotoLegenda: 'Chuveiro novo', curtidas: 9, comentarios: 0, mapa: { x: 62, y: 86 } },
  { id: 'p6', titulo: 'Ajuste de porta que arrastava', prestadorSlug: 'marcio-alves', categoria: 'reparos', bairro: 'Aclimação', preco: 70, feitoEm: '01 set', verificado: false,
    descricao: 'Plainei a porta e troquei as dobradiças.', fotoLegenda: 'Porta ajustada', curtidas: 5, comentarios: 0, mapa: { x: 86, y: 60 } },
]

export function post(id: string): Post | undefined {
  return POSTS.find((p) => p.id === id)
}
