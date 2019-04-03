const User = require('../models/user')
const RoleToPermission = require('../models/role_to_permission')

exports.getMyData = (req, res, next)=>{
    const user_id = req.user_data.user_id
    User.getUserById(user_id, (err, result)=>{
        if(err){
            return res.status(404).json({
                "status_code":"404",
                "description":"Nem található!"
            })    
        }
        else{
            return res.status(200).json({
                "status_code":"200",
                "description":"Sikeres lekérdezés!",
                "data":result
            })
        }
    })
}

exports.getMyPermissions = (req, res,next)=>{
    const role_name = req.user_data.account_type
    RoleToPermission.getPermissionsForRole(role_name, (err, result)=>{
        if(err){
            return res.status(404).json({
                "status_code":"404",
                "description":"Nem található!"
            })    
        }
        else{
            return res.status(200).json({
                "status_code":"200",
                "description":"Sikeres lekérdezés!",
                "data":result
            })
        }
    })
}