const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')

router.get('/', userController.get_all_users);

router.get('/:username', userController.get_user_by_username);

router.post('/', userController.create_new_user);

module.exports= router;