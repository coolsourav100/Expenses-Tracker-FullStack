
const Sequlize = require('sequelize');
const sequelize = new Sequlize('expenses-tracker', 'root','sourav1234#',{
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = sequelize