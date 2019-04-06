const express = require('express');
const router = express.Router();

const difficultyController = require('../controllers/difficulty')

router.get('/',difficultyController.get_all_difficulties)
router.get('/:level',difficultyController.get_difficulty_by_level)
router.post('/',difficultyController.create_new_difficulty)
router.delete('/:level',difficultyController.delete_difficulty)
module.exports = router