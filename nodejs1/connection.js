const mysql = require('mysql')

const db = mysql.createConnection ({
    host: "localhost", 
    user: "root", 
    password: "", 
    database:"cuy_university"
})

module.exports = db