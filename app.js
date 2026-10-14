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

app.post('/signup', (req, res) => {
    let { username, email, password } = req.body

    // Vérification qu'aucun ne soit undefined
    if (!username && !email && !password) {
        return res.status(403).json("Un des éléments est undefined")
    }

    // Vérification des données avec REGEX (qu'on passera pour le moment)

    // Verif est ce que le user existe déjà ?
    let sql = "SELECT * FROM users WHERE username = ? OR email = ?"

    db.query(sql, [username, email], (err, results) => {
        if (err) {

            console.log(err)
            res.status(500)

        } else {
            if (results.length) {

                if (username === results[0].username) {
                    res.json("Username déjà utilisé")
                } else {
                    res.json("L'email est déjà utilisé")
                }

                return

            } 
        }
    })
})

// Ecoute sur le port 3000
app.listen(port, () => {
    console.log("API écoute sur le port 3000")
})