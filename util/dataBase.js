//here the code that perform conecting backend with database

// const mysql = require('mysql2');
// const pool = mysql.createPool({
//     host:'localhost',
//     user:'root',
//     password:'Sabari@123',
//     database:'node-complete'
// })

// module.exports = pool.promise();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('sequelize-complete','root','Sabari@123',{
    dialect:'mysql',
    host: 'localhost'
});

module.exports = sequelize;