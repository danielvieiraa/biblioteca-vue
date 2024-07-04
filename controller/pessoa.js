import pessoa from "../model/PessoaModel.js";

async function listar(request, response){
    await pessoa
        .findAll()
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => {response.status(500).json(erro)});
}

async function selecionar(request, response){
    await pessoa
        .findByPk(request.params.idpessoa)
        .then(resposta => {response.status(200).json(resposta)})
        .catch(erro => {response.status(500).json(erro)});
}

async function criar(request, response){
    if(!request.body.pessoa || !request.body.email || !request.body.telefone){
        response.status(500).send("Parâmetros obrigatórios faltando.");
    }

    await pessoa
        .create({
            pessoa: request.body.pessoa,
            email: request.body.email,
            telefone: request.body.telefone
        })
        .then(resposta => {response.status(200).json(resposta)})
        .catch(erro => {response.status(500).json(erro)});
}

async function alterar(request, response){
    if(!request.body.pessoa || !request.body.email || !request.body.telefone){
        response.status(500).send("Parâmetros obrigatórios faltando.");
    }

    await pessoa
        .update({
            pessoa: request.body.pessoa,
            email: request.body.email,
            telefone: request.body.telefone
        },
        {
            where: {
                idpessoa: request.params.idpessoa
            }
        })
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => response.status(500).json(erro));
}

async function deletar(request, response){
    await pessoa
        .destroy({
            where: {
                idpessoa: request.params.idpessoa
            }
        })
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => {response.status(500).json(erro)});
}

export default {listar, selecionar, criar, alterar, deletar};