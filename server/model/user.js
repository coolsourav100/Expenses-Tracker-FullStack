const Sequlize = require('sequelize');
const sequelize = require('../util/dataBase')

const User = sequelize.define('user',{
id:{
  type:Sequlize.INTEGER,
  allowNull: false, 
  autoIncrement: true,
    primaryKey: true,
    
},
name:{
  type:Sequlize.STRING,
  allowNull:false
},
email:{
  type:Sequlize.STRING,
  unique: true,
  allowNull:false
},
password:{
  type:Sequlize.STRING,
  allowNull:false
  
},
ispremiumuser:Sequlize.BOOLEAN
})

module.exports = User