const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const questionController = require('../controllers/question')
const wronganswerController = require('../controllers/wronganswer')
const correctanswerController = require('../controllers/correctanswer')

router.get('/',checkAuth.IsLoggedIn, questionController.get_all_question)
router.post('/',checkAuth.IsTeacherOrAdmin,questionController.create_new_question)
router.delete('/:id',checkAuth.IsTeacherOrAdmin,questionController.delete_question)
router.put('/:id',checkAuth.IsTeacherOrAdmin,questionController.modify_question)
router.get('/:id/wrong-answers',checkAuth.IsLoggedIn, wronganswerController.getAllWrongAnswersByQuestionId)
router.get('/:id/correct-answer', checkAuth.IsLoggedIn,correctanswerController.getCorrectAnswerByQuestionId)
router.post('/:id/wrong-answers',checkAuth.IsTeacherOrAdmin,wronganswerController.create_wronganswer)
router.post('/:id/correct-answer', checkAuth.IsTeacherOrAdmin,correctanswerController.addCorrectAnswerToQuestion)
router.put('/:id/correct-answer',checkAuth.IsTeacherOrAdmin, correctanswerController.modifyCorrectAnswerToQuestion)
router.put('/:id/wrong-answers/:answer_id',checkAuth.IsTeacherOrAdmin,wronganswerController.update_wronganswer)
router.delete('/:id/wrong-answers/:answer_id',checkAuth.IsTeacherOrAdmin,wronganswerController.delete_wronganswer)
router.delete('/:id/correct-answer',checkAuth.IsTeacherOrAdmin, correctanswerController.deleteCorrectAnswerByQuestionId)



module.exports = router