const express = require('express');
const router = express.Router();
const Role = require('../models/role');

router.get('/', (req,res,next)=>{
    Role.getAllRoles((err, result) =>{
        res.status(200).json(result);
    })
});

router.get('/:role_name',(req,res,next)=>{
    const role_name = req.params.role_name;
    Role.getRoleByName(role_name,(err, result)=>{
        res.status(200).json(result);
    });
});
;

router.post('/', (req,res,next)=>{
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
});

router.delete('/:role_name',(req,res,next)=>{
    const role_name = req.params.role_name;
    Role.deleteRole(role_name, (err,result)=>{
        res.status(200).json({
            "status_code":"200",
            "description":"Szerepkör sikeresen törölve!",
            "data":{

            }
        })
    })
})

router.put('/:role_name',(req,res,next)=>{
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
});

module.exports= router;