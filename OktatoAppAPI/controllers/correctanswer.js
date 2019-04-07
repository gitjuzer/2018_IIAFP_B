const CorrectAnswer = require('../models/correctanswer')
const Question = require('../models/question')

exports.getCorrectAnswerByQuestionId = (req, res, next)=>{
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
            CorrectAnswer.selectCorrectAnswerByQuestionId(question_id, (selectCorrectErr, selectCorrectRes)=>{
                return res.status(200).json({
                    "status_code":"200",
                    "description":"Kérdéshez tartozó jó válasz sikeresen lekérdezve!",
                    "data":selectCorrectRes
                })
            })
        }
    })
}
exports.getAllCorrectAnswers = (req, res, next)=>{
    CorrectAnswer.selectAllCorrectAnswers((selectCorrectErr, selectCorrectRes)=>{
        return res.status(200).json({
            "status_code":"200",
            "description":"Helyes válaszok sikeresen lekérdezve!",
            "data":selectCorrectRes
        })
    })
}
exports.addCorrectAnswerToQuestion = (req, res, next)=>{
    if(!req.body.correct_answer){
        return res.status(400).json({
            "status_code":"400",
            "description":"Hibás adatok!"
        })
    }
    const correct_answer = req.body.correct_answer
    const question_id = req.params.id
    CorrectAnswer.addCorrectAnswerToQuestionById(new CorrectAnswer(correct_answer, question_id), (insertCorrectErr, insertCorrectRes)=>{
        if(insertCorrectErr && insertCorrectErr.errno == 1452){
            return res.status(404).json({
                "status_code":"404",
                "description":"Kérdés nem található!"
            })
        } else 
        if(insertCorrectErr && insertCorrectErr.errno == 1062){
            return res.status(409).json({
                "status_code":"409",
                "description":"Ehhez a kérdéshez már tartozik helyes válasz!"
            })
        } else
        CorrectAnswer.selectCorrectAnswerByQuestionId(question_id, (selectErr, selectRes)=>{
            return res.status(200).json({
                "status_code":"200",
                "description":"Helyes válasz sikeresen felvéve!",
                "data": selectRes
            })
        })  
    })
}
exports.modifyCorrectAnswerToQuestion = (req, res, next)=>{
    if(!req.body.correct_answer){
        return res.status(400).json({
            "status_code":"400",
            "description":"Hibás adatok!"
        })
    }
    const correct_answer = req.body.correct_answer
    const question_id = req.params.id
    CorrectAnswer.modifyCorrectAnswerByQuestionId(question_id, correct_answer, (modifyCorrectErr, modifyCorrectRes)=>{
        if(modifyCorrectErr && modifyCorrectErr.errno == 1452){
            return res.status(404).json({
                "status_code":"404",
                "description":"Kérdés nem található!"
            })
        } else 
        CorrectAnswer.selectCorrectAnswerByQuestionId(question_id, (selectErr, selectRes)=>{
            return res.status(200).json({
                "status_code":"200",
                "description":"Helyes válasz sikeresen módosítva!",
                "data": selectRes
            })
        })  
    })
}
exports.deleteCorrectAnswerByQuestionId = (req, res, next)=>{
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
            CorrectAnswer.deleteCorrectAnswerByQuestionId(question_id, (deleteErr, deleteRes)=>{
                if(deleteRes.affectedRows == 0){
                    return res.status(404).json({
                        "status_code":"404",
                        "description":"Helyes válasz nem található!"
                    })
                }
                else{
                    return res.status(200).json({
                        "status_code":"200",
                        "description":"Kérdéshez tartozó helyes válasz sikeresen törölve!",
                        "data":{}
                    })
                }
            })
        }
    })
}