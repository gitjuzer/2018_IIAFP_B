const Classroom = require('../controllers/classroom')
const UserToClassroom = require('../controllers/user_to_classroom')
const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

router.get('/',checkAuth.IsLoggedIn, Classroom.getAllClassrooms)
router.get('/:id',checkAuth.IsLoggedIn, Classroom.getClassroomById)
router.post('/',checkAuth.IsTeacherOrAdmin,Classroom.createClassroom)
router.delete('/:id',checkAuth.IsTeacherOrAdmin, Classroom.deleteClassroomById)
router.get('/:id/users', checkAuth.IsLoggedIn, UserToClassroom.getAllUsersFromClassroom)
router.post('/:id/users', checkAuth.IsTeacherOrAdmin, UserToClassroom.addUserToClassroom)
router.delete('/:id/users/:username',checkAuth.IsTeacherOrAdmin, UserToClassroom.deleteUserFromClassroom)


module.exports = router