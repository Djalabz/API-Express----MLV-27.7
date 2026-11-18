const express = require("express")
const router = express.Router() 
const db = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config()


// Routes qui concernent les actions du user
router.get('/', (req, res) => {
    res.json("Hello World !")
})

router.post('/signup', (req, res) => {
    let { username, email, password } = req.body

    // Vérification qu'aucun ne soit undefined
    if (!username && !email && !password) {
        return res.status(403).json("Un des éléments est undefined")
    }

    // Vérification des données avec REGEX (qu'on passera pour le moment)
    

    // Verif est ce que le user existe déjà ?
    let sql = "SELECT * FROM users WHERE username = ? OR email = ?"

    // On éxecute ensuite la query avec dans un tableau les variables à remplacer par les ?
    db.query(sql, [username, email], (err, results) => {
        if (err) {
            console.log(err)
            res.status(500)
        } else {
            // Si on a un result on vérifie qui du nom ou email est déj)à) utilisé
            if (results.length) {

                if (username === results[0].username) {
                    res.json("Username déjà utilisé")
                } else {
                    res.json("L'email est déjà utilisé")
                }

                return

            } else {
                // Requete d'ajout du user en BDD
                sql = "INSERT INTO users(username, email, password) VALUES(?, ?, ?)"

                // On vient hasher impérativement le mdp avant de l'envoyer en BDD
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json("Erreur lors du hashage")
                    } else {
                        // On éxecute la req avec db.query
                        db.query(sql, [username, email, hash], (err, results) => {
                            if (err) {
                                console.log(err)
                            } else {
                                res.status(200).json("User ajouté avec succès")
                            }
                        })
                    }
                })
            }
        }
    })
})

// A FAIRE : Login et Logout
router.post('/login', (req, res) => {
    console.log(req.body)

    let { username, password } = req.body

    // On vient vérifier qu'il y ait bien un user avec le username correspondant
    let sql = "SELECT * FROM users WHERE username = ?"

    db.query(sql, [username], (error, results) => {
        if (error) {
            console.log(error)
            res.status(500)
        } else {
            // Si on trouve bien un user acvec le bon username on vient vérifier le mdp
            if (results.length) {

                let user = { id_user : results[0].id_user, username : results[0].username, email : results[0].email } 

                // On compare les hash de mdp -> True si c'est bien les memes 
                bcrypt.compare(password, results[0].password, (err, results) => {
                    if (err) {
                        console.log(err)
                        res.status(500)

                    } else if (results) {
                        const accessToken = jwt.sign(user , process.env.JWT_TOKEN_SECRET, { expiresIn: '120m'});

                        res.json(accessToken)
                    }
                })
            }
        }
    })
})

// Faire une route "pirate" ou autre nom qui est déstiné à recevoir les elements du LS et des cookies que vous avez dérobé
// Une fois les données pirates reçues, affichez les dans le terminal ou via une réponse 
// router.post('/pirate', (req, res) => {
//     let { data } = req.body
//     console.log(data)
//     res.status(200).json("Les données sont bien reçues")
// })


// On exporte ensuite le router pour l'utiliser dans app.js
module.exports = router