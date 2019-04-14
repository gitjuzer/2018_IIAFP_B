const Role = require('../models/role');
const message = require('../utilities/jsonmessage')

exports.get_all_roles = (req,res,next)=>{
    Role.getAllRoles((err, result) =>{
        res.status(200).json(message.compose('200','Szerepkörök sikeresen lekérdezve!',result));
    })
}

exports.get_role_by_rolename = (req,res,next)=>{
    const role_name = req.params.role_name;
    Role.getRoleByName(role_name,(err, result)=>{
        if(!result || result == null){
            return res.status(404).json(message.compose('404','Szerepkör nem található!'))
        }
        return res.status(200).json(message.compose('200','Szerepkör sikeresen lekérdezve!',result));
    });
}

exports.create_new_role = (req,res,next)=>{
    const newRole = new Role(req.body);
    if(!newRole.role_name || !newRole.role_description){
        res.status(400).send(message.compose('400','Hibás adatok!'));
    }
    else{
        Role.createRole(newRole, (err, result) =>{
            Role.getRoleById(result, (err, result)=>{
                res.status(201).json(message.compose('201','Szerepkör sikeresen létrehozva!',result));
            });
            
        });
    }
}

exports.delete_role_by_rolename = (req,res,next)=>{
    const role_name = req.params.role_name;
    Role.deleteRole(role_name, (err,result)=>{
        res.status(200).json(message.compose('200','Szerepkör sikeresen törölve!'))
    })
}

exports.update_role_by_rolename = (req,res,next)=>{
    const role_name = req.params.role_name;
    const role = new Role(req.body);
    if(!role.role_name || !role.role_description){
        res.status(400).json(message.compose('400','Helytelen paraméterek!'));
    }
    else{
        Role.modifyRole(role, role_name, (err,result)=>{
            Role.getRoleByName(role_name, (err,result)=>{
                res.status(200).json(message.compose('200','Szerepkör sikeresen módosítva!',result));
            });
        });
    }
}