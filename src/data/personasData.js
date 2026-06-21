// src/data/personasData.js

export const personasPayloads = {
  amanda: {
    user: {
      nome: "Amanda",
      tipo: "Paciente"
    },
    ui: {
      badge: "Tratamento Ativo",
      badgeCor: "bg-indigo-500/20 text-indigo-200 border border-indigo-500/30",
      gradient: "from-purple-600 via-purple-700 to-indigo-600 shadow-purple-900/10",
      mensagemWelcome: "Suas receitas já foram processadas pelas farmácias parceiras e as propostas estão prontas. Você tem <span class='font-extrabold text-white underline decoration-2 decoration-emerald-400'>2 pedidos</span> aguardando sua validação para iniciar a produção."
    },
    perfil: {
      nome: "Amanda Santos de Carvalho",
      email: "amanda.santos@exemplo.com",
      cpf: "123.456.789-00",
      endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
      peso: "62",
      altura: "1.65",
      alergias: "Nenhuma alergia grave relatada. Sensibilidade a corantes artificiais."
    },
    receitasIniciais: [
      {
        id: 1,
        nome: "Vitaminas A-Z",
        formula: "Fórmula manipulada em cápsulas",
        tipo: "Suplementação",
        dataEnvio: new Date().toLocaleDateString("pt-BR"),
        pedidoId: "#AROE-1012",
        status: "Recebido",
        statusCor: "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400",
        entregaInfo: "Validade: 90 dias",
        textoExtraido: "Paciente: Amanda Santos\n\nUso Diário:\n1. Vitamina A 5000 UI\n2. Vitamina C 500mg\n3. Zinco Quelato 15mg\n4. Magnésio 200mg\nTomar 1 cápsula ao dia.",
        confidence: 96,
        imagemUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
        price: "R$ 43,50",
        pharmacies: 3,
        farmaciaDestaque: "Farmácia Bem Viver",
        stepAtivo: 1,
        dadosEstruturados: {
          paciente: "Amanda Santos",
          nomeMedico: "Dr. Roberto Alencar",
          crmMedico: "123456/SP",
          cnpjFarmacia: "12.345.678/0001-99",
          dataEmissao: new Date().toLocaleDateString("pt-BR"),
          validadeDias: "90",
          tipoReceita: "Suplementação"
        }
      },
      {
        id: 2,
        nome: "Enzimas Digestivas",
        formula: "Fórmula manipulada em cápsulas gastrorresistentes",
        tipo: "Uso Contínuo",
        dataEnvio: new Date().toLocaleDateString("pt-BR"),
        pedidoId: "#AROE-1013",
        status: "Aguardando orçamento",
        statusCor: "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400",
        entregaInfo: "Validade: 60 dias",
        textoExtraido: "Dra. Patrícia Nogueira - Gastroenterologia\nCRM: 778899/SP\n\nPaciente: Amanda Santos\n\nUso nas Refeições Principais:\n1. Pancreatina 25.000 UI\n2. Bromelina 100mg\n3. Papaína 50mg\nTomar 1 cápsula antes do almoço e do jantar.",
        confidence: 92,
        imagemUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format&fit=crop&q=60",
        price: "R$ 58,90",
        pharmacies: 3,
        farmaciaDestaque: "Farmácia Bem Viver",
        stepAtivo: 1,
        dadosEstruturados: {
          paciente: "Amanda Santos",
          nomeMedico: "Dra. Patrícia Nogueira",
          crmMedico: "778899/SP",
          cnpjFarmacia: "12.345.678/0001-99",
          dataEmissao: new Date().toLocaleDateString("pt-BR"),
          validadeDias: "60",
          tipoReceita: "Uso Contínuo"
        }
      }
    ],
    lembretes: {
      proximos: [
        { id: 401, horario: '08:00', titulo: 'Colágeno Verisol', subtitulo: 'Tomar 1 sachê com água', tag: 'Hoje', iconType: 'droplet', iconBg: 'bg-pink-50 text-pink-500 dark:bg-pink-950/40 dark:text-pink-400' },
        { id: 402, horario: '12:30', titulo: 'Enzimas Digestivas', subtitulo: 'Tomar 1 cápsula antes do almoço', tag: 'Hoje', iconType: 'pill', iconBg: 'bg-amber-50 text-amber-500 dark:bg-amber-950/40 dark:text-amber-400' },
        { id: 403, horario: '14:00', titulo: 'Polivitamínico A-Z', subtitulo: 'Tomar 1 cápsula pós almoço', tag: 'Hoje', iconType: 'pill', iconBg: 'bg-emerald-50 text-emerald-500 dark:bg-emerald-950/40 dark:text-emerald-400' }
      ],
      todos: [
        { id: 41, horario: '08:00', titulo: 'Colágeno Verisol', subtitulo: 'Tomar 1 sachê com água', frequencia: 'Diariamente', freqIconType: 'refresh', status: 'Hoje', statusCor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400', iconType: 'droplet' },
        { id: 42, horario: '12:30', titulo: 'Enzimas Digestivas', subtitulo: 'Tomar 1 cápsula antes do almoço', frequencia: 'Diariamente', freqIconType: 'refresh', status: 'Hoje', statusCor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400', iconType: 'pill' },
        { id: 43, horario: '14:00', titulo: 'Polivitamínico A-Z', subtitulo: 'Tomar 1 cápsula pós almoço', frequencia: 'Diariamente', freqIconType: 'refresh', status: 'Hoje', statusCor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400', iconType: 'pill' },
        { id: 44, horario: '19:30', titulo: 'Enzimas Digestivas', subtitulo: 'Tomar 1 cápsula antes do jantar', frequencia: 'Diariamente', freqIconType: 'refresh', status: 'Hoje', statusCor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400', iconType: 'pill' },
        { id: 45, horario: '21:00', titulo: 'Chá de Camomila + Cidreira', subtitulo: 'Infusão 200ml antes de dormir', frequencia: 'Diariamente', freqIconType: 'refresh', status: 'Hoje', statusCor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400', iconType: 'moon' }
      ]
    },
    notificacoes: [
      { id: 1, titulo: 'Novos orçamentos recebidos', descricao: 'Você recebeu 3 novos orçamentos para "Enzimas Digestivas".', tempo: 'Há 10 min', iconType: 'tag', iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400', lida: false, categoria: 'Pedidos' },
      { id: 2, titulo: 'Medicamento pronto para retirada', descricao: 'Sua fórmula personalizada já está disponível na farmácia parceira.', tempo: 'Há 2 horas', iconType: 'package', iconBg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400', lida: false, categoria: 'Pedidos' },
      { id: 3, titulo: 'Lembrete de Tratamento', descricao: 'Está quase na hora de tomar seu Polivitamínico A-Z.', tempo: 'Há 3 horas', iconType: 'bell', iconBg: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400', lida: false, categoria: 'Tratamentos' },
      { id: 4, titulo: 'Receita enviada com sucesso', descricao: 'Sua receita "Vitaminas A-Z" foi enviada para as farmácias.', tempo: 'Ontem, 14:30', iconType: 'fileText', iconBg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400', lida: true, categoria: 'Sistema' },
      { id: 5, titulo: 'Nova receita processada', descricao: 'Sua receita "Enzimas Digestivas" foi lida e estruturada com sucesso pela nossa IA.', tempo: 'Ontem, 09:10', iconType: 'fileText', iconBg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400', lida: true, categoria: 'Sistema' },
      { id: 6, titulo: 'Cadastro Validado', descricao: 'Seu perfil técnico e dados de acesso foram validados com sucesso.', tempo: '28/05', iconType: 'checkCircle2', iconBg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400', lida: true, categoria: 'Sistema' },
      { id: 7, titulo: 'Cupom de Boas-vindas Aroê', descricao: 'Aproveite R$ 20 de desconto no seu primeiro pedido solicitado.', tempo: '28/05', iconType: 'gift', iconBg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400', lida: true, categoria: 'Sistema' }
    ],
    historico: {
      resumo: { pedidos: 6, receitas: 4, concluidos: 3, cumprimento: '95%' },
      economia: '268,40',
      maio: [
        { id: 401, categoria: 'pedidos', titulo: 'Pedido em transporte', descricao: 'Seu pedido de dermocosméticos está a caminho', data: '27/05/2025', hora: '09:30', iconType: 'box', iconBg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' },
        { id: 402, categoria: 'tratamentos', titulo: 'Início de ciclo', descricao: 'Novo ciclo de suplementação capilar iniciado', data: '22/05/2025', hora: '08:00', iconType: 'leaf', iconBg: 'bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400' },
        { id: 403, categoria: 'orçamentos', titulo: 'Orçamento recebido', descricao: '3 farmácias enviaram propostas para "Enzimas Digestivas"', data: '19/05/2025', hora: '11:45', iconType: 'tag', iconBg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400' }
      ],
      abril: [
        { id: 404, categoria: 'orçamentos', titulo: 'Orçamento aceito', descricao: 'Orçamento de manipulados aprovado com sucesso', data: '15/04/2025', hora: '14:20', iconType: 'tag', iconBg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400' },
        { id: 405, categoria: 'pedidos', titulo: 'Pedido entregue', descricao: 'Complexo Vitamínico B chegou ao endereço cadastrado', data: '02/04/2025', hora: '16:50', iconType: 'box', iconBg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' }
      ]
    },
    tratamentos: {
      principal: {
        nome: 'Enzimas digestivas',
        tipo: 'Fórmula manipulada',
        status: 'Em andamento',
        iniciadoEm: '15/04/2025',
        duracao: '30 dias',
        frequencia: '1 cápsula por dia',
        progresso: 70,
        progressoTexto: '20 de 30 dias concluídos'
      },
      outros: [
        {
          nome: 'Complexo Vitamínico B',
          tipo: 'Suplementação manipulada',
          status: 'Entregue',
          statusCor: 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400',
          iniciadoEm: '10/03/2025',
          duracao: '60 dias',
          frequencia: '1 cápsula pela manhã'
        },
        {
          nome: 'Colágeno Verisol',
          tipo: 'Suplementação Estética',
          status: 'Em uso',
          statusCor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
          iniciadoEm: '01/05/2025',
          duracao: '90 dias',
          frequencia: '1 sachê pela manhã'
        }
      ]
    }
  },

  ricardo: {
    user: {
      nome: "Ricardo Augusto",
      tipo: "Paciente"
    },
    ui: {
      badge: "Rotina de Saúde",
      badgeCor: "bg-slate-500/20 text-slate-300 border border-slate-500/30",
      gradient: "from-blue-600 via-blue-700 to-cyan-600 shadow-blue-900/10",
      mensagemWelcome: "Não encontramos nenhuma cotação ou pedido em andamento para o seu perfil neste momento. Caso precise manipular uma nova fórmula, use o leitor digital logo abaixo."
    },
    perfil: {
      nome: "Ricardo Almeida Prado",
      email: "ricardo.prado@exemplo.com",
      cpf: "456.123.789-55",
      endereco: "Rua dos Pinheiros, 840 - Pinheiros, São Paulo - SP",
      peso: "88",
      altura: "1.82",
      alergias: "Diabético Tipo 2. Intolerância a Lactose (utilizar cápsulas livres de excipientes com lactose)."
    },
    receitasIniciais: [
      {
        id: 101,
        nome: "Anti-hipertensivo + Complexo Vitamínico",
        formula: "Fórmula manipulada em cápsulas",
        tipo: "Uso Contínuo",
        dataEnvio: new Date().toLocaleDateString("pt-BR"),
        pedidoId: "#AROE-8831",
        status: "Aguardando orçamento",
        statusCor: "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400",
        entregaInfo: "Validade: 180 dias",
        textoExtraido: "Dr. Carlos Eduardo - Cardiologista\nCRM: 456789/SP\n\nPaciente: Ricardo Augusto\n\nUso Contínuo:\n1. Losartana Potássica 50mg\n2. Anlodipino 5mg\n3. Vitamina D 2.000 UI\n4. Vitamina B12 500mcg\nMandar qsp 60 cápsulas.",
        confidence: 94,
        imagemUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
        price: "R$ 89,90",
        pharmacies: 4,
        farmaciaDestaque: "Fórmula Ativa",
        stepAtivo: 1,
        dadosEstruturados: {
          paciente: "Ricardo Augusto",
          nomeMedico: "Dr. Carlos Eduardo",
          crmMedico: "456789/SP",
          cnpjFarmacia: "12.345.678/0001-99",
          dataEmissao: new Date().toLocaleDateString("pt-BR"),
          validadeDias: "180",
          tipoReceita: "Uso Contínuo"
        }
      },
      {
        id: 102,
        nome: "Gel Transdérmico Anti-inflamatório",
        formula: "Gel Pentravan para aplicação tópica",
        tipo: "Simples",
        dataEnvio: new Date().toLocaleDateString("pt-BR"),
        pedidoId: "#AROE-8832",
        status: "Recebido",
        statusCor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
        entregaInfo: "Validade: 30 dias",
        textoExtraido: "Dr. Marcos Vinícius - Ortopedia e Traumatologia\nCRM: 554321/SP\n\nPaciente: Ricardo Augusto\n\nUso Local/Tópico:\n1. Cetoprofeno 10%\n2. Ciclobenzaprina 2%\nGel Pentravan qsp 50g\nAplicar no ombro afetado de 12h em 12h com leve massagem.",
        confidence: 97,
        imagemUrl: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=500&auto=format&fit=crop&q=60",
        price: "R$ 72,00",
        pharmacies: 3,
        farmaciaDestaque: "PharmaSkin Soluções",
        stepAtivo: 2,
        dadosEstruturados: {
          paciente: "Ricardo Augusto",
          nomeMedico: "Dr. Marcos Vinícius",
          crmMedico: "554321/SP",
          cnpjFarmacia: "55.444.333/0001-22",
          dataEmissao: new Date().toLocaleDateString("pt-BR"),
          validadeDias: "30",
          tipoReceita: "Simples"
        }
      },
      {
        id: 103,
        nome: "Suplemento Esportivo Sinergia",
        formula: "Fórmula manipulada em pó para diluição",
        tipo: "Suplementação",
        dataEnvio: new Date().toLocaleDateString("pt-BR"),
        pedidoId: "#AROE-8833",
        status: "Recebido",
        statusCor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
        entregaInfo: "Validade: 120 dias",
        textoExtraido: "Dra. Fernanda Costa - Nutrologia\nCRM: 332211/SP\n\nPaciente: Ricardo Augusto\n\nUso Diário:\n1. Creatina Monohidratada 5g\n2. Glutamina 5g\n3. Magnésio Dimalato 200mg\nDiluir 1 medidor em água pela manhã.",
        confidence: 95,
        imagemUrl: "https://images.unsplash.com/photo-1579722820258-26b13bfa0c70?w=500&auto=format&fit=crop&q=60",
        price: "R$ 96,50",
        pharmacies: 3,
        farmaciaDestaque: "Fórmula Ativa",
        stepAtivo: 2,
        dadosEstruturados: {
          paciente: "Ricardo Augusto",
          nomeMedico: "Dra. Fernanda Costa",
          crmMedico: "332211/SP",
          cnpjFarmacia: "12.345.678/0001-99",
          dataEmissao: new Date().toLocaleDateString("pt-BR"),
          validadeDias: "120",
          tipoReceita: "Suplementação"
        }
      }
    ],
    lembretes: {
      proximos: [
        { id: 301, horario: '06:00', titulo: 'Suplemento Sinergia', subtitulo: 'Tomar 1 medidor com água', tag: 'Hoje', iconType: 'droplet', iconBg: 'bg-blue-50 text-blue-500 dark:bg-blue-950/40 dark:text-blue-400' },
        { id: 302, horario: '12:00', titulo: 'Gel Transdérmico', subtitulo: 'Aplicar no ombro com leve massagem', tag: 'Hoje', iconType: 'pill', iconBg: 'bg-cyan-50 text-cyan-500 dark:bg-cyan-950/40 dark:text-cyan-400' }
      ],
      todos: [
        { id: 31, horario: '06:00', titulo: 'Suplemento Sinergia', subtitulo: 'Tomar 1 medidor com água', frequencia: 'Diariamente', freqIconType: 'refresh', status: 'Hoje', statusCor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400', iconType: 'droplet' },
        { id: 32, horario: '12:00', titulo: 'Gel Transdérmico', subtitulo: 'Aplicar no ombro afetado de 12h em 12h', frequencia: 'Diariamente', freqIconType: 'refresh', status: 'Hoje', statusCor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400', iconType: 'pill' },
        { id: 33, horario: '00:00', titulo: 'Gel Transdérmico', subtitulo: 'Aplicar no ombro afetado de 12h em 12h', frequencia: 'Diariamente', freqIconType: 'refresh', status: 'Hoje', statusCor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400', iconType: 'pill' },
        { id: 34, horario: '21:00', titulo: 'Melatonina Gota', subtitulo: '4 gotas antes de dormir', frequencia: 'Dom a Qui', freqIconType: 'calendar', status: 'Hoje', statusCor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400', iconType: 'moon' }
      ]
    },
    notificacoes: [
      { id: 1, titulo: 'Orçamento disponível', descricao: 'Você recebeu 4 orçamentos para o "Anti-hipertensivo + Complexo Vitamínico".', tempo: 'Há 20 min', iconType: 'tag', iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400', lida: false, categoria: 'Pedidos' },
      { id: 2, titulo: 'Gel Transdérmico pronto', descricao: 'Seu Gel Pentravan Anti-inflamatório está disponível para retirada na PharmaSkin.', tempo: 'Há 1 hora', iconType: 'package', iconBg: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400', lida: false, categoria: 'Pedidos' },
      { id: 3, titulo: 'Suplemento Sinergia entregue', descricao: 'Seu suplemento esportivo já está disponível para retirada na Fórmula Ativa.', tempo: 'Há 4 horas', iconType: 'package', iconBg: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400', lida: false, categoria: 'Pedidos' },
      { id: 4, titulo: 'Lembrete: Suplemento Sinergia', descricao: 'Não esqueça de tomar 1 medidor com água às 06:00.', tempo: 'Há 5 horas', iconType: 'bell', iconBg: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400', lida: true, categoria: 'Tratamentos' },
      { id: 5, titulo: 'Receita processada', descricao: 'Sua receita "Gel Transdérmico Anti-inflamatório" foi processada e enviada para análise.', tempo: 'Ontem, 10:15', iconType: 'fileText', iconBg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400', lida: true, categoria: 'Sistema' },
      { id: 6, titulo: 'Cadastro Validado', descricao: 'Seu perfil técnico e dados de acesso foram validados com sucesso.', tempo: '25/05', iconType: 'checkCircle2', iconBg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400', lida: true, categoria: 'Sistema' },
      { id: 7, titulo: 'Cupom de Boas-vindas Aroê', descricao: 'Aproveite R$ 20 de desconto no seu primeiro pedido solicitado.', tempo: '25/05', iconType: 'gift', iconBg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400', lida: true, categoria: 'Sistema' }
    ],
    historico: {
      resumo: { pedidos: 3, receitas: 3, concluidos: 2, cumprimento: '85%' },
      economia: '102,40',
      maio: [
        { id: 301, categoria: 'lembretes', titulo: 'Lembrete ignorado', descricao: 'O app registrou um atraso no "Suplemento Sinergia" de Ricardo', data: '27/05/2025', hora: '06:45', iconType: 'bell', iconBg: 'bg-orange-50 text-orange-500 dark:bg-orange-950/40 dark:text-orange-400' },
        { id: 302, categoria: 'tratamentos', titulo: 'Tratamento Concluído', descricao: 'Ciclo de 30 dias de Melatonina Gota finalizado', data: '22/05/2025', hora: '23:00', iconType: 'leaf', iconBg: 'bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400' },
        { id: 303, categoria: 'pedidos', titulo: 'Pedido retirado', descricao: 'Gel Transdérmico Anti-inflamatório retirado na PharmaSkin Soluções', data: '18/05/2025', hora: '17:30', iconType: 'box', iconBg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' }
      ],
      abril: [
        { id: 304, categoria: 'pedidos', titulo: 'Pedido realizado', descricao: 'Pedido de Nutracêuticos Esportivos faturado', data: '29/04/2025', hora: '19:12', iconType: 'box', iconBg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' },
        { id: 305, categoria: 'orçamentos', titulo: 'Orçamento aprovado', descricao: 'Orçamento do Suplemento Esportivo Sinergia aprovado na Fórmula Ativa', data: '20/04/2025', hora: '13:05', iconType: 'tag', iconBg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400' }
      ]
    },
    tratamentos: {
      principal: {
        nome: 'Anti-hipertensivo (Losartana + Anlodipino)',
        tipo: 'Tratamento Contínuo',
        status: 'Em andamento',
        iniciadoEm: new Date().toLocaleDateString('pt-BR'),
        duracao: 'Uso Contínuo',
        frequencia: '1 cápsula a cada 12h',
        progresso: 15,
        progressoTexto: 'Tratamento recém-iniciado (Fórmula Nova)'
      },
      outros: [
        {
          nome: 'Complexo Vitamínico (D3 + B12 Personalizado)',
          tipo: 'Suplementação de Hipovitaminose',
          status: 'Produzindo',
          statusCor: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
          iniciadoEm: 'Aguardando Lab',
          duracao: '90 dias',
          frequencia: '1 cápsula ao dia no almoço'
        },
        {
          nome: 'Gel Transdérmico Anti-inflamatório',
          tipo: 'Tratamento Tópico',
          status: 'Em uso',
          statusCor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
          iniciadoEm: '18/05/2025',
          duracao: '30 dias',
          frequencia: 'Aplicar de 12h em 12h'
        }
      ]
    }
  },

  irene: {
    user: {
      nome: "Dona Irene",
      tipo: "Paciente (WhatsApp)"
    },
    ui: {
      badge: "Cuidador Familiar",
      badgeCor: "bg-amber-500/20 text-amber-200 border border-amber-500/30",
      gradient: "from-rose-600 via-rose-700 to-orange-600 shadow-rose-900/10",
      mensagemWelcome: "O monitoramento médico do seu dependente está ativo. Identificamos <span class='font-extrabold text-white underline decoration-2 decoration-orange-400'>1 pedido urgente</span> do manipulado veterinário do Fred avançando na linha de produção."
    },
    perfil: {
      nome: "Irene Souza Silva",
      email: "dona.irene@exemplo.com",
      cpf: "987.654.321-11",
      endereco: "Av. Paulista, 1500 - Bela Vista, São Paulo - SP",
      peso: "74",
      altura: "1.58",
      alergias: "Hipertensa. Alergia severa a Corante Tartrazina e AAS (Ácido Acetilsalicílico)."
    },
    receitasIniciais: [
      {
        id: 201,
        nome: "Manipulado Veterinário (Fred)",
        formula: "Fórmula em biscoito palatável flavorizado",
        tipo: "Uso Veterinário",
        dataEnvio: new Date().toLocaleDateString("pt-BR"),
        pedidoId: "#AROE-4421",
        status: "Aguardando orçamento",
        statusCor: "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400",
        entregaInfo: "Validade: 30 dias",
        textoExtraido: "Dra. Amanda Silva - Medicina Veterinária\nCRMV: 9912-SP\n\nPaciente Canino: Fred (Prop. Irene)\n\nUso Oral:\n1. Pimobendan 2,5mg em formato de biscoito palatável flavorizado sabor carne.\nEnviar 30 biscoitos.",
        confidence: 88,
        imagemUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60",
        price: "R$ 65,00",
        pharmacies: 2,
        farmaciaDestaque: "PetFórmulas Unipessoal",
        stepAtivo: 1,
        dadosEstruturados: {
          paciente: "Fred (Cachorro da Dona Irene)",
          nomeMedico: "Dra. Amanda Silva (CRMV)",
          crmMedico: "9912/SP",
          cnpjFarmacia: "99.888.777/0001-11",
          dataEmissao: new Date().toLocaleDateString("pt-BR"),
          validadeDias: "30",
          tipoReceita: "Uso Veterinário"
        }
      },
      {
        id: 202,
        nome: "Cálcio + Fixador de Osteoporose",
        formula: "Fórmula em sachês de absorção rápida",
        tipo: "Uso Contínuo",
        dataEnvio: new Date().toLocaleDateString("pt-BR"),
        pedidoId: "#AROE-4422",
        status: "Aguardando orçamento",
        statusCor: "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400",
        entregaInfo: "Validade: 180 dias",
        textoExtraido: "Dra. Júlia Lima - Geriatria\nCRM: 112233/SP\n\nPaciente: Irene dos Santos\n\nUso Diário:\n1. Carbonato de Cálcio 500mg\n2. Alendronato Sódico 70mg\n3. Magnésio Quelato 150mg\nTomar 1 vez ao dia pela manhã.",
        confidence: 91,
        imagemUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
        price: "R$ 112,90",
        pharmacies: 5,
        farmaciaDestaque: "Naturale Manipulação",
        stepAtivo: 2,
        dadosEstruturados: {
          paciente: "Irene dos Santos",
          nomeMedico: "Dra. Júlia Lima",
          crmMedico: "112233/SP",
          cnpjFarmacia: "99.888.777/0001-11",
          dataEmissao: new Date().toLocaleDateString("pt-BR"),
          validadeDias: "180",
          tipoReceita: "Uso Contínuo"
        }
      },
      {
        id: 203,
        nome: "Fitoterápico Regulador do Sono",
        formula: "Fórmula fitoterápica em cápsulas vegetais",
        tipo: "Simples",
        dataEnvio: new Date().toLocaleDateString("pt-BR"),
        pedidoId: "#AROE-4423",
        status: "Aguardando orçamento",
        statusCor: "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400",
        entregaInfo: "Validade: 60 dias",
        textoExtraido: "Dra. Júlia Lima - Geriatria\nCRM: 112233/SP\n\nPaciente: Irene dos Santos\n\nUso Noturno:\n1. Passiflora incarnata extrato seco 300mg\n2. Valeriana officinalis 100mg\n3. Mulungu extrato seco 150mg\nMandar cápsulas vegetais. Tomar 1 h antes de dormir.",
        confidence: 93,
        imagemUrl: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=500&auto=format&fit=crop&q=60",
        price: "R$ 54,90",
        pharmacies: 3,
        farmaciaDestaque: "BioFórmula Ervas",
        stepAtivo: 1,
        dadosEstruturados: {
          paciente: "Irene dos Santos",
          nomeMedico: "Dra. Júlia Lima",
          crmMedico: "112233/SP",
          cnpjFarmacia: "99.888.777/0001-11",
          dataEmissao: new Date().toLocaleDateString("pt-BR"),
          validadeDias: "60",
          tipoReceita: "Simples"
        }
      },
      {
        id: 204,
        nome: "Probiótico + Vitamina M (Colina)",
        formula: "Fórmula manipulada em sachês",
        tipo: "Suplementação",
        dataEnvio: new Date().toLocaleDateString("pt-BR"),
        pedidoId: "#AROE-4424",
        status: "Recebido",
        statusCor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
        entregaInfo: "Validade: 90 dias",
        textoExtraido: "Dra. Júlia Lima - Geriatria\nCRM: 112233/SP\n\nPaciente: Irene dos Santos\n\nUso Diário:\n1. Lactobacillus reuteri 1 bilhão UFC\n2. Vitamina M (Colina) 100mg\nDiluir 1 sachê em água e tomar em jejum noturno.",
        confidence: 90,
        imagemUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format&fit=crop&q=60",
        price: "R$ 48,70",
        pharmacies: 3,
        farmaciaDestaque: "Naturale Manipulação",
        stepAtivo: 2,
        dadosEstruturados: {
          paciente: "Irene dos Santos",
          nomeMedico: "Dra. Júlia Lima",
          crmMedico: "112233/SP",
          cnpjFarmacia: "99.888.777/0001-11",
          dataEmissao: new Date().toLocaleDateString("pt-BR"),
          validadeDias: "90",
          tipoReceita: "Suplementação"
        }
      }
    ],
    lembretes: {
      proximos: [
        { id: 201, horario: '08:00', titulo: 'Biscoito do Fred', subtitulo: '1 biscoito sabor carne (Pimobendan)', tag: 'Hoje', iconType: 'heart', iconBg: 'bg-rose-50 text-rose-500 dark:bg-rose-950/40 dark:text-rose-400' },
        { id: 202, horario: '08:30', titulo: 'Cálcio + Vitamina M', subtitulo: '1 sachê junto ao café da manhã', tag: 'Hoje', iconType: 'sun', iconBg: 'bg-amber-50 text-amber-500 dark:bg-amber-950/40 dark:text-amber-400' }
      ],
      todos: [
        { id: 21, horario: '08:00', titulo: 'Biscoito do Fred', subtitulo: '1 biscoito sabor carne (Pimobendan)', frequencia: 'Diariamente', freqIconType: 'refresh', status: 'Hoje', statusCor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400', iconType: 'heart' },
        { id: 22, horario: '08:30', titulo: 'Cálcio + Vitamina M', subtitulo: '1 sachê junto ao café da manhã', frequencia: 'Diariamente', freqIconType: 'refresh', status: 'Hoje', statusCor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400', iconType: 'sun' },
        { id: 23, horario: '18:00', titulo: 'Probiótico Lacto', subtitulo: 'Tomar em jejum noturno', frequencia: 'Diariamente', freqIconType: 'refresh', status: 'Hoje', statusCor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400', iconType: 'leaf' },
        { id: 24, horario: '21:00', titulo: 'Fitoterápico Regulador do Sono', subtitulo: '1 cápsula vegetal, 1h antes de dormir', frequencia: 'Diariamente', freqIconType: 'refresh', status: 'Hoje', statusCor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400', iconType: 'moon' },
        { id: 25, horario: '15:00', titulo: 'Fisioterapia Sênior', subtitulo: 'Exercícios de mobilidade', frequencia: 'Ter, Qui', freqIconType: 'calendar', status: 'Amanhã', statusCor: 'bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400', iconType: 'heart' }
      ]
    },
    notificacoes: [
      { id: 1, titulo: 'Pedido urgente em andamento', descricao: 'O manipulado veterinário do Fred (Pimobendan) está avançando na linha de produção da PetFórmulas.', tempo: 'Há 15 min', iconType: 'package', iconBg: 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400', lida: false, categoria: 'Pedidos' },
      { id: 2, titulo: '3 orçamentos aguardando aprovação', descricao: 'Os orçamentos do Fitoterápico Regulador do Sono estão prontos para você revisar.', tempo: 'Há 1 hora', iconType: 'tag', iconBg: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400', lida: false, categoria: 'Pedidos' },
      { id: 3, titulo: 'Lembrete: Cálcio + Vitamina M', descricao: 'Está na hora de Dona Irene tomar o sachê das 08:30.', tempo: 'Há 2 horas', iconType: 'bell', iconBg: 'bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400', lida: false, categoria: 'Tratamentos' },
      { id: 4, titulo: 'Probiótico + Vitamina M entregue', descricao: 'O sachê de Probiótico já está disponível para retirada na Naturale Manipulação.', tempo: 'Há 6 horas', iconType: 'package', iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400', lida: true, categoria: 'Pedidos' },
      { id: 5, titulo: 'Receita veterinária processada', descricao: 'A receita do Fred (Pimobendan Biscoito) foi enviada para as farmácias veterinárias parceiras.', tempo: 'Ontem, 16:40', iconType: 'fileText', iconBg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400', lida: true, categoria: 'Sistema' },
      { id: 6, titulo: 'Cadastro Validado', descricao: 'Seu perfil e dados de monitoramento foram validados com sucesso.', tempo: '20/05', iconType: 'checkCircle2', iconBg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400', lida: true, categoria: 'Sistema' },
      { id: 7, titulo: 'Cupom de Boas-vindas Aroê', descricao: 'Aproveite R$ 20 de desconto no seu primeiro pedido solicitado.', tempo: '20/05', iconType: 'gift', iconBg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400', lida: true, categoria: 'Sistema' }
    ],
    historico: {
      resumo: { pedidos: 5, receitas: 6, concluidos: 2, cumprimento: '98%' },
      economia: '221,60',
      maio: [
        { id: 201, categoria: 'pedidos', titulo: 'Pedido entregue', descricao: 'Biscoito veterinário do Fred (Pimobendan) chegou na residência de Dona Irene', data: '26/05/2025', hora: '16:20', iconType: 'box', iconBg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' },
        { id: 202, categoria: 'lembretes', titulo: 'Lembrete cumprido', descricao: 'Dona Irene confirmou a tomada de "Cálcio + Vitamina M"', data: '24/05/2025', hora: '08:35', iconType: 'bell', iconBg: 'bg-orange-50 text-orange-500 dark:bg-orange-950/40 dark:text-orange-400' },
        { id: 203, categoria: 'orçamentos', titulo: 'Orçamento aprovado', descricao: 'Manipulação de Probióticos autorizada na melhor oferta de orçamento', data: '18/05/2025', hora: '11:00', iconType: 'tag', iconBg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400' },
        { id: 204, categoria: 'orçamentos', titulo: 'Orçamento recebido', descricao: '3 farmácias enviaram propostas para o "Fitoterápico Regulador do Sono"', data: '15/05/2025', hora: '10:10', iconType: 'tag', iconBg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400' }
      ],
      abril: [
        { id: 205, categoria: 'tratamentos', titulo: 'Acompanhamento médico', descricao: 'Geriatra incluiu monitoramento de pressão arterial no plano de cuidados', data: '05/04/2025', hora: '08:30', iconType: 'heart', iconBg: 'bg-rose-50 text-rose-500 dark:bg-rose-950/40 dark:text-rose-400' },
        { id: 206, categoria: 'pedidos', titulo: 'Pedido entregue', descricao: 'Cálcio + Fixador de Osteoporose entregue no endereço cadastrado', data: '20/04/2025', hora: '15:00', iconType: 'box', iconBg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' }
      ]
    },
    tratamentos: {
      principal: {
        nome: 'Biscoito Cardiopata Palatável (Fred 🐶)',
        tipo: 'Fórmula Manipulada Veterinária',
        status: 'Em andamento',
        iniciadoEm: new Date().toLocaleDateString('pt-BR'),
        duracao: '30 dias',
        frequencia: '1 biscoito sabor carne por dia',
        progresso: 40,
        progressoTexto: '12 de 30 biscoitos consumidos'
      },
      outros: [
        {
          nome: 'Cálcio + Alendronato Sódico',
          tipo: 'Tratamento de Osteoporose (Dona Irene)',
          status: 'Entregue',
          statusCor: 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400',
          iniciadoEm: '01/05/2026',
          duracao: '180 dias',
          frequencia: '1 vez ao dia pela manhã'
        },
        {
          nome: 'Fitoterápico Regulador do Sono',
          tipo: 'Tratamento Fitoterápico (Dona Irene)',
          status: 'Em produção',
          statusCor: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
          iniciadoEm: 'Aguardando Lab',
          duracao: '60 dias',
          frequencia: '1 cápsula, 1h antes de dormir'
        }
      ]
    }
  },

  farmacia: {
    user: {
      nome: "NatuFórmula Centro",
      tipo: "Farmácia Parceira"
    },
    ui: {
      badge: "B2B Parceiro",
      badgeCor: "bg-emerald-500/20 text-emerald-200 border border-emerald-500/30",
      gradient: "from-emerald-600 via-teal-700 to-cyan-600 shadow-emerald-900/10",
      mensagemWelcome: "Aqui estão as últimas receitas limpas e estruturadas pela API do ecossistema Aroê. Avalie os compostos extraídos para emitir seus orçamentos e propostas comerciais direto para o cliente."
    },
    perfil: {
      nome: "NatuFórmula Centro",
      email: "atendimento@natuformula.com.br",
      cpf: "12.345.678/0001-99",
      endereco: "Rua Augusta, 500 - Consolação, São Paulo - SP",
      peso: null,
      altura: null,
      alergias: null
    },
    receitasIniciais: [],
    lembretes: {
      proximos: [],
      todos: []
    },
    notificacoes: [
      { id: 1, titulo: 'Nova receita para orçamento', descricao: 'Uma nova receita de "Anti-hipertensivo + Complexo Vitamínico" foi encaminhada pelo paciente Ricardo Augusto.', tempo: 'Há 5 min', iconType: 'fileText', iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400', lida: false, categoria: 'Pedidos' },
      { id: 2, titulo: 'Orçamento aceito pelo paciente', descricao: 'Amanda Santos aprovou seu orçamento para "Vitaminas A-Z". Iniciar produção.', tempo: 'Há 30 min', iconType: 'checkCircle2', iconBg: 'bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400', lida: false, categoria: 'Pedidos' },
      { id: 3, titulo: 'Prazo de entrega próximo', descricao: 'O pedido #AROE-4422 (Cálcio + Osteoporose) de Dona Irene deve ser entregue até amanhã.', tempo: 'Há 2 horas', iconType: 'bell', iconBg: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400', lida: false, categoria: 'Pedidos' },
      { id: 4, titulo: 'Nova receita para orçamento', descricao: 'Uma nova receita de "Enzimas Digestivas" foi encaminhada pela paciente Amanda Santos.', tempo: 'Há 3 horas', iconType: 'fileText', iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400', lida: true, categoria: 'Pedidos' },
      { id: 5, titulo: 'Avaliação recebida', descricao: 'Você recebeu uma avaliação 5 estrelas no pedido #AROE-8832 de Ricardo Augusto.', tempo: 'Ontem, 18:20', iconType: 'checkCircle2', iconBg: 'bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400', lida: true, categoria: 'Sistema' },
      { id: 6, titulo: 'Perfil B2B ativado', descricao: 'Sua farmácia foi homologada como parceira Aroê. Bem-vinda ao ecossistema!', tempo: '01/06', iconType: 'gift', iconBg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400', lida: true, categoria: 'Sistema' }
    ],
    historico: {
      resumo: { pedidos: 14, receitas: 21, concluidos: 12, cumprimento: '100%' },
      economia: '1.480,00',
      maio: [
        { id: 501, categoria: 'pedidos', titulo: 'Pedido entregue', descricao: 'Fórmula Vitaminas A-Z entregue para Amanda Santos com sucesso', data: '27/05/2025', hora: '14:00', iconType: 'box', iconBg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400' },
        { id: 502, categoria: 'orçamentos', titulo: 'Orçamento emitido', descricao: 'Orçamento enviado para "Fitoterápico Sono" da paciente Irene', data: '20/05/2025', hora: '09:30', iconType: 'tag', iconBg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400' },
        { id: 503, categoria: 'pedidos', titulo: 'Produção iniciada', descricao: 'Início da manipulação do Suplemento Esportivo Sinergia de Ricardo Augusto', data: '21/04/2025', hora: '08:50', iconType: 'leaf', iconBg: 'bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400' }
      ],
      abril: [
        { id: 504, categoria: 'pedidos', titulo: 'Novo parceiro cadastrado', descricao: 'NatuFórmula Centro homologada como farmácia parceira Aroê', data: '02/04/2025', hora: '10:00', iconType: 'leaf', iconBg: 'bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400' },
        { id: 505, categoria: 'orçamentos', titulo: 'Orçamento recusado', descricao: 'Paciente optou por farmácia concorrente para o Complexo Vitamínico B', data: '12/04/2025', hora: '17:15', iconType: 'tag', iconBg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400' }
      ]
    },
    tratamentos: {
      principal: null,
      outros: []
    }
  }
};