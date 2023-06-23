const Sequelize = require('sequelize');
const sequelize = require('../util/dataBase')

const Expenses = sequelize.define('expenses',{
    id:{
        type :Sequelize.INTEGER ,
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
    } ,
    des:{
        type :Sequelize.STRING,
        allowNull : false
    } ,
    amount:{
        type :Sequelize.INTEGER,
        allowNull : false
    },
    cata:{
        type :Sequelize.STRING(255),
        allowNull : false
    }
})


module.exports = Expenses
