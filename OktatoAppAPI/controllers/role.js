const Role = require('../models/role');

exports.get_all_roles = (req,res,next)=>{
    Role.getAllRoles((err, result) =>{
        res.status(200).json(result);
    })
}

exports.get_role_by_rolename = (req,res,next)=>{
    const role_name = req.params.role_name;
    Role.getRoleByName(role_name,(err, result)=>{
        res.status(200).json(result);
    });
}

exports.create_new_role = (req,res,next)=>{
    const newRole = new Role(req.body);
    if(!newRole.role_name || !newRole.role_description){
        res.status(400).send({
            "status_code": "400",
            "description": "Helytelen paraméterek!"
        });
    }
    else{
        Role.createRole(newRole, (err, result) =>{
            Role.getRoleById(result, (err, result)=>{
                res.status(201).json({
                    "status_code": "201",
                    "description": "Szerepkör sikeresen létrehozva!",
                    "data":result
                });
            });
            
        });
    }
}

exports.delete_role_by_rolename = (req,res,next)=>{
    const role_name = req.params.role_name;
    Role.deleteRole(role_name, (err,result)=>{
        res.status(200).json({
            "status_code":"200",
            "description":"Szerepkör sikeresen törölve!",
            "data":{

            }
        })
    })
}

exports.update_role_by_rolename = (req,res,next)=>{
    const role_name = req.params.role_name;
    const role = new Role(req.body);
    if(!role.role_name || !role.role_description){
        res.status(400).send({
            "status_code": "400",
            "description": "Helytelen paraméterek!"
        });
    }
    else{
        Role.modifyRole(role, role_name, (err,result)=>{
            Role.getRoleByName(role_name, (err,result)=>{
                res.status(200).json({
                    "status_code":"200",
                    "description":"Szerepkör sikeresen módosítva!",
                    "data": result
                });
            });
        });
    }
}