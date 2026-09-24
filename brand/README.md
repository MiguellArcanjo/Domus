# Domu — identidade da marca

Nome escolhido: **Domu** (do latim *domus*, casa), com o conceito de logo **Arco** e a paleta **Jade + Trena**. O nome substitui o provisório "Zelo" do PRD.

Design system publicado: https://claude.ai/artifact/XsY4QrX5VgpoGkrG7swkmP

## Arquivos

| Pasta | O que tem |
| --- | --- |
| `logo/` | Logo em SVG, com o nome em curvas: horizontal e vertical, nas versões principal, negativo, escuro, 1 cor preto e 1 cor branco, além do símbolo sozinho |
| `icone/` | Ícone do app web: favicon (SVG, 32 e 48), PWA (192 e 512 arredondados, 512 sangrado para ícone "maskable") e ícone da tela inicial do iPhone (180) |
| `tokens/` | `tokens.css` (variáveis CSS, com tema claro e escuro) e `tokens.json` (os mesmos valores, mais os estados do chamado) |
| `componentes/` | `bundle.js` (`window.Domu`, React 18), `bundle.css` (classes `dm-*`) e `index.d.ts` |
| `scripts/` | `gerar-logo.py` gera os SVGs a partir da fonte Geist; `gerar-tokens-json.py` gera o JSON a partir do CSS |

Para usar os componentes, carregue a fonte Geist (pacote `geist`), depois `tokens/tokens.css`, `componentes/bundle.css`, React 18 e `componentes/bundle.js`. Os nomes das variáveis são os mesmos do design system publicado (`--bg`, `--brand`, `--ink`…).

Domu junta a gestão de aluguel com um marketplace de manutenção residencial. Serve quatro pessoas: o corretor ou pequeno proprietário, que paga a assinatura; o inquilino, que abre chamados pelo link do contrato, sem baixar o app; o prestador (eletricista, encanador, pintor, diarista); e o cliente avulso, que procura um serviço. O nome vem do latim *domus*, casa. A assinatura é **Aluguel em dia. Casa em ordem.**

## Voz e texto

- Escreva em português do Brasil, com frases curtas e na voz ativa. Trate a pessoa por "você", nunca por "o usuário".
- Use caixa de frase em tudo: títulos, botões e abas. Escreva "Abrir chamado", não "Abrir Chamado".
- Nos botões, comece pelo verbo e diga o que acontece: "Abrir chamado", "Aprovar prestador", "Pagar pelo app", "Quero um serviço assim".
- Use os nomes que a pessoa conhece: *chamado*, *imóvel*, *contrato*, *repasse*, *prestador*. Evite *ticket*, *lead*, *unidade* e *vendor*.
- Os estados do chamado têm nomes fixos e aparecem sempre iguais: Aberto, Triado, Prestador atribuído, Agendado, Concluído, Pago, Avaliado, Cancelado, Em disputa.
- Mostre preço e prazo antes de pedir uma decisão, como em "A partir de R$ 120 · pode ir hoje". Valores sempre em `R$ 1.234,56`, com separadores brasileiros.
- Uma mensagem de erro diz o que aconteceu e como resolver: "A foto passou de 10 MB. Escolha outra ou tire uma nova."
- Sem emoji na interface, sem ponto de exclamação e sem superlativos. O inquilino costuma escrever à noite, quando algo quebrou, então use um tom calmo e direto: "Recebemos seu chamado. O corretor já foi avisado."

## Logo

O símbolo é o **Arco**: o "u" de domu virado para baixo, que vira uma porta de entrada. O ponto trena no vão é o chamado, a luz acesa na casa.

- Use `domu-logo.svg` (símbolo jade com ponto trena e nome em `tinta`) sobre `cal`, `surface` ou branco.
- Sobre jade ou sobre uma foto escura, use `domu-logo-negativo.svg`, com arco `cal`, ponto trena e nome branco.
- Em fax, carimbo, bordado ou impressão em uma cor, use `domu-logo-1cor-preto.svg` ou `domu-logo-1cor-branco.svg`.
- A versão vertical (`domu-logo-vertical*.svg`) é para splash, capa e peças quadradas. A horizontal é para cabeçalhos.
- O símbolo sozinho (`domu-simbolo*.svg`) aparece só quando o nome Domu já está visível por perto, ou como ícone.
- **Área de proteção.** Mantenha em volta do logo um espaço igual à altura do "o" do nome. No símbolo sozinho, use metade da largura do arco.
- **Tamanho mínimo.** A assinatura horizontal tem no mínimo 80 px de largura (20 mm impresso). O símbolo tem no mínimo 16 px, e o ícone do app no mínimo 24 px.
- Não mude as cores do arco nem do ponto, não gire o arco, não deforme, não contorne e não coloque sombra. Não escreva nada dentro do vão. O ponto nunca vira outra forma.

## Cor

A paleta é **Jade + Trena**. O jade é a marca; o trena é o ponto de atenção.

- A página usa `bg`. Cards, folhas e o cabeçalho usam `surface`. Áreas recuadas, como filtros e o campo de busca, usam `surface-muted`.
- O texto usa `ink`. Metadados, legendas e placeholders usam `ink-muted`. As duas cores funcionam sobre `bg`, `surface` e `surface-muted` nos dois temas.
- A ação principal usa `brand` com o texto em `on-brand`, no máximo uma vez por tela. Não escreva branco puro sobre `brand`, porque no tema escuro o `brand` clareia e o texto passa a ser escuro.
- `brand-soft` com o texto em `on-brand-soft` serve para avatares, chips selecionados e o selo verificado.
- `accent` (trena) é para marcar, nunca para texto: o ponto do logo, a etiqueta "Novo" (com o texto em `on-accent`), a barra de progresso dos aluguéis recebidos e o ponto de notificação. Use no máximo um elemento trena por card.
- Os status usam pares de fundo e texto: `info` e `info-bg` para chamado aberto ou triado, `success` e `success-bg` para concluído, pago ou avaliado, `warning` e `warning-bg` para vencimento próximo ou reajuste, `danger` e `danger-bg` para urgente, inadimplente ou em disputa, e `neutral` e `neutral-bg` para os demais. Todo status traz uma palavra, e o urgente traz também um ícone. Nunca dependa só da cor.
- `jade`, `jade-deep`, `trena`, `tinta` e `cal` são as cores fixas da marca, iguais nos dois temas. Use-as em peças de marca, como splash, ícone e o fundo da capa, e não em componentes.
- Todo texto tem contraste de pelo menos 4,5:1 sobre o fundo previsto, nos dois temas.

## Tipografia

Tudo é em **Geist**. Números de contrato, códigos de chamado e rótulos pequenos em caixa alta usam **Geist Mono**.

- Títulos: `display` (40 px, só em splash e páginas públicas), `h1` (28 px, o título da tela), `h2` (22 px, seções) e `h3` (17 px, título de card). Títulos usam espaçamento de −0,02em.
- Texto: `body` (15 px) para leitura, `body-strong` para nomes e valores dentro do texto, e `small` (13 px) para metadados.
- Dados: `amount` (26 px, 700, com algarismos tabulares) para valores de KPI; `label` (Geist Mono 12 px, caixa alta, +0,05em) para rótulos de seção e códigos como `#8F3K2`.
- Use sempre `font-variant-numeric: tabular-nums` em colunas de valores e datas.

## Espaço, forma e profundidade

- O grid tem base de 4 px. O card tem padding `space-4`, a distância entre cards é `space-3` e a margem lateral da tela é `space-4`.
- `radius-sm` (6 px) é para etiquetas e campos pequenos, `radius-md` (10 px) para botões, campos e chips, `radius-lg` (14 px) para cards e folhas, e `radius-pill` para avatares e o chip de categoria.
- Separe os cards com a borda `line`. A `shadow-1` fica só no card que se destaca do fundo, e a `shadow-2` só em folhas e menus flutuantes. Nada de gradientes.
- Todo alvo de toque tem no mínimo `tap-min` (44 px), porque o link do inquilino abre em qualquer celular.
- O foco do teclado aparece como um anel sólido de 2 px em `focus`, com 2 px de afastamento. O anel tem contraste de pelo menos 3:1 sobre os fundos.

## Iconografia

- Os ícones são do **Lucide**, com traço 2, pontas e junções arredondadas e grid de 24 px, como o traço do Arco. O tamanho padrão é 20 px, com 16 px em etiquetas e 24 px em navegação.
- Os ícones seguem a cor do texto ao lado (`ink`, `ink-muted` ou `brand`). Em etiquetas de status, usam a cor do texto do status.
- Cada categoria tem um ícone fixo: hidráulica usa `droplet`, elétrica usa `zap`, pintura usa `paint-roller`, limpeza usa `sparkles` e reparos gerais usa `wrench`. Urgente usa `triangle-alert`, verificado usa `badge-check`, nota usa `star` e região usa `map-pin`.
- Sem emoji. As fotos são do serviço real, feitas pelo prestador ou pelo cliente. Nunca use banco de imagens.

## Selo verificado

O selo **Serviço verificado** aparece só em posts e avaliações ligados a um serviço pago pelo app. O selo **Prestador verificado** aparece só depois da checagem de documento e antecedentes. Os dois usam `brand-soft` com o texto e o ícone em `on-brand-soft`. Não crie outras variantes: um selo que aparece em tudo perde o valor.

## Componentes

Os componentes estão em `components/bundle.js`, como `window.Domu`, e precisam do React 18 na página. As classes começam com `dm-`.

- `Button`: `primary` para a ação da tela, `secondary` para as demais, `ghost` em barras e listas e `danger` para cancelar ou contestar.
- `Badge` e `StatusBadge`: status em uma ou duas palavras. O `StatusBadge` recebe o estado do chamado e escolhe a cor.
- `Selo`: os dois selos verificados.
- `CategoriaChip`: filtro e marcação de categoria de serviço.
- `KpiCard`: o número principal do painel do corretor.
- `ChamadoCard`: um chamado na lista do corretor.
- `StatusSteps`: o andamento do chamado, como o inquilino vê pelo link.
- `PrestadorCard`: o card do marketplace, com foto, nota, preços, raio, disponibilidade e selo.
- `Logo`: o logo em SVG, para usar dentro do app.
