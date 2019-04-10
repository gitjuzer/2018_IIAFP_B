const RoleToPermission = require('../models/role_to_permission')
const message = require('../utilities/jsonmessage')

exports.GetPermissionForRole = (req, res, next) =>{
    const role_name = req.params.role_name;
    RoleToPermission.getPermissionsForRole(role_name, (err, result)=>{
        if(err || result === null || !result){
            return res.status(404).json(message.compose('404','Szerepkör nem található!'))
        }
        return res.status(200).json(message.compose('200','Szerepkörhoz tartozó jogosultságok sikeresen lekérdezve!',result))
    })
}

exports.AddPermissionToRole = (req,res,next)=>{
    const role_name = req.params.role_name
    const permission_name = req.body.permission_name
    RoleToPermission.AddPermissionToRole(role_name, permission_name, (err, result)=>{
        if(err || result === null || !result){
            if(err && err.errno == '1062'){
                return res.status(409).json(message.compose('409','Ehhez a szerepkörhöz már tartozik ilyen jogosultság!'))
            }
            if(!result){
                return res.status(404).json(message.compose('404','Jogosultság nem található!'))
            }
            return res.status(404).json(message.compose('404','Szerepkör nem található!'))
        }
        return res.status(201).json(message.compose('201','Jogosultság sikeresen hozzáadva a szerepkörhöz!',{
            'role_name':role_name,
            'permission_name':permission_name
        }))
    })
}

exports.RemovePermissionFromRole = (req, res,next)=>{
    const role_name = req.params.role_name
    const permission_name = req.params.permission_name
    RoleToPermission.RemovePermissionFromRole(role_name, permission_name, (err, result)=>{
        if(err && err.type == 'PERMISSION_NOT_FOUND'){
            return res.status(404).json(message.compose('404','Jogosultság nem található a szerepkörnél!'))
        }
        if(err || result === null || !result){
            return res.status(404).json(message.compose('404','Szerepkörhöz nem található jogosultság!'))
        }
        return res.status(200).json(message.compose('200','Jogosultság sikeresen törölve a szerepkörről!'))
    })
}