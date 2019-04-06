const GameSession = require('../models/gamesession')
const GameMode = require('../models/gamemode')
const Difficulty = require('../models/difficulty')

exports.select_all_gamesession =(req,res,next)=>{
    GameSession.getAllGameSession((err,result)=>{
        res.status(200).json({
            "status_code":"200",
            "description":"A játékmenetek sikeresen lekérdezve!",
            "data":result
        })
    })
}


exports.select_session_by_sessionName = (req,res,next)=>{
    const sessionName = req.params.session_name
    GameSession.getGameSessionByName(sessionName,(err,result)=>{
        if(err || result === null || Object.keys(result).length === 0)
        {
            return res.status(404).json({
                "status_code":"404",
                "description":"A Játékmenet nem létezik!"
            })
        }
            res.status(200).json({
                "status_code":"200",
                "description":"A játémenethez tartozó adatok sikeresen lekérdezve!",
                "data":result
            })
    })
}

exports.create_gamesession = (req,res,next)=>{
    const gameSession = new GameSession(req.body)

    if(!gameSession.session_name || !gameSession.max_points || !gameSession.game_id || !gameSession.difficulty_level)
    {
         res.status(400).json({
            "status_code":"400",
            "description":"Helytelen paraméterek"
        })
    }
    else{
    GameSession.getGameSessionByName(gameSession.session_name,(err,result)=>{
        if(Object.keys(result).length === 1)
        {
             res.status(409).json({
                "status_code":"409",
                "description":"Már létezik ilyen nevű játékmenet!"
            })
        }
        else{
            GameMode.selectById(gameSession.game_id,(err,result) =>{
                if(Object.keys(result).length === 0)
                {
                     res.status(404).json({
                        "status_code":"404",
                        "description":"Nem létezik ilyen nevű játékmód!"
                    })
                }
                else{
                    GameSession.createGameSession(gameSession,(err,result)=>{
                        GameSession.getGameSessionById(result,(err,result) =>{
                            res.status(201).json({
                                "status_code":"201",
                                "description":"A játékmenet sikeresen létrehozva!",
                                "data": result
                            })
                        })
                    })
                }
            })}
        })
    }
}

exports.delete_gamesession = (req,res,next)=>{
    const sessionName = req.params.sessionname

    GameSession.getGameSessionByName(sessionName,(err,result)=>{
        if(err || result === null || Object.keys(result).length === 0)
        {
            return res.status(404).json({
                "status_code":"404",
                "description":"Nem létező játékmenet!"
            })
        }
        GameSession.deleteGameSession(sessionName,(err,result2)=>{
            res.status(200).json({
                "status_code":"200",
                "description":"Játékmenet sikeresen törölve",
                "data":[]
            })
        })
    })
}

exports.update_gamesession = (req,res,next)=>{
    const sessionName = req.params.sessionname
    const gameSession = new GameSession(req.body)

    GameSession.getGameSessionByName(sessionName,(err1,result)=>{
        if(err1 || result === null || Object.keys(result).length === 0)
        {
            return res.status(404).json({
                "status_code":"404",
                "description":"Nem létező játékmenet!"
            })
        }
        GameMode.selectById(gameSession.game_id,(err2,result2)=>{
            if(err2 || result2 === null || Object.keys(result2).length === 0)
            {
                return res.status(404).json({
                    "status_code":"404",
                    "description":"Nem létező játékmód!"
                })
            }
            Difficulty.selectByLevel(gameSession.difficulty_level,(err3,result3)=>{
                if(err3 || result3 === null || Object.keys(result3).length === 0)
                {
                    return res.status(404).json({
                        "status_code":"404",
                        "description":"Nem létező nehézségi szint!"
                    }) 
                }
                GameSession.modifyGameSession(sessionName,gameSession,(err4,result4)=>{
                    GameSession.getGameSessionByName(sessionName,(err5,result5)=>{
                            res.status(200).json({
                                "status_code":"200",
                                "description":"Játékmenet sikeresen módosítva!",
                                "data": result5
                            })
                    })
                })
            })      
        })
    })
}