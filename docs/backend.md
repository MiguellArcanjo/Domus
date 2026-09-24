# Domu: o que o backend precisa entregar

O front está **completo** e roda só com **dados de exemplo**: 86 rotas, com todos os botões ligados. Este documento diz, tela por tela, o que o backend precisa fornecer: dados, ações, regras e permissões. Os IDs (G-01, M-07, V-02…) são os do PRD.

- Front: Next.js 16 (App Router), em `src/`. Rotas em `src/app`, componentes em `src/components`.
- Dados de exemplo: `src/lib/mock/*.ts`. Tipos do domínio: `src/lib/types.ts`.
- O que a pessoa faz na tela (salvar, seguir, comentar, conversar…) hoje fica no navegador (`src/lib/store.ts`). A seção 9 diz qual rota substitui cada item.
- **Nada de WhatsApp.** Login por **e-mail e senha**; avisos por **e-mail** e **push**; link do inquilino enviado por **e-mail** ou copiado.

---

## 1. Como ligar o backend no front

1. Crie `src/lib/api/` com uma função por leitura e por ação (listadas em cada tela abaixo). Use os mesmos nomes e formatos de `src/lib/mock` (`imovel(id)`, `chamado(id)`, `prestador(slug)`, `COBRANCAS`…), para que as telas mudem pouco.
2. As páginas de servidor (sem `'use client'`) podem buscar dados direto no servidor. Os formulários e as telas com estado (em `src/components/views/**` e `src/app/(entrada)/**`) hoje só navegam ou mostram um aviso no `onSubmit`: troque por uma chamada à API e trate o erro na própria tela. Todos têm o comentário **"Só front"** onde a resposta é fingida.
3. Troque os `generateStaticParams` das rotas dinâmicas por renderização dinâmica, ou por ISR nas páginas públicas.
4. Troque `src/lib/store.ts` pelas rotas da seção 9.
5. Apague `src/lib/mock` quando tudo estiver ligado.

---

## 2. Autenticação, conta e perfis

| Tela | Rota | Arquivo | O que o backend faz |
| --- | --- | --- | --- |
| Entrar | `/entrar` | `(entrada)/entrar/EntrarForm.tsx` | `POST /auth/login` {email, senha} → sessão em cookie httpOnly. Erro genérico: "E-mail ou senha incorretos". Limite de tentativas. |
| Criar conta | `/criar-conta` | `(entrada)/criar-conta/CriarContaForm.tsx` | `POST /auth/cadastro` {nome, email, senha, aceiteTermos}. Senha com pelo menos 8 caracteres. E-mail único. Guarda a versão e a data do aceite (LGPD). Envia o e-mail de confirmação. |
| Confirmar e-mail | `/confirmar-email?email=` e `?token=` | `(entrada)/confirmar-email/ConfirmarEmail.tsx` | Sem token: `POST /auth/confirmacao/reenviar`. Com token: `POST /auth/confirmar` {token} e segue para o perfil. |
| Recuperar senha | `/recuperar-senha` | `(entrada)/recuperar-senha/RecuperarSenhaForm.tsx` | `POST /auth/recuperar` {email}. Responde sempre 200, sem revelar se o e-mail existe. Link com token de uso único, válido por 1 hora. |
| Redefinir senha | `/redefinir-senha?token=` | `(entrada)/redefinir-senha/RedefinirSenhaForm.tsx` | `POST /auth/redefinir` {token, senha}. Invalida o token e as outras sessões. |
| Escolher perfil | `/entrar/perfil` | `(entrada)/entrar/perfil/EscolherPerfil.tsx` | `POST /me/perfis` {tipo} e `PUT /me/perfil-ativo`. Aceita `?proximo=/app/...` para voltar à ação que pediu login. Prestador sem cadastro vai para `/app/cadastro-prestador`. |
| Sessão expirada | `/sessao-expirada` | `(entrada)/sessao-expirada/page.tsx` | Para onde o front manda quando uma chamada responder 401. |
| Seus dados | `/app/conta/dados` | `views/conta/DadosForm.tsx` | `PATCH /me` {nome, cpf, foto}. Troca de e-mail: `POST /me/email` → confirmação no endereço novo. |
| Alterar senha | `/app/conta/senha` | `views/conta/SenhaForm.tsx` | `POST /me/senha` {atual, nova}. Encerra as outras sessões. |
| Avisos | `/app/conta/notificacoes` | `views/conta/PreferenciasAvisos.tsx` | `GET`/`PUT /me/preferencias-aviso` (e-mail e push por tipo). `POST /me/push` com a inscrição do push do navegador. |
| Privacidade (LGPD) | `/app/conta/privacidade` | `views/conta/Privacidade.tsx` | `PUT /me/consentimentos`, `POST /me/exportar` (arquivo por e-mail em até 48 h), `DELETE /me` (exclusão em até 15 dias, guardando o que a lei exige). |
| Perfil e atalhos | `/app/conta` | `views/ContaView.tsx` | `GET /me`, `PUT /me/perfil-ativo`, `POST /auth/logout`. |

- **`GET /me`** → `{ id, nome, email, cpf, iniciais, foto, perfis: Perfil[], perfilAtivo, prestadorCadastrado, papel: 'usuario' | 'operacao' }`. Alimenta o cabeçalho, a barra lateral e Perfil.
- **Perfil ativo.** Uma conta pode ter os perfis `corretor`, `prestador` e `cliente`. Hoje o front guarda o perfil ativo no `localStorage` (`components/layout/PerfilProvider.tsx`). Com o backend, ele vem de `GET /me`.
- **Proteção de rotas.** Tudo em `/app/*` exige sessão. Sem sessão, redirecione para `/entrar?proximo=<rota>`. Tudo em `/admin/*` exige também o papel `operacao`.
- **Inquilino não tem conta.** Ele entra pelo token do link (`/c/[token]`), ligado a um contrato. O token é longo, aleatório e revogável, e vale só enquanto o contrato estiver ativo.

---

## 3. Entidades

Os campos já usados pelo front estão em `src/lib/types.ts` e em `src/lib/mock/*.ts`.

| Entidade | Campos principais | Observações |
| --- | --- | --- |
| **Usuario** | id, nome, email, emailConfirmado, senhaHash, cpf, foto, papel, criadoEm, aceiteTermos {versão, data}, consentimentos | Login por e-mail e senha |
| **Sessao** | usuarioId, criadaEm, expiraEm, dispositivo | "Alterar senha" encerra as outras |
| **PreferenciaAviso** | usuarioId, tipo, email, push | Tipos em `mock/social.ts` |
| **InscricaoPush** | usuarioId, endpoint, chaves | Web Push (PWA) |
| **PerfilCorretor** | usuarioId, plano, limiteImoveis | Grátis (2), Por imóvel (R$ 15), Carteira (R$ 99, até 15) |
| **Assinatura** | corretorId, plano, status, proximaCobranca, cartao (token do gateway), faturas[] | `mock/financeiro.ts` → `ASSINATURA` |
| **Prestador** | slug, usuarioId, nome, foto, sobre, documento (CPF/CNPJ, criptografado), categorias[], bairro, localização (lat, lng), raioKm, diasHorarios, nota, avaliacoes, servicosPeloApp, verificado, destaque, disponivel, proximoHorario, chavePix | M-01, M-07, M-10, M-13 |
| **Verificacao** | prestadorId, documentos[] (documento, selfie, comprovante), consentimentoAntecedentes, antecedentes, status (pendente, aprovada, reprovada), motivo | M-10 |
| **CatalogoServico** | id, categoria, nome, precoMedio | M-04. Mantido em `/admin/catalogo` |
| **PrecoPrestador** | prestadorId, servicoId, preco, aPartirDe | M-05 |
| **Destaque** | prestadorId, ativo, desde, formaPagamento | M-13, R$ 39 por mês |
| **Imovel** | id, corretorId, nome, complemento, endereco, cep, tipo, proprietarioId, status (ocupado, vago, arquivado), fotos[] | G-01 |
| **Proprietario** | id, nome, email, contaRepasse (chave Pix) | Recebe o repasse (G-11) |
| **Contrato** | id, imovelId, inquilino {nome, email, documento}, inicio, fim, valor, diaVencimento, multa, juros, indice (IGP-M, IPCA), garantia, taxaAdm, tokenLink, status (ativo, encerrado) | G-02, G-04 |
| **Documento** | contratoId ou imovelId, nome, arquivo (criptografado) | G-08 |
| **Cobranca** | id, contratoId, mes, valor, vencimento, situacao (paga, aguardando, vencida), diasAtraso, pagaEm, forma (Pix, boleto, manual), pixCopiaECola, boletoUrl, lembretes[] | G-10 |
| **ReguaAtraso** | corretorId, passos [{dia, acao, canal, ativo}] | Avisos antes e depois do vencimento |
| **Reajuste** | contratoId, indice, percentual, valorAtual, novoValor, data, avisado | G-09. Índice mensal vindo de fonte pública |
| **Repasse** | proprietarioId, mes, itens [{descricao, valor}], liquido, status (a_pagar, pago), pagoEm | G-11 |
| **Vistoria** | id, imovelId, contratoId, tipo (entrada, saída), data, responsavel, comodos [{nome, estado, obs, fotos[]}] | G-12 |
| **PrestadorDoCorretor** | corretorId, prestadorId ou convite {nome, email, categoria} | M-02 (lista curada e convites) |
| **Chamado** | id, codigo, imovelId, contratoId, titulo, descricao, fotos[], urgente, categoria, triagem, estado, sugeridos[], prestadorId, servicoId, valor, eventos[] | G-05, M-03 |
| **EventoChamado** | chamadoId ou pedidoId, estado, quando, detalhe, autor | Linha do tempo |
| **Pedido** (cliente) | id, codigo, clienteId, prestadorId, servicoId, valor, quando, enderecoId, fotos[], detalhes, postOrigemId, estado, eventos[] | Contratação pelo marketplace |
| **Endereco** | id, usuarioId, apelido, linha, bairro, cep, principal | Endereços do cliente |
| **Pagamento** | id, pedidoOuChamadoId, valor, forma (pix, cartão), gatewayId, status (retido, liberado, estornado, dividido), liberarEm | M-09 (escrow) |
| **Disputa** | id, pagamentoId, motivo, fotos[], respostaPrestador, status (aberta, resolvida), decisao (prestador, cliente, dividir), justificativa | M-11 |
| **Avaliacao** | id, pagamentoId, prestadorId, autorId, nota, comentario, foto, mostrarNaVitrine | M-08, V-03. Só com pagamento pelo app |
| **Post** | id, prestadorId, legenda, fotos[] (até 10), categoria, bairro, preco, pedidoId (opcional), verificado, destaque, curtidas, comentarios, statusModeracao | V-01, V-02 |
| **Comentario** | postId, autorId, texto, criadoEm | V-07 |
| **Curtida, Salvo, Seguindo** | usuarioId, postId ou prestadorId | V-07, Salvos, V-09 |
| **Denuncia** | postId, autorId (ou filtro automático), motivo, detalhe, status | V-10 |
| **Conversa, Mensagem** | participantes; autorId, texto, enviadaEm, lida | Chat cliente e prestador |
| **Lancamento** | prestadorId, descricao, data, valor | Carteira: crédito já sem a taxa, ou saque |
| **Saque** | prestadorId, valor, chavePix, status | Pix |
| **Notificacao** | usuarioId, tipo, titulo, detalhe, link, lida | Central de notificações |
| **BuscaRecente** | usuarioId, termo, criadaEm | Busca |

---

## 4. Tela por tela

Coluna "Ler": os dados que a tela mostra. Coluna "Ações": o que os botões fazem.

### 4.1 Site público (SEO, sem login)

| Rota | Arquivo | Ler | Ações e regras |
| --- | --- | --- | --- |
| `/` | `(site)/page.tsx` | Posts da cidade (6), prestadores para o mapa de demonstração | Estática com ISR |
| `/para-corretores` | `(site)/para-corretores/page.tsx` | Planos e preços | Botões levam a `/entrar?plano=` |
| `/para-prestadores` | `(site)/para-prestadores/page.tsx` | Taxa e preço do destaque | `/entrar?perfil=prestador` |
| `/servicos/[servico]/[cidade]` | `(site)/servicos/…/page.tsx`, `site/BuscaPublicaLista.tsx`, `site/MapaBusca.tsx` | `GET /prestadores?categoria=&cidade=&hoje=&verificados=&precoMax=&notaMin=&bairro=` e a faixa de preço por serviço na cidade | Página indexável. "Pedir orçamento" leva ao login com `proximo` |
| `/p/[slug]` | `(site)/p/[slug]/page.tsx` | `GET /prestadores/:slug` e `GET /prestadores/:slug/posts` | Metadados Open Graph |
| `/post/[id]` | `(site)/post/[id]/page.tsx` | `GET /posts/:id` | Prévia para redes sociais (V-08). Só o bairro, nunca o endereço |
| `/termos`, `/privacidade` | `(site)/termos`, `(site)/privacidade` | Texto do jurídico | Hoje é estrutura com marcadores [a redigir] |
| `/ajuda` | `(site)/ajuda/page.tsx` | Perguntas frequentes | E-mail de suporte |

### 4.2 Corretor

| Rota | Arquivo | Ler | Ações e regras |
| --- | --- | --- | --- |
| `/app/painel` | `app/painel/page.tsx` | `GET /painel?mes=` → aReceber, pagos, total, emAtraso, ocupados, vagos, atrasados, recebidoPorMes; chamados abertos; alertas | G-03, G-07. O período do gráfico escolhe 3 ou 6 meses |
| `/app/notificacoes` | `app/notificacoes/page.tsx` | `GET /notificacoes` | Marca como lida ao abrir |
| `/app/imoveis` | `views/ImoveisLista.tsx` | `GET /imoveis?filtro=&q=` com a situação do mês | Filtros: todos, ocupados, vagos, atrasados. Busca por endereço ou inquilino |
| `/app/imoveis/novo` | `views/NovoImovelForm.tsx` | Endereço pelo CEP | 1: `POST /imoveis` (fotos). 2: `POST /contratos`. 3: link. Respeita o limite do plano |
| `/app/imoveis/[id]` | `views/ImovelDetalhe.tsx` | `GET /imoveis/:id` com contrato, histórico (G-06), documentos e repasse | |
| `/app/imoveis/[id]/editar` | `views/corretor/EditarImovel.tsx` | Dados do imóvel | `PATCH /imoveis/:id`. Arquivar: `POST /imoveis/:id/arquivar`. Excluir: `DELETE /imoveis/:id`, só sem contrato ativo |
| `/app/imoveis/[id]/link` | `app/imoveis/[id]/link/page.tsx` | `GET /contratos/:id/link` | "Enviar por e-mail": `POST /contratos/:id/link/enviar` (hoje abre o `mailto:`). Gerar token novo: `POST /contratos/:id/link/renovar` |
| `/app/contratos` | `app/contratos/page.tsx` | `GET /contratos` com alertas | |
| `/app/contratos/novo?imovel=&renovar=` | `views/corretor/ContratoForm.tsx` | Imóveis do corretor | `POST /contratos` ou `POST /contratos/:id/renovar`. Envia o link ao inquilino |
| `/app/contratos/[id]` | `views/corretor/ContratoDetalhe.tsx` | `GET /contratos/:id` com cobranças, reajuste e documentos | Enviar documento: `POST /contratos/:id/documentos`. Encerrar: `POST /contratos/:id/encerrar` → revoga o link, deixa o imóvel vago e leva à vistoria de saída |
| `/app/financeiro` | `views/corretor/Financeiro.tsx` | `GET /cobrancas?mes=`, `GET /repasses?mes=`, `GET /regua-atraso` | "Lembrar quem não pagou": `POST /cobrancas/lembretes`. Régua: `PUT /regua-atraso` |
| `/app/financeiro/cobrancas/[id]` | `views/corretor/CobrancaDetalhe.tsx` | `GET /cobrancas/:id` com Pix copia e cola, multa e juros, lembretes enviados | Boleto: `POST /cobrancas/:id/boleto`. Lembrete: `POST /cobrancas/:id/lembrete`. Pagamento por fora: `POST /cobrancas/:id/baixa` |
| `/app/financeiro/repasses/[id]` | `views/corretor/RepasseDetalhe.tsx` | `GET /repasses/:proprietarioId?mes=` com itens | PDF: `GET /repasses/:id/extrato.pdf`. Enviar: `POST /repasses/:id/enviar`. Repassar: `POST /repasses/:id/pagar` (Pix) |
| `/app/reajustes` | `views/corretor/Reajustes.tsx` | `GET /reajustes` (calculados pelo índice) | "Avisar o inquilino": `POST /reajustes/:id/avisar` |
| `/app/vistorias?imovel=` | `views/corretor/Vistorias.tsx` | `GET /vistorias?imovel=` | |
| `/app/vistorias/nova?imovel=&tipo=` | `views/corretor/NovaVistoria.tsx` | Cômodos padrão | `POST /vistorias` {cômodos com estado, observação e fotos}. Envia uma cópia ao inquilino |
| `/app/vistorias/[id]` | `app/vistorias/[id]/page.tsx` | `GET /vistorias/:id` | |
| `/app/vistorias/comparar?imovel=` | `app/vistorias/comparar/page.tsx` | Entrada e saída do mesmo contrato | Destaca os cômodos que mudaram |
| `/app/meus-prestadores` | `views/corretor/MeusPrestadores.tsx` | `GET /meus-prestadores?categoria=` | M-02 |
| `/app/meus-prestadores/novo` | `views/corretor/NovoPrestador.tsx` | | `POST /meus-prestadores/convites` {nome, email, categoria} → convite por e-mail |
| `/app/assinatura` | `views/corretor/Assinatura.tsx` | `GET /assinatura` (plano, uso, faturas) | Trocar plano: `PUT /assinatura/plano`. Cartão: `PUT /assinatura/cartao` (token do gateway). Cancelar: `POST /assinatura/cancelar` |
| `/app/chamados` | `views/ChamadosLista.tsx` | `GET /chamados?grupo=abertos,andamento,concluidos&q=` | |
| `/app/chamados/[id]` | `views/ChamadoDetalhe.tsx`, `views/ChamadoAcoes.tsx` | `GET /chamados/:id` com fotos, triagem e 3 sugeridos (preço e próximo horário) | Aprovar: `POST /chamados/:id/aprovar` {prestadorId, servicoId}. Cancelar: `POST /chamados/:id/cancelar`. Contestar: igual ao 4.3 |

### 4.3 Explorar, busca, contratação e social (cliente e corretor)

| Rota | Arquivo | Ler | Ações e regras |
| --- | --- | --- | --- |
| `/app/explorar` | `patterns/Explorar.tsx`, `patterns/FilterBar.tsx`, `patterns/MapView.tsx` | `GET /explorar?cidade=&categoria=&verificados=&precoMax=&notaMin=&disponibilidade=&bbox=` → posts e prestadores com posição | "Buscar nesta área" manda o `bbox`. Posts de quem a pessoa segue vêm primeiro. Posts no mapa ficam no centro do bairro. Cidades: `GET /cidades` |
| `/app/busca` | `views/BuscaForm.tsx` | `GET /busca/recentes`, `GET /busca/populares` | `DELETE /busca/recentes` |
| `/app/busca/resultados?q=` | `views/ResultadosView.tsx` | `GET /busca?q=&hoje=&verificados=&precoMax=&notaMin=` | |
| `/app/post/[id]` | `app/post/[id]/page.tsx` | `GET /posts/:id` com curtidas e horários livres | Salvar e compartilhar |
| `/app/post/[id]/comentarios` | `views/Comentarios.tsx` | `GET /posts/:id/comentarios` | `POST /posts/:id/comentarios`. Oculta telefone, e-mail, @ e links |
| `/app/post/[id]/denunciar` | `views/Denunciar.tsx` | | `POST /posts/:id/denuncias` {motivo, detalhe} → fila de moderação |
| `/app/prestadores/[slug]` | `app/prestadores/[slug]/page.tsx`, `domain/Avaliacoes.tsx` | `GET /prestadores/:slug` com preços, portfólio e avaliações (distribuição das notas) | Salvar, seguir, compartilhar |
| `/app/mensagens` | `app/mensagens/page.tsx` | `GET /conversas` com a última mensagem e as não lidas | |
| `/app/mensagens/[slug]` | `views/Chat.tsx` | `GET /conversas/:prestadorId/mensagens` | `POST …/mensagens`. **Bloquear telefone, e-mail, @ e links** (o front já mascara em `lib/moderacao.ts`; o backend precisa aplicar a mesma regra) |
| `/app/contratar/[slug]` | `views/PedidoForm.tsx` | Preços do prestador | Monta o pedido: item, fotos, quando, detalhes, `post` de origem |
| `/app/contratar/[slug]/pagamento` | `app/contratar/[slug]/pagamento/page.tsx`, `views/EnderecoSelect.tsx` | Resumo e endereços | `POST /pedidos` e `POST /pagamentos` (Pix ou cartão pelo gateway, sem dado de cartão no nosso servidor) |
| `/app/meus-pedidos` | `app/meus-pedidos/page.tsx` | `GET /pedidos` | |
| `/app/meus-pedidos/[id]` | `app/meus-pedidos/[id]/page.tsx` | `GET /pedidos/:id` com linha do tempo e pagamento retido | Confirmar: `POST /pedidos/:id/confirmar` → libera o pagamento |
| `/app/meus-pedidos/[id]/contestar` | `views/ContestarForm.tsx` | | `POST /pedidos/:id/disputa` {motivo, fotos} → pagamento retido (M-11) |
| `/app/meus-pedidos/[id]/avaliar` | `views/AvaliarForm.tsx` | | `POST /avaliacoes` {nota, comentario, foto, mostrarNaVitrine}. Só com pagamento pelo app |
| `/app/salvos` | `views/SalvosView.tsx` | `GET /salvos?tipo=prestadores,posts`, `GET /seguindo` | Remover e deixar de seguir |
| `/app/enderecos` | `views/Enderecos.tsx` | `GET /enderecos` | `POST`, `DELETE /enderecos/:id`, `PUT /enderecos/:id/principal` |

### 4.4 Prestador

| Rota | Arquivo | Ler | Ações e regras |
| --- | --- | --- | --- |
| `/app/cadastro-prestador` | `views/prestador/CadastroPrestador.tsx` | Categorias, bairros, catálogo com preço médio | `POST /prestador` em 5 etapas: dados e documento, categorias e "sobre", bairro, raio e horários, preços, primeiros trabalhos. Aceite da taxa |
| `/app/pedidos` | `views/PedidosPrestador.tsx` | `GET /prestador/pedidos?status=` e o resumo da carteira | Disponível: `PUT /prestador/disponibilidade` |
| `/app/pedidos/[id]` | `app/pedidos/[id]/page.tsx` | `GET /prestador/pedidos/:id`. Endereço completo **só depois de aceitar** | Aceitar e agendar: `POST …/aceitar` {horario}. Recusar: `POST …/recusar` |
| `/app/agenda` | `views/AgendaView.tsx` | `GET /prestador/agenda?dia=` | Bloquear e liberar horário: `POST`/`DELETE /prestador/agenda/bloqueios` |
| `/app/agenda/[id]/concluir` | `views/ConcluirForm.tsx` | | `POST /prestador/pedidos/:id/concluir` {fotos de antes e depois, descrição, garantiaDias} |
| `/app/postar?pedido=` | `views/NovoPostForm.tsx` | Dados do serviço, se vier de um pedido | `POST /posts`. Vinculado a pedido pago = selo verificado (V-02). Passa pela moderação |
| `/app/meus-precos` | `views/prestador/MeusPrecos.tsx`, `PrecosEditor.tsx` | `GET /prestador/precos`, catálogo | `PUT /prestador/precos` [{servicoId, preco, aPartirDe}] |
| `/app/meu-perfil` | `views/prestador/MeuPerfil.tsx` | `GET /prestador` | `PATCH /prestador` {foto, nome, ofício, sobre, categorias, bairro, raio}. Oculta contato no "sobre" |
| `/app/verificacao` | `views/prestador/Verificacao.tsx` | `GET /prestador/verificacao` | `POST /prestador/verificacao` {arquivos, consentimento} → fila da operação |
| `/app/destaque` | `views/prestador/Destaque.tsx` | `GET /prestador/destaque` | Ativar: `POST /prestador/destaque` {formaPagamento}. Cancelar: `DELETE /prestador/destaque` (vale até o fim do mês) |
| `/app/carteira` | `app/carteira/page.tsx`, `views/SaqueButton.tsx` | `GET /prestador/carteira` | Sacar: `POST /prestador/saques` |
| `/app/carteira/recebimento` | `views/prestador/Recebimento.tsx` | `GET /prestador/chave-pix` | `PUT /prestador/chave-pix`. A titularidade confere com o documento |

### 4.5 Inquilino (sem login)

| Rota | Arquivo | Ler | Ações e regras |
| --- | --- | --- | --- |
| `/c/[token]` | `app/c/[token]/page.tsx` | `GET /link/:token` → imóvel, inquilino, corretor, chamados, aluguel | Token inválido ou contrato encerrado: `views/LinkInvalido.tsx` |
| `/c/[token]/novo` | `views/AbrirChamadoForm.tsx` | | `POST /link/:token/chamados` {descricao, fotos, urgente}. Dispara a triagem por IA e avisa o corretor. Comprimir as fotos e remover o EXIF |
| `/c/[token]/chamados/[id]` | `app/c/[token]/chamados/[id]/page.tsx` | `GET /link/:token/chamados/:id` → linha do tempo e prestador. **Nunca mostrar valores** | "Falar com o corretor" hoje é `mailto:` |

### 4.6 Operação (`/admin`, papel `operacao`)

| Rota | Arquivo | Ler | Ações |
| --- | --- | --- | --- |
| `/admin` | `app/admin/page.tsx` | `GET /admin/resumo` → filas e métricas do piloto | |
| `/admin/verificacao` | `views/admin/Verificacao.tsx` | `GET /admin/verificacoes?status=pendente` com os arquivos | Aprovar: `POST …/:id/aprovar` → libera o selo. Reprovar: `POST …/:id/reprovar` {motivo} → e-mail ao prestador |
| `/admin/moderacao` | `views/admin/Moderacao.tsx` | `GET /admin/denuncias` (de pessoas e do filtro automático) | Manter, ocultar dados e manter, ou remover (`POST /admin/denuncias/:id/decisao`) |
| `/admin/disputas`, `/admin/disputas/[id]` | `app/admin/disputas/**`, `views/admin/DisputaDecisao.tsx` | `GET /admin/disputas`, `GET /admin/disputas/:id` com relatos e fotos das duas partes | `POST /admin/disputas/:id/decisao` {prestador, cliente ou dividir, justificativa} → move o pagamento e avisa as partes |
| `/admin/catalogo` | `views/admin/Catalogo.tsx` | `GET /catalogo` | `POST`/`PATCH /admin/catalogo` |
| `/admin/usuarios` | `views/admin/Usuarios.tsx` | `GET /admin/usuarios?q=` | Suspender: `POST /admin/usuarios/:id/suspender` |

### 4.7 Comum

| Rota | O que é |
| --- | --- |
| `/app` | Redireciona para o início do perfil ativo. É o `start_url` do PWA |
| `/boas-vindas` | Abertura do app instalado |
| `/offline` | Mostrada pelo service worker (`public/sw.js`) quando não há internet |
| `app/app/loading.tsx`, `app/app/error.tsx`, `app/error.tsx`, `app/not-found.tsx` | Carregando, erro e página não encontrada |

---

## 5. Regras de negócio

**Estados do chamado e do pedido** (`src/lib/estados.ts`): Aberto → Triado → Prestador atribuído → Agendado → Concluído → Pago → Avaliado, além de Cancelado e Em disputa. Só o backend muda o estado, e cada mudança gera um `EventoChamado` e uma notificação.

| De | Para | Quem | Ação |
| --- | --- | --- | --- |
| — | Aberto | Inquilino (link) ou cliente | Abrir chamado ou pedido |
| Aberto | Triado | IA | Triagem automática |
| Triado | Prestador atribuído | Corretor | Aprovar prestador e preço |
| Prestador atribuído | Agendado | Prestador | Aceitar e agendar |
| Agendado | Concluído | Prestador | Concluir com fotos |
| Concluído | Pago | Cliente ou corretor, ou prazo sem contestação | Confirmar → libera o pagamento |
| Pago | Avaliado | Cliente ou corretor | Avaliar |
| Qualquer um até Agendado | Cancelado | Corretor ou cliente | Cancelar |
| Concluído | Em disputa | Cliente ou corretor | Contestar |
| Em disputa | Pago ou estornado | Operação | Decisão da disputa |

- **Pagamento protegido (escrow).** O cliente paga antes. O valor fica retido no gateway (split e custódia) e é liberado quando o serviço é confirmado ou depois de **X dias** sem contestação. O PRD ainda não fixou o X; o front mostra 7 dias.
- **Taxa.** De 8% a 10% sobre o serviço pago pelo app, descontada do prestador. O front usa 8% (`CARTEIRA.taxa`).
- **Cobrança do aluguel.** Pix ou boleto, com multa (2%) e juros (1% ao mês) do contrato, e a régua de atraso configurável.
- **Reajuste.** Novo valor = valor atual × (1 + índice dos últimos 12 meses), na data de aniversário do contrato. Aviso 60 e 30 dias antes.
- **Repasse ao proprietário.** Aluguel recebido − taxa de administração − manutenções pagas no mês, com extrato.
- **Assinatura do corretor.** Grátis até 2 imóveis; R$ 15 por imóvel por mês, ou R$ 99 por mês até 15 imóveis. Ao cancelar, volta para 2 imóveis ativos e os outros ficam arquivados.
- **Destaque.** R$ 39 por mês. O prestador aparece primeiro na busca e na vitrine da região.
- **Avaliações e selo.** Só avalia quem pagou pelo app. A nota e o número de serviços contam só os serviços pagos pelo app. O selo "Serviço verificado" vai apenas em posts e avaliações ligados a um pagamento; o selo "Prestador verificado", só depois da verificação aprovada.
- **Contato por fora.** Bloquear telefone, e-mail, @ e links em conversas, legendas, comentários e no "sobre" do prestador.
- **Privacidade (LGPD).** Consentimento explícito. Documentos criptografados. Cada perfil só vê o que é dele. Exportar e excluir dados a pedido. Na vitrine aparece só o bairro. Ocultar rosto, placa e número da casa, e remover o EXIF antes de publicar.

---

## 6. Avisos por e-mail e push

Sem WhatsApp. Cada evento gera uma `Notificacao` no app e, conforme as preferências da pessoa, um e-mail e um push. O `public/sw.js` já mostra o push recebido; o payload é `{ titulo, corpo, link }`.

| Evento | Quem recebe |
| --- | --- |
| Conta criada (confirmar e-mail), recuperação de senha, troca de e-mail | Usuário |
| Link do contrato, vistoria, reajuste | Inquilino (e-mail) |
| Chamado aberto (com triagem) | Corretor |
| Prestador aprovado, pedido novo | Prestador |
| Pedido aceito e agendado | Inquilino ou cliente, e corretor |
| Serviço concluído (pede confirmação) | Cliente ou corretor |
| Pagamento liberado, saque feito | Prestador |
| Contestação aberta ou decidida | Todos os envolvidos |
| Contrato vence em 60 e 30 dias, reajuste | Corretor |
| Régua de atraso | Inquilino, e corretor no último passo |
| Verificação aprovada ou reprovada, post removido | Prestador |
| Convite de prestador | Prestador convidado |
| Mensagem nova | Destinatário |

---

## 7. Integrações

| Serviço | Uso | Onde aparece no front |
| --- | --- | --- |
| Gateway com Pix, boleto, split e custódia (Asaas, Pagar.me ou Iugu) | Escrow, cobrança de aluguel, repasse, saques, assinatura e destaque | Pagamento, financeiro, carteira, assinatura |
| Mapa e geocodificação (Mapbox ou Google Maps) com PostGIS | Busca por raio e pinos | `components/patterns/MapView.tsx` hoje é um SVG de exemplo com a mesma interface (pinos, seleção, zoom, camadas e card): troque só o desenho |
| LLM com visão | Triagem do chamado | Detalhe do chamado |
| Armazenamento de imagens | Fotos com compressão e sem EXIF | Todos os `PhotoPicker` (`components/ui/Controls.tsx`) e os campos de arquivo |
| E-mail transacional | Conta, link do inquilino, avisos | — |
| Web Push (VAPID) | Avisos no PWA | `public/sw.js`, `views/conta/PreferenciasAvisos.tsx` |
| CEP | Endereço no cadastro | Imóvel, contrato, endereços |
| Índices IGP-M e IPCA | Reajuste | `/app/reajustes` |
| Consulta de antecedentes | Verificação do prestador | `/admin/verificacao` |

---

## 8. Controles que já funcionam, mas só no navegador

Estes controles já funcionam de ponta a ponta na tela. Hoje eles guardam o resultado no `localStorage` (`src/lib/store.ts`). O backend substitui cada chave pela rota indicada:

| Chave no navegador | O que guarda | Rota que substitui |
| --- | --- | --- |
| `domu_perfil` | Perfil ativo | `GET /me`, `PUT /me/perfil-ativo` |
| `salvos:prestadores`, `salvos:posts` | Salvos | `GET`/`POST`/`DELETE /salvos` |
| `seguindo` | Prestadores seguidos | `GET`/`POST`/`DELETE /seguindo` |
| `comentarios:<post>` | Comentários | `GET`/`POST /posts/:id/comentarios` |
| `chat:<prestador>` | Mensagens | `GET`/`POST /conversas/:id/mensagens` |
| `enderecos` | Endereços | `/enderecos` |
| `buscasRecentes` | Buscas recentes | `/busca/recentes` |
| `preferenciasAviso` | Avisos por e-mail e push | `/me/preferencias-aviso` |
| `prestadorCadastrado` | Se o prestador já fez o cadastro | `GET /me` → `prestadorCadastrado` |
| `destaqueAtivo` | Destaque ligado | `/prestador/destaque` |
| `prestadoresManuais` | Convites do corretor | `/meus-prestadores/convites` |

O resto das ações (aprovar, pagar, registrar, enviar, excluir…) mostra a confirmação na tela e navega para a tela seguinte, mas não salva nada. É ali que entra a chamada à API.

---

## 9. Decisões em aberto que afetam o backend

- Prazo para liberar o pagamento sem contestação (o front mostra 7 dias).
- Taxa final do prestador (entre 8% e 10%; o front usa 8%).
- Cidade piloto (o front usa São Paulo como exemplo).
- Se o cliente pode postar na vitrine sem ter contratado (hoje ele só posta ao avaliar).
- Gateway de pagamento e empresa de consulta de antecedentes.
- Venda da assinatura e do destaque dentro do app iOS, se o app for para a App Store (regra de compra da Apple).
