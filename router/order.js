const express = require('express')
const router = express.Router()
const getUserData = require('../util/getUserData')
const orderController = require('../controller/order')

router.get('/membership' ,getUserData.getUserId, orderController.paymentreqint)
router.post('/paymentstatus' ,getUserData.getUserId, orderController.paymentStatus)
router.post('/paymentstatusfail' ,getUserData.getUserId, orderController.paymentStatusFailed)

module.exports =router