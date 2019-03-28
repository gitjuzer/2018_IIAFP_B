const User = require('../models/user');

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
        if(result === null){
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
        //res.status(200).json(result);
    }) 
}

exports.create_new_user = (req,res,next)=>{
    const newUser = new User(req.body);
    const account_type = req.body['account_type'];
    if(!newUser.username || !newUser.password ||!newUser.first_name ||!newUser.last_name ||
        !account_type){
        res.status(400).send({
            "status_code": "400",
            "description": "Hiányzó adatok!"
        });
    }
    else{
        User.createUser(newUser, account_type, (err, result) =>{
            User.getUserById(result, (err, result)=>{
                if(result === null){
                    res.status(201).json({
                        "status_code": "409",
                        "description": "Már létezik ilyen felhasználó!",
                        "data":{}
                    });
                }
                else{
                    res.status(201).json({
                        "status_code": "201",
                        "description": "Sikeres regisztráció!",
                        "data":result
                    });
                }
            });
            
        });
    }
}

