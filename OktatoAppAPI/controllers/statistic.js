const Statistic = require('../models/statistic')
const User = require('../models/user')
const GameSession = require('../models/gamesession')
const message = require('../utilities/jsonmessage')

exports.getAllStatisticsForUserByUsername = (req, res, next)=>{
    const username = req.params.username
    User.getUserByUsername(username, (selectUserErr, selectUserRes)=>{
        if(selectUserErr || selectUserRes === null || !selectUserRes || Object.keys(selectUserRes).length === 0){
            res.status(404).json(message.compose('404','Nem található ilyen felhasználó!'))
        }
        else{
            const user_id = selectUserRes[0].id
            Statistic.getStatisticsByUserId(user_id, (selectStatErr, selectStatRes)=>{
                res.status(200).json(message.compose('200','Felhasználóhoz tartozó statisztika lekérdezése sikeres!',selectStatRes))
            })
        }
    })
}

exports.getAllStatisticsForGameSessionBySessionName = (req,res,next)=>{
    const session_name = req.params.session_name
    GameSession.getGameSessionByName(session_name,(selectSessionErr, selectSessionRes)=>{
        if(selectSessionErr || selectSessionRes === null || !selectSessionRes || Object.keys(selectSessionRes).length === 0){
            res.status(404).json(message.compose('404','Nem található ilyen játékmenet!'))
        }
        else{
            const session_id = selectSessionRes[0].id
            Statistic.getStatisticsByGameSessionId(session_id, (selectStatErr, selectStatRes)=>{
                res.status(200).json(message.compose('200','Játékmenethez tartozó statisztika lekérdezése sikeres!',selectStatRes))
            })
        }
    })
}
exports.getAllStatisticsForGameSessionBySessionId = (req,res,next)=>{
    const session_id = req.params.session_id
    GameSession.getGameSessionById(session_id,(selectSessionErr, selectSessionRes)=>{
        if(selectSessionErr || selectSessionRes === null || !selectSessionRes || Object.keys(selectSessionRes).length === 0){
            res.status(404).json(message.compose('404','Nem található ilyen játékmenet!'))
        }
        else{
            const session_Id = selectSessionRes[0].id
            Statistic.getStatisticsByGameSessionId(session_Id, (selectStatErr, selectStatRes)=>{
                res.status(200).json(message.compose('200','Játékmenethez tartozó statisztika lekérdezése sikeres!',selectStatRes))
            })
        }
    })
}


exports.getAllStatisticsForUserByUserId = (req, res, next)=>{
    const user_id = req.user_data.user_id
    Statistic.getStatisticsByUserId(user_id, (selectStatErr, selectStatRes)=>{
        res.status(200).json(message.compose('200','A saját statisztika lekérdezése sikeres!',selectStatRes))
    })
}

exports.getAllStatistics = (req, res, next)=>{
    Statistic.getAllStatistics((selectStatErr, selectStatRes)=>{
        res.status(200).json(message.compose('200','Az összes statisztika lekérdezése sikeres!',selectStatRes))
    })
}

exports.addNewStatistic = (req, res, next)=>{
    if(!req.body.gained_points || !req.body.session_id){
        res.status(400).json(message.compose('400','Hibás adatok!'))
    }
    else{
        const gained_points = req.body.gained_points
        const session_id = req.body.session_id
        GameSession.getGameSessionById(session_id, (selectSessionErr, selectSessionRes)=>{
            if(selectSessionErr || selectSessionRes === null || !selectSessionRes || Object.keys(selectSessionRes).length === 0){
                res.status(404).json(message.compose('404','Nem található ilyen játékmenet!'))
            }
            else{
                const session_id = selectSessionRes[0].id
                const max_points = selectSessionRes[0].max_points
                if(gained_points > max_points){
                    return res.status(400).json(message.compose('400','Hiba beszúráskor! A megszerzett pontok száma nem lehet több a maximum pontszámnál!'))
                }
                else{
                Statistic.addNewStatistic(new Statistic(gained_points, req.user_data.user_id, session_id), (insertStatErr, insertStatRes)=>{
                        if(insertStatErr || insertStatRes === null || Object.keys(selectSessionRes).length === 0){
                            res.status(400).json(message.compose('400','Hibás adatok!'))
                        }
                        else{
                            const statistic_id = insertStatRes.insertId
                            Statistic.getStatisticById(statistic_id, (selectStatErr, selectStatRes)=>{
                                res.status(200).json(message.compose('200','Új statisztika sikeresen hozzáadva!',selectStatRes))
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
            return res.status(404).json(message.compose('404','Nem létező statisztika!'))
        }
        else{
            const user_id_from_stat = getStatRes[0].user_id
            if(req.user_data.account_type != 'ADMIN' || (user_id_from_stat != user_id_from_token)){
                return res.status(404).json(message.compose('400','Nem lehet más felhasználó statisztikáját törölni!'))
            }
            else{
                Statistic.deleteStatisticById(statistic_id, (deleteErr, deleteRes)=>{
                    res.status(200).json(message.compose('200','Statisztika sikeresen törölve!'))
                })
            }
        }
    })
}