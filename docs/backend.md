# Domu: o que o backend precisa entregar

O front está pronto e roda só com **dados de exemplo**. Este documento lista, tela por tela, o que o backend precisa fornecer: dados, ações, regras e permissões. Os IDs (G-01, M-07, V-02…) são os do PRD.

- Front: Next.js 16 (App Router), em `src/`. Rotas em `src/app`, componentes em `src/components`.
- Dados de exemplo: `src/lib/mock/*.ts`. Tipos do domínio: `src/lib/types.ts`.
- Nada de WhatsApp: login por **e-mail e senha**; avisos por **e-mail** e **push**; link do inquilino enviado por **e-mail** (ou copiado).

---

## 1. Como ligar o backend no front

1. Crie `src/lib/api/` com uma função por leitura e por ação (lista em cada tela abaixo). Mantenha os mesmos nomes e formatos de `src/lib/mock` (`imovel(id)`, `chamado(id)`, `prestador(slug)`, `PEDIDOS_CLIENTE`…), assim as telas mudam pouco.
2. Páginas de servidor (sem `'use client'`) podem buscar direto no servidor. Os formulários (arquivos `*Form.tsx` em `src/components/views` e `src/app/(entrada)`) hoje só navegam no `onSubmit`: troque por uma chamada à API e trate o erro na própria tela.
3. Troque os `generateStaticParams` das rotas dinâmicas por renderização dinâmica, ou por ISR nas páginas públicas.
4. Tire `src/lib/mock` quando tudo estiver ligado.

Os pontos marcados com **"Só front"** nos comentários do código são os lugares que hoje fingem uma resposta.

---

## 2. Autenticação e perfis

| Tela | Rota | Arquivo | O que o backend faz |
| --- | --- | --- | --- |
| Entrar | `/entrar` | `(entrada)/entrar/EntrarForm.tsx` | `POST /auth/login` {email, senha} → sessão (cookie httpOnly). Erro genérico "E-mail ou senha incorretos". Limite de tentativas. |
| Criar conta | `/criar-conta` | `(entrada)/criar-conta/CriarContaForm.tsx` | `POST /auth/cadastro` {nome, email, senha, aceiteTermos}. Senha com pelo menos 8 caracteres. E-mail único. Guarda data e versão do aceite (LGPD). Envia e-mail de confirmação. |
| Recuperar senha | `/recuperar-senha` | `(entrada)/recuperar-senha/RecuperarSenhaForm.tsx` | `POST /auth/recuperar` {email}. Responde sempre 200 (não revela se o e-mail existe). Envia link com token de uso único, válido por 1 hora. |
| Redefinir senha | `/redefinir-senha?token=` | `(entrada)/redefinir-senha/RedefinirSenhaForm.tsx` | `POST /auth/redefinir` {token, senha}. Invalida o token e as outras sessões. |
| Escolher perfil | `/entrar/perfil` | `(entrada)/entrar/perfil/EscolherPerfil.tsx` | `POST /me/perfis` {tipo} cria o perfil se não existir; `PUT /me/perfil-ativo`. Aceita `?proximo=/app/...` para voltar à ação que pediu login. |
| Sair | Perfil → Sair | `views/ContaView.tsx` | `POST /auth/logout`. |

- **Perfil ativo.** Uma conta pode ter os perfis `corretor`, `prestador` e `cliente`. Hoje o front guarda o perfil ativo no `localStorage` (`components/layout/PerfilProvider.tsx`). Com o backend, ele vem da sessão (`GET /me`).
- **Proteção de rotas.** Tudo em `/app/*` exige sessão. Sem sessão, redirecione para `/entrar?proximo=<rota>`.
- **Inquilino não tem conta.** O acesso é pelo token do link (`/c/[token]`), ligado a um contrato. O token é longo, aleatório e revogável, e só vale enquanto o contrato estiver ativo.

`GET /me` → `{ id, nome, email, iniciais, perfis: Perfil[], perfilAtivo, assinatura }` (usado no cabeçalho, na barra lateral e em Perfil).

---

## 3. Entidades

Os campos já usados pelo front estão em `src/lib/types.ts`. Esta é a lista completa, com o que falta.

| Entidade | Campos principais | Observações |
| --- | --- | --- |
| **Usuario** | id, nome, email, senhaHash, criadoEm, aceiteTermos (versão, data) | Login por e-mail e senha |
| **PerfilCorretor** | usuarioId, plano, imoveisLimite | Plano: Grátis (2), Por imóvel (R$ 15), Carteira (R$ 99, até 15) |
| **Prestador** | slug, nome, foto, documento (CPF/CNPJ), categorias[], bairro, localização (lat, lng), raioKm, nota, avaliacoes, servicosPeloApp, verificado, destaque, disponibilidade, proximoHorario | M-01, M-07, M-10, M-13. Documento criptografado |
| **CatalogoServico** | id, categoria, nome | Itens fixos por categoria (M-04) |
| **PrecoPrestador** | prestadorId, servicoId, preco, aPartirDe | M-05 |
| **Imovel** | id, corretorId, nome, endereco, cep, tipo, proprietario, status, fotos[] | G-01 |
| **Proprietario** | id, nome, contato, dadosRepasse | Recebe o repasse (G-11) |
| **Contrato** | id, imovelId, inquilino {nome, email}, inicio, fim, valor, diaVencimento, indice (IGP-M, IPCA), tokenLink, ativo | G-02, G-04 |
| **Cobranca** | contratoId, mes, valor, situacao (pago, em_aberto, atrasado), diasAtraso, pagoEm | G-03, G-10 |
| **Chamado** | id, codigo, imovelId, contratoId, titulo, descricao, fotos[], urgente, categoria, triagem, estado, sugeridos[], prestadorId, valor, eventos[] | G-05, M-03. Estados na seção 5 |
| **EventoChamado** | chamadoId, estado, quando, detalhe, autor | A linha do tempo |
| **Pedido** (cliente) | id, codigo, clienteId, prestadorId, servicoId, valor, quando, endereco, fotos[], detalhes, postOrigemId, estado, eventos[] | Contratação pelo marketplace |
| **Pagamento** | id, pedidoOuChamadoId, valor, forma (pix, cartão), gatewayId, status (retido, liberado, estornado), liberarEm | M-09 (escrow) |
| **Disputa** | id, pagamentoId, motivo, fotos[], status, resolucao | M-11 |
| **Avaliacao** | id, pagamentoId, prestadorId, autorId, nota, comentario, foto, mostrarNaVitrine | M-08, V-03. Só com pagamento pelo app |
| **Post** | id, prestadorId, titulo/legenda, fotos[] (até 10), categoria, bairro, preco, pedidoId (opcional), verificado, destaque, curtidas, comentarios, moderacao | V-01, V-02 |
| **Comentario / Curtida / Salvo** | postId ou prestadorId, usuarioId | V-07; Salvos |
| **Mensagem** | conversaId, autorId, texto, enviadaEm | Conversa cliente e prestador |
| **Lancamento** (carteira) | prestadorId, descricao, data, valor | Crédito de serviço (já sem a taxa) ou saque |
| **Saque** | prestadorId, valor, chavePix, status | Pix |
| **Documento** | imovelId ou contratoId, nome, arquivo, criptografado | G-08 |
| **Notificacao** | usuarioId, tipo, titulo, detalhe, link, lida | Central de notificações |

---

## 4. Tela por tela

Coluna "Ler" = dados que a tela mostra. Coluna "Ações" = o que os botões fazem.

### 4.1 Site público (SEO, sem login)

| Rota | Arquivo | Ler | Ações e regras |
| --- | --- | --- | --- |
| `/` | `(site)/page.tsx` | Posts em destaque da cidade (6), prestadores para o mapa de demonstração, contagem de verificados | Estática com ISR |
| `/para-corretores` | `(site)/para-corretores/page.tsx` | Planos e preços | Botões levam a `/entrar?plano=` |
| `/para-prestadores` | `(site)/para-prestadores/page.tsx` | Preço do destaque, taxa | `/entrar?perfil=prestador` |
| `/servicos/[servico]/[cidade]` | `(site)/servicos/[servico]/[cidade]/page.tsx` | `GET /prestadores?categoria=&cidade=` (lista e pinos), faixa de preço média por serviço na cidade | Página indexável. "Pedir orçamento" leva ao login com `proximo` |
| `/p/[slug]` | `(site)/p/[slug]/page.tsx` | `GET /prestadores/:slug` (perfil, preços, depoimento), `GET /prestadores/:slug/posts` | Metadados Open Graph |
| `/post/[id]` | `(site)/post/[id]/page.tsx` | `GET /posts/:id` | Prévia para redes sociais (V-08). Nunca mostra endereço, só bairro |

### 4.2 App do corretor

| Rota | Arquivo | Ler | Ações e regras |
| --- | --- | --- | --- |
| `/app/painel` | `app/painel/page.tsx` | `GET /painel?mes=` → aReceber, pagos, total, emAtraso, ocupados, vagos, atrasados, recebidoPorMes[6]; chamados abertos; alertas (vencimento, reajuste, atraso) | G-03, G-07 |
| `/app/notificacoes` | `app/notificacoes/page.tsx` | `GET /notificacoes` | Marcar como lida ao abrir |
| `/app/imoveis` | `views/ImoveisLista.tsx` | `GET /imoveis?filtro=&q=` com situação do mês | Filtros: todos, ocupados, vagos, atrasados. Busca por endereço ou inquilino |
| `/app/imoveis/novo` | `views/NovoImovelForm.tsx` | CEP → endereço (serviço de CEP) | Etapa 1: `POST /imoveis` (com fotos). Etapa 2: `POST /imoveis/:id/contratos`. Etapa 3: gera o link. Respeitar o limite do plano |
| `/app/imoveis/[id]` | `views/ImovelDetalhe.tsx` | `GET /imoveis/:id` com contrato, histórico (chamados e custos, G-06), documentos, repasse do mês | Abas: Contrato, Histórico, Documentos (`POST /documentos`), Repasse |
| `/app/imoveis/[id]/link` | `app/imoveis/[id]/link/page.tsx` | `GET /contratos/:id/link` → URL com token | "Enviar por e-mail": `POST /contratos/:id/link/enviar` (o front hoje abre o `mailto:`). Permitir gerar um token novo |
| `/app/contratos` | `app/contratos/page.tsx` | `GET /contratos` com alertas | G-07 |
| `/app/chamados` | `views/ChamadosLista.tsx` | `GET /chamados?grupo=abertos|andamento|concluidos&q=` | |
| `/app/chamados/[id]` | `views/ChamadoDetalhe.tsx`, `views/ChamadoAcoes.tsx` | `GET /chamados/:id` com fotos, triagem e 3 prestadores sugeridos (com preço do serviço sugerido e próximo horário) | "Aprovar": `POST /chamados/:id/aprovar` {prestadorId, servicoId} → estado `prestador_atribuido`, avisa o prestador. "Cancelar": `POST /chamados/:id/cancelar`. "Abrir contestação": ver 4.4 |

### 4.3 Explorar, busca e contratação (cliente e corretor)

| Rota | Arquivo | Ler | Ações e regras |
| --- | --- | --- | --- |
| `/app/explorar` | `patterns/Explorar.tsx`, `patterns/MapView.tsx` | `GET /explorar?cidade=&categoria=&verificados=&disponibilidade=&bbox=` → posts e prestadores com posição | "Buscar nesta área" manda o `bbox` do mapa. Posts no mapa só pelo centro do bairro |
| `/app/busca` | `views/BuscaForm.tsx` | `GET /busca/recentes`, `GET /busca/populares` | Envia para resultados |
| `/app/busca/resultados?q=` | `app/busca/resultados/page.tsx` | `GET /busca?q=` → prestadores com o serviço que casa | Ordenar por distância, nota e disponibilidade |
| `/app/post/[id]` | `app/post/[id]/page.tsx` | `GET /posts/:id` + prova social (curtidas, horários livres) | Salvar (`POST /salvos`), compartilhar, comentários (V-07) |
| `/app/prestadores/[slug]` | `app/prestadores/[slug]/page.tsx` | `GET /prestadores/:slug` com preços, portfólio e avaliações | Salvar, compartilhar |
| `/app/mensagens/[slug]` | `app/mensagens/[slug]/page.tsx` | `GET /conversas/:prestadorId` | `POST /conversas/:id/mensagens`. **Bloquear telefone, e-mail, @ e links** no texto |
| `/app/contratar/[slug]` | `views/PedidoForm.tsx` | Preços do prestador | Monta o pedido (item, fotos, quando, detalhes, `post` de origem) |
| `/app/contratar/[slug]/pagamento` | `app/contratar/[slug]/pagamento/page.tsx` | Resumo | `POST /pedidos` + `POST /pagamentos` (Pix ou cartão pelo gateway). Nenhum dado de cartão passa pelo nosso servidor. Resposta leva ao acompanhamento |
| `/app/meus-pedidos` | `app/meus-pedidos/page.tsx` | `GET /pedidos` do cliente | |
| `/app/meus-pedidos/[id]` | `app/meus-pedidos/[id]/page.tsx` | `GET /pedidos/:id` com linha do tempo e pagamento retido | "Confirmar serviço": `POST /pedidos/:id/confirmar` → libera o pagamento |
| `/app/meus-pedidos/[id]/contestar` | `views/ContestarForm.tsx` | | `POST /pedidos/:id/disputa` {motivo, fotos} → pagamento fica retido (M-11) |
| `/app/meus-pedidos/[id]/avaliar` | `views/AvaliarForm.tsx` | | `POST /avaliacoes` {nota, comentario, foto, mostrarNaVitrine}. Só se houve pagamento pelo app |
| `/app/salvos` | `app/salvos/page.tsx` | `GET /salvos?tipo=prestadores|posts` | Remover dos salvos |

### 4.4 App do prestador

| Rota | Arquivo | Ler | Ações e regras |
| --- | --- | --- | --- |
| `/app/pedidos` | `views/PedidosPrestador.tsx` | `GET /prestador/pedidos?status=novo|aceito|concluido`, resumo da carteira | "Disponível": `PUT /prestador/disponibilidade` |
| `/app/pedidos/[id]` | `app/pedidos/[id]/page.tsx` | `GET /prestador/pedidos/:id`. Endereço completo **só depois de aceitar** | "Aceitar e agendar": `POST /prestador/pedidos/:id/aceitar` {horario}. "Recusar": `POST .../recusar` |
| `/app/agenda` | `views/AgendaView.tsx` | `GET /prestador/agenda?dia=` | Bloquear e liberar horário: `POST /prestador/agenda/bloqueios` |
| `/app/agenda/[id]/concluir` | `views/ConcluirForm.tsx` | | `POST /prestador/pedidos/:id/concluir` {fotosAntes, fotosDepois, descricao, garantiaDias} → estado `concluido`, avisa o cliente para confirmar |
| `/app/postar` | `views/NovoPostForm.tsx` | Se vier `?pedido=`, dados do serviço (categoria, preço, bairro) | `POST /posts` {fotos até 10, legenda}. Vinculado a pedido pago = selo verificado (V-02). Passa pela moderação (V-10) |
| `/app/carteira` | `app/carteira/page.tsx` | `GET /prestador/carteira` → disponível, a liberar, mês, atividade, lançamentos | "Sacar via Pix": `POST /prestador/saques` |

### 4.5 Comum

| Rota | Arquivo | Ler | Ações |
| --- | --- | --- | --- |
| `/app` | `app/page.tsx` | Perfil ativo | Redireciona para o início do perfil. É o `start_url` do PWA |
| `/app/conta` | `views/ContaView.tsx` | `GET /me` | Trocar perfil (`PUT /me/perfil-ativo`), alterar senha, assinatura, privacidade (exportar e excluir dados, LGPD), sair |
| `/boas-vindas` | `(entrada)/boas-vindas/page.tsx` | Número de prestadores verificados na cidade | |

### 4.6 Link do inquilino (sem login)

| Rota | Arquivo | Ler | Ações e regras |
| --- | --- | --- | --- |
| `/c/[token]` | `app/c/[token]/page.tsx` | `GET /link/:token` → imóvel, nome do inquilino, corretor, chamados abertos, aluguel do mês | Token inválido ou contrato encerrado: página de erro clara |
| `/c/[token]/novo` | `views/AbrirChamadoForm.tsx` | | `POST /link/:token/chamados` {descricao, fotos, urgente}. Dispara a triagem por IA e avisa o corretor. Comprimir as fotos e remover EXIF |
| `/c/[token]/chamados/[id]` | `app/c/[token]/chamados/[id]/page.tsx` | `GET /link/:token/chamados/:id` → linha do tempo e prestador. **Nunca mostrar valores** | "Falar com o corretor": hoje é `mailto:` para o e-mail do corretor |

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

**Pagamento protegido (escrow).** O cliente paga antes. O valor fica retido no gateway (split e custódia) e é liberado quando o serviço é confirmado ou depois de **X dias** sem contestação. O PRD ainda não fixou o X; o front mostra 7 dias.

**Taxa.** 8% a 10% sobre o serviço pago pelo app, descontada do prestador. O front usa 8% (`CARTEIRA.taxa`).

**Repasse ao proprietário.** Aluguel − taxa de administração − manutenções pagas no mês, com extrato por proprietário (G-11).

**Assinatura do corretor.** Grátis até 2 imóveis; R$ 15 por imóvel por mês ou R$ 99 por mês até 15 imóveis.

**Destaque do prestador.** R$ 39 por mês. Aparece primeiro na busca e na vitrine da região (M-13).

**Avaliações e selo.** Só avalia quem pagou pelo app. A nota e o número de serviços contam só os serviços pagos pelo app. O selo "Serviço verificado" aparece só em posts e avaliações ligados a um pagamento. O selo "Prestador verificado" aparece só depois da checagem de documento e antecedentes.

**Contato por fora.** Bloquear telefone, e-mail, @ e links na conversa, nas legendas e nos comentários.

**Privacidade (LGPD).** Consentimento explícito no cadastro. Documentos criptografados em repouso. Cada perfil só vê o que é dele. Exportar e excluir dados a pedido. Na vitrine aparece só o bairro. Ocultar rosto, placa e número da casa, e remover o EXIF antes de publicar.

---

## 6. Avisos por e-mail e push

Sem WhatsApp. Cada evento gera uma `Notificacao` no app, um e-mail e um push (PWA).

| Evento | Quem recebe |
| --- | --- |
| Conta criada, recuperação de senha | Usuário |
| Link do contrato enviado | Inquilino (e-mail) |
| Chamado aberto (com triagem) | Corretor |
| Prestador aprovado, pedido novo | Prestador |
| Pedido aceito e agendado | Inquilino ou cliente, corretor |
| Serviço concluído, peça para confirmar | Cliente ou corretor |
| Pagamento liberado, saque feito | Prestador |
| Contestação aberta ou resolvida | Todos os envolvidos |
| Contrato vence em 60 e 30 dias, reajuste | Corretor (e inquilino no reajuste, G-09) |
| Aluguel atrasado (régua de atraso) | Inquilino, corretor (G-10) |

---

## 7. Integrações

| Serviço | Uso | Onde aparece no front |
| --- | --- | --- |
| Gateway de pagamento com Pix, split e custódia (Asaas, Pagar.me ou Iugu) | Escrow, repasse, saques, cobrança de aluguel | Pagamento, carteira, repasse |
| Mapa e geocodificação (Mapbox ou Google Maps) | Busca por raio (PostGIS) e pinos | `components/patterns/MapView.tsx` hoje é um SVG de exemplo com a mesma interface (pinos, seleção e card); troque só o desenho |
| LLM com visão | Triagem do chamado (categoria, urgência e serviço sugerido) | Detalhe do chamado |
| Armazenamento de imagens | Fotos com compressão e sem EXIF | Todos os `PhotoPicker` (`components/ui/Controls.tsx`) |
| E-mail transacional | Login, recuperação, link do inquilino, avisos | — |
| Push web | Avisos no PWA instalado | `src/app/manifest.ts` |
| CEP | Endereço no cadastro de imóvel | `views/NovoImovelForm.tsx` |

---

## 8. Controles que ainda são só visuais

Estes controles já têm o lugar e o texto certos, mas não fazem nada sem backend:

- Filtros "Preço" e "Nota" e o seletor de cidade no Explorar (`patterns/FilterBar.tsx`).
- "Buscar nesta área", aproximar e camadas no mapa (`patterns/MapView.tsx`).
- Curtir, comentar e salvar: hoje só mudam na tela (`domain/SaveButton.tsx`).
- Enviar documento, editar imóvel e alterar os dados da conta.
- Mensagens da conversa com o prestador.
- Período dos gráficos ("6 meses", "Últimos 30 dias").
