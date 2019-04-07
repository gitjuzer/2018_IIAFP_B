const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')


const difficultyController = require('../controllers/difficulty')

router.get('/',checkAuth.IsLoggedIn,difficultyController.get_all_difficulties)
router.get('/:level',checkAuth.IsLoggedIn,difficultyController.get_difficulty_by_level)
router.post('/',checkAuth.IsTeacherOrAdmin,difficultyController.create_new_difficulty)
router.delete('/:level',checkAuth.IsTeacherOrAdmin,difficultyController.delete_difficulty)
module.exports = router