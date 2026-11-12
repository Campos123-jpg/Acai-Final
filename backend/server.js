
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 3000;

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "Acai"
});

db.connect((erro) => {
    if (erro) {
        console.log("Erro ao conectar com MySQL:", erro.message);
        return;
    }

    console.log("MySQL conectado com sucesso!");
});

app.use(cors());
app.use(express.json());

// Página inicial
app.get("/", (req, res) => {
    res.json({ mensagem: "API do Divino Açaí funcionando!" });
});

// Listar categorias
app.get("/categorias", (req, res) => {
    db.query("SELECT * FROM categorias", (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        res.json(resultados);
    });
});

// Listar produtos
app.get("/produtos", (req, res) => {
    db.query("SELECT * FROM produtos", (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: erro.message });
        }

        res.json(resultados);
    });
});

// Status do servidor
app.get("/status", (req, res) => {
    res.json({ status: "online" });
});

app.listen(PORT, () => {
    console.log(`Servidor do Divino Açaí rodando na porta ${PORT}`);
});
