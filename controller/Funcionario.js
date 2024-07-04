import funcionario from "../model/FuncionarioModel.js";

async function listar(request, response){
    await funcionario
        .findAll()
        .then(resposta => {response.status(200).json(resposta)})
        .catch(erro => {response.status(500).json(erro)});
}

async function selecionar(request, response){
    await funcionario
        .findByPk(request.params.idfuncionario)
        .then(resposta => {response.status(200).json(resposta)})
        .catch(erro => {response.status(500).json(erro)});
}

async function criar(request, response){
    if(!request.body.email || !request.body.nome){
        response.status(500).send("Parâmetros obrigatórios faltando.");
    }

    await funcionario
        .create({
            nome: request.body.nome,
            email: request.body.email,
            senha: request.body.senha
        })
        .then(resposta => {response.status(200).json(resposta)})
        .catch(erro => {response.status(500).json(erro)});
}

async function alterar(request, response){
    if(!request.body.email || !request.body.nome){
        response.status(500).send("Parâmetros obrigatórios faltando.");
    }

    await funcionario
        .update({
            nome: request.body.nome,
            email: request.body.email,
            senha: request.body.senha
        },
        {
            where: {
                idfuncionario: request.params.idfuncionario
            }
        })
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => response.status(500).json(erro));
}

async function deletar(request, response){
    await funcionario
        .destroy({
            where: {
                idfuncionario: request.params.idfuncionario
            }
        })
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => {response.status(500).json(erro)});
}

export default {listar, selecionar, criar, alterar, deletar};
