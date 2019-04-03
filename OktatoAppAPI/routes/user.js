const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const userController = require('../controllers/user')

router.get('/',checkAuth.IsLoggedIn, userController.get_all_users);

router.get('/:username',checkAuth.IsLoggedIn, userController.get_user_by_username);

router.post('/signup', userController.create_new_user);

router.post('/login', userController.login);

router.post('/logout', checkAuth.IsLoggedIn, userController.logout);

module.exports= router;