const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const GameModeController = require('../controllers/gamemode')

router.get('/',checkAuth.IsLoggedIn,GameModeController.get_all_gamemode)
router.get('/:gamename', checkAuth.IsLoggedIn,GameModeController.select_by_name)
router.post("/",checkAuth.IsAdmin,GameModeController.create_gamemode)
router.delete("/:gamename",checkAuth.IsAdmin,GameModeController.delete_gamemode)
router.put("/:gamename",checkAuth.IsAdmin,GameModeController.update_gamemode)
router.get('/:game_name/game-session', checkAuth.IsLoggedIn,GameModeController.all_gameSession_to_gameMode)
router.get('/:game_name/classrooms',checkAuth.IsLoggedIn, GameModeController.classrooms_to_gamemode)
module.exports = router

