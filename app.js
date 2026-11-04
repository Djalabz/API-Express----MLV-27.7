const express =  require("express")
const app = express()
const port = 3000
const cors = require("cors")

// Import router 
const userRouter = require('./routes/user')

// On fait en sorte de convertir les données depuis et vers JSON quand nécessaire
app.use(express.json())

// CORS (Cross Origin Ressource Sharing) + CORS option
let corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,POST,DELETE",
}

// On vient utiliser les cors et leurs options dans notre app
app.use(cors(corsOptions))

// ROUTER 
app.use('/user', userRouter)

// Ecoute sur le port 3000
app.listen(port, () => {
    console.log("API écoute sur le port 3000")
})