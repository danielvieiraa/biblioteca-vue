CREATE TABLE autor (
	idautor BIGSERIAL,
	autor VARCHAR(50) NOT NULL,
	CONSTRAINT pk_autor PRIMARY KEY (idpessoa)
);

CREATE TABLE categoria (
	idcategoria BIGSERIAL,
	categoria VARCHAR(50) NOT NULL,
	CONSTRAINT pk_categoria PRIMARY KEY (idcategoria)
);

CREATE TABLE editora (
	ideditora BIGSERIAL,
	editora VARCHAR(50) NOT NULL,
	CONSTRAINT pk_editora PRIMARY KEY (ideditora)
);

CREATE TABLE emprestimo (
	idemprestimo BIGSERIAL,
	idlivro INT NOT NULL,
	idpessoa INT NOT NULL,
	emprestimo DATE NOT NULL DEFAULT CURRENT_DATE,
	vencimento DATE NOT NULL,
	devolucao DATE,
	atrasado CHAR(1),
	CONSTRAINT pk_emprestimo PRIMARY KEY (idemprestimo),
	CONSTRAINT fk_emprestimo_livro FOREIGN KEY (idlivro) REFERENCES livro(idlivro),
	CONSTRAINT fk_emprestimo_pessoa FOREIGN KEY (idpessoa) REFERENCES pessoa(idpessoa)
);

CREATE TABLE funcionario (
	idfuncionario BIGSERIAL,
	nome VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	senha VARCHAR(50) NOT NULL,
	CONSTRAINT pk_funcionario PRIMARY KEY (idfuncionario)
);

CREATE TABLE livroautor (
	idlivroautor BIGSERIAL NOT NULL,
	idautor INT NOT NULL,
	idlivro INT NOT NULL,
	CONSTRAINT pk_livroautor PRIMARY KEY (idlivroautor),
	CONSTRAINT fk_livroautor_autor FOREIGN KEY (idautor) REFERENCES autor(idautor),
	CONSTRAINT fk_livroautor_livro FOREIGN KEY (idlivro) REFERENCES livro(idlivro)
);

CREATE TABLE livro (
	idlivro BIGSERIAL NOT NULL,
	titulo VARCHAR(100) NOT NULL,
	ano INT NOT NULL,
	paginas INT NOT NULL,
	edicao INT NOT NULL,
	resumo TEXT NOT NULL,
	copias INT NOT NULL,
	idcategoria INT NOT NULL,
	ideditora INT NOT NULL,
	CONSTRAINT pk_livro PRIMARY KEY (idlivro),
	CONSTRAINT fk_livro_categoria FOREIGN KEY (idcategoria) REFERENCES categoria(idcategoria),
	CONSTRAINT fk_livro_editora FOREIGN KEY (ideditora) REFERENCES editora(ideditora)
);

CREATE TABLE pessoa (
	idpessoa BIGSERIAL NOT NULL,
	pessoa VARCHAR(50) NOT NULL,
	email VARCHAR(80) NOT NULL,
	telefone VARCHAR(20) NOT NULL,
	CONSTRAINT pk_pessoa PRIMARY KEY (idpessoa)
);

-- Store procedure 
CREATE OR REPLACE PROCEDURE public."marcar_atrasado"()
LANGUAGE SQL
AS $$
UPDATE emprestimo
SET atrasado = 'S' 
WHERE vencimento < current_date
  AND (atrasado = null OR atrasado IS NULL)
  AND devolucao IS NULL;

UPDATE emprestimo
SET atrasado = null
WHERE devolucao IS NOT NULL;

$$;

ALTER PROCEDURE public."marcar_atrasado"()
OWNER TO postgres;

-- Triggers
CREATE OR REPLACE FUNCTION atualiza_copias()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE livro
        SET copias = copias - 1
        WHERE idlivro = NEW.idlivro;
    ELSIF TG_OP = 'UPDATE' AND NEW.devolucao IS NOT NULL THEN
        UPDATE livro
        SET copias = copias + 1
        WHERE idlivro = NEW.idlivro;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_atualiza_copias
AFTER INSERT OR UPDATE OF devolucao
ON emprestimo
FOR EACH ROW
EXECUTE FUNCTION atualiza_copias();