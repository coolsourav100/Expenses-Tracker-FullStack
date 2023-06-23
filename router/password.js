const express = require('express')
const router = express.Router();
const passwordcontroler = require('../controller/password')

router.post('/forgotpassword' , passwordcontroler.resetPassword)

router.get('/verify_user/:id' , passwordcontroler.verifyUser)

router.post('/updatepassword' , passwordcontroler.updatepassword)
// router.post('/resetpassword/:id',passwordcontroler.resetPassword )

module.exports = router