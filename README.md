# Domu

Site e app web de gestão de aluguel e marketplace de manutenção residencial, para corretores autônomos, pequenos proprietários, inquilinos e prestadores.

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

Para ver o app de cada perfil, entre por `/entrar` (qualquer e-mail e senha funcionam) e escolha **corretor**, **prestador** ou **cliente**. O perfil pode ser trocado em Perfil. A área da operação fica em `/admin` e o link de exemplo do inquilino em `/c/demo`.

## Onde está cada coisa

```
src/
  app/
    (site)/          site público com SEO: /, /para-corretores, /para-prestadores,
                     /servicos/[servico]/[cidade], /p/[slug], /post/[id]
    (entrada)/       /entrar, /criar-conta, /recuperar-senha, /redefinir-senha,
                     /entrar/perfil, /boas-vindas
    app/             app web logado (/app/...), por perfil
    c/[token]/       link do inquilino, sem login
    admin/           área interna da operação (curadoria, moderação, disputas, catálogo, usuários)
  components/
    ui/              primitivos: Button, Badge, Chip, Card, Field, Tabs, Steps...
    domain/          componentes do negócio: PostCard, ChamadoCard, PrestadorCard, Kpi...
    patterns/        blocos de tela: Explorar (lista + mapa), MapView, FilterBar, DataTable
    layout/          AppShell (barra lateral + barra de abas), cabeçalhos, site
    views/           telas com estado (formulários, listas com filtro)
    site/            seções do site de marketing
  lib/
    types.ts         tipos do domínio
    mock/            dados de exemplo (trocar pela API)
    categorias.ts, estados.ts, nav.ts, format.ts
brand/               identidade: logo, ícones, tokens (tokens.css é importado pelo app)
docs/
  estrutura-funcional.md   módulos, funções, navegação e componentes
  wireframes.md            mapa de navegação dos wireframes
  backend.md               o que o backend precisa entregar
```

**Responsivo.** No celular o app tem a barra de abas flutuante embaixo. No tablet vira uma barra lateral com ícones, e no computador a barra lateral mostra também os nomes. O Explorar mostra a lista ou o mapa no celular, e os dois lado a lado no computador. Imóveis e chamados viram tabelas com o detalhe ao lado.

**Design.** Cores, espaço e forma vêm de `brand/tokens/tokens.css`. A fonte é a Geist (pacote `geist`) e os ícones são do Lucide. Design system: https://claude.ai/artifact/XsY4QrX5VgpoGkrG7swkmP. Wireframes: https://claude.ai/artifact/5sxFsJay9Af5hzSo76o3xy.
