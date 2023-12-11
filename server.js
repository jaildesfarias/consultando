const express = require("express");
const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require("body-parser");
const session = require('express-session');
const chalk = require('chalk');
const path = require('path');


const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set('views', './views');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session({
    secret: 'seu-segredo-aqui',
    resave: false,
    saveUninitialized: true
}));

const sequelize = new Sequelize('consultando', 'root', 'casa', {
    host: 'localhost',
    dialect: 'mysql'
});

const Produto = sequelize.define('produto', {
    codigo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nome: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
    },
    marca: {
        type: DataTypes.STRING(35),
    },
    cor: {
        type: DataTypes.STRING(255)
    },
});

sequelize.sync().then(() => {
    console.log(chalk.green('Modelo sincronizado com o banco de dados'));
}).catch((error) => {
    console.error(chalk.red('Erro ao sincronizar o modelo:'), error);
});

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const port = 3000;

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/buscaProdutos', (req, res) => {
    res.render('buscaProduto');
});
app.get('/alterarProduto/:id', async (req, res) => {
    try {
        const idProduto = decodeURIComponent(req.params.id);
        const produto = await Produto.findByPk(idProduto);
        res.render('alterarProduto', { produto });
    } catch (error) {
        console.error("Erro na consulta: " + error);
        res.status(500).send("Erro interno do servidor");
    }
});

app.get('/resultadoBusca', (req, res) => {
    
    const produtos = [
        { id: 1, codigo: '001', nome: 'camisa', preco: 19.99, marca: 'J&F', cor: 'branca com mangas e gola verde' },
        { id: 2, codigo: '002', nome: 'conjuto de camisa e bermuda', preco: 29.99, marca: 'J&M', cor: ' vermelha' },
    ];
    res.render('resultadoBusca', { produtos });
    
});
app.get('/some-route', (req, res) => {
    res.render('resultadoBusca', { });
  });
app.post("/updateProduto", urlencodedParser, async (req, res) => {
    try {
        const { id, codigo, nome, preco, marca, cor } = req.body;
        await Produto.update({ codigo, nome, preco, marca, cor }, { where: { id } });
        res.send("<b>Produto alterado com sucesso!</b>");
    } catch (error) {
        console.error("Erro ao alterar produto:", error);
        res.status(500).send("Erro interno do servidor");
    }
});
app.get("/excluirProduto/:id", async (req, res) => {
    try {
        const idProduto = req.params.id;
        const produto = await Produto.findByPk(idProduto);
        res.render('confirmarExclusao', { produto });
    } catch (error) {
        console.error("Erro ao excluir produto:", error);
        res.status(500).send("Erro interno do servidor");
    }
});

app.post("/excluirProduto", urlencodedParser, async (req, res) => {
    try {
        const idProduto = req.body.id;
        await Produto.destroy({ where: { id: idProduto } });
        res.send("<b>Produto excluído com sucesso!</b><br>");
    } catch (error) {
        console.error("Erro ao excluir produto:", error);
        res.status(500).send("Erro interno do servidor");
    }
});


console.log('Caminho absoluto do diretório de views:', path.resolve('./views'));



app.listen(port, () => {
    console.log(chalk.blue('Esta aplicação está escutando a porta http://localhost:' + port));
});
