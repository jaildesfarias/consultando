// Arquivo: database.js
const Sequelize = require('sequelize');

const db = new Sequelize('consultando', 'root', 'fofo', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = db;
