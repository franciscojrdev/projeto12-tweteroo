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
  const findUser = users.find(name => name.username.toLowerCase() === username.toLowerCase())

  if(findUser){
    return res.status(400).send("Usuário já existe!")
  }
  users.push({ username, avatar });
  console.log(users)
  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  const { user } = req.headers
  const { tweet } = req.body
  const findUser = users.find(el => el.username.toLowerCase() === user.toLowerCase())
  if(!user){
    res.status(400).send("Todos os campos são obrigatórios!");
    return
  }
  if(!findUser){
    res.status(401).send("UNAUTHORIZED")
    return
  }
  if (!tweet || typeof tweet !== "string") {
    res.status(400).send("Todos os campos são obrigatórios!");
    return
  }
  tweets.push({ username:user, tweet });
  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {

  tweets.forEach((item,index,arr) => {
    const {avatar} = users.find((user) => user.username.toLowerCase() === item.username.toLowerCase())
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

app.get("/tweets/:USERNAME", (req,res) =>{
  const {USERNAME} = req.params

  const userTweets = tweets.filter(el => el.username.toLowerCase() === USERNAME.toLowerCase())

  if(userTweets){
    res.send(userTweets.reverse())
    return
  }
  console.log(userTweets)
  res.sendStatus(400)
})

app.listen(5000, () => {
  console.log("Server running in port 5000");
});
