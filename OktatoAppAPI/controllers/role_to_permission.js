const RoleToPermission = require('../models/role_to_permission')

exports.GetPermissionForRole = (req, res, next) =>{
    const role_name = req.params.role_name;
    RoleToPermission.getPermissionsForRole(role_name, (err, result)=>{
        console.log('asd')
        if(err || result === null || !result){
            return res.status(404).json({
                "status_code" : "404",
	            "description" : "Szerepkör nem található!"
            })
        }
        return res.status(200).json({
            "status_code" : "200",
            "description" : "Szerepkörhoz tartozó jogosultságok sikeresen lekérdezve!",
            "data" : result
        })
    })
}

exports.AddPermissionToRole = (req,res,next)=>{
    const role_name = req.params.role_name
    const permission_name = req.body.permission_name
    RoleToPermission.AddPermissionToRole(role_name, permission_name, (err, result)=>{
        if(err || result === null || !result){
            if(err.errno == '1062'){
                return res.status(409).json({
                    "status_code" : "409",
                    "description" : "Ehhez ez szerepkörhöz már tartozik ilyen jogosultság!"
                })
            }
            return res.status(404).json({
                "status_code" : "404",
	            "description" : "Szerepkör nem található!"
            })
        }
        return res.status(201).json({
            "status_code" : "201",
            "description" : "Jogosultság sikeresen hozzáadva a szerepkörhöz!",
            "data" : {
                "role_name": role_name,
                "permission_name":permission_name
            }
        })
    })
}

exports.RemovePermissionFromRole = (req, res,next)=>{
    const role_name = req.params.role_name
    const permission_name = req.params.permission_name
    RoleToPermission.RemovePermissionFromRole(role_name, permission_name, (err, result)=>{
        if(err && err.type == 'PERMISSION_NOT_FOUND'){
            return res.status(404).json({
                "status_code" : "404",
	            "description" : "Jogosultság nem található a szerepkörnél!"
            })
        }
        if(err || result === null || !result){
            return res.status(404).json({
                "status_code" : "404",
	            "description" : "Szerepkörhöz nem található jogosultság!"
            })
        }
        return res.status(200).json({
            "status_code" : "200",
            "description" : "Jogosultság sikeresen törölve a szerepkörről!",
            "data" : null
        })
    })
}