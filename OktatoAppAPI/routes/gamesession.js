const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const gamesessionController = require('../controllers/gamesession');
const statisticsController = require('../controllers/statistic')

router.get('/',gamesessionController.select_all_gamesession)
router.get('/:session_name/statistics', checkAuth.IsLoggedIn,statisticsController.getAllStatisticsForGameSessionBySessionName)
router.get('/:session_name',gamesessionController.select_session_by_sessionName)
router.post('/',gamesessionController.create_gamesession)
router.delete('/:sessionname',gamesessionController.delete_gamesession)
router.put('/:sessionname',gamesessionController.update_gamesession)
module.exports = router