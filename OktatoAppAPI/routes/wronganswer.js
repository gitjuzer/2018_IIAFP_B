const express = require('express')
const router = express.Router()

const wronganswerController = require('../controllers/wronganswer')

router.get('/',wronganswerController.get_all_wronganswer)

module.exports = router