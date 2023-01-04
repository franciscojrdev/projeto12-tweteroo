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
     res.send(usuario)
})

app.post("/tweets", (req,res) =>{
    const {username,tweet} = req.body
    if()
})

app.listen(5000,() => {
    console.log("Server running in port 5000")
})