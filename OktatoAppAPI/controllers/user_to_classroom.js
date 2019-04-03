const UserToClassroom = require('../models/user_to_classroom')
const User = require('../models/user')

exports.getAllUsersFromClassroom = (req, res, next)=>{
    UserToClassroom.selectAllUsersFromClassroom(req.params.id, (err, result)=>{
        if(err || result === null ||  Object.keys(result).length === 0){
            return res.status(404).json({
                "status_code":"404",
                "description":"Osztályhoz nem tartozik senki!"
            })
        }
        else{
            return res.status(200).json({
                "status_code":"200",
                "description":"Osztály tagjainak lekérdezése sikeres!",
                "data":result
            })
        }
    })
}

exports.addUserToClassroom = (req, res, next)=>{
    if(!req.body.username){
        return res.status(400).json({
            "status_code":"400",
            "description":"Hibás adatok!"
        })
    }
    User.getUserByUsername(req.body.username, (err, result)=>{
        if(err || result === null || Object.keys(result).length === 0){
            return res.status(404).json({
                "status_code":"404",
                "description":"Felhasználó nem létezik!"
            })
        }
        const user_id = result[0].id
        UserToClassroom.addUserToClassroom(user_id, req.params.id, (err, insertResult)=>{
            if(err && err.errno === 1062){
                return res.status(409).json({
                    "status_code":"409",
                    "description":"Már benne van ebben az osztályban ez a felhasználó!"
                })
            }
            if(err && err.errno === 1452){
                return res.status(404).json({
                    "status_code":"404",
                    "description":"Osztály nem található!"
                })
            }
            else{
                return res.status(201).json({
                    "status_code":"201",
                    "description":"Felhasználó sikeresen hozzáadva az osztályhoz!",
                    "data": {}
                })
            }
        })
    })
}

exports.deleteUserFromClassroom = (req,res,next)=>{
    if(!req.params.id || !req.params.username){
        return res.status(400).json({
            "status_code":"400",
            "description":"Hibás adatok!"
        })
    }
    User.getUserByUsername(req.params.username,(err, selectResult)=>{
        if(err || selectResult === null || Object.keys(selectResult).length === 0){
            return res.status(400).json({
                "status_code":"404",
                "description":"Felhasználó nem található!"
            })
        }
        const user_id = selectResult[0].id
        UserToClassroom.deleteUserFromClassroom(req.params.id, user_id, (deleteErr, deleteResult)=>{
            console.log(deleteResult)
            if(deleteResult.affectedRows === 0 || deleteResult === null || Object.keys(deleteResult).length === 0){
                return res.status(404).json({
                    "status_code":"404",
                    "description":"Nem található ilyen felhasználó az osztályban!”"
                })
            }
            else{
                return res.status(200).json({
                    "status_code":"200",
                    "description":"Felhasználó sikeresen törölve az osztályból!",
                    "data":{}
                })
            }
        })
    })
    
}