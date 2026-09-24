import type { Perfil } from './types'

/**
 * Divisão entre o app mobile e o site.
 * App (iOS e Android): a operação do dia a dia.
 * Site com login: conta, assinatura, destaque, relatórios e o básico de cada perfil.
 * Detalhes em docs/web-vs-app.md.
 */

/** Links das lojas. Troque pelos definitivos quando o app for publicado. */
export const LOJAS = {
  ios: 'https://apps.apple.com/br/app/domu/id0000000000',
  android: 'https://play.google.com/store/apps/details?id=app.domu',
}

/** Abre uma tela do app no celular (domu://chamado/8f3k2). No computador, o link não faz nada. */
export function noApp(caminho: string) {
  return `domu://${caminho.replace(/^\//, '')}`
}

/** O que cada perfil faz no app (texto da página "Baixe o app" e dos avisos no site). */
export const NO_APP: Record<Perfil, { titulo: string; itens: string[] }> = {
  corretor: {
    titulo: 'Para corretores e proprietários',
    itens: ['Imóveis, contratos e reajustes', 'Cobranças e avisos de atraso', 'Chamados do inquilino e escolha do prestador', 'Vistoria de entrada e saída com a câmera', 'Meus prestadores de confiança'],
  },
  prestador: {
    titulo: 'Para prestadores',
    itens: ['Pedidos perto de você, com aviso na hora', 'Agenda e horários', 'Postar serviço feito com foto', 'Preços e verificação do perfil', 'Mensagens com clientes'],
  },
  cliente: {
    titulo: 'Para quem contrata',
    itens: ['Feed e mapa de prestadores perto de você', 'Contratar e pagar com segurança', 'Acompanhar, confirmar e avaliar o serviço', 'Mensagens com o prestador', 'Salvos e seguindo'],
  },
}
