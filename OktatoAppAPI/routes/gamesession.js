const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const gamesessionController = require('../controllers/gamesession');
const statisticsController = require('../controllers/statistic')
const questionsController = require('../controllers/question')

router.get('/',gamesessionController.select_all_gamesession)//checkAuth.IsLoggedIn,
router.get('/:session_id/statistics', statisticsController.getAllStatisticsForGameSessionBySessionId)//checkAuth.IsLoggedIn,
router.get('/:session_id',gamesessionController.select_session_by_sessionid)//checkAuth.IsLoggedIn,
router.get('/:session_id/questions', questionsController.getAllQuestionsBySessionId)//checkAuth.IsLoggedIn,
router.post('/',checkAuth.IsTeacherOrAdmin,gamesessionController.create_gamesession)
router.delete('/:sessionid',gamesessionController.delete_gamesession)//checkAuth.IsTeacherOrAdmin,
router.put('/:sessionid',gamesessionController.update_gamesession)//checkAuth.IsTeacherOrAdmin,
module.exports = router