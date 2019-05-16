const User = require('../models/user');
const Role = require('../models/role');
const UserToRole = require('../models/user_to_role');
const jwt = require('jsonwebtoken')
const Token = require('../models/token')
const moment = require('moment')
const encryption = require('../utilities/encryption')
const message = require('../utilities/jsonmessage')

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
        res.status(200).json(message.compose('200','Az összes felhasználó sikeresen lekérdezve!',result))
    })
}

exports.get_user_by_username = (req,res,next)=>{
    const username = req.params.username;
    User.getUserByUsername(username, (err, result)=>{
        if(err || result === null || Object.keys(result).length === 0){
            res.status(404).json(message.compose('404','Felhasználó nem található!'))
        }
        else{
            res.status(200).json(message.compose('200','Felhasználó sikeresen lekérdezve!',result))
        }
    }) 
}

exports.login = (req,res,next)=>{
    if (!req.body.username || !req.body.password || !req.body.login_type){
        return res.status(401).json(message.compose('401','Sikertelen bejelentkezés!'))
    }
    login_type = req.body.login_type
    if(login_type != 'ADMIN' && login_type != 'TEACHER' && login_type != 'STUDENT'){
        return res.status(401).json(message.compose('401','Sikertelen bejelentkezés!'))
    }
    User.getUserByUsernameWithPassword(req.body.username, (err, result)=>{
        const user = result;
        if (!user ||  user.length < 1){
            return res.status(401).json(message.compose('401','Sikertelen bejelentkezés!'))
        }
        if(login_type != user[0].role_name){
            return res.status(401).json(message.compose('401','Sikertelen bejelentkezés!'))
        }
        encryption.comparePassword(req.body.password, user[0].password_hash, (err, res_isPasswordMatch)=>{
            if(!res_isPasswordMatch){
                return res.status(401).json(message.compose('401','Sikertelen bejelentkezés!'))
            }
            Token.getActiveTokensByUsername(req.body.username, (err, result)=>{
                const tokenfromdb = result;
                if(tokenfromdb.length == 1){
                    return res.status(201).json(message.compose('201','Sikeres bejelentkezés!',tokenfromdb))
                }        
                const token = jwt.sign({
                    username: user[0].username,
                    email: user[0].email,
                    user_id: user[0].id,
                    account_type: user[0].role_name
                    },
                    process.env.JWT_KEY || "2018_19_II.FELEV_LABOR_B",
                    {
                        expiresIn: "4h"
                    }
                )
                Token.createNewToken(new Token({
                    token:token,
                    expires_at: moment(new Date().addHours(4)).format("YYYY-MM-DD HH:mm:ss"),
                    is_active:1,
                    user_id:user[0].id
                }),
                (err,result)=>{
                    Token.getTokenById(result.insertId, (err, result1)=>{
                        return res.status(201).json(message.compose('201','Sikeres bejelentkezés!',result1))
                    })       
                })
            })
        })
    })
}

exports.logout = (req,res,next)=>{
    const username = req.user_data.username;
    Token.getActiveTokensByUsername(username, (err,result)=>{
        const tokenfromdb = result;
        if(tokenfromdb.length == 1){
            Token.deactiveTokenById(tokenfromdb[0].id, (err, result1)=>{
                if(err){
                    return res.status(401).send(message.compose('401','Hibás token!'));
                }
                else{
                    return res.status(200).send(message.compose('200','Sikeres kijelentkezés!'));
                }
            })
        }
        else{
            return res.status(401).send(message.compose('401','Hibás token!'));
        }
    })
}

exports.create_new_user = (req,res,next)=>{
    var newUser = new User(req.body);
    const account_type = req.body['account_type'];
    if(!newUser.username || !newUser.password_hash ||!newUser.first_name ||!newUser.last_name ||
        !account_type || !newUser.email){
        return res.status(400).send(message.compose('400','Hiányzó adatok!'));
    }
    if(hasWhiteSpace(newUser.username)){
        return res.status(400).send(message.compose('400','Hibás adat! A felhasználónévben nem szerepelhet szóköz!'));
    }
    if(!validateEmail(newUser.email)){
        return res.status(400).send(message.compose('400','Hibás adat! Érvényes e-mail címet kell megadni!'));
    }
    encryption.cryptPassword(newUser.password_hash, (err, result_enc)=>{
        if(err){
            return res.status(500).json(message.compose('500',err))
        }
        newUser.password_hash = result_enc
        User.createUser(newUser, (err,result)=>{
            if (err || result === null){
                return res.status(409).json(message.compose('409','Már létezik ilyen felhasználó!'));
            }
            const user_id_pk = result;
            Role.getRoleByName(account_type, (err,result)=>{
                if (err || result === null || Object.keys(result).length === 0){
                    return res.status(404).json(message.compose('404','Szerepkör nem található!'));
                }
                const role_id_pk = result[0].id;
                UserToRole.createUserToRole(new UserToRole(user_id_pk, role_id_pk), (err, result)=>{
                    if (err || result === null || Object.keys(result).length === 0){
                        return res.status(404).json(message.compose('404','Szerepkör nem található!'));
                    }
                    User.getUserById(user_id_pk, (err, result)=>{
                        return res.status(201).json(message.compose('201','Sikeres regisztráció!',result)); 
                    });
                }) 
            });
        })
    })
}
