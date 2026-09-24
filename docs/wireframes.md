# Domu: wireframes e navegação

Protótipo clicável: https://claude.ai/artifact/5sxFsJay9Af5hzSo76o3xy

As telas estão na largura de celular (390 px), a forma principal do app web. As versões para computador seguem as regras de `docs/estrutura-funcional.md`, seção 1.

Cada tela, o que ela tem e para onde cada botão leva. "Fica na tela" é um controle que age ali mesmo (filtro, aba, curtir). O código das telas vem de `docs/estrutura-funcional.md`.

## Entrada

### Boas-vindas (`Main`)

| Botão | Leva para |
| --- | --- |
| Começar | Entrar com WhatsApp |
| Já tenho conta | Entrar com WhatsApp |

### Entrar com WhatsApp (`Entrar`)

| Botão | Leva para |
| --- | --- |
| Voltar | Boas-vindas |
| Reenviar código | fica na tela |
| Continuar | Escolher perfil |

### Escolher perfil (`EscolherPerfil`)

| Botão | Leva para |
| --- | --- |
| Voltar | Entrar com WhatsApp |
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
| Compartilhar no WhatsApp | fica na tela |
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
| Falar com o corretor no WhatsApp | fica na tela |

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
