const User = require('../models/user');
const Role = require('../models/role');
const UserToRole = require('../models/user_to_role');
const jwt = require('jsonwebtoken')
const Token = require('../models/token')

function hasWhiteSpace(s) {
    return /\s/g.test(s);
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

Date.prototype.addHours = function(h){
    this.setHours(this.getHours()+h);
    return this;
}

exports.get_all_users = (req,res,next)=>{
    User.getAllUsers((err, result) =>{
        res.status(200).json({
            "status_code": "200",
            "description": "Az összes felhasználó sikeresen lekérdezve!",
            "data" : result
        })
    })
}

exports.get_user_by_username = (req,res,next)=>{
    const username = req.params.username;
    User.getUserByUsername(username, (err, result)=>{
        if(err || result === null || Object.keys(result).length === 0){
            res.status(404).json({
                "status_code": "404",
                "description": "Felhasználó nem található!"
            })
        }
        else{
            res.status(200).json({
                "status_code": "200",
                "description": "A felhasználó sikeresen lekérdezve!",
                "data" : result
            })
        }
    }) 
}

exports.login = (req,res,next)=>{
    if (!req.body.username || !req.body.password){
        return res.status(401).json({
            "status_code":"401",
            "description":"Sikertelen bejelentkezés!"
        })
    }
    User.getUserByUsernameWithPassword(req.body.username, (err, result)=>{
        const user = result;
        if (user.length < 1){
            return res.status(401).json({
                "status_code":"401",
                "description":"Sikertelen bejelentkezés!"
            })
        }
        if (req.body.password != user[0].password){
            return res.status(401).json({
                "status_code":"401",
                "description":"Sikertelen bejelentkezés!"
            })
        }
        const token = jwt.sign({
            username: user[0].username,
            user_id: user[0].id
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            }
        )
        Token.createNewToken({
            "token": token,
            "created_at": new Date(),
            "expires_at": new Date().addHours(1),
            "is_active": 1,
            "user_id": user[0].id
        },
        (err,result)=>{
            Token.getTokenById(result.insertId, (err, result)=>{
                res.status(201).json({
                    "status_code":"201",
                    "description":"Sikeres bejelentkezés!",
                    "data": result
                })
            })       
        })
    })
}

exports.create_new_user = (req,res,next)=>{
    const newUser = new User(req.body);
    const account_type = req.body['account_type'];

    if(!newUser.username || !newUser.password ||!newUser.first_name ||!newUser.last_name ||
        !account_type || !newUser.email){
        return res.status(400).send({
            "status_code": "400",
            "description": "Hiányzó adatok!"
        });
    }
    if(hasWhiteSpace(newUser.username) || hasWhiteSpace(newUser.password) || !validateEmail(newUser.email)){
        return res.status(400).send({
            "status_code": "400",
            "description": "Hibás adatok!"
        });
    }
    
    User.createUser(newUser, account_type, (err,result)=>{
        if (err || result === null){
            return res.status(409).json({
                "status_code": "409",
                "description": "Már létezik ilyen felhasználó!"
            });
        }
        const user_id_pk = result;
        Role.getRoleByName(account_type, (err,result)=>{
            if (err || result === null || Object.keys(result).length === 0){
                return res.status(404).json({
                    "status_code": "404",
                    "description": "Szerepkör nem található!"
                });
            }
            const role_id_pk = result[0].id;
            UserToRole.createUserToRole(new UserToRole(user_id_pk, role_id_pk), (err, result)=>{
                if (err || result === null || Object.keys(result).length === 0){
                    return res.status(404).json({
                        "status_code": "404",
                        "description": "Szerepkör nem található!"
                    });
                }
                User.getUserById(user_id_pk, (err, result)=>{
                    return res.status(201).json({
                        "status_code": "201",
                        "description": "Sikeres regisztráció!",
                        "data":result
                    }); 
                });
            }) 
        });
    })
}
