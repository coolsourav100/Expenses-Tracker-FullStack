const Sequlize = require('sequelize');
const sequelize = require('../util/dataBase')
const Order = sequelize.define('order',{
    id : {
        type:Sequlize.INTEGER,
  allowNull: false, 
  autoIncrement: true,
    primaryKey: true,
    },
    payment_id :{
        type:Sequlize.STRING,
        // allowNull: false, 
    },
    order_id :{
        type:Sequlize.STRING,
        // allowNull: false, 
    },
    status :{
        type:Sequlize.STRING,
        // allowNull: false, 
    },

})
module.exports = Order