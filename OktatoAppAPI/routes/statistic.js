const statisticController = require('../controllers/statistic')
const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

router.get('/', checkAuth.IsLoggedIn,statisticController.getAllStatistics)
router.post('/', checkAuth.IsLoggedIn, statisticController.addNewStatistic)
router.delete('/:id', checkAuth.IsLoggedIn, statisticController.deleteStatisticById)

module.exports = router