const express = require('express')
const router = express.Router()
const getuserData = require('../util/getUserData')
const premiumController = require('../controller/premium')

router.get('/leaderboard' ,getuserData.getUserId,premiumController.premiumLeaderboard)

module.exports = router