# Arquitetura & Rotas

## Estrutura de Pastas

```
src/
├── App.jsx                    # Raiz da aplicação, configuração de rotas e layout global
├── main.jsx                   # Entry point — monta o React no DOM
├── index.css                  # Estilos globais (Tailwind + variáveis CSS customizadas)
│
├── assets/                    # Recursos estáticos (imagens, ícones)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx             # Barra de navegação pública
│   │   ├── Footer.jsx             # Rodapé público
│   │   ├── DashboardHeader.jsx    # Header do painel autenticado
│   │   ├── DashboardSidebar.jsx   # Menu lateral do painel
│   │   └── AccessibilityToolbar.jsx # Barra flutuante de acessibilidade
│   ├── ui/
│   │   └── Button.jsx             # Componente de botão reutilizável
│   └── SmoothScroll.jsx           # Scroll suave entre seções via hash
│
├── contexts/
│   └── ThemeContext.jsx        # Contexto global: dark mode, contraste, fonte, daltonismo
│
├── hooks/
│   ├── useTheme.js             # Hook auxiliar para consumo do tema
│   └── useAccessibility.js    # Hook de acessibilidade (voz, fonte, contraste)
│
├── data/
│   └── personasData.js        # Dados de demonstração para personas (Amanda, farmácia etc.)
│
├── services/
│   └── ocrService.js          # Lógica de pré-processamento de imagem + OCR (Tesseract.js)
│
├── utils/
│   ├── scrollToSection.js     # Utilitário para scroll âncora com hash
│   └── validateCnpj.js        # Validação matemática de CNPJ
│
└── pages/
    ├── Landing/               # Página pública inicial
    ├── Login/                 # Autenticação e cadastro
    ├── Sobre/                 # Institucional (missão, time, ODS)
    ├── Farmacia/              # Landing page de captação de farmácias parceiras
    └── Dashboard/             # Painel autenticado (paciente e farmácia)
```

---

## Rotas da Aplicação

Todas as rotas são gerenciadas pelo **React Router v6** com o componente `<Routes>` no `App.jsx`.

### Rotas Públicas

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/` | `Landing` | Página inicial com hero, como funciona, comparativo, preços e FAQ |
| `/login` | `Login` | Autenticação do usuário |
| `/register` | `Register` | Cadastro de novo usuário |
| `/pages/sobre` | `Sobre` | Página institucional da empresa |
| `/pages/farmacia` | `FarmaciaSection` | Captação de farmácias parceiras com formulário |

> As rotas `/login`, `/register` e `/dashboard` ocultam o `<Navbar>` e o `<Footer>` públicos, substituindo-os pelo layout do painel.

### Rotas do Painel — Paciente (`/dashboard/*`)

O painel usa layout aninhado: `<Dashboard>` envolve todas as sub-rotas com o `DashboardHeader` e `DashboardSidebar`.

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/dashboard` | `DashboardHome` | Visão geral: boas-vindas, receitas recentes, próximos lembretes |
| `/dashboard/receitas` | `DashboardReceitas` | Upload, OCR e gestão de receitas |
| `/dashboard/aria` | `AriaIA` | Chat com a assistente virtual Ária |
| `/dashboard/pedidos` | `DashboardPedidos` | Acompanhamento de pedidos em andamento |
| `/dashboard/tratamentos` | `DashboardTratamentos` | Histórico e ciclo de tratamentos ativos |
| `/dashboard/lembretes` | `DashboardLembretes` | Configuração de alarmes de medicação |
| `/dashboard/notificacoes` | `DashboardNotificacoes` | Central de notificações |
| `/dashboard/historico` | `DashboardHistorico` | Histórico completo de receitas e pedidos |
| `/dashboard/perfil` | `DashboardPerfil` | Dados pessoais e de saúde do paciente |
| `/dashboard/configuracoes` | `DashboardConfiguracoes` | Preferências da conta |
| `/dashboard/ajuda` | `DashboardAjuda` | Central de ajuda e suporte |

### Rotas do Painel — Farmácia (`/dashboard/pharmacy/*`)

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/dashboard/pharmacy/dashboard` | `DashboardPharmacy` | Visão geral da farmácia |
| `/dashboard/pharmacy/estoque` | `EstoquePharmacy` | Gestão de matérias-primas e produtos |
| `/dashboard/pharmacy/vendas` | `VendasPharmacy` | Registro e histórico de vendas |
| `/dashboard/pharmacy/clientes` | `ClientesPharmacy` | Cadastro e histórico de clientes |
| `/dashboard/pharmacy/relatorios` | `RelatoriosPharmacy` | Relatórios e métricas de desempenho |
| `/dashboard/pharmacy/preparar` | `PreparacaoPharmacy` | Fila de preparação de fórmulas |
| `/dashboard/pharmacy/perfil` | `PharmacyProfile` | Perfil e dados da farmácia |
| `/dashboard/pharmacy/configuracoes` | `PharmacyConfiguracoes` | Configurações da conta da farmácia |
| `/dashboard/pharmacy/ajuda` | `PharmacyHelp` | Suporte para farmácias |

---

## Fluxo de Dados

```
Usuário faz upload da receita
        ↓
ocrService.js pré-processa a imagem (binarização Canvas)
        ↓
Tesseract.js extrai o texto (idioma: pt)
        ↓
Regex extrai campos estruturados (CRM, CNPJ, paciente, médico, data)
        ↓
validateCnpj.js valida o CNPJ detectado matematicamente
        ↓
Usuário revisa os dados no modal de confirmação
        ↓
Receita é adicionada ao estado local e distribuída para farmácias
        ↓
Ária notifica o paciente quando orçamentos ficam disponíveis
```

---

## Gerenciamento de Estado

O projeto utiliza **estado local com React Hooks** (`useState`, `useEffect`, `useRef`) sem biblioteca de estado global (Redux, Zustand etc.). O estado de tema e acessibilidade é compartilhado via **Context API** (`ThemeContext`).

A persistência entre sessões é feita via **`localStorage`**:

| Chave | O que armazena |
|-------|---------------|
| `theme` | Preferência de dark/light mode |
| `highContrast` | Estado do alto contraste |
| `fontSize` | Tamanho de fonte definido pelo usuário |
| `colorFilter` | Filtro de daltonismo ativo |
| `@Aroe:demo_session` | Dados de demonstração da sessão atual |
| `aroe_aria_chat` | Histórico de mensagens com a Ária |