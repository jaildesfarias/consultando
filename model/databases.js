// Arquivo: database.js
const Sequelize = require('sequelize');

const db = new Sequelize('consultando', 'root', 'fofo', {
    host: 'localhost',
    dialect: 'mysql', // Altere para o seu banco de dados (por exemplo, 'mysql', 'postgres', 'sqlite', etc.)
});

module.exports = db;
