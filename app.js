const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const sequelize = require('./util/dataBase')
const User = require('./model/user')
const Expenses = require('./model/expenses')
const helmet = require('helmet')
require('dotenv').config()
const fs = require('fs')
const app = express()

// user module import
const userRouter = require('./router/user');
const expensesRouter = require('./router/expenses')
const paymentOrder = require('./router/order')
const Order = require('./model/order')
const premiumRouter = require('./router/premium')
const passwordRouter = require('./router/password')
const ForgotPasswordRequested = require('./model/ForgotPassWordRequesteds')
const FileDownload = require('./model/FileDownload')
const compression = require('compression')
const morgan = require('morgan')
const path = require('path')

// fs
const accessLogStream = fs.createWriteStream(path.join(__dirname,'access.Log'),{flag : 'a'})
// Middlewere
app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
app.use(compression())
app.use(morgan('combined',{stream:accessLogStream}))
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
// Routing
app.use('/auth',userRouter)
app.use('/expenses' , expensesRouter)
app.use('/order' ,paymentOrder )
app.use('/premium' , premiumRouter)
app.use('/password' , passwordRouter)

User.hasMany(Expenses)
Expenses.belongsTo(User)
User.hasMany(Order)
Order.belongsTo(User)
User.hasMany(ForgotPasswordRequested)
ForgotPasswordRequested.belongsTo(User)
User.hasMany(FileDownload)
FileDownload.belongsTo(User)
// Server running
sequelize.sync()
app.listen(process.env.PORT,()=>{
  console.log('Server is running')
})