const express = require('express')
const router = express.Router();
const passwordcontroler = require('../controller/password')

router.post('/forgotpassword' , passwordcontroler.forgotpassword)

module.exports = router