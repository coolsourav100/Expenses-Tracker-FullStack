const express = require('express')
const router =express.Router();
const expensesController = require('../controller/expenses')

router.get('/allexpenses' ,expensesController.getAllExpenses )

router.post('/addexpenses', expensesController.addExpenses)
router.delete('/deleteexpenses/:id' , expensesController.deleteExpenses)

module.exports = router
