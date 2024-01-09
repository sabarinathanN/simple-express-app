const Sequelize = require('sequelize');

//import the database connection to this file

const sequalize = require('../util/dataBase');

const product = sequalize.define('product',{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title:Sequelize.STRING,
  price:{
    type:Sequelize.INTEGER,
    allowNull: false
  },
  imageurl:{
    type:Sequelize.STRING,
    allowNull: false
  },
  description:{
    type:Sequelize.STRING,
    allowNull: false
  }
});

module.exports = product;
