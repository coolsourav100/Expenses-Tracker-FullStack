const Sequelize = require('sequelize')
const sequelize = require('../util/dataBase')

const FileDownload = sequelize.define('filedownload',{
    id:{
        type :Sequelize.INTEGER ,
        allowNull: false, 
        autoIncrement: true,
        primaryKey: true,
    },
    filename :{
        type :Sequelize.STRING,
        allowNull : false

    },
    location:{
        type :Sequelize.STRING,
        allowNull : false
    }
})
module.exports = FileDownload