const express = require('express')
const userController = require('../controller/user')
const router = express.Router()

router.post('/register',userController.registerUser)

router.post('/login',userController.loginUser)

router.get('/getleaderboard' , userController.getLeaderBoard)

module.exports = router