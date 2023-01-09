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
    return
  }
  if(typeof username !== "string" || typeof avatar !== "string"){
    res.status(400).send("Valor diferente de String")
    return
  }
  const findUser = users.find(name => name.username === username)

  if(findUser){
    return res.status(400).send("Usuário já existe!")
  }
  users.push({ username, avatar });
  console.log(users)
  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  const { username } = req.headers
  const { tweet } = req.body
  const findUser = users.find(el => el.username === username)
  if(!findUser){
    res.status(401).send("UNAUTHORIZED")
    return
  }
  if (!tweet || !username) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return
  }
  tweets.push({ username, tweet });
  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {

  tweets.forEach((item,index,arr) => {
    const {avatar} = users.find((user) => user.username === item.username)
    arr[index] = {...item,avatar}
  })
  if(tweets.length < 10){
    const arrayTweets = [...tweets].reverse().slice(0, tweets.length)
    res.status(201).send(arrayTweets)  
    return
  }
  const arrayTweets = [...tweets].reverse().slice(0, 10)
  res.status(201).send(arrayTweets)
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
