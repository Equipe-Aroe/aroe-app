# Tecnologias Utilizadas

## Stack Principal

### React 18
Framework de UI utilizado em toda a aplicação. O projeto adota a abordagem de **componentes funcionais** com Hooks — sem componentes de classe. A composição de rotas aninhadas (Dashboard com sub-rotas de paciente e farmácia) é viabilizada pelo sistema de layouts do React Router.

### React Router v6
Gerencia toda a navegação da SPA (Single Page Application). Os principais recursos utilizados são:

- `<Routes>` e `<Route>` para declaração de rotas
- Rotas aninhadas (nested routes) para o layout do Dashboard
- Hook `useLocation` para detectar a rota atual e ocultar/exibir o layout público
- Suporte a hash navigation (`/#secao`) combinado com `scrollToSection`

### Vite
Bundler e servidor de desenvolvimento. Escolhido pela inicialização instantânea (ESM nativo) e builds de produção otimizados com Rollup. O projeto usa a template `react` do Vite com suporte a JSX e TSX no mesmo repositório.

### TypeScript (parcial)
A página `FarmaciaSection` (`src/pages/Farmacia/FarmaciaSection.tsx`) usa TypeScript com interface tipada para o formulário de cadastro de farmácias (`FarmaciaFormData`). O restante do projeto usa JavaScript/JSX, o que indica uma migração gradual ou adoção pontual de tipagem onde a complexidade justifica.

---

## Estilização

### Tailwind CSS
Utilizado como principal sistema de estilização via classes utilitárias. O projeto usa:

- **Dark mode via classe** (`dark:`): alternância de tema controlada pelo `ThemeContext` que adiciona/remove a classe `dark` no elemento `<html>`
- **Breakpoints responsivos** (`sm:`, `md:`, `lg:`) para adaptar layouts ao mobile
- **Variantes de estado** (`hover:`, `focus:`, `active:`) para interatividade
- **Classes customizadas** para filtros de daltonismo via atributo `data-color-filter` no HTML raiz

### CSS Custom Properties
O arquivo `index.css` define variáveis CSS para tokens de design (cores primárias, fundos, bordas) que complementam o Tailwind, especialmente para os modos de acessibilidade (alto contraste, filtros de visão).

---

## Animação & Interação

### Framer Motion
Biblioteca de animações utilizada nas seções do Landing, nos modais do Dashboard e nos componentes da Ária. Os principais padrões de uso são:

- `motion.div` com propriedades `initial`, `animate` e `transition` para entradas suaves
- `AnimatePresence` para animar a saída de componentes (modais, mensagens do chat)
- Variantes de animação para listas com `staggerChildren` nas seções de features

### Web Animations API Nativa
O componente `SmoothScroll.jsx` e o utilitário `scrollToSection.js` utilizam o método nativo `element.scrollIntoView({ behavior: 'smooth' })` para navegação por âncoras sem dependências externas.

---

## Ícones

### Lucide React
Biblioteca de ícones SVG utilizada em toda a aplicação. Os ícones são importados individualmente por nome, garantindo tree-shaking eficiente no bundle final. Exemplos de ícones presentes:

`FileText`, `Upload`, `Mic`, `MicOff`, `Volume2`, `VolumeX`, `ShieldCheck`, `Sparkles`, `Building2`, `Contrast`, `Eye`, entre muitos outros.

---

## Inteligência Artificial & Processamento

> Detalhado em [`IA_OCR.md`](./IA_OCR.md)

### Tesseract.js
Engine de OCR open-source rodando **100% no browser** (WebAssembly). Utilizado para extrair texto de imagens de receitas médicas enviadas pelo usuário. Configurado para o idioma português (`por`).

### Canvas API (nativa)
Usada no pré-processamento de imagens antes do OCR. O `preprocessImage` do `ocrService.js` aplica binarização manual pixel a pixel via `ctx.getImageData`, convertendo a imagem para preto e branco com threshold de luminância para maximizar a acurácia do Tesseract.

### Web Speech API (nativa)
Dois recursos de voz são implementados com a API nativa do browser:

- **`SpeechSynthesis`**: leitura em voz alta das respostas da Ária, com seleção inteligente de voz feminina em pt-BR
- **`SpeechRecognition`**: entrada de voz no chat da Ária (microfone), com transcrição em tempo real

---

## Validações & Utilitários

### validateCnpj.js
Implementação própria da validação matemática de CNPJ (algoritmo de módulo 11), sem dependência externa. Usada tanto na extração de receitas (validar CNPJ detectado pelo OCR) quanto no cadastro de farmácias.

### Gerador de CNPJ para Demos
A página de Receitas inclui um gerador de CNPJ matematicamente válido (`gerarCnpjValido`) usado exclusivamente para popular dados de demonstração — nunca exposto para o usuário final.

---

## Dependências Estimadas

| Pacote | Categoria | Uso |
|--------|-----------|-----|
| `react` / `react-dom` | Core | Framework de UI |
| `react-router-dom` | Navegação | Roteamento da SPA |
| `framer-motion` | Animação | Transições e microinterações |
| `lucide-react` | Ícones | Ícones SVG por tree-shaking |
| `tesseract.js` | OCR | Leitura de receitas no browser |
| `tailwindcss` | Estilização | Classes utilitárias |
| `vite` | Build | Bundler e dev server |
| `typescript` | Tipagem | Uso parcial (FarmaciaSection) |