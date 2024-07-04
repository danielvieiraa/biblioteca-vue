import editora from "../model/EditoraModel.js";

async function listar(request, response){
    await editora
        .findAll()
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => {response.status(500).json(erro)});
}

async function selecionar(request, response){
    await editora
        .findByPk(request.params.ideditora)
        .then(resposta => {response.status(200).json(resposta)})
        .catch(erro => {response.status(500).json(erro)});
}

async function criar(request, response){
    if(!request.body.editora){
        response.status(500).send("Parâmetro 'editora' é obrigatório");
    }
    
    await editora
        .create({
            editora: request.body.editora
        })
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => {response.status(500).json(erro)});
}

async function alterar(request, response){
    if(!request.body.editora){
        response.status(500).send("Parâmetro 'editora' é obrigatório");
    }

    await editora
        .update({
            editora: request.body.editora
        },
        {
            where: {
                ideditora: request.params.ideditora
            }
        })
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => {response.status(500).json(erro)});
}

async function deletar(request, response){
    await editora
        .destroy({
            where:{
                ideditora: request.params.ideditora
            }
        })
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => {response.status(500).json(erro)});
}

export default {listar, selecionar, criar, alterar, deletar}