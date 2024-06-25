import { Sequelize } from "sequelize";
import banco from "../banco.js";

export default banco.define("funcionarios", {
    idfuncionario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
