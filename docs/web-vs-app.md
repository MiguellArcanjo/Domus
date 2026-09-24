# Domu: o que fica no site e o que fica no app

O Domu tem duas frentes:

- **App mobile** (iOS e Android, repositório próprio `domu-mobile`): toda a **operação do dia a dia**.
- **Site** (este repositório, Next.js): marketing com SEO, entrada, **conta, assinatura, destaque, relatórios** e o básico de cada perfil, além do link do inquilino e da área da operação.

As duas frentes usam **as mesmas rotas de API** (`docs/backend.md`). Só muda onde cada tela fica.

## Por que dividir assim

- **Regra das lojas.** A App Store e o Google Play não deixam vender assinatura ou destaque (produtos digitais) fora da compra da loja, nem colocar botão ou link de compra no app. Por isso **planos, assinatura, destaque e faturas ficam só no site**, e o app não mostra preço de plano nem leva para a compra.
- **Serviço físico pode ser pago no app.** O pagamento do serviço feito na casa (Pix ou cartão, retido até a confirmação) fica no app, porque não é compra digital.
- **Celular é onde o trabalho acontece.** Câmera (vistoria, chamado, post), push na hora, mapa e agenda funcionam melhor no app.
- **Computador é bom para conta e relatório.** Trocar cartão, baixar nota fiscal, exportar planilha e imprimir extrato ficam no site.

## Site com login (`/app/...`)

| Perfil | Tela | Rota | O que faz |
| --- | --- | --- | --- |
| Todos | Início | `/app/painel` | Resumo do perfil (só leitura), atalhos e os botões das lojas |
| Todos | Conta | `/app/conta` | Dados, senha, avisos, privacidade (LGPD), trocar perfil, sair |
| Todos | Dados, senha, avisos, privacidade | `/app/conta/dados`, `/senha`, `/notificacoes`, `/privacidade` | Configuração da conta |
| Corretor | Assinatura | `/app/assinatura` | Plano, uso de imóveis, trocar plano, cartão, faturas, nota fiscal, dados de faturamento, cancelar |
| Corretor | Relatórios | `/app/financeiro` | Cobranças do mês (só leitura) com planilha CSV, repasses por proprietário, régua de avisos de atraso |
| Corretor | Extrato de repasse | `/app/financeiro/repasses/[id]` | Extrato do proprietário para imprimir ou enviar |
| Prestador | Destaque | `/app/destaque` | Contratar e cancelar o destaque na região |
| Prestador | Carteira | `/app/carteira` | Saldo, saque via Pix, lançamentos |
| Prestador | Recebimento | `/app/carteira/recebimento` | Chave Pix |
| Prestador | Perfil público | `/app/meu-perfil` | Foto, apresentação, categorias, bairro e raio |
| Cliente | Pedidos e recibos | `/app/meus-pedidos`, `/app/meus-pedidos/[id]` | Histórico, andamento e recibo para imprimir |
| Cliente | Endereços | `/app/enderecos` | Endereços salvos |

Fora do `/app`: site público, `/baixar` (página "Baixe o app"; os botões de contratar do site levam para cá), entrada (`/entrar`, `/criar-conta`, `/recuperar-senha`...), link do inquilino (`/c/[token]`) e operação (`/admin`).

## Só no app

| Perfil | Telas |
| --- | --- |
| Corretor | Painel completo, imóveis (lista, detalhe, novo, editar, link do inquilino), contratos (detalhe, novo, renovar, encerrar), cobrança (lembrete, marcar paga, compartilhar Pix), reajustes, vistorias (nova com câmera, detalhe, comparar), chamados (triagem, chamar prestador, acompanhar), meus prestadores, notificações |
| Prestador | Pedidos (aceitar, recusar, como chegar), concluir com fotos, agenda, postar serviço, preços, verificação com câmera, cadastro inicial, mensagens |
| Cliente | Explorar (feed e mapa), busca e resultados, post e comentários, perfil do prestador, seguir e salvar, mensagens, contratar e pagar, confirmar, avaliar, contestar, denunciar |

## Rotas que saíram do site

Essas rotas existiam no app web e agora estão no app mobile. Se alguém abrir um link antigo, o site mostra a página 404 com o caminho de volta.

| Rota antiga no site | Tela no app mobile |
| --- | --- |
| `/app/imoveis`, `/app/imoveis/[id]`, `/novo`, `/[id]/editar`, `/[id]/link` | aba Imóveis, `imovel/[id]`, `imovel/novo`, `imovel/[id]/editar`, `imovel/[id]/link` |
| `/app/contratos`, `/app/contratos/[id]`, `/app/contratos/novo` | `contrato/[id]`, `contrato/novo` |
| `/app/financeiro/cobrancas/[id]` | `cobranca/[id]` |
| `/app/reajustes`, `/app/vistorias/**`, `/app/meus-prestadores/**` | `reajustes`, `vistorias`, `vistoria/*`, `meus-prestadores` |
| `/app/chamados`, `/app/chamados/[id]` | aba Chamados, `chamado/[id]`, `chamado/novo` |
| `/app/explorar`, `/app/busca`, `/app/busca/resultados` | aba Explorar, `busca`, `resultados` |
| `/app/post/[id]/**`, `/app/prestadores/[slug]` | `post/[id]`, `denunciar`, `prestador/[slug]` |
| `/app/contratar/[slug]/**` | `contratar/[slug]`, `pagamento` |
| `/app/meus-pedidos/[id]/avaliar`, `/contestar` | `avaliar/[id]`, `contestar/[id]` |
| `/app/mensagens/**`, `/app/salvos`, `/app/notificacoes` | aba Mensagens, `conversa/[slug]`, aba Salvos, `notificacoes` |
| `/app/pedidos/**`, `/app/agenda/**`, `/app/postar` | aba Pedidos, `servico/[id]`, `concluir/[id]`, aba Agenda, aba Postar |
| `/app/meus-precos`, `/app/verificacao`, `/app/cadastro-prestador` | `meus-precos`, `verificacao`, `cadastro-prestador` |

## Ligação entre site e app

- **Mesma conta.** Um login só: o site usa sessão por cookie e o app usa token Bearer no SecureStore (`docs/backend.md`, seção 2).
- **Links que abrem o app.** Os links dos e-mails usam `https://domu.app/...`. Com o app instalado, o sistema abre o app (universal links no iOS, app links no Android). Sem o app, abre o site. O site precisa servir `/.well-known/apple-app-site-association` e `/.well-known/assetlinks.json`.
- **Lojas.** Os links ficam em `src/lib/app.ts` (`LOJAS`). Troque pelos definitivos quando o app for publicado.
- **Limite do plano.** Se o corretor passar do limite de imóveis do plano, a API responde 403 `limite_plano`. O app só avisa que o limite foi atingido. A troca de plano é feita aqui no site.
