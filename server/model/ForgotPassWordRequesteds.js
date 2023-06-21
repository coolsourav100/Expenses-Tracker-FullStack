const Sequlize = require("sequelize")
const sequelize = require('../util/dataBase')
 const ForgotPasswordRequested = sequelize.define('forgotpasswordrequested',{
    id:{
        type:Sequlize.STRING,
        primaryKey: true,
        allowNull: false, 
    },
    isActive :{
        type : Sequlize.BOOLEAN,
        allowNull: false, 
    }
 })
 module.exports = ForgotPasswordRequested