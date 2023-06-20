const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const sequelize = require('./util/dataBase')
const User = require('./model/user')
const Expenses = require('./model/expenses')
const app = express()

// user module import
const userRouter = require('./router/user');
const expensesRouter = require('./router/expenses')
const paymentOrder = require('./router/order')
const Order = require('./model/order')
// Middlewere
app.use(cors())
app.use(bodyParser.json())
// Routing
app.use('/auth',userRouter)
app.use('/expenses' , expensesRouter)
app.use('/order' ,paymentOrder )

User.hasMany(Expenses)
Expenses.belongsTo(User)
User.hasMany(Order)
Order.belongsTo(User)
// Server running
sequelize.sync()
app.listen(4000,()=>{
  console.log('Server is running')
})