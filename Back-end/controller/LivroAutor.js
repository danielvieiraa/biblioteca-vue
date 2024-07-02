import livroautor from "../model/LivroautorModel.js";
import autor from "../model/AutorModel.js";

async function listarAutoresDoLivro(request, response){
    try{
        const registro = await livroautor.findAll({
            where: {
                idlivro: request.body.idlivro
            }
        })

        const idAutores = registro.map(registro => registro.idautor);

        const autores = await autor.findAll({
            where: {
                idautor: idAutores
            }
        })

        response.status(200).json(autores);
    } catch(erro){
        response.status(500).json(erro);
    }
}   

async function selecionar(request, response){
    await livroautor
        .findByPk(request.params.idlivroautor)
        .then(resposta => {response.status(200).json(resposta)})
        .catch(erro => {response.status(500).json(erro)});
}

async function criar(request, response){
    if(!request.body.idlivro || !request.body.idautor){
        response.status(500).send("Parâmetros obrigatórios faltando.");
    }

    await livroautor
        .create({
            idlivro: request.body.idlivro,
            idautor: request.body.idautor
        })
        .then(resposta => {response.status(200).json(resposta)})
        .catch(erro => {response.status(500).json(erro)});
}

async function alterar(request, response){
    if(!request.body.titulo || !request.body.ano || !request.body.paginas || !request.body.edicao){
        response.status(500).send("Parâmetros obrigatórios faltando.");
    }
    
    await livroautor
        .update({
            idlivro: request.body.idlivro,
            idautor: request.body.idautor
        },
        {
            where: {
                idlivroautor: request.params.idlivroautor
            }
        })
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => response.status(500).json(erro));
}

async function deletar(request, response){
    await livroautor
        .destroy({
            where: {
                idlivroautor: request.params.idlivroautor
            }
        })
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => {response.status(500).json(erro)});
}

export default {listarAutoresDoLivro, selecionar, criar, alterar, deletar};