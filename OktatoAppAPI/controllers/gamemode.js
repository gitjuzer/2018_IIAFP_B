const GameMode = require('../models/gamemode')
const GameSession = require('../models/gamesession')

exports.get_all_gamemode = (req,res,next) =>{
    
    GameMode.selectAll((err,result) =>{
        res.status(200).json({
            "status:code": "200",
            "description":"Játékok sikeresen lekérdezve!",
            "data":result
        })
    })
}

exports.select_by_name = (req,res,next) =>{
    const gamename = req.params.gamename
    GameMode.selectGameByname(gamename,(err,result) =>{
        if(err || result === null || Object.keys(result).length === 0)
        {
            return res.status(404).json({
                "status_code":"404",
                "description":"Játékmód nem található"
                
            })

        }
        res.status(200).json({
            "status_code":"200",
            "description":"Játék sikeresen lekérdezve!",
            "data": result
        })
    })
}

exports.create_gamemode = (req,res,next) =>{
    const newGamemode = new GameMode(req.body)
    if(!newGamemode.name || !newGamemode.description)
    {
        res.status(400).json({
            "status_code": "400",
            "description": "Hiányzó adatok!"
        })
    }
    else
    {
        GameMode.CreateGamemode(newGamemode,(err,result) =>{
            if(err || result === null)
            {
                res.status(409).json({
                    "status_code":"409",
                    "description": "Már létezik ilyen játék"
                })
            }
            else
            {
                GameMode.selectById(result,(err,res1)=>{
                    res.status(201).json({
                        "status_code":"201",
                        "description":"Játék sikeresen létrehozva!",
                        "data": res1
                    })
                })
                
            }
        })
    }
}

exports.delete_gamemode = (req,res,next) =>{
    const gamename = req.params.gamename
    GameMode.selectGameByname(gamename,(err,result) =>{
        if(err || result ===null || Object.keys(result).length === 0)
        {
            res.status(404).json({
                "status_code":"404",
                "description":"Játék nem található!"
            })
        }
        else{
            GameMode.DeleteGameMode(gamename,(err,result)=>{
                res.status(200).json({
                    "status_code":"200",
                    "description":"Játék sikeresen törölve!",
                    "data": []
                })
            })
        }
    })

}

exports.update_gamemode =(req,res,next)=>{
    const gamename = req.params.gamename
    const gamemode = new GameMode(req.body)

    GameMode.selectGameByname(gamename,(err,result)=>{
        if(err || result ===null || Object.keys(result).length === 0){
            return res.status(404).json({
                "status_code":"404",
                "description":"Játék nem található!"
            })
        }
        if(!gamemode.description)
        {
            res.status(400).json({
                "status_code": "400",
                "description": "Hiányzó adatok!"
            })
        }
        else{
            GameMode.modifyGameMode(gamemode,gamename,(err,result)=>{
                GameMode.selectGameByname(gamename,(err,result)=>{ 
                    res.status(200).json({
                    "status_code":"200",
                    "description":"Játék sikeresen módosítva!",
                    "data":result
                })
            })
               
            })
        }
    })
    
}

exports.all_gameSession_to_gameMode =( req,res,next)=>{
    const gameName = req.params.game_name
    GameMode.selectGameByname(gameName,(err,result)=>{
        if(err || result === null || Object.keys(result).length === 0)
        {
            return res.status(404).json({
                "status_code":"404",
                "description":"Játékmód nem létezik!"
            })
        }
      // igy szedem ki az idt console.log(result[0].id)
        GameSession.getGameID(result[0].id,(err,result2) =>{
            res.status(200).json({
                "status_code":"200",
                "description":"A játékmódhoz tartozó játékmenetek sikeresen lekérdezve!",
                "data":result2
            })
        })
        
    })
}

exports.classrooms_to_gamemode =(req,res,next)=>{
    const gameName = req.params.game_name

    GameMode.selectGameByname(gameName,(err,result)=>{
        console.log(gameName)
        if(err || result === null || Object.keys(result).length === 0)
        {
            return res.status(404).json({
                "status_code":"404",
                "description":"Nem található ilyen játékmód!"
            })
        }
        GameMode.allClassToGame(result[0].id,(err,result2)=>{
            res.status(200).json({
                "status_code":"200",
                "description":"A játékhoz tartozó adatok sikeresen lekérdezve!",
                "data":result2
            })
        })
    })
}
