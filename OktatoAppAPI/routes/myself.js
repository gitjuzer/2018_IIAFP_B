const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const myselfController = require('../controllers/myself')
const statisticsController = require('../controllers/statistic')

router.get('/', checkAuth.IsLoggedIn, myselfController.getMyData)
router.get('/statistics', checkAuth.IsLoggedIn, statisticsController.getAllStatisticsForUserByUserId)
router.get('/permissions', checkAuth.IsLoggedIn, myselfController.getMyPermissions)

module.exports= router