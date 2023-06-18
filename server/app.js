const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const sequelize = require('./util/dataBase')
const app = express()

// user module import
const userRouter = require('./router/user')
// Middlewere
app.use(cors())
app.use(bodyParser.json())
// Routing
app.use('/auth',userRouter)

// Server running
sequelize.sync()
app.listen(4000,()=>{
  console.log('Server is running')
})