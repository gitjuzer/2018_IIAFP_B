const Statistic = require('../models/statistic')
const User = require('../models/user')
const GameSession = require('../models/gamesession')

exports.getAllStatisticsForUserByUsername = (req, res, next)=>{
    const username = req.params.username
    User.getUserByUsername(username, (selectUserErr, selectUserRes)=>{
        if(selectUserErr || selectUserRes === null || !selectUserRes || Object.keys(selectUserRes).length === 0){
            res.status(404).json({
                "status_code":"404",
                "description":"Nem található ilyen felhasználó!"
            })
        }
        else{
            const user_id = selectUserRes[0].id
            Statistic.getStatisticsByUserId(user_id, (selectStatErr, selectStatRes)=>{
                res.status(200).json({
                    "status_code":"200",
                    "description":"Felhasználóhoz tartozó statisztika lekérdezése sikeres!",
                    "data":selectStatRes
                })
            })
        }
    })
}

exports.getAllStatisticsForGameSessionBySessionName = (req,res,next)=>{
    const session_name = req.params.session_name
    GameSession.getGameSessionByName(session_name,(selectSessionErr, selectSessionRes)=>{
        if(selectSessionErr || selectSessionRes === null || !selectSessionRes || Object.keys(selectSessionRes).length === 0){
            res.status(404).json({
                "status_code":"404",
                "description":"Nem található ilyen játékmenet!"
            })
        }
        else{
            const session_id = selectSessionRes[0].id
            Statistic.getStatisticsByGameSessionId(session_id, (selectStatErr, selectStatRes)=>{
                res.status(200).json({
                    "status_code":"200",
                    "description":"Játékmenethez tartozó statisztika lekérdezése sikeres!",
                    "data":selectStatRes
                })
            })
        }
    })
}

exports.getAllStatisticsForUserByUserId = (req, res, next)=>{
    const user_id = req.user_data.user_id
    Statistic.getStatisticsByUserId(user_id, (selectStatErr, selectStatRes)=>{
        res.status(200).json({
            "status_code":"200",
            "description":"A saját statisztika lekérdezése sikeres!",
            "data":selectStatRes
        })
    })
}

exports.getAllStatistics = (req, res, next)=>{
    Statistic.getAllStatistics((selectStatErr, selectStatRes)=>{
        res.status(200).json({
            "status_code":"200",
            "description":"Az összes statisztika lekérdezése sikeres!",
            "data":selectStatRes
        })
    })
}

exports.addNewStatistic = (req, res, next)=>{
    if(!req.body.gained_points || !req.body.session_name){
        res.status(400).json({
            "status_code":"400",
            "description":"Hibás adatok!"
        })
    }
    else{
        const gained_points = req.body.gained_points
        const session_name = req.body.session_name
        GameSession.getGameSessionByName(session_name, (selectSessionErr, selectSessionRes)=>{
            if(selectSessionErr || selectSessionRes === null || !selectSessionRes || Object.keys(selectSessionRes).length === 0){
                res.status(404).json({
                    "status_code":"404",
                    "description":"Nem található ilyen játékmenet!"
                })
            }
            else{
                const session_id = selectSessionRes[0].id
                const max_points = selectSessionRes[0].max_points
                if(gained_points > max_points){
                    return res.status(400).json({
                        "status_code":"400",
                        "description":"Hiba beszúráskor! A megszerzett pontok száma nem lehet több a maximum pontszámnál!"
                    })
                }
                else{
                Statistic.addNewStatistic(new Statistic(gained_points, req.user_data.user_id, session_id), (insertStatErr, insertStatRes)=>{
                        if(insertStatErr || insertStatRes === null || Object.keys(selectSessionRes).length === 0){
                            res.status(400).json({
                                "status_code":"400",
                                "description":"Hiba beszúráskor!"
                            })
                        }
                        else{
                            const statistic_id = insertStatRes.insertId
                            Statistic.getStatisticById(statistic_id, (selectStatErr, selectStatRes)=>{
                                res.status(200).json({
                                    "status_code":"200",
                                    "description":"Új statisztika sikeresen hozzáadva!",
                                    "data":selectStatRes
                                })
                            })
                        }
                    })
                }
            }
        })
    }
}

exports.deleteStatisticById = (req, res, next)=>{
    const statistic_id = req.params.id
    const user_id_from_token = req.user_data.user_id
    Statistic.getStatisticById(statistic_id, (getStatErr, getStatRes)=>{
        if(getStatErr || getStatRes === null || Object.keys(getStatRes).length === 0){
            return res.status(404).json({
                "status_code":"404",
                "description":"Nem létező statisztika!"
            })
        }
        else{
            const user_id_from_stat = getStatRes[0].user_id
            if(req.user_data.account_type != 'ADMIN' || (user_id_from_stat != user_id_from_token)){
                return res.status(404).json({
                    "status_code":"400",
                    "description":"Nem lehet más felhasználó statisztikáját törölni!"
                })
            }
            else{
                Statistic.deleteStatisticById(statistic_id, (deleteErr, deleteRes)=>{
                    res.status(200).json({
                        "status_code":"200",
                        "description":"Statisztika sikeresen törölve!",
                        "data":{}
                    })
                })
            }
        }
    })
}