# Aroê

Plataforma web para simplificar a compra de **medicamentos manipulados**. O usuário envia a receita uma vez, compara orçamentos de farmácias qualificadas e acompanha pedidos com transparência — tudo em um só lugar.

## Funcionalidades

- **Landing page** — apresentação do produto, como funciona, planos, FAQ e comparativo
- **Página Sobre** — história, missão/visão/valores, equipe e alinhamento com ODS
- **Autenticação** — telas de login e cadastro
- **Dashboard do paciente** — gestão de receitas, pedidos, tratamentos, lembretes, notificações e histórico
- **Ária (IA)** — assistente virtual para dúvidas sobre receitas, pedidos e lembretes
- **OCR de receitas** — leitura de texto em imagens/PDFs com [Tesseract.js](https://github.com/naptha/tesseract.js)
- **Acessibilidade** — barra de ferramentas com alto contraste e ajustes de leitura
- **Tema claro/escuro** — alternância de tema em toda a aplicação
- **Scroll suave** — navegação fluida com [Lenis](https://github.com/darkroomengineering/lenis)

## Stack

| Tecnologia | Uso |
|---|---|
| [React 19](https://react.dev) | Interface |
| [Vite 8](https://vite.dev) | Build e dev server |
| [Tailwind CSS 4](https://tailwindcss.com) | Estilização |
| [React Router 7](https://reactrouter.com) | Rotas |
| [Framer Motion](https://www.framer.com/motion/) | Animações |
| [Lucide React](https://lucide.dev) | Ícones |
| [Tesseract.js](https://github.com/naptha/tesseract.js) | OCR de receitas |

## Pré-requisitos

- [Node.js](https://nodejs.org) 18+ (recomendado LTS)
- npm

## Como rodar

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

O Vite sobe por padrão em `http://localhost:5173`.

## Rotas

| Rota | Descrição |
|---|---|
| `/` | Landing page |
| `/login` | Login |
| `/register` | Cadastro |
| `/pages/sobre` | Sobre o projeto |
| `/dashboard` | Home do painel |
| `/dashboard/receitas` | Receitas enviadas |
| `/dashboard/aria` | Assistente Ária |
| `/dashboard/pedidos` | Pedidos |
| `/dashboard/tratamentos` | Tratamentos |
| `/dashboard/lembretes` | Lembretes de medicamentos |
| `/dashboard/notificacoes` | Notificações |
| `/dashboard/historico` | Histórico |
| `/dashboard/configuracoes` | Configurações |
| `/dashboard/ajuda` | Ajuda |

## Estrutura do projeto

```
src/
├── components/       # UI reutilizável (layout, botões, scroll)
├── contexts/         # Contextos React (tema)
├── hooks/            # Hooks customizados
├── pages/
│   ├── Landing/      # Página inicial e seções
│   ├── Sobre/        # Página institucional
│   ├── Login/        # Autenticação
│   └── Dashboard/    # Painel e seções
├── utils/            # Utilitários
├── App.jsx           # Rotas principais
└── main.jsx          # Entry point
public/               # Assets estáticos (logos, imagens)
```

## Deploy

O projeto está configurado para deploy na [Vercel](https://vercel.com), com rewrite de SPA em `vercel.json` para suportar o React Router.

## Observações

- Parte dos dados do dashboard (receitas, pedidos, respostas da Ária) ainda usa **mocks** para demonstração da interface.
- Não há variáveis de ambiente obrigatórias no momento.
