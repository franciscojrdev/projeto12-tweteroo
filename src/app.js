import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const users = [];
const tweets = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;
  if (!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }
  const findUser = users.find(name => name.username === username)

  if(findUser){
    return res.status(400).send("Usuário já existe!")
  }
  users.push({ username, avatar });
  console.log(users)
  res.send("OK").status(201);
});

app.post("/tweets", (req, res) => {
  const { username } = req.headers
  const { tweet } = req.body
  let findUser = users.find(el => el.username.toLowerCase() === username.toLowerCase())
  console.log("teste",findUser)
  if(!findUser){
    res.status(401).send("UNAUTHORIZED")
    return
  }
  if (!tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }
  tweets.push({ username, tweet });
  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  const { avatar } = req.headers
  if (!avatar) {
    res.status(400).send("Erro")
    return
  }
  const arrayTweets = [...tweets].reverse().slice(0, 10)
  const newArray = []
  for(let i = 0; i < arrayTweets.length; i++){
    newArray.push({
      username: arrayTweets[i].username,
      avatar,
      tweet: arrayTweets[i].tweet
    })
  }
  console.log(newArray)
  res.send(newArray)
});

app.get("/tweets/:username", (req,res) =>{
  const {username} = req.params

  const userTweets = tweets.filter(el => el.username === username)

  if(userTweets){
    res.send(userTweets.reverse())
    return
  }
  res.sendStatus(400)

})

app.listen(5000, () => {
  console.log("Server running in port 5000");
});
