const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

const correctanswerController = require('../controllers/correctanswer')

router.get('/',checkAuth.IsLoggedIn,correctanswerController.getAllCorrectAnswers)

module.exports = router