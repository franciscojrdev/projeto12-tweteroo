import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const usuario = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;
  if (!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }
  usuario.push({ username, avatar });
  //  console.log(usuario)
  res.send("OK").status(200);
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;
  if (!username || !tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }
  tweets.push({ username, tweet });
  res.status(200).send("OK");
});

app.get("/tweets", (req, res) => {
  const { avatar } = req.headers;
  if (!tweets || !avatar) {
    res.status(400).send("Erro");
    return;
  }
  const arrayTweets = tweets.reverse().slice(0, 10)
});

app.listen(5000, () => {
  console.log("Server running in port 5000");
});
