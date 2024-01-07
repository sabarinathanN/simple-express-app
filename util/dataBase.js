//here the code that perform conecting backend with database

const mysql = require('mysql2');
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Sabari@123',
    database:'node-complete'
})

module.exports = pool.promise();