CREATE TABLE autor (
	idautor INT PRIMARY KEY,
	autor VARCHAR(50) NOT NULL
);

CREATE TABLE categoria (
	idcategoria INT PRIMARY KEY,
	categoria VARCHAR(50) NOT NULL
);

CREATE TABLE editora (
	ideditora INT PRIMARY KEY,
	editora VARCHAR(50) NOT NULL
);

CREATE TABLE emprestimo (
	idemprestimo INT PRIMARY KEY,
	idlivro INT NOT NULL,
	idpessoa INT NOT NULL,
	emprestimo DATE NOT NULL,
	vencimento DATE NOT NULL,
	devolucao DATE,
	atrasado CHAR(1),
	FOREIGN KEY (idlivro) REFERENCES livro(idlivro),
	FOREIGN KEY (idpessoa) REFERENCES pessoa(idpessoa)
);

CREATE TABLE funcionario (
	idfuncionario INT PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	senha VARCHAR(50) NOT NULL
);

CREATE TABLE livroautor (
	idlivroautor INT PRIMARY KEY,
	idautor INT NOT NULL,
	idlivro INT NOT NULL,
	FOREIGN KEY (idautor) REFERENCES autor(idautor),
	FOREIGN KEY (idlivro) REFERENCES livro(idlivro)
);

CREATE TABLE livro (
	idlivro INT PRIMARY KEY,
	titulo VARCHAR(100) NOT NULL,
	ano INT NOT NULL,
	paginas INT NOT NULL,
	edicao INT NOT NULL,
	resumo TEXT NOT NULL,
	emprestado BOOLEAN,
	copias INT NOT NULL,
	idcategoria INT NOT NULL,
	ideditora INT NOT NULL,
	FOREIGN KEY (idcategoria) REFERENCES categoria(idcategoria),
	FOREIGN KEY (ideditora) REFERENCES editora(ideditora)
);

CREATE TABLE pessoa (
	idpessoa INT PRIMARY KEY,
	pessoa VARCHAR(50) NOT NULL,
	email VARCHAR(80) NOT NULL,
	telefone VARCHAR(20) NOT NULL
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
CREATE OR REPLACE FUNCTION atualiza_copias_emprestadas_trigger()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.devolucao IS NOT NULL AND OLD.devolucao IS NULL THEN
        -- Atualiza o contador de cópias emprestadas ao devolver um livro
        UPDATE livro
        SET copias = copias + 1
        WHERE idlivro = NEW.idlivro;
    END IF;
	IF NEW.emprestimo = CURRENT_DATE THEN
		UPDATE livro
		SET copias = copias - 1
        WHERE idlivro = NEW.idlivro;
	END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER atualiza_copias_emprestadas
AFTER UPDATE ON emprestimo
FOR EACH ROW
EXECUTE FUNCTION atualiza_copias_emprestadas_trigger();