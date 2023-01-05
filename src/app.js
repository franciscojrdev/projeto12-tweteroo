import express from 'express'


const app = express()
app.use(express.json())

const usuario = []
const tweets = []

app.post("/sign-up", (req,res) => {
     const {username, avatar} = req.body
     if(!username || !avatar){
        res.send("Erro").status(400)
        return
     }
     usuario.push({username,avatar})
     console.log(usuario)
     res.send("OK").status(200)
})

app.post("/tweets", (req,res) =>{
    const {username,tweet} = req.body
    if(!username || !tweet){
        res.sendStatus(400)
        return
    }
    tweets.push({username,tweet})
    res.send("OK").status(200)
})

app.get("/tweets", (req,res) =>{
    if(!tweets){
        res.send("Erro").status(400)
        return
    }
    res.send(tweets.reverse())
})

app.listen(5000,() => {
    console.log("Server running in port 5000")
})