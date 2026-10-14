const express =  require("express")
const app = express()
const port = 3000
const cors = require("cors")
let db = require("./config/db")

// On fait en sorte de convertir les données depuis et vers JSON quand nécessaire
app.use(express.json())

// CORS (Cross Origin Ressource Sharing) + CORS option
let corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,POST,DELETE",
}

// On vient utiliser les cors et leurs options dans notre app
app.use(cors(corsOptions))



// DEFINITION DES ROUTES 

// Route par défaut
app.get('/', (req, res) => {
    res.json("Hello World !")
})

// Route de test
app.post('/test', (req, res) => {
    let { username } = req.body
    res.json("Bien reçu " + username)
})

// Ecoute sur le port 3000
app.listen(port, () => {
    console.log("API écoute sur le port 3000")
})