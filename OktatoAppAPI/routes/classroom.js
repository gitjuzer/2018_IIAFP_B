const Classroom = require('../controllers/classroom')
const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

router.get('/', checkAuth.IsLoggedIn, Classroom.getAllClassrooms)
router.get('/:id', Classroom.getClassroomById)
router.delete('/:id', Classroom.deleteClassroomById)


module.exports = router