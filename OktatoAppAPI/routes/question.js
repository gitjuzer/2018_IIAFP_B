const express = require('express');
const router = express.Router();

const questionController = require('../controllers/question')

router.get('/', questionController.get_all_question)
router.post('/',questionController.create_new_question)
router.delete('/:id',questionController.delete_question)
router.put('/:id',questionController.modify_question)
router.post('/:id/wrong-answers',questionController.create_wronganswer)
router.put('/:id/wrong-answers/:answer_id',questionController.update_wronganswer)
router.delete('/:id/wrong-answers/:answer_id',questionController.delete_wronganswer)



module.exports = router