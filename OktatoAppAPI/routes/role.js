const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const roleController = require('../controllers/role');
const roleToPermissionController = require('../controllers/role_to_permission')

router.get('/', checkAuth.IsLoggedIn, roleController.get_all_roles);

router.get('/:role_name',checkAuth.IsLoggedIn, roleController.get_role_by_rolename);

router.post('/', checkAuth.IsAdmin, roleController.create_new_role);

router.delete('/:role_name',checkAuth.IsAdmin,roleController.delete_role_by_rolename);

router.put('/:role_name', checkAuth.IsAdmin,roleController.update_role_by_rolename);

router.get('/:role_name/permissions', checkAuth.IsLoggedIn,  roleToPermissionController.GetPermissionForRole)

router.post('/:role_name/permissions', checkAuth.IsAdmin, roleToPermissionController.AddPermissionToRole)

router.delete('/:role_name/permissions/:permission_name',checkAuth.IsAdmin, roleToPermissionController.RemovePermissionFromRole)

module.exports= router;