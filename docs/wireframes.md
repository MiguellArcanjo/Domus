# Domu: wireframes e navegação

> **Atualização:** as telas de operação destes wireframes agora estão no **app mobile** (repositório `domu-mobile`). No site ficaram conta, assinatura, destaque e relatórios. Veja `docs/web-vs-app.md`.
>
> Os wireframes vieram antes de duas decisões: o login passou a ser por e-mail e senha (com criar conta e recuperar senha) e o WhatsApp saiu do produto. O front em `src/` já segue as decisões novas.

Protótipo clicável: https://claude.ai/artifact/5sxFsJay9Af5hzSo76o3xy

O canvas tem o site de marketing (1440 px e celular), o app web no celular (390 px) e as telas principais no computador (1440 px). As regras de cada largura estão em `docs/estrutura-funcional.md`, seção 1.

Cada tela, o que ela tem e para onde cada botão leva. "Fica na tela" é um controle que age ali mesmo (filtro, aba, curtir). O código das telas vem de `docs/estrutura-funcional.md`.

## Site

### Site · página inicial (`S_Home`)

| Botão | Leva para |
| --- | --- |
| Sou corretor ou proprietário | Site · para corretores |
| Preciso de um serviço | Site · busca pública (SEO) |
| Sou prestador de serviço | Site · para prestadores |
| Site: Corretor e proprietário | Site · para corretores |
| Site: Inquilino | Site · página inicial |
| Site: Prestador | Site · para prestadores |
| Explorar a vitrine | Site · busca pública (SEO) |
| Abrir post da vitrine | Detalhe do post |
| Buscar um serviço | Site · busca pública (SEO) |
| Pino: R$ 80 | fica na tela |
| Pino: R$ 90 | fica na tela |
| Pino: R$ 680 | fica na tela |
| Pino: R$ 280 | fica na tela |
| Pino de post da vitrine | fica na tela |
| Preços: Começar grátis | Entrar |
| Preços: Quero receber pedidos | Site · para prestadores |
| Preços: Buscar um serviço | Site · busca pública (SEO) |
| Começar grátis | Entrar |
| Site: Encontrar prestador | Site · busca pública (SEO) |
| Site: Para corretores | Site · para corretores |
| Site: Para prestadores | Site · para prestadores |
| Site: Como funciona | Site · página inicial |
| Site: página inicial | Site · página inicial |
| Site: Entrar | Entrar |
| Site: Começar grátis | Entrar |
| Rodapé: Para corretores | Site · para corretores |
| Rodapé: Para prestadores | Site · para prestadores |
| Rodapé: Encontrar prestador | Site · busca pública (SEO) |
| Rodapé: Preços | Site · para corretores |
| Rodapé: Encanador | Site · busca pública (SEO) |
| Rodapé: Eletricista | Site · busca pública (SEO) |
| Rodapé: Pintor | Site · busca pública (SEO) |
| Rodapé: Diarista | Site · busca pública (SEO) |
| Rodapé: Como funciona | Site · página inicial |
| Rodapé: Pagamento protegido | Site · página inicial |
| Rodapé: Privacidade (LGPD) | Site · página inicial |
| Rodapé: Ajuda | Site · página inicial |

### Site · para corretores (`S_Corretores`)

| Botão | Leva para |
| --- | --- |
| Começar grátis | Entrar |
| Ver o painel | Painel do corretor · computador |
| Plano: Começo | Entrar |
| Plano: Por imóvel | Entrar |
| Plano: Carteira | Entrar |
| Site: Encontrar prestador | Site · busca pública (SEO) |
| Site: Para corretores | Site · para corretores |
| Site: Para prestadores | Site · para prestadores |
| Site: Como funciona | Site · página inicial |
| Site: página inicial | Site · página inicial |
| Site: Entrar | Entrar |
| Site: Começar grátis | Entrar |
| Rodapé: Para corretores | Site · para corretores |
| Rodapé: Para prestadores | Site · para prestadores |
| Rodapé: Encontrar prestador | Site · busca pública (SEO) |
| Rodapé: Preços | Site · para corretores |
| Rodapé: Encanador | Site · busca pública (SEO) |
| Rodapé: Eletricista | Site · busca pública (SEO) |
| Rodapé: Pintor | Site · busca pública (SEO) |
| Rodapé: Diarista | Site · busca pública (SEO) |
| Rodapé: Como funciona | Site · página inicial |
| Rodapé: Pagamento protegido | Site · página inicial |
| Rodapé: Privacidade (LGPD) | Site · página inicial |
| Rodapé: Ajuda | Site · página inicial |

### Site · para prestadores (`S_Prestadores`)

| Botão | Leva para |
| --- | --- |
| Quero receber pedidos | Entrar |
| Quero o destaque | Entrar |
| Site: Encontrar prestador | Site · busca pública (SEO) |
| Site: Para corretores | Site · para corretores |
| Site: Para prestadores | Site · para prestadores |
| Site: Como funciona | Site · página inicial |
| Site: página inicial | Site · página inicial |
| Site: Entrar | Entrar |
| Site: Começar grátis | Entrar |
| Rodapé: Para corretores | Site · para corretores |
| Rodapé: Para prestadores | Site · para prestadores |
| Rodapé: Encontrar prestador | Site · busca pública (SEO) |
| Rodapé: Preços | Site · para corretores |
| Rodapé: Encanador | Site · busca pública (SEO) |
| Rodapé: Eletricista | Site · busca pública (SEO) |
| Rodapé: Pintor | Site · busca pública (SEO) |
| Rodapé: Diarista | Site · busca pública (SEO) |
| Rodapé: Como funciona | Site · página inicial |
| Rodapé: Pagamento protegido | Site · página inicial |
| Rodapé: Privacidade (LGPD) | Site · página inicial |
| Rodapé: Ajuda | Site · página inicial |

### Site · busca pública (SEO) (`S_Busca`)

| Botão | Leva para |
| --- | --- |
| Filtro: Hoje | fica na tela |
| Filtro: Verificados | fica na tela |
| Filtro: Preço | fica na tela |
| Filtro: Nota 4,5+ | fica na tela |
| Filtro: Bairro | fica na tela |
| Ver perfil de João Batista | Site · perfil público do prestador |
| Pedir orçamento a João Batista | Entrar |
| Ver perfil de Carlos Souza | Site · perfil público do prestador |
| Pedir orçamento a Carlos Souza | Entrar |
| Pino: R$ 80 | fica na tela |
| Pino: R$ 90 | fica na tela |
| Pino: R$ 120 | fica na tela |
| Pino: R$ 95 | fica na tela |
| Pino de post da vitrine | fica na tela |
| Site: Encontrar prestador | Site · busca pública (SEO) |
| Site: Para corretores | Site · para corretores |
| Site: Para prestadores | Site · para prestadores |
| Site: Como funciona | Site · página inicial |
| Site: página inicial | Site · página inicial |
| Site: Entrar | Entrar |
| Site: Começar grátis | Entrar |
| Busca: Eletricista | Site · busca pública (SEO) |
| Busca: Pintor | Site · busca pública (SEO) |
| Busca: Diarista | Site · busca pública (SEO) |
| Busca: Desentupidora | Site · busca pública (SEO) |
| Busca: Instalação de chuveiro | Site · busca pública (SEO) |
| Busca: Reparos gerais | Site · busca pública (SEO) |
| Rodapé: Para corretores | Site · para corretores |
| Rodapé: Para prestadores | Site · para prestadores |
| Rodapé: Encontrar prestador | Site · busca pública (SEO) |
| Rodapé: Preços | Site · para corretores |
| Rodapé: Encanador | Site · busca pública (SEO) |
| Rodapé: Eletricista | Site · busca pública (SEO) |
| Rodapé: Pintor | Site · busca pública (SEO) |
| Rodapé: Diarista | Site · busca pública (SEO) |
| Rodapé: Como funciona | Site · página inicial |
| Rodapé: Pagamento protegido | Site · página inicial |
| Rodapé: Privacidade (LGPD) | Site · página inicial |
| Rodapé: Ajuda | Site · página inicial |

### Site · perfil público do prestador (`S_Perfil`)

| Botão | Leva para |
| --- | --- |
| Aba: Portfólio | fica na tela |
| Aba: Avaliações | fica na tela |
| Aba: Sobre | fica na tela |
| Abrir post do portfólio | Detalhe do post |
| Pedir orçamento | Entrar |
| Compartilhar perfil | fica na tela |
| Site: Encontrar prestador | Site · busca pública (SEO) |
| Site: Para corretores | Site · para corretores |
| Site: Para prestadores | Site · para prestadores |
| Site: Como funciona | Site · página inicial |
| Site: página inicial | Site · página inicial |
| Site: Entrar | Entrar |
| Site: Começar grátis | Entrar |
| Rodapé: Para corretores | Site · para corretores |
| Rodapé: Para prestadores | Site · para prestadores |
| Rodapé: Encontrar prestador | Site · busca pública (SEO) |
| Rodapé: Preços | Site · para corretores |
| Rodapé: Encanador | Site · busca pública (SEO) |
| Rodapé: Eletricista | Site · busca pública (SEO) |
| Rodapé: Pintor | Site · busca pública (SEO) |
| Rodapé: Diarista | Site · busca pública (SEO) |
| Rodapé: Como funciona | Site · página inicial |
| Rodapé: Pagamento protegido | Site · página inicial |
| Rodapé: Privacidade (LGPD) | Site · página inicial |
| Rodapé: Ajuda | Site · página inicial |

### Site · página inicial no celular (`S_HomeCelular`)

| Botão | Leva para |
| --- | --- |
| Site: página inicial | Site · página inicial no celular |
| Site: Entrar | Entrar |
| Abrir menu | fica na tela |
| Sou corretor ou proprietário | Site · para corretores |
| Preciso de um serviço | Site · busca pública (SEO) |
| Site: Corretor e proprietário | Site · para corretores |
| Site: Inquilino | Site · página inicial no celular |
| Site: Prestador | Site · para prestadores |
| Explorar a vitrine | Site · busca pública (SEO) |
| Começar grátis | Entrar |
| Rodapé: Corretores | Site · para corretores |
| Rodapé: Prestadores | Site · para prestadores |
| Rodapé: Buscar | Site · busca pública (SEO) |

## Entrada

### Boas-vindas (`Main`)

| Botão | Leva para |
| --- | --- |
| Começar | Entrar |
| Já tenho conta | Entrar |

### Entrar (`Entrar`)

| Botão | Leva para |
| --- | --- |
| Voltar | Boas-vindas |
| Reenviar código | fica na tela |
| Continuar | Escolher perfil |

### Escolher perfil (`EscolherPerfil`)

| Botão | Leva para |
| --- | --- |
| Voltar | Entrar |
| Sou corretor ou proprietário | Painel do corretor |
| Sou prestador de serviço | Pedidos do prestador |
| Sou cliente | Explorar · lista (vitrine) |

## Explorar

### Explorar · lista (vitrine) (`Explorar`)

| Botão | Leva para |
| --- | --- |
| Ver no mapa | Explorar · mapa |
| Trocar cidade | fica na tela |
| Busca | Busca |
| Filtro: Categoria | fica na tela |
| Filtro: Verificados | fica na tela |
| Filtro: Preço | fica na tela |
| Filtro: Nota | fica na tela |
| Aba: Todos | fica na tela |
| Aba: Hoje | fica na tela |
| Aba: Amanhã | fica na tela |
| Aba: Esta semana | fica na tela |
| Salvar post | fica na tela |
| Abrir post: Troca de sifão e vedação | Detalhe do post |
| Abrir post: Pintura de quarto 12 m² | Detalhe do post |
| Aba Explorar | Explorar · lista (vitrine) |
| Aba Pedidos | Meus pedidos |
| Aba Postar | Avaliar e postar |
| Aba Salvos | Salvos |
| Aba Perfil | Perfil e conta |

### Explorar · mapa (`ExplorarMapa`)

| Botão | Leva para |
| --- | --- |
| Ver em lista | Explorar · lista (vitrine) |
| Trocar cidade | fica na tela |
| Busca | Busca |
| Filtro: Categoria | fica na tela |
| Filtro: Verificados | fica na tela |
| Filtro: Preço | fica na tela |
| Filtro: Nota | fica na tela |
| Pino: R$ 80 | fica na tela |
| Pino: R$ 90 | fica na tela |
| Pino: R$ 120 | fica na tela |
| Pino: R$ 680 | fica na tela |
| Pino: R$ 150 | fica na tela |
| Pino de post da vitrine | fica na tela |
| Camadas do mapa | fica na tela |
| Centralizar em mim | fica na tela |
| Salvar prestador | fica na tela |
| Ver perfil | Perfil do prestador |
| Pedir orçamento | Pedido de serviço |
| Aba Explorar | Explorar · lista (vitrine) |
| Aba Pedidos | Meus pedidos |
| Aba Postar | Avaliar e postar |
| Aba Salvos | Salvos |
| Aba Perfil | Perfil e conta |

### Busca (`Busca`)

| Botão | Leva para |
| --- | --- |
| Cancelar | Explorar · lista (vitrine) |
| Busca: Chuveiro | Resultados da busca |
| Busca: Pintor | Resultados da busca |
| Busca: Troca de chuveiro | Resultados da busca |
| Busca: Desentupimento | Resultados da busca |
| Busca: Pintura de quarto | Resultados da busca |
| Busca: Instalação de tomada | Resultados da busca |
| Busca: Faxina pós-mudança | Resultados da busca |
| Busca: Vazamento | Resultados da busca |
| Sugestão: Desentupimento de pia | Resultados da busca |
| Sugestão: Desentupimento de vaso | Resultados da busca |
| Sugestão: Desentupidora 24 h | Resultados da busca |

### Resultados da busca (`Resultados`)

| Botão | Leva para |
| --- | --- |
| Voltar | Busca |
| Busca | Busca |
| Remover filtro Hidráulica | fica na tela |
| Filtro: Hoje | fica na tela |
| Filtro: Preço | fica na tela |
| Filtro: Nota | fica na tela |
| Resultado: Desentupimento de pia | Perfil do prestador |
| Resultado: Desentupimento geral | Perfil do prestador |
| Resultado: Troca de sifão | Perfil do prestador |
| Aba Explorar | Explorar · lista (vitrine) |
| Aba Pedidos | Meus pedidos |
| Aba Postar | Avaliar e postar |
| Aba Salvos | Salvos |
| Aba Perfil | Perfil e conta |

### Detalhe do post (`Post`)

| Botão | Leva para |
| --- | --- |
| Voltar | Explorar · lista (vitrine) |
| Salvar | fica na tela |
| Compartilhar | fica na tela |
| Abrir perfil do prestador | Perfil do prestador |
| Ver 3 comentários | fica na tela |
| Quero um serviço assim | Pedido de serviço |

### Perfil do prestador (`PerfilPrestador`)

| Botão | Leva para |
| --- | --- |
| Compartilhar perfil | fica na tela |
| Voltar | Explorar · lista (vitrine) |
| Aba: Preços | fica na tela |
| Aba: Portfólio | fica na tela |
| Aba: Avaliações | fica na tela |
| Abrir post do portfólio | Detalhe do post |
| Conversar | fica na tela |
| Pedir orçamento | Pedido de serviço |

### Pedido de serviço (`Pedido`)

| Botão | Leva para |
| --- | --- |
| Voltar | Perfil do prestador |
| Escolher item: Visita técnica | fica na tela |
| Escolher item: Troca de sifão | fica na tela |
| Escolher item: Desentupimento de pia | fica na tela |
| Adicionar foto | fica na tela |
| Filtro: Hoje | fica na tela |
| Filtro: Amanhã | fica na tela |
| Filtro: Escolher data | fica na tela |
| Continuar | Pagamento protegido |

### Pagamento protegido (`Pagamento`)

| Botão | Leva para |
| --- | --- |
| Voltar | Pedido de serviço |
| Escolher item: Pix | fica na tela |
| Escolher item: Cartão de crédito | fica na tela |
| Pagar R$ 120 pelo app | Acompanhar pedido |

### Meus pedidos (`MeusPedidos`)

| Botão | Leva para |
| --- | --- |
| Pílula: Em andamento | fica na tela |
| Pílula: Concluídos | fica na tela |
| Abrir pedido: troca de sifão | Acompanhar pedido |
| Abrir pedido: faxina | Avaliar e postar |
| Aba Explorar | Explorar · lista (vitrine) |
| Aba Pedidos | Meus pedidos |
| Aba Postar | Avaliar e postar |
| Aba Salvos | Salvos |
| Aba Perfil | Perfil e conta |

### Acompanhar pedido (`Acompanhar`)

| Botão | Leva para |
| --- | --- |
| Voltar | Meus pedidos |
| Conversar com o prestador | fica na tela |
| Contestar | fica na tela |
| Confirmar serviço | Avaliar e postar |

### Avaliar e postar (`Avaliar`)

| Botão | Leva para |
| --- | --- |
| Voltar | Meus pedidos |
| Nota 1 | fica na tela |
| Nota 2 | fica na tela |
| Nota 3 | fica na tela |
| Nota 4 | fica na tela |
| Nota 5 | fica na tela |
| Adicionar foto | fica na tela |
| Publicar avaliação | Explorar · lista (vitrine) |

### Salvos (`Salvos`)

| Botão | Leva para |
| --- | --- |
| Pílula: Prestadores | fica na tela |
| Pílula: Posts | fica na tela |
| Abrir prestador salvo | Perfil do prestador |
| Aba Explorar | Explorar · lista (vitrine) |
| Aba Pedidos | Meus pedidos |
| Aba Postar | Avaliar e postar |
| Aba Salvos | Salvos |
| Aba Perfil | Perfil e conta |

## Corretor

### Painel do corretor (`Painel`)

| Botão | Leva para |
| --- | --- |
| Notificações | Caixa de chamados |
| Ocupados | Imóveis |
| Vagos | Imóveis |
| Atrasados | Imóveis |
| Ver todos os chamados | Caixa de chamados |
| Abrir chamado: Vazamento sob a pia | Detalhe do chamado |
| Abrir contrato que vence | Detalhe do imóvel |
| Aba Início | Painel do corretor |
| Aba Imóveis | Imóveis |
| Aba Chamados | Caixa de chamados |
| Aba Explorar | Explorar · lista (vitrine) |
| Aba Perfil | Perfil e conta |

### Imóveis (`Imoveis`)

| Botão | Leva para |
| --- | --- |
| Novo imóvel | Novo imóvel e contrato |
| Filtros | fica na tela |
| Pílula: Todos 16 | fica na tela |
| Pílula: Ocupados 14 | fica na tela |
| Pílula: Vagos 2 | fica na tela |
| Abrir Ap 32 · Edifício Acácias | Detalhe do imóvel |
| Abrir Casa 4 · Vila Nova | Detalhe do imóvel |
| Aba Início | Painel do corretor |
| Aba Imóveis | Imóveis |
| Aba Chamados | Caixa de chamados |
| Aba Explorar | Explorar · lista (vitrine) |
| Aba Perfil | Perfil e conta |

### Detalhe do imóvel (`Imovel`)

| Botão | Leva para |
| --- | --- |
| Voltar | Imóveis |
| Editar imóvel | Novo imóvel e contrato |
| Aba: Contrato | fica na tela |
| Aba: Histórico | fica na tela |
| Aba: Documentos | fica na tela |
| Enviar link ao inquilino | Link do inquilino |
| Abrir chamado do histórico | Detalhe do chamado |
| Aba Início | Painel do corretor |
| Aba Imóveis | Imóveis |
| Aba Chamados | Caixa de chamados |
| Aba Explorar | Explorar · lista (vitrine) |
| Aba Perfil | Perfil e conta |

### Novo imóvel e contrato (`NovoImovel`)

| Botão | Leva para |
| --- | --- |
| Voltar | Imóveis |
| Filtro: Apartamento | fica na tela |
| Filtro: Casa | fica na tela |
| Filtro: Comercial | fica na tela |
| Adicionar fotos | fica na tela |
| Continuar | Detalhe do imóvel |

### Caixa de chamados (`Chamados`)

| Botão | Leva para |
| --- | --- |
| Filtros | fica na tela |
| Aba: Abertos 3 | fica na tela |
| Aba: Em andamento 5 | fica na tela |
| Aba: Concluídos | fica na tela |
| Abrir chamado: Vazamento sob a pia | Detalhe do chamado |
| Abrir chamado: Tomada da sala sem energia | Detalhe do chamado |
| Abrir chamado: Mancha de umidade no quarto | Detalhe do chamado |
| Aba Início | Painel do corretor |
| Aba Imóveis | Imóveis |
| Aba Chamados | Caixa de chamados |
| Aba Explorar | Explorar · lista (vitrine) |
| Aba Perfil | Perfil e conta |

### Detalhe do chamado (`Chamado`)

| Botão | Leva para |
| --- | --- |
| Voltar | Caixa de chamados |
| Ver mais prestadores | Resultados da busca |
| Ver perfil de João Batista | Perfil do prestador |
| Ver perfil de Carlos Souza | Perfil do prestador |
| Cancelar chamado | fica na tela |
| Aprovar João · R$ 120 | Caixa de chamados |

## Computador

### Painel do corretor · computador (`D_Painel`)

| Botão | Leva para |
| --- | --- |
| Menu: Início | Painel do corretor · computador |
| Menu: Imóveis | Imóveis · computador |
| Menu: Chamados | Chamados · computador |
| Menu: Explorar | Explorar · computador (lista + mapa) |
| Menu: Contratos | Detalhe do imóvel |
| Menu: Financeiro | Painel do corretor · computador |
| Trocar perfil | Perfil e conta |
| Início do app | Painel do corretor · computador |
| Notificações | Chamados · computador |
| Imóveis ocupados | Imóveis · computador |
| Atrasados | Imóveis · computador |
| Chamados abertos | Chamados · computador |
| Ver todos os chamados | Chamados · computador |
| Abrir chamado: vazamento | Chamados · computador |
| Abrir chamado: tomada | Chamados · computador |
| Abrir chamado: umidade | Chamados · computador |
| Filtro: 6 meses | fica na tela |
| Abrir contrato que vence | Detalhe do imóvel |
| Abrir reajuste | Detalhe do imóvel |
| Cobrar aluguel atrasado | Imóveis · computador |
| Novo imóvel | Novo imóvel e contrato |
| Enviar link ao inquilino | Link do inquilino |
| Encontrar prestador | Explorar · computador (lista + mapa) |

### Imóveis · computador (`D_Imoveis`)

| Botão | Leva para |
| --- | --- |
| Menu: Início | Painel do corretor · computador |
| Menu: Imóveis | Imóveis · computador |
| Menu: Chamados | Chamados · computador |
| Menu: Explorar | Explorar · computador (lista + mapa) |
| Menu: Contratos | Detalhe do imóvel |
| Menu: Financeiro | Painel do corretor · computador |
| Trocar perfil | Perfil e conta |
| Início do app | Painel do corretor · computador |
| Notificações | Chamados · computador |
| Pílula: Todos 16 | fica na tela |
| Pílula: Ocupados 14 | fica na tela |
| Pílula: Vagos 2 | fica na tela |
| Pílula: Atrasados 2 | fica na tela |
| Novo imóvel | Novo imóvel e contrato |
| Abrir Casa 4 · Vila Nova | Detalhe do imóvel |
| Abrir Ap 21 · Edifício Acácias | Detalhe do imóvel |
| Abrir Ap 11 · Residencial Sol | Detalhe do imóvel |
| Abrir Sala 3 · Centro | Detalhe do imóvel |
| Editar imóvel | Novo imóvel e contrato |
| Aba: Contrato | fica na tela |
| Aba: Histórico | fica na tela |
| Aba: Documentos | fica na tela |
| Aba: Repasse | fica na tela |
| Enviar link ao inquilino | Link do inquilino |
| Ver contrato | Detalhe do imóvel |

### Chamados · computador (`D_Chamados`)

| Botão | Leva para |
| --- | --- |
| Menu: Início | Painel do corretor · computador |
| Menu: Imóveis | Imóveis · computador |
| Menu: Chamados | Chamados · computador |
| Menu: Explorar | Explorar · computador (lista + mapa) |
| Menu: Contratos | Detalhe do imóvel |
| Menu: Financeiro | Painel do corretor · computador |
| Trocar perfil | Perfil e conta |
| Início do app | Painel do corretor · computador |
| Notificações | Chamados · computador |
| Aba: Abertos 3 | fica na tela |
| Aba: Em andamento 5 | fica na tela |
| Aba: Concluídos | fica na tela |
| Abrir chamado: Tomada da sala sem energia | Detalhe do chamado |
| Abrir chamado: Mancha de umidade no quarto | Detalhe do chamado |
| Ver perfil de João Batista | Perfil do prestador |
| Ver perfil de Carlos Souza | Perfil do prestador |
| Ver perfil de Rafael Freitas | Perfil do prestador |
| Buscar outro prestador | Explorar · computador (lista + mapa) |
| Aprovar João · R$ 120 | Chamados · computador |
| Cancelar chamado | fica na tela |

### Explorar · computador (lista + mapa) (`D_Explorar`)

| Botão | Leva para |
| --- | --- |
| Trocar cidade | fica na tela |
| Busca | Busca |
| Filtro: Categoria | fica na tela |
| Filtro: Verificados | fica na tela |
| Filtro: Preço | fica na tela |
| Filtro: Nota | fica na tela |
| Aba: Todos | fica na tela |
| Aba: Hoje | fica na tela |
| Aba: Amanhã | fica na tela |
| Aba: Esta semana | fica na tela |
| Abrir post: Troca de sifão | Detalhe do post |
| Abrir post: Pintura de quarto | Detalhe do post |
| Abrir post: Instalação de tomada | Detalhe do post |
| Abrir post: Faxina pós-mudança | Detalhe do post |
| Pino: R$ 80 | fica na tela |
| Pino: R$ 90 | fica na tela |
| Pino: R$ 120 | fica na tela |
| Pino: R$ 680 | fica na tela |
| Pino: R$ 280 | fica na tela |
| Pino de post da vitrine | fica na tela |
| Pino: R$ 150 | fica na tela |
| Ver perfil | Site · perfil público do prestador |
| Pedir orçamento | Pedido de serviço |
| Aproximar | fica na tela |
| Camadas do mapa | fica na tela |
| Centralizar em mim | fica na tela |
| Buscar nesta área | fica na tela |
| Menu: Início | Painel do corretor · computador |
| Menu: Imóveis | Imóveis · computador |
| Menu: Chamados | Chamados · computador |
| Menu: Explorar | Explorar · computador (lista + mapa) |
| Menu: Contratos | Detalhe do imóvel |
| Menu: Financeiro | Painel do corretor · computador |
| Trocar perfil | Perfil e conta |
| Início do app | Painel do corretor · computador |

## Prestador

### Pedidos do prestador (`Pedidos`)

| Botão | Leva para |
| --- | --- |
| Disponível hoje | fica na tela |
| Abrir carteira | Carteira |
| Aba: Novos 2 | fica na tela |
| Aba: Aceitos | fica na tela |
| Aba: Concluídos | fica na tela |
| Abrir pedido: Troca de sifão | Detalhe do pedido |
| Abrir pedido: Desentupimento de pia | Detalhe do pedido |
| Aba Pedidos | Pedidos do prestador |
| Aba Agenda | Agenda |
| Aba Postar | Novo post |
| Aba Carteira | Carteira |
| Aba Perfil | Perfil e conta |

### Detalhe do pedido (`PedidoDetalhe`)

| Botão | Leva para |
| --- | --- |
| Voltar | Pedidos do prestador |
| Recusar | Pedidos do prestador |
| Aceitar e agendar | Agenda |

### Agenda (`Agenda`)

| Botão | Leva para |
| --- | --- |
| Dia 24 | fica na tela |
| Dia 25 | fica na tela |
| Dia 26 | fica na tela |
| Dia 27 | fica na tela |
| Dia 28 | fica na tela |
| Dia 29 | fica na tela |
| Abrir compromisso: Troca de sifão | Concluir serviço |
| Aba Pedidos | Pedidos do prestador |
| Aba Agenda | Agenda |
| Aba Postar | Novo post |
| Aba Carteira | Carteira |
| Aba Perfil | Perfil e conta |

### Concluir serviço (`ConcluirServico`)

| Botão | Leva para |
| --- | --- |
| Voltar | Agenda |
| Filtro: Garantia 90 dias | fica na tela |
| Filtro: Sem garantia | fica na tela |
| Concluir e postar na vitrine | Novo post |

### Novo post (`NovoPost`)

| Botão | Leva para |
| --- | --- |
| Voltar | Pedidos do prestador |
| Adicionar fotos | fica na tela |
| Publicar na vitrine | Detalhe do post |

### Carteira (`Carteira`)

| Botão | Leva para |
| --- | --- |
| Sacar via Pix | fica na tela |
| Filtro: Últimos 30 dias | fica na tela |
| Aba Pedidos | Pedidos do prestador |
| Aba Agenda | Agenda |
| Aba Postar | Novo post |
| Aba Carteira | Carteira |
| Aba Perfil | Perfil e conta |

## Inquilino (web)

### Link do inquilino (`LinkInquilino`)

| Botão | Leva para |
| --- | --- |
| Abrir chamado | Abrir chamado |
| Acompanhar chamado | Andamento (inquilino) |

### Abrir chamado (`AbrirChamado`)

| Botão | Leva para |
| --- | --- |
| Voltar | Link do inquilino |
| Tirar ou escolher foto | fica na tela |
| Filtro: Sim, está piorando | fica na tela |
| Filtro: Pode esperar | fica na tela |
| Enviar chamado | Andamento (inquilino) |

### Andamento (inquilino) (`ChamadoInquilino`)

| Botão | Leva para |
| --- | --- |
| Voltar | Link do inquilino |
| Falar com o corretor | fica na tela |

## Comum

### Perfil e conta (`Conta`)

| Botão | Leva para |
| --- | --- |
| Editar dados | fica na tela |
| Sou corretor ou proprietário | Painel do corretor |
| Sou prestador de serviço | Pedidos do prestador |
| Sou cliente | Explorar · lista (vitrine) |
| Notificações | fica na tela |
| Assinatura e pagamentos | fica na tela |
| Privacidade e dados (LGPD) | fica na tela |
| Ajuda | fica na tela |
| Sair | Boas-vindas |
| Aba Início | Painel do corretor |
| Aba Imóveis | Imóveis |
| Aba Chamados | Caixa de chamados |
| Aba Explorar | Explorar · lista (vitrine) |
| Aba Perfil | Perfil e conta |
