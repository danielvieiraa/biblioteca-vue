import express from "express";
import banco from "./banco.js";
import categoria from "./controller/Categoria.js";
import autor from "./controller/Autor.js";
import editora from "./controller/Editora.js";
import pessoa from "./controller/pessoa.js";
import livro from "./controller/Livro.js";
import livroautor from "./controller/LivroAutor.js";
import emprestimo from "./controller/Emprestimo.js";
import funcionario from "./controller/Funcionario.js";
import cors from "cors";
import './model/Relacionamentos.js';

try {
    await banco.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const app = express();
app.use(express.json());
app.use(cors());

// Métodos categoria
app.get("/categoria", categoria.listar);
app.get("/categoria/:idcategoria", categoria.selecionar);
app.post("/categoria", categoria.criar);
app.put("/categoria/:idcategoria", categoria.alterar);
app.delete("/categoria/:idcategoria", categoria.deletar);
app.get("/categoria/buscarlivros/:categoria", categoria.buscarLivroPorCategoria);

// Métodos autor
app.get("/autor", autor.listar);
app.get("/autor/:idautor", autor.selecionar);
app.post("/autor", autor.criar);
app.put("/autor/:idautor", autor.alterar);
app.delete("/autor/:idautor", autor.deletar);

// Métodos editora
app.get("/editora", editora.listar);
app.get("/editora/:ideditora", editora.selecionar);
app.post("/editora", editora.criar);
app.put("/editora/:ideditora", editora.alterar);
app.delete("/editora/:ideditora", editora.deletar);

// Métodos pessoa
app.get("/pessoa", pessoa.listar);
app.get("/pessoa/:idpessoa", pessoa.selecionar);
app.post("/pessoa", pessoa.criar);
app.put("/pessoa/:idpessoa", pessoa.alterar);
app.delete("/pessoa/:idpessoa", pessoa.deletar);

// Métodos livro
app.get("/livro", livro.listar);
app.get("/livro/:idlivro", livro.selecionar);
app.get("/livro/categoria/:idcategoria", livro.listarPorCategoria);
app.post("/livro", livro.criar);
app.patch("/livro/:idlivro", livro.alterar);
app.delete("/livro/:idlivro", livro.deletar);

// Métodos LivroAutor
app.get("/livroautor", livroautor.listarAutoresDoLivro);
app.get("/livroautor/:idlivroautor", livroautor.selecionar);
app.post("/livroautor", livroautor.criar);
app.put("/livroautor/:idlivroautor", livroautor.alterar);
app.delete("/livroautor/:idlivroautor", livroautor.deletar);

// Métodos Empréstimo
app.get("/emprestimos/pendentes", emprestimo.listarPendentes);
app.post("/emprestar", emprestimo.emprestar);
app.patch("/devolver", emprestimo.devolver);
app.get("/emprestimos/pessoa/:idpessoa", emprestimo.selecionarPorPessoa);
app.get("/emprestimos/encontrar/data", emprestimo.encontrarEmprestimoPorPeriodo);

// Métodos Funcionário
app.get("/funcionario", funcionario.listar);
app.get("/funcionario/:idfuncionarios", funcionario.selecionar);
app.post("/funcionario", funcionario.criar);
app.put("/funcionario/:idfuncionario", funcionario.alterar);
app.delete("/funcionario/:idfuncionario", funcionario.deletar);

app.listen(4000);
