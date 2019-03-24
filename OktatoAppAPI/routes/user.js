const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req,res,next)=>{
    User.getAllUsers((err, result) =>{
        res.status(200).json(result);
    })
});

router.get('/:username', (req,res,next)=>{
    const username = req.params.username;
    User.getUserByUsername(username, (err, result)=>{
        res.status(200).json(result);
    }) 
});

router.post('/', (req,res,next)=>{
    const newUser = new User(req.body);
    const account_type = req.body['account_type'];
    if(!newUser.username || !newUser.password ||!newUser.first_name ||!newUser.last_name ||
        !account_type){
        res.status(400).send({
            "status_code": "400",
            "description": "Sikertelen regisztráció!"
        });
    }
    else{
        User.createUser(newUser, account_type, (err, result) =>{
            User.getUserById(result, (err, result)=>{
                res.status(201).json({
                    "status_code": "201",
                    "description": "Sikeres regisztráció!",
                    "data":result
                });
            });
            
        });
    }
});

module.exports= router;