# Acessibilidade

A Aroê foi construída com acessibilidade como requisito de produto, não como adição posterior. O sistema oferece múltiplas camadas de personalização para atender usuários com diferentes necessidades visuais, cognitivas e motoras.

---

## Arquitetura de Acessibilidade

A gestão de preferências de acessibilidade é centralizada no **`ThemeContext`** (`src/contexts/ThemeContext.jsx`), um Context Provider que envolve toda a aplicação. Todas as preferências são persistidas no `localStorage` e restauradas automaticamente na próxima visita.

O **`AccessibilityToolbar`** (`src/components/layout/AccessibilityToolbar.jsx`) é o ponto de entrada do usuário — um painel flutuante acessível de qualquer tela do painel.

---

## Funcionalidades Implementadas

### 1. Modo Escuro (Dark Mode)

**Implementação:** classe `dark` no elemento `<html>` + variantes `dark:` do Tailwind CSS

O sistema detecta automaticamente a preferência do sistema operacional do usuário via `window.matchMedia('(prefers-color-scheme: dark)')` na inicialização. O usuário pode sobrescrever essa preferência a qualquer momento pelo toolbar.

```javascript
// ThemeContext.jsx
const [darkMode, setDarkMode] = useState(() => {
  const saved = localStorage.getItem("theme");
  if (saved) return saved === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
});
```

A alternância atualiza também o atributo `data-theme` no `<html>`, permitindo que regras CSS externas e leitores de conteúdo detectem o tema ativo.

---

### 2. Alto Contraste

**Implementação:** classe `high-contrast` no `<html>` + regras CSS em `index.css`

Quando ativado, aplica um esquema de cores de alto contraste que aumenta significativamente o ratio WCAG entre texto e fundo. Segue as diretrizes WCAG 2.1 AA para acessibilidade visual.

**Regra de exclusividade:** alto contraste e filtros de daltonismo são mutuamente exclusivos. Ativar um desativa o outro automaticamente para evitar conflitos visuais.

---

### 3. Tamanho de Fonte Ajustável

**Implementação:** `document.documentElement.style.fontSize` em `px`

O usuário pode aumentar ou diminuir o tamanho base da fonte via slider ou botões `+` / `−`. Como o Tailwind usa unidades relativas (`rem`) para a maioria das medidas, ajustar o `font-size` raiz escala proporcionalmente todo o layout.

| Limite | Valor |
|--------|-------|
| Mínimo | 12px |
| Padrão | 16px |
| Máximo | 28px |
| Incremento | 2px por passo |

---

### 4. Filtros de Daltonismo

**Implementação:** classes CSS com filtros SVG aplicadas ao `<html>`

São suportados três tipos de daltonismo:

| Tipo | Classe CSS | Deficiência |
|------|-----------|-------------|
| `protanopia` | `filter-protanopia` | Ausência de cones vermelhos |
| `deuteranopia` | `filter-deuteranopia` | Ausência de cones verdes |
| `tritanopia` | `filter-tritanopia` | Ausência de cones azuis |

Os filtros são implementados via matrizes de cor SVG (`feColorMatrix`) que simulam como cada tipo de daltonismo afeta a percepção de cores, permitindo que o designer/desenvolvedor valide o design e que o usuário com daltonismo adapte a interface ao seu perfil visual.

O atributo `data-color-filter` é atualizado no `<html>` para permitir rastreamento de qual filtro está ativo.

---

### 5. Leitura em Voz Alta (Text-to-Speech)

**Implementação:** `window.SpeechSynthesis` (Web Speech API nativa)

Disponível tanto no **toolbar de acessibilidade** (para leitura de conteúdo geral) quanto no **chat da Ária** (para leitura das respostas da assistente).

A seleção de voz prioriza vozes femininas em pt-BR usando correspondência por nome (`maria`, `helena`, `luciana`, `francisca`, etc.), com fallback progressivo:

1. Voz feminina com nome reconhecido em pt-BR
2. Qualquer voz em pt-BR sem indicação de gênero masculino
3. Qualquer voz em pt-BR disponível

O idioma é fixado em `pt-BR` com velocidade (`rate`) e entonação (`pitch`) padrão para máxima inteligibilidade.

---

### 6. Entrada por Voz (Speech-to-Text)

**Implementação:** `window.SpeechRecognition` (Web Speech API nativa)

Disponível no chat da Ária via botão de microfone. Transcreve a fala do usuário em tempo real e insere o texto no campo de mensagem. Compatível com Chrome e Edge (suporte parcial em outros navegadores).

---

### 7. Reset de Acessibilidade

Um botão de reset está disponível no toolbar e redefine todas as configurações de acessibilidade para os valores padrão em um único clique:

```javascript
const resetAccessibility = () => {
  setHighContrast(false);
  setFontSize(16);
  setColorFilter("normal");
};
```

---

## ThemeContext — API Pública

O contexto expõe os seguintes valores e funções para qualquer componente filho:

| Propriedade / Função | Tipo | Descrição |
|---------------------|------|-----------|
| `darkMode` | `boolean` | Estado atual do dark mode |
| `toggleDarkMode()` | `() => void` | Alterna dark/light |
| `highContrast` | `boolean` | Estado do alto contraste |
| `toggleHighContrast()` | `() => void` | Alterna alto contraste |
| `fontSize` | `number` | Tamanho de fonte atual (px) |
| `increaseFontSize()` | `() => void` | Aumenta 2px (máx. 28px) |
| `decreaseFontSize()` | `() => void` | Diminui 2px (mín. 12px) |
| `colorFilter` | `string` | Filtro ativo: `'normal'`, `'protanopia'`, `'deuteranopia'`, `'tritanopia'` |
| `setColorFilter(filter)` | `(string) => void` | Define o filtro de daltonismo |
| `resetAccessibility()` | `() => void` | Reseta tudo para padrão |

---

## Persistência das Preferências

| Chave no localStorage | Valor |
|-----------------------|-------|
| `theme` | `"dark"` ou `"light"` |
| `highContrast` | `"true"` ou `"false"` |
| `fontSize` | Número em string (ex.: `"18"`) |
| `colorFilter` | `"normal"`, `"protanopia"`, `"deuteranopia"` ou `"tritanopia"` |

---

## Contexto de Produto

A plataforma Aroê atende a um público que inclui pessoas idosas, pacientes com condições crônicas e cuidadores, grupos que tendem a ter maior prevalência de deficiências visuais e menor familiaridade com tecnologia. Os recursos de acessibilidade refletem diretamente esse compromisso com a inclusão digital no contexto de saúde.