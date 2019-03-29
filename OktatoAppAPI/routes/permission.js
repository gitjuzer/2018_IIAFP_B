const express = require('express');
const router = express.Router();

const permissionController = require('../controllers/permission')

router.get('/', permissionController.get_all_permission);
router.post('/', permissionController.create_permission)
router.delete('/:permission_name', permissionController.delete_permission)

module.exports= router;