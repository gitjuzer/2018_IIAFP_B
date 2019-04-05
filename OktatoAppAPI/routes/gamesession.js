const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const gamesessionController = require('../controllers/gamesession');

router.get('/',gamesessionController.select_all_gamesession)
router.get('/:session_name',gamesessionController.select_session_by_sessionName)
router.post('/',gamesessionController.create_gamesession)
module.exports = router