const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const myselfController = require('../controllers/myself')

router.get('/', checkAuth.IsLoggedIn, myselfController.getMyData)
router.get('/permissions', checkAuth.IsLoggedIn, myselfController.getMyPermissions)

module.exports= router