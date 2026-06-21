# Inteligência Artificial & OCR

A Aroê incorpora duas camadas de inteligência: o **serviço de OCR** para leitura automática de receitas, e a **Ária**, assistente virtual de saúde com suporte a texto e voz.

---

## 1. Serviço de OCR — Leitura de Receitas

**Arquivo:** `src/services/ocrService.js`

### Visão Geral

O OCR (Optical Character Recognition) é executado **inteiramente no browser**, sem enviar a imagem para nenhum servidor externo. Isso garante privacidade total dos dados de saúde do usuário, que nunca saem do dispositivo durante o processamento.

### Pipeline de Processamento

```
Arquivo de imagem (jpg/png/pdf)
        ↓
[1] preprocessImage()  — Canvas API
        Binarização pixel a pixel
        Threshold de luminância: < 120 → preto, ≥ 120 → branco
        Resultado: imagem em P&B de alto contraste
        ↓
[2] Tesseract.recognize()  — Tesseract.js (WebAssembly)
        Engine: pt (português)
        Retorna: { text: string, confidence: number }
        ↓
[3] Extração por Regex
        CRM do médico
        CNPJ da farmácia
        Nome do paciente
        Nome do médico
        Data de emissão
        ↓
[4] validarCNPJ()  — validateCnpj.js
        Validação matemática (módulo 11)
        ↓
[5] Classificação do tipo de receita
        Simples | Antimicrobiano | Controle Especial (C1/C5)
        ↓
Objeto estruturado retornado ao componente
```

### Classificação de Receitas

O sistema classifica automaticamente o tipo de receita com base em palavras-chave no texto extraído:

| Tipo | Palavras-chave detectadas | Validade padrão |
|------|--------------------------|-----------------|
| Simples | (padrão, sem indicadores especiais) | 30 dias |
| Antimicrobiano | `antibiótico`, `antimicrobiano`, `amoxicilina`, `azimicina` | 10 dias |
| Controle Especial (C1/C5) | `controle especial`, `notificação`, `retida` | 30 dias |

### Campos Extraídos

O objeto retornado pelo `processarReceitaOCR` contém:

```javascript
{
  id,              // Timestamp como identificador único
  nome,            // Primeira linha não vazia do texto (até 30 chars)
  textoExtraido,   // Texto completo reconhecido pelo OCR
  paciente,        // Nome detectado após "Paciente:", "Nome:" ou "Para:"
  crmMedico,       // CRM no formato numérico ou "123456/SP"
  nomeMedico,      // Nome após "Dr.", "Dra.", "Médico:", "Médica:"
  cnpjFarmacia,    // CNPJ validado matematicamente (vazio se inválido)
  dataEmissao,     // Data no formato dd/mm/aaaa
  validadeDias,    // "10" para antimicrobianos, "30" para demais
  tipoReceita,     // Classificação automática
  confidence,      // Índice de confiança do Tesseract (0–100)
  imagemUrl        // URL local (object URL) da imagem original
}
```

### Revisão Humana

Após o OCR, o usuário é apresentado a um **modal de revisão** onde pode corrigir qualquer campo antes de confirmar o envio. Isso garante que erros de leitura — comuns em caligrafia médica — sejam detectados antes de seguir para as farmácias.

---

## 2. Ária — Assistente Virtual de Saúde

**Arquivo:** `src/pages/Dashboard/sections/AriaIA.jsx`

### O que é a Ária

A Ária é a assistente virtual conversacional da Aroê, acessível pelo menu do painel do paciente. Ela combina respostas baseadas em intenção com recursos de voz nativos do browser para oferecer uma experiência acessível e humanizada.

### Sistema de Intenções

A Ária não usa uma API de LLM externa — em vez disso, opera com um **mapa de intenções por palavras-chave** (`INTENT_RESPONSES`), o que garante respostas rápidas, previsíveis e sem custo de API por interação.

```javascript
// Exemplo de intenção configurada
{
  keywords: ["receita", "enviar", "mandar"],
  response: "Para enviar uma nova receita, basta clicar no ícone de clipe..."
}
```

O sistema percorre o array de intenções e retorna a resposta da primeira que tiver qualquer palavra-chave presente na mensagem do usuário (case-insensitive). Se nenhuma intenção for identificada, a Ária responde com uma mensagem genérica orientando o usuário.

### Intenções Disponíveis

| Palavras-chave | Tema da resposta |
|----------------|-----------------|
| `receita`, `enviar`, `mandar` | Como enviar uma receita |
| `status`, `pedido`, `onde está`, `entrega` | Status do pedido atual |
| `lembrete`, `horário`, `remedio`, `remédio` | Como configurar lembretes |
| `dica`, `bem-estar`, `saude`, `saúde` | Dicas de saúde e adesão ao tratamento |
| `orçamento`, `preço`, `valor`, `desconto` | Melhores orçamentos disponíveis |

### Recursos de Voz

**Síntese de Voz (Text-to-Speech)** — `SpeechSynthesis` API

Ao ativar o áudio, as respostas da Ária são lidas em voz alta. O sistema prioriza vozes femininas em pt-BR usando uma lista de nomes comuns brasileiros (`maria`, `helena`, `luciana` etc.) como critério de seleção, antes de fazer fallback para qualquer voz disponível no idioma.

**Reconhecimento de Voz (Speech-to-Text)** — `SpeechRecognition` API

O botão de microfone ativa o reconhecimento de fala em tempo real. A transcrição é inserida no campo de texto do chat e o usuário pode confirmar o envio. Compatível com navegadores que suportam a Web Speech API (Chrome, Edge).

### Funcionalidades do Chat

- **Histórico persistente**: as mensagens são salvas no `localStorage` com a chave `aroe_aria_chat` e restauradas na próxima sessão
- **Perguntas rápidas**: chips de atalho para as dúvidas mais comuns
- **Anexo de arquivos**: botões de clipe (qualquer arquivo) e câmera (imagem) que disparam inputs de file ocultos
- **Timestamps**: cada mensagem exibe o horário de envio no formato `HH:mm`
- **Aba "Sobre a Ária"**: painel informativo com cards explicando as capacidades da assistente

### Privacidade & Segurança

A Ária, em sua implementação atual, processa tudo localmente no browser. Não há envio de mensagens para servidores externos. Os dados de saúde mencionados no chat permanecem exclusivamente no dispositivo do usuário.

---

## 3. Dados de Demonstração — Personas

**Arquivo:** `src/data/personasData.js`

Para fins de demonstração e testes de UX, o sistema inclui um conjunto de **personas pré-configuradas** com dados simulados. A persona padrão é `amanda` (paciente), com receitas, pedidos, perfil e configurações de UI pré-definidos.

Isso permite apresentar o produto funcionalmente sem necessidade de backend ou banco de dados, mantendo a experiência de demonstração realista e consistente entre sessões.