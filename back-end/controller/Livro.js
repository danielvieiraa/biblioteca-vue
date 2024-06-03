import livro from "../model/LivroModel.js";

async function listar(request, response){
    await livro
        .findAll()
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => {response.status(500).json(erro)});
}

async function selecionar(request, response){
    await livro
        .findByPk(request.params.idlivro)
        .then(resposta => {response.status(200).json(resposta)})
        .catch(erro => {response.status(500).json(erro)});
}

async function criar(request, response){
    if(!request.body.titulo || !request.body.ano || !request.body.paginas || !request.body.edicao){
        response.status(500).send("Parâmetros obrigatórios faltando.");
    }

    await livro
        .create({
            titulo: request.body.titulo,
            ano: request.body.ano,
            paginas: request.body.paginas,
            edicao: request.body.edicao,
            resumo: request.body.resumo,
            idcategoria: request.body.idcategoria,
            ideditora: request.body.ideditora
        })
        .then(resposta => {response.status(200).json(resposta)})
        .catch(erro => {response.status(500).json(erro)});
}

async function alterar(request, response){
    //if(!request.body.titulo || !request.body.ano || !request.body.paginas || !request.body.edicao){
    //    response.status(500).send("Parâmetros obrigatórios faltando.");
    //}
    
    await livro
        .update({
            titulo: request.body.titulo,
            ano: request.body.ano,
            paginas: request.body.paginas,
            edicao: request.body.edicao,
            resumo: request.body.resumo,
            emprestado: request.body.emprestado,
            idcategoria: request.body.idcategoria,
            ideditora: request.body.ideditora
        },
        {
            where: {
                idlivro: request.params.idlivro
            }
        })
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => response.status(500).json(erro));
}

async function deletar(request, response){
    await livro
        .destroy({
            where: {
                idlivro: request.params.idlivro
            }
        })
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => {response.status(500).json(erro)});
}

export default {listar, selecionar, criar, alterar, deletar};