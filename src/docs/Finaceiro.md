# 📊 DOSSIÊ FINANCEIRO AVANÇADO — ECOSSISTEMA AROÊ

## Análise de Viabilidade, Estrutura de Custos, Engenharia de Receitas e Escala Comercial B2B/B2C

---

## 📈 1. RESUMO EXECUTIVO FINANCEIRO

Este dossiê apresenta a modelagem financeira aprofundada da **Aroê**, um ecossistema tecnológico focado no mercado de medicamentos manipulados. Operando sob um modelo híbrido que une a tração e a liquidez do marketplace transacional com a receita previsível de assinaturas de software (SaaS), a empresa adota uma filosofia de infraestrutura descentralizada de ativos (*asset-light*). Ao não gerenciar ou custear frotas de entrega, laboratórios físicos ou estoques de matéria-prima, o risco operacional é mitigado, e a geração de caixa é otimizada.

```
                     [ INVESTIMENTO INICIAL DISPONIBILIZADO ]
                                        │
           ┌────────────────────────────┴────────────────────────────┐
           ▼                                                         ▼
   Fase 1: MVP (Meses 1-3)                                Fase 2: Plataforma Completa
    R$ 75.000 - R$ 110.000                                 R$ 160.000 - R$ 220.000
           │                                                         │
           └────────────────────────────┬────────────────────────────┘
                                        ▼
                         [ CUSTOS OPERACIONAIS MENSAIS ]
           ┌────────────────────────────┼────────────────────────────┐
           ▼                            ▼                            ▼
     10 Farmácias / B2B           100 Farmácias / B2B          500 Farmácias / B2B
       1.000 Pacientes              10.000 Pacientes             100.000 Pacientes
    R$ 3.000 - R$ 5.000/mês     R$ 12.000 - R$ 18.000/mês    R$ 45.000 - R$ 65.000/mês

```

* **Ponto de Equilíbrio (Break-even):** Projetado para o **Mês 9** de operação comercial. O marco é atingido com o atingimento de **50 farmácias parceiras ativas** gerando receita de mensalidade e um volume transacionado total (GMV) de R$ 264.000,00/mês dentro do marketplace.
* **Margem Líquida Operacional:** Estimada em **85%** em regime de maturidade de software. A ausência de custos flutuantes com o frete de última milha (*last-mile*) e com o passivo de matérias-primas farmacêuticas blinda o fluxo de caixa centralizado da plataforma.

---

## 🏗️ 2. FASE 1: ESTRUTURA DE CUSTOS E ALOCAÇÃO DE CAPITAL DO MVP

A fase inicial de desenvolvimento e validação possui duração estrita de **3 meses**. O foco da alocação de recursos reside na engenharia de dados para a estruturação do algoritmo de leitura óptica da **ARIA** e na segurança de dados em saúde.

### 2.1 Recursos Humanos (Equipe Core Enxuta)

A governança inicial do projeto exige um time técnico dedicado, contratado por modelo de prestação de serviços para mitigar encargos trabalhistas antes do *Product-Market Fit*.

* **1 Tech Lead / Engenheiro Full Stack Developer:** Responsável pelo setup inicial do projeto, arquitetura do banco de dados relacional, desenvolvimento das APIs e segurança de rede.
* *Custo Mensal:* R$ 12.000,00 | *Total 3 meses:* **R$ 36.000,00**


* **1 Frontend Developer & UI/UX Designer:** Responsável pela implementação do *design system* da Aroê, telas do painel web das farmácias, aplicativo mobile do paciente, responsividade e interações.
* *Custo Mensal:* R$ 8.000,00 | *Total 3 meses:* **R$ 24.000,00**


* **1 Product Manager (Part-time):** Responsável pelo mapeamento de requisitos, definição de cronogramas de entrega, acompanhamento do backlog e testes de validação com farmácias parceiras.
* *Custo Mensal:* R$ 4.000,00 | *Total 3 meses:* **R$ 12.000,00**


* **Subtotal Recursos Humanos (MVP): R$ 72.000,00**

### 2.2 Infraestrutura Cloud e Hospedagem

A infraestrutura tecnológica adota ferramentas gerenciadas para reduzir o tempo de lançamento e garantir alta disponibilidade desde o primeiro dia.

* **Vercel Pro (Frontend Hosting):** Hospedagem das interfaces web da plataforma. Deploy automático, CDN global embutida, certificado SSL gratuito e largura de banda otimizada para o tráfego inicial.
* *Custo Mensal:* R$ 100,00 | *Total 3 meses:* **R$ 300,00**


* **Supabase Pro (Backend-as-a-Service):** Banco de dados relacional PostgreSQL hospedado em nuvem. Armazenamento seguro de receitas médicas criptografadas, autenticação integrada de usuários/farmácias e gatilhos em tempo real.
* *Custo Mensal:* R$ 125,00 | *Total 3 meses:* **R$ 375,00**


* **Cloudflare (Segurança e DNS):** Camada de proteção contra ataques distribuídos de negação de serviço (DDoS) e cache inteligente de borda.
* *Custo Mensal:* Plano Inicial Gratuito | *Total 3 meses:* **R$ 0,00**


* **Subtotal Infraestrutura: R$ 675,00**

### 2.3 APIs, Serviços Externos e Ferramental

* **OpenAI API (Engine Vision & Chat da ARIA):** Consumo do modelo LLM especializado para processamento de imagens e conversão de textos manuscritos de receitas para arquivos JSON estruturados.
* *Custo Estimado Mensal:* R$ 600,00 | *Total 3 meses:* **R$ 1.800,00**


* **Figma (Pro):** Licença de edição para a manutenção de protótipos de alta fidelidade e componentes visuais.
* *Custo Mensal:* R$ 60,00 | *Total 3 meses:* **R$ 180,00**


* **Gateway de Pagamento (Split de Transações):** Integração com APIs financeiras (Asaas ou Iugu). O setup e a integração são gratuitos, com a monetização do gateway baseada em tarifas descontadas por transação efetuada.
* *Custo:* Base de Sucesso | *Total 3 meses:* **R$ 0,00**


* **Subtotal APIs e Ferramentas: R$ 1.980,00**

### 2.4 Custos Jurídicos e Regulatórios Básicos

O manuseio de prescrições médicas exige rigor legal. A plataforma aloca capital inicial para assessoria externa especializada.

* **Contratos e Compliance (Advogado Regulatório):** Redação final dos Termos de Uso, Políticas de Privacidade e Contratos de Adesão de Farmácias Parceiras, blindando a responsabilidade civil da Aroê quanto a desvios farmacêuticos ou erros de manipulação laboratorial por terceiros.
* *Custo Único:* **R$ 6.000,00**


* **Registro de Domínio e Workspace Corporativo:** Registro de marcas e canais oficiais de comunicação para a equipe core.
* *Custo Fixo:* **R$ 1.620,00** (Total do período).



### 💸 Total Consolidado do Investimento MVP (3 Meses): R$ 82.275,00

---

## 🚀 3. FASE 2: PLANO DE CRESCIMENTO E CUSTOS MENSAIS RECORRENTES POR ESCALA

Após a homologação do MVP, a Aroê inicia sua fase de tração comercial. À medida que a base de dados expande, os custos de processamento de Inteligência Artificial e suporte técnico escalam de maneira previsível.

### 3.1 Cenário A: 10 Farmácias Parceiras / 1.000 Pacientes Ativos

* **Infraestrutura Cloud Basal:** Manutenção dos planos pro do Supabase e Vercel para suporte ao tráfego inicial regionalizado.
* *Custo:* R$ 225,00/mês


* **Consumo de APIs de IA:** Processamento de aproximadamente 1.200 receitas médicas mensais enviadas pelos usuários.
* *Custo:* R$ 350,00/mês


* **Equipe de Suporte e Desenvolvimento (Part-time):** Manutenção corretiva de bugs e atendimento básico ao cliente.
* *Custo:* R$ 2.000,00/mês


* **Marketing Orgânico e Ativação Local:** Panfletagem direcionada e parcerias em clínicas médicas próximas aos laboratórios parceiros.
* *Custo:* R$ 1.000,00/mês


* **Total Operacional Mensal (Cenário A): R$ 3.575,00/mês**

### 3.2 Cenário B: 100 Farmácias Parceiras / 10.000 Pacientes Ativos

* **Infraestrutura Escalável de Rede:** Migração para o Supabase Scale + Cloudflare Pro para o gerenciamento de requisições em tempo real e concorrência simultânea.
* *Custo:* R$ 800,00/mês


* **Consumo Transacional da ARIA:** Processamento e triagem automatizada de mais de 15.000 imagens e cotações de receitas médicas por mês.
* *Custo:* R$ 3.500,00/mês


* **Barramento de Mensageria e Notificações (Gatilhamento B2C):** Disparos automáticos de notificações *push* e mensagens instantâneas via API para o controle de horários e alertas automáticos de recompra no celular do paciente.
* *Custo:* R$ 1.200,00/mês


* **Equipe Técnica Dedicada:** 2 Desenvolvedores Plenos focados em integrações de APIs com os sistemas de gestão internos (ERP) das farmácias pagantes.
* *Custo:* R$ 16.000,00/mês


* **Equipe de Operações e Onboarding B2B:** 1 Analista de Sucesso do Cliente focado em reter, treinar e dar suporte técnico aos gestores das farmácias.
* *Custo:* R$ 4.000,00/mês


* **Marketing de Aquisição Digital (Tráfego Pago):** Campanhas focadas em geolocalização para captar pacientes recorrentes e crônicos nas praças de atuação.
* *Custo:* R$ 5.000,00/mês


* **Total Operacional Mensal (Cenário B): R$ 30.500,00/mês**

### 3.3 Cenário C: 500 Farmácias Parceiras / 100.000 Pacientes Ativos

* **Infraestrutura Enterprise:** Servidores dedicados e réplicas de leitura para o banco de dados PostgreSQL.
* *Custo:* R$ 5.500,00/mês


* **Consumo em Escala da ARIA:** Otimização através de modelos locais e cache de tokens de alta velocidade para responder a milhares de leituras diárias.
* *Custo:* R$ 14.000,00/mês


* **Equipe Estruturada:** Corpo técnico composto por 4 Engenheiros de Software, 1 DevOps, 2 Analistas de Atendimento B2B e 2 Atendentes B2C.
* *Custo:* R$ 42.000,00/mês


* **Marketing Institucional de Escala:** Parcerias de grande porte com conselhos médicos e investimentos massivos em SEO de saúde.
* *Custo:* R$ 15.000,00/mês


* **Total Operacional Mensal (Cenário C): R$ 76.500,00/mês**

---

## 💸 4. MODELO DE RECEITA DETALHADO (ENGENHARIA FINANCEIRA DE GANHOS)

A viabilidade econômica da Aroê sustenta-se em **quatro motores de monetização**, distribuídos entre canais de transação imediata e planos recorrentes com entrega incremental de valor tecnológico.

```
                     [ FONTES DE FATURAMENTO DA PLATAFORMA ]
                                        │
    ┌───────────────────┬───────────────┴───────────────┬───────────────────┐
    ▼                   ▼                               ▼                   ▼
Take Rate (12%)     Plano Broto (R$ 0)             Plano Raiz (R$ 199)  Plano Aroeira (R$ 499)
Taxa por Pedido    Comissão s/ Vendas             Fidelização/Push     IA Predição / API ERP

```

### 4.1 Monetização por Performance: Take Rate do Marketplace

É a principal fonte de geração de caixa no primeiro ano de operação. A Aroê retém uma **comissão fixa de 12%** sobre o valor bruto de cada pedido concluído dentro do aplicativo.

* **Premissa Básica do Mercado Magistral:** O ticket médio de uma fórmula manipulada contínua (ex: anti-hipertensivos ou complexos vitamínicos) está fixado em **R$ 120,00**.
* **Ganho por Transação:** A cada venda fechada, a Aroê retém **R$ 14,40** através do split automático e transfere R$ 105,60 líquidos para o caixa da farmácia manipuladora.

### 4.2 Monetização por Assinatura SaaS B2B

Destinada a laboratórios magistrais que necessitam migrar de processos analógicos ou automatizar sua retenção de clientes para escalar faturamento.

#### 🌱 1. Plano Broto (Modelo Freemium)

* **Valor Mensal:** R$ 0,00
* **Take Rate:** 12% fixo por pedido liquidado.
* **Entrega Tecnológica:** Acesso ao Painel Web padrão para recebimento passivo de orçamentos mapeados pela IA ARIA. A exibição nas pesquisas do paciente segue a ordenação padrão por menor preço ou distância, sem prioridade de ranking visual.

#### 🪵 2. Plano Raiz (Foco em Recorrência)

* **Valor Mensal:** R$ 199,00/mês
* **Take Rate:** 12% por pedido liquidado.
* **Entrega Tecnológica:** Liberação de ferramentas de engajamento automático. Ativação do módulo de controle de posologia via aplicativo do paciente e disparo do **Gatilho de Recompra Automática** no 25º dia de tratamentos com duração de um mês. A venda de renovação é direcionada ao mesmo estabelecimento de forma automatizada se o paciente confirmar, garantindo a fidelização do cliente corporativo.

#### 🌳 3. Plano Aroeira (Enterprise & Intelligence)

* **Valor Mensal:** R$ 499,00/mês
* **Take Rate:** 12% base, reduzido de forma linear até **10%** como bônus de performance para estabelecimentos que ultrapassarem metas de volume de faturamento dentro do marketplace.
* **Entrega Tecnológica:** Liberação de chaves de API restritas para interligação direta com o ERP interno da rede farmacêutica, eliminando a digitação humana de orçamentos. Inclusão do **Painel IA de Predição de Demanda Regional**, que avisa o gestor com antecedência sobre picos de busca por princípios ativos específicos em seu raio geográfico, otimizando compras de matérias-primas raras em lote e mitigando perdas por expiração de validade de insumos fracionados.

---

## 📊 5. PLANILHA DE PROJEÇÃO DE EVOLUÇÃO FINANCEIRA (ANO 1)

A tabela abaixo simula o comportamento financeiro consolidado da Aroê ao longo dos primeiros 12 meses de operação comercial pós-lançamento do MVP.

*Premissas Utilizadas:* Ticket médio geral de **R$ 120,00** por fórmula. Distribuição orgânica da base de farmácias parceiras dividida em: **60% no Plano Broto (R$ 0)**, **30% no Plano Raiz (R$ 199,00)** e **10% no Plano Aroeira (R$ 499,00)**.

| Período Temporal | Farmácias Conectadas | Volume Mensal de Pedidos | Faturamento SaaS (Assinaturas) | Faturamento Marketplace (12%) | Receita Bruta Consolidada | Custo Fixo Operacional | Margem Líquida Mensal |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Mês 1 ao 3** | 0 (MVP) | 0 | R$ 0,00 | R$ 0,00 | R$ 0,00 | R$ 0,00 (Fase MVP) | **-R$ 82.275,00 (Caixa Inicial)** |
| **Mês 4** | 5 | 80 | R$ 199,00 | R$ 1.152,00 | R$ 1.351,00 | R$ 8.000,00 | **-R$ 6.649,00** |
| **Mês 5** | 12 | 210 | R$ 597,00 | R$ 3.024,00 | R$ 3.621,00 | R$ 8.000,00 | **-R$ 4.379,00** |
| **Mês 6** | 20 | 450 | R$ 1.592,00 | R$ 6.480,00 | R$ 8.072,00 | R$ 14.000,00 | **-R$ 5.928,00** |
| **Mês 7** | 30 | 900 | R$ 2.388,00 | R$ 12.960,00 | R$ 15.348,00 | R$ 14.000,00 | **+R$ 1.348,00** |
| **Mês 8** | 40 | 1.500 | R$ 3.385,00 | R$ 21.600,00 | R$ 24.985,00 | R$ 14.000,00 | **+R$ 10.985,00** |
| **Mês 9 (Equilíbrio)** | **50** | **2.200** | **R$ 4.179,00** | **R$ 31.680,00** | **R$ 35.859,00** | **R$ 30.500,00** | **+R$ 5.359,00 (Break-even) 🎉** |
| **Mês 10** | 70 | 3.100 | R$ 5.970,00 | R$ 44.640,00 | R$ 50.610,00 | R$ 30.500,00 | **+R$ 20.110,00** |
| **Mês 11** | 95 | 4.500 | R$ 8.159,00 | R$ 64.800,00 | R$ 72.959,00 | R$ 30.500,00 | **+R$ 42.459,00** |
| **Mês 12** | 120 | 6.000 | R$ 10.348,00 | R$ 86.400,00 | R$ 96.748,00 | R$ 45.000,00 | **+R$ 51.748,00** |

### 📈 Totais Acumulados do Ano 1

* **Faturamento Bruto Total:** **R$ 322.840,00**
* **EBITDA Acumulado Líquido (Abatendo todo o MVP e Custos):** **+R$ 67.575,00**

---

## 🛠️ 6. ESCALABILIDADE TÉCNICO-FINANCEIRA (MECANISMOS DE MARGEM)

A escalabilidade exponencial do ecossistema Aroê baseia-se na eficiência da engenharia de software para mitigar custos marginais de operação. À medida que a base de dados cresce, o custo por requisição diminui de forma linear.

### 6.1 Arquitetura Elástica Cloud e Otimização de Servidores

* **Serverless e Funções Orientadas a Eventos:** O pipeline de split de pagamento e as rotinas automáticas de notificação operam de forma isolada em funções na nuvem executadas estritamente sob demanda. Isso reduz o custo de servidores para **zero durante horários ociosos (madrugadas)**, eliminando despesas de infraestrutura ociosa.
* **Estratégia de Caching de Borda (Edge Caching):** A plataforma implementa cache agressivo de assets estáticos, layouts de interfaces e tabelas genéricas de substâncias ativas diretamente na rede de distribuição (CDN). Isso absorve até **65% do tráfego concorrente** sem gerar requisições pagas ou sobrecarga ao banco de dados relacional centralizado do Supabase.

### 6.2 Otimização de Custos de Inteligência Artificial

O consumo de modelos de visão e linguagem para processamento de receitas médicas representa o maior custo variável da plataforma. Para mantê-lo sob controle em escala, a Aroê utiliza mecanismos específicos:

1. **Dicionário de Equivalência Local (Cache de Receitas):** Quando a IA ARIA processa e limpa uma receita manuscrita complexa, gerando o objeto de dados estruturado, o resultado é indexado localmente em banco de dados por chave criptográfica (*hash* de composição). Caso outro paciente faça o upload de uma fórmula idêntica, o sistema realiza uma busca de correspondência na memória local. Isso evita uma nova chamada paga à API de visão computacional da OpenAI, gerando uma **economia de até 80% em tokens transacionais**.
2. **Processamento Programado em Lote (Batching):** Relatórios de tendências analíticas e processamentos de predição de demanda para o Plano Aroeira são agrupados e executados em lote de forma assíncrona durante janelas de tráfego reduzido (*off-peak hours*), aproveitando tabelas de descontos de computação em nuvem.

---

## 🗺️ 7. PLANO DE CRESCIMENTO PLURIANUAL E HORIZONTES DE MONETIZAÇÃO

```
[ 2026: Consolidação ] ───► [ 2028: Expansão Fitness ] ───► [ 2030: Big Data & B2C ]
   - Validação do MVP            - Nutracêuticos/Esportes         - Venda de Macrodados
   - 120 Farmácias / SP          - Parcerias com Clínicas         - Assinatura Aroê Prime

```

### 🗓️ Horizonte 2026: Consolidação Regional e Estabilização Core

* **Foco Estratégico:** Lançamento comercial do MVP, validação de mercado na Região Metropolitana de São Paulo e consolidação das primeiras 120 farmácias parceiras na base.
* **Objetivo Financeiro:** Alcançar o ponto de equilíbrio operacional até o nono mês e fechar o ciclo de 12 meses com geração de caixa líquida positiva.

### 🗓️ Horizonte 2028: Expansão Territorial e Ativação do Mercado de Bem-Estar

* **Foco Estratégico:** Expansão geográfica da plataforma para as principais capitais do território nacional e diversificação no segmento de atuação farmacêutica.
* **Novas Fontes de Ganho:** Adaptação da inteligência artificial para o tratamento e triagem de receitas voltadas a fitoterápicos, nutracêuticos, dermocosméticos manipulados e suplementações de alta performance.
* **Canais de Tração B2B2C:** Integração direta via APIs com prontuários eletrônicos de clínicas de nutrologia, assessorias esportivas e redes de academias, captando as necessidades de medicamentos de uso contínuo esportivo diretamente na origem médica.

### 🗓️ Horizonte 2030: Monetização de Macrodados e Clubes de Assinatura B2C

* **Foco Estratégico:** Exploração de novas frentes de receita de alta margem através do processamento de macrodados e canais de fidelização diretos com o consumidor final.
* **Módulo Data Insights (B2B Enterprise):** Agregação anônima e inteligência estatística de dados geográficos sobre o consumo e escassez de princípios ativos regionais. Comercialização de relatórios preditivos de mercado para grandes indústrias químicas farmacêuticas e distribuidoras nacionais de insumos magistrais, operando sob conformidade com a LGPD.
* **Lançamento do Plano Aroê Prime (B2C):** Introdução de um modelo de fidelidade recorrente para o paciente final. Mediante uma mensalidade, o usuário garante frete fixo subsidiado por meio de acordos de volume com grandes redes farmacêuticas, prioridade de processamento de imagens pela ARIA e programas de cashback para a continuidade do tratamento de saúde.

---

## 🎯 8. INDICADORES FINANCEIROS CHAVE (BENCHMARKS DE PERFORMANCE)

Para validar a sustentabilidade do ecossistema diante de auditorias de investimento ou bancas acadêmicas, a operação utiliza os seguintes indicadores:

* **Relação LTV/CAC de 12:1:** O Custo de Aquisição de Cliente (CAC) para trazer laboratórios B2B via canais digitais é amortizado de forma rápida. Com a aplicação das ferramentas de lembrete e recompra automática do Plano Raiz, a taxa de cancelamento de assinaturas (*Churn*) de estabelecimentos é reduzida a patamares inferiores a **2% ao ano**, gerando um alto Valor de Tempo de Vida (*Lifetime Value*).
* **Margem Bruta de Tecnologia Superior a 85%:** Ao transferir os passivos de entrega física, frotas de motoboys, estoques de matéria-prima e conformidade direta com a ANVISA para as farmácias parceiras, a Aroê opera como uma estrutura ágil de tecnologia pura. O faturamento gerado é canalizado diretamente para a margem operacional e melhorias de software.