const express = require('express');
const router = express.Router();
const Role = require('../models/role');

router.get('/', (req,res,next)=>{
    Role.getAllRoles((err, result) =>{
        res.status(200).json(result);
    })
});

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

module.exports= router;