const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const gamesessionController = require('../controllers/gamesession');
const statisticsController = require('../controllers/statistic')
const questionsController = require('../controllers/question')

router.get('/',checkAuth.IsLoggedIn,gamesessionController.select_all_gamesession)
router.get('/:session_name/statistics', checkAuth.IsLoggedIn,statisticsController.getAllStatisticsForGameSessionBySessionName)
router.get('/:session_name',checkAuth.IsLoggedIn,gamesessionController.select_session_by_sessionName)
router.get('/:session_name/questions', checkAuth.IsLoggedIn,questionsController.getAllQuestionsBySessionName)
router.post('/',checkAuth.IsTeacherOrAdmin,gamesessionController.create_gamesession)
router.delete('/:sessionname',checkAuth.IsTeacherOrAdmin,gamesessionController.delete_gamesession)
router.put('/:sessionname',checkAuth.IsTeacherOrAdmin,gamesessionController.update_gamesession)
module.exports = router