-- Schema do Banco de Dados da Aroê

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;



-- checkzin inicial
DROP DATABASE IF EXISTS aroe;
CREATE DATABASE IF NOT EXISTS aroe
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE aroe;


CREATE TABLE IF NOT EXISTS usuario (
  id               CHAR(36)      NOT NULL DEFAULT (UUID()),
  nome             VARCHAR(150)  NOT NULL,
  email            VARCHAR(254)  NOT NULL,
  senha_hash       TEXT          NULL COMMENT 'Hash bcrypt. NULL quando autenticação é apenas via Google.',
  telefone         VARCHAR(20)   NULL,
  google_id        VARCHAR(100)  NULL     COMMENT 'Sub do token Google OAuth2. NULL quando autenticação é por credenciais.',
  foto_perfil_url  TEXT          NULL,
  tipo             ENUM('paciente', 'responsavel') NOT NULL DEFAULT 'paciente'
                   COMMENT 'paciente: usuário principal. responsavel: cuida do paciente.',
  ativo            TINYINT(1)    NOT NULL DEFAULT 1,
  criado_em        DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uq_usuario_email    (email),
  UNIQUE KEY uq_usuario_google   (google_id),

  CONSTRAINT chk_usuario_auth
    CHECK (senha_hash IS NOT NULL OR google_id IS NOT NULL)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Pacientes e responsáveis cadastrados na plataforma Aroê.';




CREATE TABLE IF NOT EXISTS endereco (
  id           CHAR(36)     NOT NULL DEFAULT (UUID()),
  usuario_id   CHAR(36)     NOT NULL,
  apelido      VARCHAR(60)  NULL     COMMENT 'Ex: "Casa", "Trabalho"',
  cep          VARCHAR(9)   NOT NULL,
  logradouro   VARCHAR(200) NOT NULL,
  numero       VARCHAR(20)  NOT NULL,
  complemento  VARCHAR(100) NULL,
  bairro       VARCHAR(100) NOT NULL,
  cidade       VARCHAR(100) NOT NULL,
  estado       CHAR(2)      NOT NULL,
  principal    TINYINT(1)   NOT NULL DEFAULT 0
               COMMENT 'Indica o endereço padrão. Apenas um por usuário deve ser 1.',
  criado_em    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  CONSTRAINT fk_endereco_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Endereços de entrega associados ao usuário.';

CREATE INDEX idx_endereco_usuario ON endereco (usuario_id);

DELIMITER $$
DROP TRIGGER IF EXISTS trg_endereco_principal_before_insert$$
CREATE TRIGGER trg_endereco_principal_before_insert
BEFORE INSERT ON endereco
FOR EACH ROW
BEGIN
  IF NEW.principal = 1 THEN
    UPDATE endereco SET principal = 0
    WHERE usuario_id = NEW.usuario_id AND principal = 1;
  END IF;
END$$

DROP TRIGGER IF EXISTS trg_endereco_principal_before_update$$
CREATE TRIGGER trg_endereco_principal_before_update
BEFORE UPDATE ON endereco
FOR EACH ROW
BEGIN
  IF NEW.principal = 1 AND OLD.principal = 0 THEN
    UPDATE endereco SET principal = 0
    WHERE usuario_id = NEW.usuario_id AND principal = 1 AND id <> NEW.id;
  END IF;
END$$
DELIMITER ;



CREATE TABLE IF NOT EXISTS farmacia (
  id             CHAR(36)     NOT NULL DEFAULT (UUID()),
  razao_social   VARCHAR(200) NOT NULL,
  nome_fantasia  VARCHAR(200) NOT NULL,
  cnpj           CHAR(14)     NOT NULL,
  email          VARCHAR(254) NOT NULL,
  telefone       VARCHAR(20)  NULL,
  logo_url       TEXT         NULL,
  status         ENUM('ativa', 'inativa', 'pendente') NOT NULL DEFAULT 'pendente',
  criado_em      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uq_farmacia_cnpj (cnpj)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Farmácias de manipulação parceiras cadastradas na plataforma.';



CREATE TABLE IF NOT EXISTS funcionario_farmacia (
  id          CHAR(36)     NOT NULL DEFAULT (UUID()),
  farmacia_id CHAR(36)     NOT NULL,
  nome        VARCHAR(150) NOT NULL,
  email       VARCHAR(254) NOT NULL,
  senha_hash  TEXT         NOT NULL,
  cargo       ENUM('admin', 'farmaceutico', 'atendente') NOT NULL DEFAULT 'atendente',
  ativo       TINYINT(1)   NOT NULL DEFAULT 1,
  criado_em   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uq_funcionario_email (email),
  CONSTRAINT fk_funcionario_farmacia
    FOREIGN KEY (farmacia_id) REFERENCES farmacia(id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Funcionários vinculados a uma farmácia parceira.';

CREATE INDEX idx_funcionario_farmacia ON funcionario_farmacia (farmacia_id);



CREATE TABLE IF NOT EXISTS receita (
  id            CHAR(36)     NOT NULL DEFAULT (UUID()),
  usuario_id    CHAR(36)     NOT NULL,
  arquivo_url   TEXT         NOT NULL,
  origem        ENUM('upload', 'camera') NOT NULL DEFAULT 'upload',
  status        ENUM('pendente', 'analisando', 'aprovada', 'rejeitada', 'cancelada')
                NOT NULL DEFAULT 'pendente',
  observacao    TEXT         NULL,
  enviada_em    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  CONSTRAINT fk_receita_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Receitas médicas enviadas pelos pacientes.';

CREATE INDEX idx_receita_usuario ON receita (usuario_id);
CREATE INDEX idx_receita_status  ON receita (status);



CREATE TABLE IF NOT EXISTS orcamento (
  id          CHAR(36)       NOT NULL DEFAULT (UUID()),
  receita_id  CHAR(36)       NOT NULL,
  farmacia_id CHAR(36)       NOT NULL,
  valor_total DECIMAL(10,2)  NOT NULL,
  descricao   TEXT           NULL,
  prazo_dias  SMALLINT       NOT NULL COMMENT 'Prazo estimado em dias úteis.',
  status      ENUM('enviado', 'aceito', 'recusado', 'expirado') NOT NULL DEFAULT 'enviado',
  valido_ate  DATETIME       NOT NULL,
  criado_em   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uq_orcamento_farmacia_receita (receita_id, farmacia_id),

  CONSTRAINT chk_orcamento_valor    CHECK (valor_total > 0),
  CONSTRAINT chk_orcamento_prazo    CHECK (prazo_dias > 0),

  CONSTRAINT fk_orcamento_receita
    FOREIGN KEY (receita_id)  REFERENCES receita(id)  ON DELETE CASCADE,
  CONSTRAINT fk_orcamento_farmacia
    FOREIGN KEY (farmacia_id) REFERENCES farmacia(id) ON DELETE RESTRICT

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Orçamento enviado por uma farmácia para uma receita.';

CREATE INDEX idx_orcamento_farmacia  ON orcamento (farmacia_id);
CREATE INDEX idx_orcamento_receita   ON orcamento (receita_id);
CREATE INDEX idx_orcamento_status    ON orcamento (status);
CREATE INDEX idx_orcamento_validade  ON orcamento (valido_ate, status);



CREATE TABLE IF NOT EXISTS pedido (
  id                  CHAR(36)      NOT NULL DEFAULT (UUID()),
  orcamento_id        CHAR(36)      NOT NULL,
  usuario_id          CHAR(36)      NOT NULL,
  endereco_entrega_id CHAR(36)      NOT NULL,
  valor_total         DECIMAL(10,2) NOT NULL,
  status              ENUM(
    'aguardando_pagamento',
    'pago',
    'em_producao',
    'pronto',
    'enviado',
    'entregue',
    'cancelado'
  ) NOT NULL DEFAULT 'aguardando_pagamento',
  codigo_rastreio     VARCHAR(50)   NULL,
  criado_em           DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em       DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uq_pedido_orcamento (orcamento_id),

  CONSTRAINT chk_pedido_valor CHECK (valor_total > 0),

  CONSTRAINT fk_pedido_orcamento
    FOREIGN KEY (orcamento_id)        REFERENCES orcamento(id) ON DELETE RESTRICT,
  CONSTRAINT fk_pedido_usuario
    FOREIGN KEY (usuario_id)          REFERENCES usuario(id)   ON DELETE RESTRICT,
  CONSTRAINT fk_pedido_endereco
    FOREIGN KEY (endereco_entrega_id) REFERENCES endereco(id)  ON DELETE RESTRICT

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Pedido gerado após aceitação de um orçamento.';

CREATE INDEX idx_pedido_usuario ON pedido (usuario_id);
CREATE INDEX idx_pedido_status  ON pedido (status);



CREATE TABLE IF NOT EXISTS pagamento (
  id                 CHAR(36)      NOT NULL DEFAULT (UUID()),
  pedido_id          CHAR(36)      NOT NULL,
  metodo             ENUM('pix', 'cartao_credito', 'boleto') NOT NULL,
  valor              DECIMAL(10,2) NOT NULL,
  status             ENUM('pendente', 'aprovado', 'recusado', 'estornado') NOT NULL DEFAULT 'pendente',
  gateway_id         VARCHAR(100)  NULL,
  gateway_referencia VARCHAR(200)  NULL,
  processado_em      DATETIME      NULL,
  criado_em          DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  UNIQUE KEY uq_pagamento_pedido (pedido_id),

  CONSTRAINT chk_pagamento_valor CHECK (valor > 0),

  CONSTRAINT fk_pagamento_pedido
    FOREIGN KEY (pedido_id) REFERENCES pedido(id) ON DELETE RESTRICT

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Registro de pagamento associado a um pedido.';



CREATE TABLE IF NOT EXISTS notificacao (
  id         CHAR(36)     NOT NULL DEFAULT (UUID()),
  usuario_id CHAR(36)     NOT NULL,
  pedido_id  CHAR(36)     NULL,
  titulo     VARCHAR(200) NOT NULL,
  mensagem   TEXT         NOT NULL,
  canal      ENUM('push', 'email', 'sms') NOT NULL DEFAULT 'push',
  lida       TINYINT(1)   NOT NULL DEFAULT 0,
  enviada_em DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  CONSTRAINT fk_notificacao_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)  ON DELETE CASCADE,
  CONSTRAINT fk_notificacao_pedido
    FOREIGN KEY (pedido_id)  REFERENCES pedido(id)   ON DELETE SET NULL

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Notificações enviadas ao usuário.';

CREATE INDEX idx_notificacao_usuario ON notificacao (usuario_id);
CREATE INDEX idx_notificacao_lida    ON notificacao (usuario_id, lida);


CREATE TABLE IF NOT EXISTS lembrete_medicamento (
  id                  CHAR(36)     NOT NULL DEFAULT (UUID()),
  usuario_id          CHAR(36)     NOT NULL,
  pedido_id           CHAR(36)     NULL,
  nome_medicamento    VARCHAR(200) NOT NULL,
  posologia           TEXT         NULL,
  horario             TIME         NOT NULL,
  ativo               TINYINT(1)   NOT NULL DEFAULT 1,
  proximo_lembrete_em DATETIME     NULL,
  criado_em           DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id),
  CONSTRAINT fk_lembrete_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
  CONSTRAINT fk_lembrete_pedido
    FOREIGN KEY (pedido_id)  REFERENCES pedido(id)  ON DELETE SET NULL

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  COMMENT='Lembretes de horário para ingestão de medicamentos.';

CREATE INDEX idx_lembrete_usuario  ON lembrete_medicamento (usuario_id);
CREATE INDEX idx_lembrete_proximo  ON lembrete_medicamento (proximo_lembrete_em, ativo);

SET foreign_key_checks = 1;
