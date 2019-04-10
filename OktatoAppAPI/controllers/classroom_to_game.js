const ClassroomToGame = require('../models/classroom_to_game')
const Classroom = require('../models/classroom')
const Gamemode = require('../models/gamemode')
const message = require('../utilities/jsonmessage')

exports.getAllGamemodesForAllClassrooms = (req,res,next)=>{
    ClassroomToGame.allGamesToAllClass((err, selectResult)=>{
        return res.status(200).json(message.compose('200', 'Osztályokhoz tartozó játékok sikeresen lekérdezve!',selectResult))
    })
}

exports.getAllGamemodesForClassroomById = (req,res,next)=>{
    const classroom_id = req.params.id
    Classroom.getClassroomById(classroom_id, (err, selectClassroomResult)=>{
        if(err || selectClassroomResult === null || !selectClassroomResult || Object.keys(selectClassroomResult).length === 0){
            return res.status(404).json(message.compose('404','Nem található ilyen osztály!'))
        }
        else{
            ClassroomToGame.allGamesToClass(classroom_id, (err, selectGamesResult)=>{
                return res.status(200).json(message.compose('200','Az osztályhoz tartozó játékok sikeresen lekérdezve!',selectGamesResult))
            })
        }
    })
}

exports.addGamemodeToClassroomById = (req,res,next)=>{
    if(!req.body.game_name){
        return res.status(400).json(message.compose('400','Hibás adatok!'))
    }
    else{
    const classroom_id = req.params.id
    const gamemode_name = req.body.game_name
    Gamemode.selectGameByname(gamemode_name, (selectGameErr, selectGameResult)=>{
        if(selectGameErr || selectGameResult === null || !selectGameResult || Object.keys(selectGameResult).length === 0){
            return res.status(404).json(message.compose('404','Nem található ilyen játék!'))
        }
        else{
            const gamemode_id = selectGameResult[0].id
            Classroom.getClassroomById(classroom_id, (selectClassErr, selectClassroomResult)=>{
                if(selectClassErr || selectClassroomResult === null || !selectClassroomResult || Object.keys(selectClassroomResult).length === 0){
                    return res.status(404).json(message.compose('404','Nem található ilyen osztály!'))
                }
                else{
                    
                    ClassroomToGame.addGameToClass(new ClassroomToGame(gamemode_id, classroom_id), (insertErr, insertRes)=>{
                        if(insertErr && insertErr.errno === 1062){
                            return res.status(404).json(message.compose('404','Ehhez ez osztályhoz már tartozik ilyen játék!'))
                        }
                        return res.status(201).json(message.compose('201','Az osztályhoz a játék sikeresen felvéve!'))
                    })
                }
            })
        }
    })}
}

exports.deleteGamemodeFromClassroomByGamename = (req, res, next)=>{
    const classroom_id_pk = req.params.id
    const game_name = req.params.game_name
    Gamemode.selectGameByname(game_name, (selectGameErr, selectGameResult)=>{
        if(selectGameErr || selectGameResult === null || !selectGameResult || Object.keys(selectGameResult).length === 0){
            return res.status(404).json(message.compose('404','Nem található ilyen játék!'))
        }
        else{
            const game_id_pk = selectGameResult[0].id
            Classroom.getClassroomById(classroom_id_pk, (selectClassroomErr, selectClassroomRes)=>{
                if(selectClassroomErr || selectClassroomRes === null || !selectClassroomRes || Object.keys(selectClassroomRes).length === 0){
                    return res.status(404).json(message.compose('404','Nem található ilyen osztály!'))
                }
                else{
                    ClassroomToGame.deleteGameFromClassByGamename(game_id_pk, classroom_id_pk, (deleteErr, deleteRes)=>{
                        if(deleteRes.affectedRows == 0){
                            return res.status(404).json(message.compose('404','Nem található ilyen játékmód ehhez az osztályhoz!'))
                        }
                        return res.status(200).json(message.compose('200','Osztályhoz tartozó játék sikeresen törölve!'))
                    })
                }
            })
        }
    })
}

exports.deactiveGameFromClassroomByGamename= (req, res,next)=>{
    if(req.body.is_active === null){
        return res.status(400).json(message.compose('400','Hibás adatok!'))
    }
    else{
    const classroom_id_pk = req.params.id
    const game_name = req.params.game_name
    const is_active = req.body.is_active
    Gamemode.selectGameByname(game_name, (selectGameErr, selectGameResult)=>{
        if(selectGameErr || selectGameResult === null || !selectGameResult || Object.keys(selectGameResult).length === 0){
            return res.status(404).json(message.compose('404','Nem található ilyen játék!'))
        }
        else{
            const game_id_pk = selectGameResult[0].id
            Classroom.getClassroomById(classroom_id_pk, (selectClassroomErr, selectClassroomRes)=>{
                if(selectClassroomErr || selectClassroomRes === null || !selectClassroomRes || Object.keys(selectClassroomRes).length === 0){
                    return res.status(404).json(message.compose('404','Nem található ilyen osztály!'))
                }
                else{
                    ClassroomToGame.modifyGameStateGameFromClassByGameName(is_active, game_id_pk, classroom_id_pk, (putErr, putRes)=>{
                        if(putRes.affectedRows == 0){
                            return res.status(404).json(message.compose('404','Nem található ilyen játékmód ehhez az osztályhoz!'))
                        }
                        ClassroomToGame.selectRecordByClassroomIdAndGameId(game_id_pk,classroom_id_pk, (selectErr, selectRes)=>{
                            return res.status(200).json(message.compose('200','Osztályhoz tartozó játék sikeresen módosítva!',selectRes))
                        })                   
                    })
                }
            })
        }
    })}
}