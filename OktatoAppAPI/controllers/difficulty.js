const Difficulty = require('../models/difficulty')
const message = require('../utilities/jsonmessage')

exports.get_all_difficulties =(req,res,next)=>{
    Difficulty.selectAll((err,result)=>{
        res.status(200).json(message.compose('200','Nehézségi szintek lekérdezve!',result))
    })
}


exports.get_difficulty_by_level = (req,res,next)=>{
    const level = req.params.level
    Difficulty.selectByLevel(level,(err,result)=>{
        if(err || result === null || Object.keys(result).length === 0)
        {
            return res.status(404).json(message.compose('404','Nincs ilyen nehézségi szint!'))
        }
        res.status(200).json(message.compose('200','Nehézségi szint sikeresen lekérdezve!',result))
    })
}

exports.create_new_difficulty = (req,res,next)=>{
    const difficulty = new Difficulty(req.body)       
     Difficulty.createDifficulty(difficulty,(err2,result2)=>{
        if(err2 && err2.errno === 1062)
            {
                return res.status(409).json(message.compose('409','Már létezik ilyen nehézségi szint!'))
            }
        Difficulty.selectByLevel(difficulty.difficulty_level,(err,result3)=>{
            return res.status(201).json(message.compose('201','Nehézségi szint sikeresen létrehozva!',result3))
        })
    })  
}




exports.delete_difficulty = (req,res,next)=>{
    const level = req.params.level

    Difficulty.selectByLevel(level,(err,result)=>{
        if(err || result === null || Object.keys(result).length === 0)
        {
          return res.status(404).json(message.compose('404','Ilyen nehézségi szint nem létezik!'))
        }
        Difficulty.deleteDiff(level,(err,result2)=>{
            res.status(200).json(message.compose('200','Nehézségi szint sikeresen törölve!'))
        })
    })
}






