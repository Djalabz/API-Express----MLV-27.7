// Fichier de connexion à la DB mysql 
// On utilisera la dépendance mysql2
const mysql = require("mysql2")

const db = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'eshop',
})

// Instance de connexion à la DB 
db.getConnection((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Connexion à la DB réussie")
    }
})

// Export de db afin de le réutiliser dans d'autres fichiers
module.exports = db