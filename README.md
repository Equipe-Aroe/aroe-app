# Aroê — Plataforma de Gestão de Receitas e Comparação de Farmácias

> Conectamos pacientes a farmácias de manipulação de forma inteligente, segura e acessível.

---

## O que é a Aroê?

A **Aroê** é uma plataforma web que digitaliza e simplifica o ciclo completo de uma receita médica — desde o envio pelo paciente até a produção e entrega pela farmácia. O sistema utiliza OCR (reconhecimento óptico de caracteres) para extrair dados de receitas em foto ou PDF, distribui orçamentos automaticamente para farmácias parceiras homologadas e oferece ao paciente uma visão consolidada para comparar preços, prazos e avaliações.

Além do fluxo de receitas, a plataforma conta com a **Ária**, assistente virtual de saúde, ferramentas de acessibilidade avançadas, lembretes de medicação, histórico de tratamentos e um painel dedicado para farmácias gerenciarem estoque, vendas e clientes.

---

## Documentação

| Documento | Descrição |
|-----------|-----------|
| [Arquitetura & Rotas](./docs/ARQUITETURA.md) | Estrutura de pastas, rotas do React Router, fluxo de dados |
| [Tecnologias](./docs/TECNOLOGIAS.md) | Stack completa, bibliotecas e ferramentas |
| [Inteligência Artificial & OCR](./docs/IA_OCR.md) | Como funciona a Ária e o serviço de leitura de receitas |
| [Acessibilidade](./docs/ACESSIBILIDADE.md) | Recursos de inclusão digital e como foram implementados |

---

## Perfis de Usuário

A plataforma opera com dois perfis principais:

**Paciente** — Envia receitas, acompanha pedidos, configura lembretes de medicação, consulta histórico de tratamentos e interage com a Ária.

**Farmácia** — Recebe orçamentos, gerencia estoque, registra vendas, acompanha clientes e emite relatórios.

---

## Visão Geral das Funcionalidades

### Para o Paciente
- Upload de receitas via imagem ou PDF com leitura automática por OCR
- Revisão humana dos dados extraídos antes de confirmar o pedido
- Comparação de orçamentos entre farmácias parceiras
- Lembretes de horário de medicação
- Histórico completo de tratamentos e pedidos
- Chat com a assistente virtual **Ária** (texto e voz)
- Notificações de status do pedido

### Para a Farmácia
- Painel de controle com visão de pedidos e demanda
- Gestão de estoque com alertas de baixo nível
- Módulo de vendas e faturamento
- Cadastro e histórico de clientes
- Relatórios de desempenho
- Fluxo de preparação de fórmulas

---

## Como Rodar Localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

A aplicação estará disponível em `http://localhost:5173` (padrão Vite).

---

## Modelo de Negócio

Farmácias parceiras pagam **12% de comissão apenas sobre vendas concluídas** — sem taxa de adesão ou mensalidade. O processo de análise e aprovação de novas farmácias ocorre em até **24 horas**.
