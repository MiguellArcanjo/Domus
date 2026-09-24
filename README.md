# Domu

Site do Domu: gestão de aluguel e marketplace de manutenção residencial, para corretores autônomos, pequenos proprietários, inquilinos e prestadores.

A **operação do dia a dia fica no app mobile** (iOS e Android, repositório `domu-mobile`). Este site tem o marketing, a entrada, e na área logada a **conta, a assinatura, o destaque, os relatórios** e o básico de cada perfil. A divisão completa está em [`docs/web-vs-app.md`](docs/web-vs-app.md).

**Aluguel em dia. Casa em ordem.**

Este repositório tem **só o front**. Tudo roda com dados de exemplo. O que o backend precisa entregar, tela por tela, está em [`docs/backend.md`](docs/backend.md).

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
```

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção (todas as páginas) |
| `npm run start` | Serve o build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript sem gerar arquivos |

Para ver a área logada de cada perfil, entre por `/entrar` (qualquer e-mail e senha funcionam) e escolha **corretor**, **prestador** ou **cliente**. O perfil pode ser trocado em Conta. A área da operação fica em `/admin`, o link de exemplo do inquilino em `/c/demo` e a página "Baixe o app" em `/baixar`.

## Onde está cada coisa

```
src/
  app/
    (site)/          site público com SEO: /, /para-corretores, /para-prestadores,
                     /servicos/[servico]/[cidade], /p/[slug], /post/[id]
    (entrada)/       /entrar, /criar-conta, /recuperar-senha, /redefinir-senha,
                     /entrar/perfil, /boas-vindas
    (site)/baixar    página "Baixe o app" (os botões de contratar do site levam para cá)
    app/             área logada reduzida (/app/...): início, conta, assinatura, relatórios,
                     destaque, carteira, perfil público, pedidos e recibos, endereços
    c/[token]/       link do inquilino, sem login
    admin/           área interna da operação (curadoria, moderação, disputas, catálogo, usuários)
  components/
    ui/              primitivos: Button, Badge, Chip, Card, Field, Tabs, Steps...
    domain/          componentes do negócio: PostCard, ChamadoCard, PrestadorCard, Kpi...
    patterns/        blocos de tela: Explorar (lista + mapa), MapView, FilterBar, DataTable
    layout/          AppShell (barra lateral + barra de abas), cabeçalhos, site
    views/           telas com estado (formulários, conta, assinatura, relatórios)
    site/            seções do site de marketing
  lib/
    types.ts         tipos do domínio
    mock/            dados de exemplo (trocar pela API)
    categorias.ts, estados.ts, nav.ts, format.ts
    app.ts           links das lojas e o que cada perfil faz no app
brand/               identidade: logo, ícones, tokens (tokens.css é importado pelo app)
docs/
  estrutura-funcional.md   módulos, funções, navegação e componentes
  wireframes.md            mapa de navegação dos wireframes
  backend.md               o que o backend precisa entregar
  web-vs-app.md            o que fica no site e o que fica no app mobile
```

**Responsivo.** No celular a área logada tem a barra de abas flutuante embaixo. No tablet vira uma barra lateral com ícones, e no computador a barra lateral mostra também os nomes.

**Design.** Cores, espaço e forma vêm de `brand/tokens/tokens.css`. A fonte é a Geist (pacote `geist`) e os ícones são do Lucide. Design system: https://claude.ai/artifact/XsY4QrX5VgpoGkrG7swkmP. Wireframes: https://claude.ai/artifact/5sxFsJay9Af5hzSo76o3xy.
