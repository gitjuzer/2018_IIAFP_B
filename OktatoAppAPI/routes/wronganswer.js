const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')


const wronganswerController = require('../controllers/wronganswer')

router.get('/',checkAuth.IsLoggedIn,wronganswerController.get_all_wronganswer)

module.exports = router