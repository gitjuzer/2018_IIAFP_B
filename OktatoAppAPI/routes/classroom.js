const Classroom = require('../controllers/classroom')
const UserToClassroom = require('../controllers/user_to_classroom')
const ClassroomToGame = require('../controllers/classroom_to_game')
const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')

router.get('/',checkAuth.IsLoggedIn, Classroom.getAllClassrooms)
router.get('/game-modes', checkAuth.IsLoggedIn,ClassroomToGame.getAllGamemodesForAllClassrooms)
router.get('/:id/game-modes',checkAuth.IsLoggedIn, ClassroomToGame.getAllGamemodesForClassroomById)
router.post('/:id/game-modes',checkAuth.IsTeacherOrAdmin,ClassroomToGame.addGamemodeToClassroomById)
router.delete('/:id/game-modes/:game_name', checkAuth.IsTeacherOrAdmin,ClassroomToGame.deleteGamemodeFromClassroomByGamename)
router.put('/:id/game-modes/:game_name', checkAuth.IsTeacherOrAdmin,ClassroomToGame.deactiveGameFromClassroomByGamename)
router.get('/:id',checkAuth.IsLoggedIn, Classroom.getClassroomById)
router.post('/',checkAuth.IsTeacherOrAdmin,Classroom.createClassroom)
router.delete('/:id',checkAuth.IsTeacherOrAdmin, Classroom.deleteClassroomById)
router.get('/:id/users', checkAuth.IsLoggedIn, UserToClassroom.getAllUsersFromClassroom)
router.post('/:id/users', checkAuth.IsTeacherOrAdmin, UserToClassroom.addUserToClassroom)
router.delete('/:id/users/:username',checkAuth.IsTeacherOrAdmin, UserToClassroom.deleteUserFromClassroom)


module.exports = router