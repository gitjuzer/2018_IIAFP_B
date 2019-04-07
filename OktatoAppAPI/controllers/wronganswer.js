const WrongAnswer = require('../models/wronganswer')

exports.get_all_wronganswer = (req,res,next)=>{
    WrongAnswer.SelectAll((err,result)=>{
        res.status(200).json({
            "status_code":"200",
            "decription":"Rossz válaszok sikeresen lekérdezve!",
            "data": result
        })
    })
}