const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const gamesessionController = require('../controllers/gamesession');
const statisticsController = require('../controllers/statistic')
const questionsController = require('../controllers/question')

router.get('/',checkAuth.IsLoggedIn,gamesessionController.select_all_gamesession)
router.get('/:session_id/statistics', checkAuth.IsLoggedIn, statisticsController.getAllStatisticsForGameSessionBySessionId)
router.get('/:session_id',checkAuth.IsLoggedIn,gamesessionController.select_session_by_sessionid)
router.get('/:session_id/questions', checkAuth.IsLoggedIn,questionsController.getAllQuestionsBySessionId)
router.post('/',checkAuth.IsTeacherOrAdmin,gamesessionController.create_gamesession)
router.delete('/:sessionid',checkAuth.IsTeacherOrAdmin,gamesessionController.delete_gamesession)
router.put('/:sessionid',checkAuth.IsTeacherOrAdmin,gamesessionController.update_gamesession)
module.exports = router