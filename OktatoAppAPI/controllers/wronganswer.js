const WrongAnswer = require('../models/wronganswer')
const Question = require('../models/question')

exports.get_all_wronganswer = (req,res,next)=>{
    WrongAnswer.SelectAll((err,result)=>{
        res.status(200).json({
            "status_code":"200",
            "decription":"Rossz válaszok sikeresen lekérdezve!",
            "data": result
        })
    })
}
exports.getAllWrongAnswersByQuestionId = (req, res, next)=>{
    const question_id = req.params.id
    Question.SelectById(question_id, (selectQuestionErr, selectQuestionRes)=>{
        if(selectQuestionErr || selectQuestionRes === null || Object.keys(selectQuestionRes).length === 0)
        {
           return res.status(404).json({
                "status_code":"404",
                "description":"A kérdés nem található!"
            })
        }
        else{
            WrongAnswer.selectWrongAnswersByQuestionId(question_id, (selectWrongAnswersErr, selectWrongAnswersRes)=>{
                return res.status(200).json({
                    "status_code":"200",
                    "description":"Kérdéshez tartozó rossz válaszok sikeresen lekérdezve!",
                    "data":selectWrongAnswersRes
                })
            })
        }
    })
}
exports.create_wronganswer = (req,res,next)=>{
    const id = req.params.id
    const wrong_answer = req.body.wrong_answer
    Question.SelectById(id,(err,result)=>{
        if(err || result === null || Object.keys(result).length === 0)
        {
            return res.status(404).json({
                "status_code":"404",
                "description":"Nem létezik ilyen kérdés!"
            })
        }
        WrongAnswer.SeletByAnswer(wrong_answer,(err2,result2)=>{
            if(err2 || Object.keys(result2).length > 0)
            {
                return res.status(409).json({
                    "status_code":"409",
                    "description":"Már létezik ilyen rossz válasz!"
                })
            }
            WrongAnswer.InsertAnswer(id,wrong_answer,(err3,result3)=>{
                WrongAnswer.SeletByAnswer(wrong_answer,(err4,result4)=>{
                    res.status(201).json({
                        "status_code":"201",
                        "description":"Rossz válasz sikeresen felvéve!",
                        "data": result4
                    })
                })
            })
        })

    })
}

exports.update_wronganswer = (req,res,next)=>{
    const question_id = req.params.id
    const answer_id = req.params.answer_id
    const wronganswer = new WrongAnswer(req.body)

    Question.SelectById(question_id,(err,result)=>{
        if(err || result === null || Object.keys(result).length === 0)
        {
            return res.status(404).json({
                "status_code":"404",
                "description":"Kérdés nem található!"
            })
        }
        WrongAnswer.SelectById(answer_id,(err2,result2)=>{
            if(err2 || result2 === null || Object.keys(result2).length === 0)
            {
                return res.status(404).json({
                    "status_code":"404",
                    "description":"Rossz válasz nem található!"
                })
            }
            if(result2[0].question_id == question_id)
            {
                Question.SelectById(wronganswer.question_id,(err3,result3)=>{
                    if(err3 || result3 === null || Object.keys(result3).length === 0)
                    {
                        return res.status(404).json({
                            "status_code":"404",
                            "description":"Kérdés nem található!"
                        })
                    }
                    WrongAnswer.UpdateAnswer(answer_id,wronganswer.wrong_answer,wronganswer.question_id,(err4,result4)=>{
                        WrongAnswer.SelectById(answer_id,(err5,result5)=>{
                            res.status(200).json({
                                "status_code":"200",
                                "description":"Rossz válasz sikeresen megváltoztatva!",
                                "data": result5
                            })
                        })
                    })
                })
            }
            else{
                return res.status(404).json({
                    "status_code":"404",
                    "description":"Ehez a kérdéshez nem található a megadott rossz válasz!"
                })
            }
        })
    })
}


exports.delete_wronganswer = (req,res,next)=>{
    const question_id = req.params.id
    const answer_id = req.params.answer_id
    Question.SelectById(question_id,(err,result)=>{
        if(err || result === null || Object.keys(result).length === 0)
        {
            return res.status(404).json({
                "status_code":"404",
                "description":"Kérdés nem található!"
            })
        }
        WrongAnswer.SelectById(answer_id,(err2,result2)=>{
            if(err2 || result2 === null || Object.keys(result2).length === 0)
            {
                return res.status(404).json({
                    "status_code":"404",
                    "description":"Rossz válasz nem található!"
                })
            }
            if(result2[0].question_id == question_id)
            {
                WrongAnswer.DeleteAnswer(answer_id,(err3,result3)=>{
                    res.status(200).json({
                        "status_code":"200",
                        "description":"Rossz válasz sikeresen törölve!",
                        "data":[]
                    })
                })
            }
            else{
                return res.status(404).json({
                    "status_code":"404",
                    "description":"Ehez a kérdéshez nem található a megadott rossz válasz!"
                })
            }
            
        })
    })

}