const express = require('express')
const router =express.Router();
const expensesController = require('../controller/expenses')
const getUserData = require('../util/getUserData')

router.get('/allexpenses' ,getUserData.getUserId, expensesController.getAllExpenses )
router.post('/addexpenses',getUserData.getUserId, expensesController.addExpenses)
router.delete('/deleteexpenses/:id' ,getUserData.getUserId, expensesController.deleteExpenses)

module.exports = router
