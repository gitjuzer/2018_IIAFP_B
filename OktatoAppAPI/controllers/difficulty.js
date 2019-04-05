const Difficulty = require('../models/difficulty')

exports.get_all_difficulties =(req,res,next)=>{
    Difficulty.selectAll((err,result)=>{
        res.status(200).json({
            "status_code":"200",
            "description":"Nehézségi szintek lekérdezve!",
            "data":result
        })
    })
}


exports.get_difficulty_by_level = (req,res,next)=>{
    const level = req.params.level
    Difficulty.selectByLevel(level,(err,result)=>{
        if(err || result === null || Object.keys(result).length === 0)
        {
            return res.status(404).json({
                "status_code":"404",
                "description":"Nincs ilyen nehézségi szint!"
            })
        }
        res.status(200).json({
            "status_code":"200",
            "description":"Nehézségi szint sikeresen lekérdezve!",
            "data":result
        })
    })
}

exports.create_new_difficulty = (req,res,next)=>{
    const difficulty = new Difficulty(req.body)       
     Difficulty.createDifficulty(difficulty,(err2,result2)=>{
        if(err2 && err2.errno === 1062)
            {
                return res.status(409).json({
                        "status_code":"409",
                        "description":"Már létezik ilyen nehézségi szint!"
                })
            }
        Difficulty.selectByLevel(difficulty.difficulty_level,(err,result3)=>{
            return res.status(201).json({
                "status_code":"201",
                "description":"Nehézségi szint sikeresen létrehozva!",
                "data": result3
            })
        })
    })  
}






