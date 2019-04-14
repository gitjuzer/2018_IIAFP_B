const GameMode = require('../models/gamemode')
const GameSession = require('../models/gamesession')
const message = require('../utilities/jsonmessage')

exports.get_all_gamemode = (req,res,next) =>{
    
    GameMode.selectAll((err,result) =>{
        res.status(200).json(message.compose('200','Játékok sikeresen lekérdezve!',result))
    })
}

exports.select_by_name = (req,res,next) =>{
    const gamename = req.params.gamename
    GameMode.selectGameByname(gamename,(err,result) =>{
        if(err || result === null || Object.keys(result).length === 0)
        {
            return res.status(404).json(message.compose('404','Játékmód nem található!'))

        }
        res.status(200).json(message.compose('200','Játék sikeresen lekérdezve!',result))
    })
}

exports.create_gamemode = (req,res,next) =>{
    const newGamemode = new GameMode(req.body)
    if(!newGamemode.name || !newGamemode.description)
    {
        res.status(400).json(message.compose('400','Hibás adatok!'))
    }
    else
    {
        GameMode.CreateGamemode(newGamemode,(err,result) =>{
            if(err || result === null)
            {
                res.status(409).json(message.compose('409', 'Már létezik ilyen játék!'))
            }
            else
            {
                GameMode.selectById(result,(err,res1)=>{
                    res.status(201).json(message.compose('201','Játék sikeresen létrehozva!',res1))
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
            res.status(404).json(message.compose('404','Játék nem található!'))
        }
        else{
            GameMode.DeleteGameMode(gamename,(err,result)=>{
                res.status(200).json(message.compose('200','Játék sikeresen törölve!'))
            })
        }
    })

}

exports.update_gamemode =(req,res,next)=>{
    const gamename = req.params.gamename
    const gamemode = new GameMode(req.body)

    GameMode.selectGameByname(gamename,(err,result)=>{
        if(err || result ===null || Object.keys(result).length === 0){
            return res.status(404).json(message.compose('404','Játék nem található!'))
        }
        if(!gamemode.description)
        {
            res.status(400).json(message.compose('400','Hiányzó adatok!'))
        }
        else{
            GameMode.modifyGameMode(gamemode,gamename,(err,result)=>{
                GameMode.selectGameByname(gamename,(err,result)=>{ 
                    res.status(200).json(message.compose('200','Játék sikeresen módosítva!',result))
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
            return res.status(404).json(message.compose('404','Játékmód nem létezik!'))
        }
      // igy szedem ki az idt console.log(result[0].id)
        GameSession.getGameID(result[0].id,(err,result2) =>{
            res.status(200).json(message.compose('200','A játékmódhoz tartozó játékmenetek sikeresen lekérdezve!',result2))
        })
        
    })
}

exports.classrooms_to_gamemode =(req,res,next)=>{
    const gameName = req.params.game_name

    GameMode.selectGameByname(gameName,(err,result)=>{
        console.log(gameName)
        if(err || result === null || Object.keys(result).length === 0)
        {
            return res.status(404).json(message.compose('404','Nem található ilyen játékmód!'))
        }
        GameMode.allClassToGame(result[0].id,(err,result2)=>{
            res.status(200).json(message.compose('200','A játékhoz tartozó adatok sikeresen lekérdezve!',result2))
        })
    })
}
