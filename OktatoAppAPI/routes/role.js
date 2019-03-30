const express = require('express');
const router = express.Router();

const roleController = require('../controllers/role');
const roleToPermissionController = require('../controllers/role_to_permission')

router.get('/', roleController.get_all_roles);

router.get('/:role_name',roleController.get_role_by_rolename);

router.post('/', roleController.create_new_role);

router.delete('/:role_name',roleController.delete_role_by_rolename);

router.put('/:role_name', roleController.update_role_by_rolename);

router.get('/:role_name/permissions', roleToPermissionController.GetPermissionForRole)

router.post('/:role_name/permissions', roleToPermissionController.AddPermissionToRole)

router.delete('/:role_name/permissions/:permission_name', roleToPermissionController.RemovePermissionFromRole)

module.exports= router;