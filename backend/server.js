require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ mensagem: "API do Divino Açaí funcionando!" });
});
app.get("/status", (req, res) => {
  res.json({ status: "online" });
});

app.listen(PORT, () => {
  console.log(`Servidor do Divino Açaí rodando na porta ${PORT}`);
});
