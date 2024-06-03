import emprestimo from "../model/EmprestimoModel.js";
import moment from "moment";
import livro from "../model/LivroModel.js"
import { Op } from "sequelize";

async function listar(request, response){
    await emprestimo
        .findAll()
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => {response.status(500).json(erro)});
}

async function selecionar(request, response){
    await emprestimo
        .findByPk(request.params.idemprestimo)
        .then(resposta => {response.status(200).json(resposta)})
        .catch(erro => {response.status(500).json(erro)});
}

async function retornarEmprestimosPendentes(request, response){
    try{
        const registro = await emprestimo.findAll({
            where:{
                devolucao: null
            }
        });

        response.status(200).json(registro);
    } catch(erro) {
        response.status(500).json(erro);
    }
}

async function emprestar(request, response){
    if(!request.body.idlivro || !request.body.idpessoa){ 
        response.status(500).send("Parâmetros obrigatórios faltando.");
    }

    const dataEmprestimo = moment();
    const dataVencimento = moment().add(7, 'days').calendar();

    try{
        const l = await livro.findByPk(request.body.idlivro);

        if(l.emprestado){
            response.status(400).send("Livro já emprestado");
            return;
        }

        const novoEmprestimo = await emprestimo.create({
            idlivro: request.body.idlivro,
            idpessoa: request.body.idpessoa,
            emprestimo: dataEmprestimo,
            vencimento: dataVencimento
        });

        if(l){
            l.emprestado = true;
            await l.save();
        } else {
            response.status(404).send("Livro não encontrado");
            return;
        }

        response.status(200).json(novoEmprestimo);
    } catch(erro) {
        response.status(500).json(erro)
    }
}

async function alterar(request, response){
    if(!request.body.idlivro || !request.body.idpessoa){
        response.status(500).send("Parâmetros obrigatórios faltando.");
    }

    await emprestimo
        .update({
            idlivro: request.body.idlivro,
            idpessoa: request.body.idpessoa,
        },
        {
            where: {
                idemprestimo: request.params.idemprestimo
            }
        })
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => response.status(500).json(erro));
}

async function devolver(request, response){
    if(!request.body.idlivro){
        response.status(500).send("Parâmetros obrigatórios faltando.");
    }

    const dataDevolucao = moment();

    try{
        const l = await livro.findByPk(request.body.idlivro);

        if(!l){
            response.status(404).send("Este livro não existe no nosso banco de dados.");
        }

        const novaDevolucao = await emprestimo.update({
            idlivro: request.body.idlivro,
            devolucao: dataDevolucao
        },
        {
            where: {
                idemprestimo: request.params.idemprestimo
            }
        });
        
        if(l.emprestado) {
            l.emprestado = false;
            await l.save();
        } else {
            response.status(400).send("Este livro não foi emprestado.")
        }

        response.status(200).json(novaDevolucao);
    } catch(erro){
        response.status(500).json(erro);
    }
}

async function encontrarHistóricoDePessoa(request, response){
    const idPessoa = request.params.idpessoa;
    
    try{
        if(!idPessoa){
            response.status(404).send("ID fornecido não foi encontrado.");
            return;
        }

        const historico = await emprestimo.findAll({
            where:{
                idpessoa: idPessoa
            }
        });

        response.status(200).json(historico);
    } catch(erro){
        response.status(500).json(erro);
    }
}

async function encontrarEmprestimoPorPeriodo(request, response){
    const {dataIni, dataFim} = request.body;
    
    try{
        const registro = await emprestimo.findAll({
            where:{
                emprestimo: {
                    [Op.between]: [dataIni, dataFim]
                }
            } 
        });

        response.status(200).json(registro);
    } catch(erro){
        response.status(500).json(erro);
    }
}

async function deletar(request, response){
    await emprestimo
        .destroy({
            where: {
                idemprestimo: request.params.idemprestimo
            }
        })
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => {response.status(500).json(erro)});
}

export default {listar, selecionar, emprestar, alterar, deletar, devolver, retornarEmprestimosPendentes, encontrarHistóricoDePessoa, encontrarEmprestimoPorPeriodo};