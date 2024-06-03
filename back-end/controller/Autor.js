import autor from "../model/AutorModel.js";

async function listar(request, response){
    await autor
        .findAll()
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => {response.status(500).json(erro)});
}

async function selecionar(request, response){
    await autor
        .findByPk(request.params.idautor)
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => {response.status(500).json(erro)});
}

async function criar(request, response){
    if(!request.body.autor){
        response.status(500).send("Parâmetro 'autor' é obrigatório");
    }

    await autor
        .create({
            autor: request.body.autor
        })
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => {response.status(500).json(erro)});
}

async function alterar(request, response){
    if(!request.body.autor){
        response.status(500).send("Parâmetro 'autor' é obrigatório");
    }

    await autor
        .update({
            autor: request.body.autor
        },
        {
            where: {
                idautor: request.params.idautor
            }
        })
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => {response.status(500).json(erro)});
}

async function deletar(request, response){
    await autor
        .destroy(
            {
                where: {
                    idautor: request.params.idautor
                }
            }
        )
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => {response.status(500).json(erro)});
}

export default { listar, selecionar, criar, alterar, deletar };