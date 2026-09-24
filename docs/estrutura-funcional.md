# Domu: estrutura funcional

Este documento lista o que o sistema faz, onde cada função aparece e quais componentes vamos construir, antes de escrever código. Os IDs (G-01, M-07, V-02…) são os mesmos do PRD.

## 1. Superfícies

| Superfície | Tecnologia | Quem usa | Para quê |
| --- | --- | --- | --- |
| **App Domu** | React Native (Expo) | Corretor ou proprietário, prestador, cliente avulso | O produto inteiro. O perfil ativo decide as abas. |
| **Web pública** | Next.js | Inquilino (pelo link) e visitante | Link do inquilino (G-04), busca pública, posts e perfis públicos com prévia no WhatsApp (V-08) |
| **Painel web** | Next.js | Corretor | As mesmas funções de gestão do app, em tela larga: tabelas, extratos e documentos |

Uma mesma conta pode ter mais de um perfil, como um corretor que também contrata serviços. A troca de perfil fica em Perfil.

## 2. Módulos e funções

### 2.1 Conta e perfis
- Login por código no WhatsApp, sem senha
- Escolha do perfil no primeiro acesso: corretor ou proprietário, prestador, cliente
- Troca de perfil, dados pessoais e consentimentos da LGPD (exportar e excluir dados)

### 2.2 Imóveis (G-01, G-06, G-12)
- Lista de imóveis com filtro por status (ocupado ou vago) e busca
- Cadastro de imóvel: endereço, tipo, proprietário, fotos
- Detalhe do imóvel: contrato atual, histórico de manutenção (o que quebrou, quem consertou, custo, garantia) e documentos
- Vistoria de entrada e saída por cômodo, com comparação lado a lado (fase 3)

### 2.3 Contratos e inquilinos (G-02, G-07, G-08, G-09)
- Cadastro de inquilino e de contrato: início, fim, valor, vencimento, índice de reajuste
- Geração do link do inquilino e envio pelo WhatsApp
- Alertas 60 e 30 dias antes do vencimento e do reajuste
- Documentos por imóvel e por inquilino (fase 1, P1)
- Reajuste automático por IGP-M ou IPCA (fase 3)

### 2.4 Financeiro (G-03, G-10, G-11)
- Painel do mês: a receber, pagos, inadimplentes, chamados abertos
- Cobrança por Pix ou boleto, com régua de atraso (fase 3)
- Repasse por proprietário: aluguel − taxa − manutenções, com extrato (fase 3)

### 2.5 Chamados (G-04, G-05, M-03)
- **Inquilino (web):** abrir chamado com foto e texto e acompanhar o andamento
- **IA:** triagem de categoria e urgência, com sugestão de 3 prestadores próximos
- **Corretor:** caixa de chamados, detalhe do chamado, aprovação de prestador e preço, confirmação da conclusão
- **Prestador:** receber o pedido, aceitar ou recusar, agendar, concluir com fotos
- Estados: Aberto → Triado → Prestador atribuído → Agendado → Concluído → Pago → Avaliado, além de Cancelado e Em disputa
- Linha do tempo única, que as três pessoas veem, cada uma com o que lhe cabe

### 2.6 Prestadores e catálogo (M-01, M-02, M-04, M-05, M-07, M-10, M-13)
- Cadastro do prestador: foto, documento, categorias, raio de atendimento, WhatsApp
- Catálogo de serviços padronizados por categoria, e o preço do prestador por item (fixo ou "a partir de")
- Perfil público do prestador: card, preços, portfólio, avaliações, selo
- Lista curada para o corretor, por categoria e bairro (fase 1)
- Verificação de documento e antecedentes, com o selo (P1)
- Destaque pago (fase 4)

### 2.7 Explorar: mapa (M-06)
- Busca por serviço ("eletricista", "troca de chuveiro")
- Mapa com os prestadores dentro do raio e os posts da região
- Folha inferior com a lista de cards, que se expande e recolhe
- Filtros: categoria, disponibilidade (hoje ou amanhã), faixa de preço, nota, só verificados

### 2.8 Vitrine: rede social (V-01 a V-10)
- Feed por região e categoria, ordenado por recentes ou por relevância
- Post: até 10 fotos, legenda, categoria, bairro, antes e depois opcional
- Post vinculado a serviço: herda categoria, preço e o selo "Serviço verificado"
- Curtir, salvar, comentar (P1) e seguir prestador (fase 4)
- "Quero um serviço assim": abre um pedido com aquele prestador
- Compartilhar por link público com prévia
- Moderação: denúncia, filtro de imagem, ocultação de rosto, placa e número da casa, remoção de EXIF, bloqueio de telefone, @ e links

### 2.9 Contratação e pagamento (M-08, M-09, M-11)
- Pedido de serviço: item do catálogo, fotos, data desejada
- Pagamento protegido: o cliente paga, o valor fica retido e é liberado após a confirmação ou após X dias sem contestação
- Contestação com fotos, com o pagamento retido até a resolução
- Avaliação de 1 a 5, com comentário e foto opcional. Só avalia quem pagou pelo app.

### 2.10 Carteira do prestador (M-12)
- Saldo, a liberar, saques, histórico de serviços e agenda (fase 4)

### 2.11 Notificações
- WhatsApp como canal principal e push e e-mail como apoio
- Central de notificações no app, agrupada por chamado

### 2.12 Operação (interno)
- Curadoria de prestadores, fila de moderação, disputas, catálogo de serviços

## 3. Navegação por perfil

| Perfil | Abas |
| --- | --- |
| Corretor ou proprietário | **Início** (painel) · **Imóveis** · **Chamados** · **Explorar** (mapa e vitrine) · **Perfil** |
| Prestador | **Pedidos** · **Agenda** · **Vitrine** (meus posts e postar) · **Carteira** · **Perfil** |
| Cliente avulso | **Vitrine** · **Mapa** · **Pedidos** · **Perfil** |
| Inquilino (web, sem abas) | Meu imóvel → Abrir chamado → Acompanhar chamado (→ Pagar aluguel, na fase 3) |

## 4. Mapa de telas

**Corretor:** Painel · Lista de imóveis · Detalhe do imóvel · Novo imóvel · Novo contrato · Detalhe do contrato · Caixa de chamados · Detalhe do chamado · Escolher prestador · Explorar (mapa) · Vitrine · Perfil do prestador · Pagamento · Avaliar · Notificações · Perfil

**Prestador:** Onboarding (dados, categorias, raio, preços) · Pedidos · Detalhe do pedido · Agenda · Concluir serviço (fotos) · Novo post · Meu perfil público · Carteira · Notificações

**Cliente avulso:** Vitrine · Detalhe do post · Mapa e busca · Perfil do prestador · Pedido · Pagamento · Acompanhar · Avaliar

**Inquilino (web):** Início do link · Abrir chamado (foto e texto) · Chamado aberto · Andamento

## 5. Componentes

A ordem vai do mais genérico ao mais específico. Uma camada só usa as camadas de baixo.

**Tokens:** cores, tipografia, espaço, raio, sombra, nos temas claro e escuro. Já estão em `brand/tokens`.

**Primitivos:** Text · Icon · Button · IconButton · Badge · Avatar · AvatarStack · Input · SearchField · TextArea · Select · Chip · Switch · Checkbox · Card · Divider · ListItem · Sheet (folha inferior) · Modal · Header · TabBar · SegmentedControl · Toast · Skeleton · EmptyState · ProgressBar · Rating (estrelas) · PhotoGrid · ImageCarousel

**De domínio:**
- Marca: Logo · Selo (serviço e prestador verificado)
- Imóveis: ImovelCard · ImovelHeader · HistoricoItem · VistoriaComodo
- Contratos: ContratoRow · AlertaVencimento
- Financeiro: KpiCard · ExtratoRow
- Chamados: ChamadoCard · StatusBadge · StatusSteps · TriagemIA · FotoUploader
- Prestadores: PrestadorCard · PrestadorMini (para listas e para o mapa) · PrecoItem · CategoriaChip · Disponibilidade
- Mapa: MapPin (prestador e post) · MapCluster · MapSheet · RaioCirculo
- Vitrine: PostCard · PostHeader · AntesDepois · ReacoesBar · ComentarioItem · QueroServicoCTA
- Pagamento: ResumoPedido · EscrowAviso · AvaliacaoCard

**Padrões (blocos de tela):** FiltroBar · ListaComBusca · FeedInfinito · ExplorarMapa (mapa, folha e filtros) · FluxoChamado (em etapas) · CheckoutProtegido · Onboarding em etapas

**Telas:** montadas só com padrões e componentes. Nenhuma tela define estilo próprio.

### Organização do código (proposta)

```
apps/
  mobile/        Expo (Expo Router)
  web/           Next.js: link do inquilino, busca pública e painel web
packages/
  tokens/        gerado de brand/tokens (CSS e TS)
  ui/            primitivos e componentes de domínio, em React Native e na web via react-native-web
  domain/        tipos, estados do chamado, regras (preço, escrow, permissões)
  api/           cliente do backend (Supabase)
```

## 6. Onde entra cada referência

| Referência | Módulos |
| --- | --- |
| Rede social (Event Discovery, 27722125) | Vitrine: feed, post, perfil com portfólio, interações |
| Mapa + social (Event Discovery, 27696700) | Explorar: mapa com prestadores e posts, folha inferior, filtros |
| Visual clean (Property Finder, 27445110) | Base de todo o app, em especial Imóveis, o card e o perfil do prestador |

> Pendente: o dribbble.com está bloqueado neste ambiente e ainda não vi as imagens. As decisões visuais de cada módulo entram quando as referências chegarem.

## 7. Ordem de construção (segue o roadmap do PRD)

1. **Fase 1:** tokens, primitivos, Conta, Imóveis, Contratos, Chamados (com o link do inquilino e a triagem por IA), lista curada de prestadores, painel
2. **Fase 2:** catálogo e preços, Explorar (mapa), Vitrine, contratação, pagamento protegido, avaliações, selo
3. **Fase 3:** cobrança, repasse, reajuste, vistoria
4. **Fase 4:** carteira e agenda do prestador, destaque pago, seguir prestador
