const User = require('../models/user')
const RoleToPermission = require('../models/role_to_permission')
const message = require('../utilities/jsonmessage')

exports.getMyData = (req, res, next)=>{
    const user_id = req.user_data.user_id
    User.getUserById(user_id, (err, result)=>{
        if(err){
            return res.status(404).json(message.compose('404','Nem található!'))    
        }
        else{
            return res.status(200).json(message.compose('200','Sikeres lekérdezés!',result))
        }
    })
}

exports.getMyPermissions = (req, res,next)=>{
    const role_name = req.user_data.account_type
    RoleToPermission.getPermissionsForRole(role_name, (err, result)=>{
        if(err){
            return res.status(404).json(message.compose('404','Nem található!'))    
        }
        else{
            return res.status(200).json(message.compose('200','Sikeres lekérdezés!',result))
        }
    })
}