const User = require('../models/user');
const Role = require('../models/role');
const UserToRole = require('../models/user_to_role');

function hasWhiteSpace(s) {
    return /\s/g.test(s);
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

exports.create_new_user = (req,res,next)=>{
    const newUser = new User(req.body);
    const account_type = req.body['account_type'];

    if(hasWhiteSpace(newUser.username) || hasWhiteSpace(newUser.password)){
        res.status(400).send({
            "status_code": "400",
            "description": "Hibás felhasználónév vagy jelszó!"
        });
    }
    else{
        if(!newUser.username || !newUser.password ||!newUser.first_name ||!newUser.last_name ||
            !account_type){
            res.status(400).send({
                "status_code": "400",
                "description": "Hiányzó adatok!"
            });
        }
        else{
            User.createUser(newUser, account_type, (err,result)=>{
                if (err || result === null){
                    res.status(409).json({
                        "status_code": "409",
                        "description": "Már létezik ilyen felhasználó!",
                    });
                }
                else{
                    const user_id_pk = result;
                    Role.getRoleByName(account_type, (err,result)=>{
                        if (err || result === null || Object.keys(result).length === 0){
                            res.status(404).json({
                                "status_code": "404",
                                "description": "Szerepkör nem található!",
                            });
                        }
                        else{
                            const role_id_pk = result[0].id;
                            UserToRole.createUserToRole(new UserToRole(user_id_pk, role_id_pk), (err, result)=>{
                                if (err || result === null || Object.keys(result).length === 0){
                                    res.status(404).json({
                                       "status_code": "404",
                                       "description": "Szerepkör nem található!",
                                    });
                                }
                                else{
                                    User.getUserById(user_id_pk, (err, result)=>{
                                        res.status(201).json({
                                            "status_code": "201",
                                            "description": "Sikeres regisztráció!",
                                            "data":result
                                        }); 
                                    }); 
                                };
                            });
                        }
                    })
                }
           })
        }
    }
}