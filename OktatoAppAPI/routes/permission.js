const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const permissionController = require('../controllers/permission')

router.get('/', permissionController.get_all_permission);
router.post('/',checkAuth.IsAdmin, permissionController.create_permission)
router.delete('/:permission_name', checkAuth.IsAdmin,permissionController.delete_permission)

module.exports= router;