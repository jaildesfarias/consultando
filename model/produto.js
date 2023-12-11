
const Sequelize = require('sequelize');
const db = require('../config/database');

const Produto = db.define('produto', {
    codigo: {
        type: Sequelize.INTEGER, 
        primaryKey: true, // Adicionado se o campo for uma chave primária
        autoIncrement: true // Adicionado se o campo for uma chave primária autoincrementável
    },
    nome: {
        type: Sequelize.STRING(48) 
    },
    preco: {
        type: Sequelize.FLOAT
    },
    marca: {
        type: Sequelize.STRING(255) 
},
cor: {
    type: DataTypes.STRING(255),
}
});

module.exports = Produto;
