import { Sequelize } from "sequelize";
import banco from "../banco.js";

export default banco.define("emprestimo", {
    idemprestimo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,    
        allowNull: false
    },
    idlivro: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'livro',
            key: 'idlivro'
        }
    },
    idpessoa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'pessoa',
            key: 'idpessoa'
        }
    },
    emprestimo: {
        type: Sequelize.DATEONLY,
        allowNull: false,
    },
    vencimento: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    devolucao: {
        type: Sequelize.DATEONLY,
        allowNull: true
    }
})