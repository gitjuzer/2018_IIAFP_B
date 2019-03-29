const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')

router.get('/', userController.get_all_users);

router.get('/:username', userController.get_user_by_username);

router.post('/signup', userController.create_new_user);

router.post('/login', userController.login);

module.exports= router;