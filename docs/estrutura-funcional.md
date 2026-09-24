# Domu: estrutura funcional

Este documento lista o que o sistema faz, onde cada função aparece e quais componentes vamos construir, antes de escrever código. Os IDs (G-01, M-07, V-02…) são os mesmos do PRD.

## 1. Superfícies

O Domu é **web**: um **site** e um **app web**, os dois no mesmo projeto Next.js. Não há app nativo nas lojas. O app web funciona no navegador do celular e do computador e pode ser instalado na tela inicial como PWA, com ícone, tela cheia e notificações push.

| Superfície | Rotas | Quem usa | Para quê |
| --- | --- | --- | --- |
| **Site** (público, com SEO) | `/`, `/prestadores`, `/servicos/[categoria]/[cidade]`, `/p/[prestador]`, `/post/[id]`, `/para-corretores`, `/para-prestadores` | Visitante, cliente avulso, Google | Página inicial, busca pública, perfis e posts com prévia no WhatsApp (V-08), páginas de venda para corretor e prestador |
| **App web** (logado) | `/app/...` | Corretor ou proprietário, prestador, cliente avulso | O produto inteiro. O perfil ativo decide a navegação. |
| **Link do inquilino** (sem login) | `/c/[token]` | Inquilino | Abrir e acompanhar chamados (G-04) pelo link do WhatsApp |

**Responsivo, pensado primeiro para o celular.** O mesmo app web muda de forma pela largura da tela:

| Largura | Navegação | Explorar | Telas de gestão |
| --- | --- | --- | --- |
| Celular (< 768 px) | Barra de abas flutuante embaixo | Lista **ou** mapa, trocados por um botão | Cards empilhados |
| Tablet (768–1199 px) | Barra lateral só com ícones | Lista e mapa lado a lado | Cards em 2 colunas |
| Computador (≥ 1200 px) | Barra lateral com os nomes | Lista à esquerda e mapa à direita, sincronizados | Tabelas (imóveis, chamados, extrato) e detalhe ao lado |

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
- WhatsApp como canal principal, com push web (PWA instalado) e e-mail como apoio
- Central de notificações no app, agrupada por chamado

### 2.12 Operação (interno)
- Curadoria de prestadores, fila de moderação, disputas, catálogo de serviços

## 3. Navegação por perfil

| Perfil | Abas |
| --- | --- |
| Corretor ou proprietário | **Início** (painel) · **Imóveis** · **Chamados** · **Explorar** · **Perfil** |
| Prestador | **Pedidos** · **Agenda** · **Postar** · **Carteira** · **Perfil** |
| Cliente avulso | **Explorar** · **Pedidos** · **Postar** (avaliação com foto) · **Salvos** · **Perfil** |
| Inquilino (web, sem abas) | Meu imóvel → Abrir chamado → Acompanhar chamado (→ Pagar aluguel, na fase 3) |

**Explorar junta a Vitrine e o Mapa numa tela só**, como nas referências de eventos. O conteúdo é o mesmo (serviços e posts da região) em duas visões: a **lista**, que é a vitrine, e o **mapa**. Um botão no canto superior direito troca de uma para a outra, e os filtros, a busca e a cidade valem para as duas.

A barra de abas é **flutuante**, em forma de pílula, e a aba ativa fica dentro de um círculo trena, como na referência do Property Finder. É a "luz acesa" do logo.

## 4. Mapa de telas

**Corretor:** Painel · Lista de imóveis · Detalhe do imóvel · Novo imóvel · Novo contrato · Detalhe do contrato · Caixa de chamados · Detalhe do chamado · Escolher prestador · Explorar (lista ↔ mapa) · Busca · Resultados · Detalhe do serviço ou post · Perfil do prestador · Pagamento · Avaliar · Notificações · Perfil

**Prestador:** Onboarding (dados, categorias, raio, preços) · Pedidos · Detalhe do pedido · Agenda · Concluir serviço (fotos) · Novo post · Meu perfil público · Carteira · Notificações

**Cliente avulso:** Onboarding · Explorar (lista ↔ mapa) · Busca · Resultados · Detalhe do serviço ou post · Perfil do prestador · Pedido · Pagamento · Acompanhar · Avaliar · Salvos

**Inquilino (web):** Início do link · Abrir chamado (foto e texto) · Chamado aberto · Andamento

## 5. Componentes

A ordem vai do mais genérico ao mais específico. Uma camada só usa as camadas de baixo.

**Tokens:** cores, tipografia, espaço, raio, sombra, nos temas claro e escuro. Já estão em `brand/tokens/tokens.css` e viram variáveis CSS do app.

**Primitivos:** Text · Icon · Button · IconButton · Badge · Avatar · AvatarStack · Input · SearchField · TextArea · Select · Chip · Switch · Checkbox · Card · Divider · ListItem · Sheet (folha inferior no celular, painel lateral no computador) · Modal · Header · TabBar (celular) · Sidebar (tablet e computador) · SegmentedControl · Toast · Skeleton · EmptyState · ProgressBar · Rating (estrelas) · PhotoGrid · ImageCarousel

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

**Vindos das referências (seção 6):** FloatingTabBar (celular) · Sidebar (tablet e computador) · HeroTitle · FilterButton · SegmentedPills · UnderlineTabs · CityHeader · ViewToggle · DropdownChip · ToggleChip · PriceTag · MetaRow · ArrowCircle · PagerDots · Carousel · TrustBadge · RatingPill · NomeVerificado · DepoimentoCard · ActivityChart · SocialProof · HeroMedia · StickyCTA · SearchOverlay · ResultRow · PricePin · PostPin · UserDot · MapControls · MapPreviewCard

**Padrões (blocos de tela):** FiltroBar · ListaComBusca · FeedInfinito · Explorar (CityHeader, FilterBar e UnderlineTabs sobre a lista ou o mapa) · FluxoChamado (em etapas) · CheckoutProtegido · Onboarding em etapas

**Telas:** montadas só com padrões e componentes. Nenhuma tela define estilo próprio.

### Organização do código (proposta)

```
src/
  app/
    (site)/        site público: página inicial, busca, perfis, posts (renderizados no servidor, com SEO)
    app/           app web logado, por perfil: corretor, prestador, cliente
    c/[token]/     link do inquilino
    api/           rotas de servidor (webhooks de pagamento e WhatsApp, triagem por IA)
  components/
    ui/            primitivos
    domain/        componentes de domínio
    patterns/      blocos de tela
  lib/             tokens, regras de domínio (estados do chamado, preço, escrow, permissões) e cliente do Supabase
public/            ícones, manifest.webmanifest (PWA)
```

## 6. Direção visual, a partir das referências

As referências são de apps de celular. No Domu elas valem para a versão de celular do app web, e cada padrão ganha uma forma para a tela larga (seção 1). As referências entram como padrões de tela, não como cópia. As cores são sempre as do Domu (jade, trena, tinta, cal), e o azul, o verde e o roxo das referências viram tokens do Domu.

### 6.1 Base de todo o app: Property Finder

| Na referência | No Domu |
| --- | --- |
| Fundo cinza-claro, cards brancos com cantos grandes, muito respiro | `bg` (cal), cards em `surface` com `radius-lg`, borda `line` e sem sombra pesada |
| Barra de abas flutuante em pílula, com a aba ativa num círculo amarelo | **FloatingTabBar**: pílula `surface` e a aba ativa num círculo `accent` (trena) com ícone `on-accent` |
| Título grande em negrito ("Discover your new house") | **HeroTitle**: Geist 700 de 28 a 32 px, em caixa de frase ("Encontre quem resolve"). Não usamos caixa alta, pela regra da voz. |
| Busca com o botão de filtro amarelo colado | **SearchField** com **FilterButton** trena à direita |
| Pílulas Recommended / Nearby / Upcoming | **SegmentedPills**: "Para você · Perto de mim · Hoje" |
| Carrossel de cards com foto, nota, nome, local e um círculo amarelo com seta | **ServicoCard** em carrossel, com **ArrowCircle** trena e **PagerDots** |
| Onboarding com selo "Trusted Clients" (avatares), título forte e botão preto com um círculo amarelo | **Onboarding**: **TrustBadge** ("+50 prestadores verificados em {cidade}"), ilustração e botão `tinta` com **ArrowCircle** |
| Perfil com nota em pílula, nome com check, depoimento e gráfico de atividade | **PerfilPrestador**: **RatingPill** ("4,9 · 38 avaliações"), **NomeVerificado**, **DepoimentoCard** ("Contratado por 38 clientes pelo app") e **ActivityChart** (serviços e ganhos na carteira; recebimentos no painel do corretor) |

### 6.2 Vitrine (lista do Explorar): Event Discovery, a lista

| Na referência | No Domu |
| --- | --- |
| Cabeçalho "Events in Riga ▾" e o botão de mapa à direita | **CityHeader** ("Serviços em {cidade} ▾") + **ViewToggle** (lista ↔ mapa) |
| Linha de filtros: lupa, "Type ▾", "Free", "Mood ▾" | **FilterBar**: lupa · **DropdownChip** "Categoria ▾" · **ToggleChip** "Verificados" · **DropdownChip** "Preço ▾" · "Nota ▾" |
| Abas sublinhadas All / Today / Tomorrow / Weekend | **UnderlineTabs**: "Todos · Hoje · Amanhã · Esta semana" (disponibilidade do prestador) |
| Card com foto grande, selo sobre a foto ("Exclusive", "Free"), título, preço à direita, linhas de local com distância e de data | **PostCard**: foto ou antes e depois, **Selo** "Serviço verificado" ou etiqueta "Destaque" (trena) sobre a foto, título do serviço, **PriceTag** "R$ 120" e as **MetaRow** "João Batista · Vila Mariana, 1,2 km" e "Feito em 12 set" |
| Busca aberta: recentes, "Popular" em chips e "Cancel" | **SearchOverlay**: recentes + "Mais pedidos" ("Troca de chuveiro", "Desentupimento", "Pintura de quarto", "Instalação de tomada") |
| Resultados em linhas com miniatura e etiqueta de preço, e "Other events you might like" | **ResultRow** + a seção "Outros serviços perto de você" |
| Detalhe: foto no topo, coração e compartilhar, avatares "12 attending. Only 3 seats remain!", descrição, botão largo "Join Event" | **DetalhePost**: **HeroMedia** (galeria ou antes e depois), **SocialProof** ("12 vizinhos já contrataram · 2 horários livres hoje"), preço, descrição, **StickyCTA** "Quero um serviço assim" |
| Abas Events / Food / Favourites / Add Event / Profile | As abas da seção 3. "Add Event" vira **Postar**, e "Favourites" vira **Salvos**. |

### 6.3 Mapa (visão mapa do Explorar): Event Discovery, o mapa

| Na referência | No Domu |
| --- | --- |
| Mapa claro com pinos em pílula e preço ("10€", "Free", "38€") e um ícone de categoria | **PricePin**: ícone da categoria + "R$ 80". **PostPin**: ícone de câmera, para os posts da vitrine no mapa. **MapCluster** quando os pinos se juntam. |
| Ponto azul de "você está aqui" | **UserDot** em `brand` e **RaioCirculo** opcional (o raio de atendimento, na visão do prestador) |
| Botões de camadas e bússola à direita | **MapControls** (centralizar, camadas) |
| Card do item escolhido na base, com foto, título, linhas de meta, coração e "Learn more" + "Join" | **MapPreviewCard**: foto, nome, ofício, disponibilidade, "a partir de R$ 80", coração, "Ver perfil" (secundário) + "Pedir orçamento" (primário). Num PostPin, o card mostra o post e "Quero um serviço assim". |
| Mesma barra de filtros da lista | **FilterBar** compartilhada: o mesmo estado vale para lista e mapa |

**Conexão entre o mapa e a rede social:** os posts aparecem no mapa pelo bairro (nunca pelo endereço exato, pela LGPD). Tocar num post abre o card do post, e dele se vai ao perfil do prestador e ao pedido.

## 7. Ordem de construção (segue o roadmap do PRD)

1. **Fase 1:** projeto Next.js com PWA, tokens, primitivos, layout responsivo (abas e barra lateral), Conta, Imóveis, Contratos, Chamados (com o link do inquilino e a triagem por IA), lista curada de prestadores, painel
2. **Fase 2:** catálogo e preços, Explorar (mapa), Vitrine, contratação, pagamento protegido, avaliações, selo
3. **Fase 3:** cobrança, repasse, reajuste, vistoria
4. **Fase 4:** carteira e agenda do prestador, destaque pago, seguir prestador
