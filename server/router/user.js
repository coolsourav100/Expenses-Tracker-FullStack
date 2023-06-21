const express = require('express')
const userController = require('../controller/user')
const { getUserId } = require('../util/getUserData')
const router = express.Router()


router.post('/register',userController.registerUser)

router.post('/login',userController.loginUser)

router.get('/download' ,getUserId,userController.downloadReport )


module.exports = router