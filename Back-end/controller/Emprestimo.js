import emprestimo from "../model/EmprestimoModel.js";
import moment from "moment";
import livro from "../model/LivroModel.js";
import { Op } from "sequelize";
import banco from "../banco.js";
import pessoa from "../model/PessoaModel.js";

async function listar(request, response) {
    await emprestimo
        .findAll()
        .then(resultado => { response.status(200).json(resultado) })
        .catch(erro => { response.status(500).json(erro) });
}

async function emprestar(request, response) {
    let dataEmprestimo = moment();
    let dataVencimento = moment().add(7, 'days').calendar();

    const t = await banco.transaction();

    try {
        const l = await livro.findByPk(request.body.idlivro);

        if (!l) {
            response.status(404).json({ "mensagem": "Livro não encontrado" });
            return;
        }

        if (l.copias <= 0) {
            response.status(400).json({ "mensagem": "O livro não possui cópias disponíveis" });
            return;
        }

        const countEmprestimosAtivos = await emprestimo.count({
            where: {
                idpessoa: request.body.idpessoa,
                devolucao: null
            }
        });

        if (countEmprestimosAtivos >= 3) {
            response.status(400).json({ "mensagem": "Número máximo de empréstimos ativos atingido" });
            return;
        }

        const countEmprestimosAtrasados = await emprestimo.count({
            where: {
                idpessoa: request.body.idpessoa,
                devolucao: null,
                atrasado: { [Op.ne]: 'N' }
            }
        });

        if (countEmprestimosAtrasados > 0) {
            response.status(400).json({ "mensagem": "Usuário possui empréstimo(s) com atraso não resolvido" });
            return;
        }

        await emprestimo.create({
            idlivro: request.body.idlivro,
            idpessoa: request.body.idpessoa,
            emprestimo: dataEmprestimo,
            vencimento: dataVencimento,
            atrasado: 'N' // Inicialize o status atrasado, se necessário
        }, {
            transaction: t
        });

        await livro.update({
            copias: l.copias - 1
        }, {
            where: { idlivro: request.body.idlivro },
            transaction: t
        });

        await t.commit();
        response.status(200).json({ "mensagem": "Empréstimo realizado com sucesso!", "total": countEmprestimosAtivos });
    } catch (erro) {
        if (!t.finished) {
            await t.rollback();
        }
        response.status(500).json(erro);
    }
}

async function devolver(request, response) {
    let dataDevolucao = moment();

    const selecionarEmprestimo = await emprestimo.findByPk(request.body.idemprestimo);

    if (selecionarEmprestimo.devolucao != null) {
        response.status(400).json({ "mensagem": "Este empréstimo já foi encerrado" });
        return;
    }

    const t = await banco.transaction();

    try {
        const e = await emprestimo.findByPk(request.body.idemprestimo);

        const idlivro = e.idlivro;

        await emprestimo.update({
            devolucao: dataDevolucao
        }, {
            where: { idemprestimo: request.body.idemprestimo },
            transaction: t
        });

        const l = await livro.findByPk(idlivro);
        await livro.update({
            copias: l.copias + 1
        }, {
            where: { idlivro: idlivro },
            transaction: t
        });

        await t.commit();
        response.status(200).json({ "mensagem": "Devolução realizada com sucesso!" });
    } catch (erro) {
        if (!t.finished) {
            await t.rollback();
        }
        response.status(500).json(erro);
    }
}

async function listarEmprestimosAtrasados(request, response) {
    try {
        const dados = await emprestimo.findAll({
            where: {
                idpessoa: request.body.idpessoa,
                devolucao: null,
                atrasado: { [Op.ne]: 'N' }
            }
        });
        response.status(200).json(dados);
    } catch (erro) {
        response.status(500).json(erro);
    }
}

async function selecionarPorPessoa(request, response) {
    const dados = await emprestimo.findAll({
        include: [
            { model: livro, attributes: ['titulo'], as: 'livro' }
        ],
        where: { idpessoa: request.params.idpessoa }
    });
    return response.json(dados);
}

async function encontrarEmprestimoPorPeriodo(request, response) {
    const { dataIni, dataFim } = request.body;

    try {
        const registro = await emprestimo.findAll({
            where: {
                emprestimo: {
                    [Op.between]: [dataIni, dataFim]
                }
            }
        });

        response.status(200).json(registro);
    } catch (erro) {
        response.status(500).json(erro);
    }
}

async function listarPendentes(request, response) {
    const dados = await emprestimo.findAll({
        include: [
            { model: livro, attributes: ['titulo'], as: 'livro' },
            { model: pessoa, attributes: ['pessoa'], as: 'pessoa' }
        ],
        where: { devolucao: null }
    });
    return response.json(dados);
}

export default { listar, emprestar, devolver, selecionarPorPessoa, encontrarEmprestimoPorPeriodo, listarPendentes, listarEmprestimosAtrasados };
