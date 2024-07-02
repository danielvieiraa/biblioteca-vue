import categoria from "../model/CategoriaModel.js";
import livro from "../model/LivroModel.js";

async function listar(request, response){
    await categoria
        .findAll()
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => {response.status(500).json(erro)});
}

async function selecionar(request, response){
    await categoria
        .findByPk(request.params.idcategoria)
        .then(resultado => response.status(200).json(resultado))
        .catch(erro => (response.status(500).json(erro)));
}

async function buscarLivroPorCategoria(request, response){
    try{
        const registro = await categoria.findOne({
            where: {
                categoria: request.params.categoria
            }
        });

        if(!registro){
            response.status(404).send("Categoria não encontrada.");
            return;
        }

        const livros = await livro.findAll({
            where:{
                idcategoria: registro.idcategoria
            }
        });

        response.status(200).json(livros);
    } catch(erro) {
        response.status(500).json(erro);
    }
}

async function criar(request, response){
    if(!request.body.categoria){
        response.status(500).send("Parâmetro 'categoria' é obrigatório.");
    }
    
    await categoria
        .create({
            categoria: request.body.categoria
        })
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => {response.status(500).json(erro)});
}

async function alterar(request, response){
    if(!request.body.categoria){
        response.status(500).send("Parâmetro 'categoria' é obrigatório.");
    }
    
    await categoria
        .update({
            categoria: request.body.categoria
        },
        {
            where: {
                idcategoria: request.params.idcategoria
            }
        })
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => {response.status(500).json(erro)});
}

async function deletar(request, response){
    await categoria
        .destroy(
            {
                where: {
                    idcategoria: request.params.idcategoria
                }
            }
        )
        .then(resultado => {response.status(200).json(resultado)})
        .catch(erro => {response.status(500).json(erro)});
}

export default { listar, selecionar, criar, alterar, deletar, buscarLivroPorCategoria };