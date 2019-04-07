const sql = require('./db')

const CorrectAnswer = function(correctanswer, question_id){
    this.question_id = question_id
    this.correct_answer = correctanswer
}

CorrectAnswer.selectCorrectAnswerByQuestionId = (question_id, result)=>{
    sql.query('SELECT question.id AS question_id, question.question, correct_answer.correct_answer FROM correct_answer INNER JOIN question ON question.id = correct_answer.question_id WHERE question.id = ?',question_id, (err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}
CorrectAnswer.selectAllCorrectAnswers = (result)=>{
    sql.query('SELECT question.id AS question_id, question.question, correct_answer.correct_answer FROM correct_answer INNER JOIN question ON question.id = correct_answer.question_id', (err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}
CorrectAnswer.addCorrectAnswerToQuestionById = (newCorrectAnswer, result)=>{
    sql.query('INSERT INTO correct_answer SET ?', newCorrectAnswer, (err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}
CorrectAnswer.deleteCorrectAnswerByQuestionId = (question_id, result)=>{
    sql.query('DELETE FROM correct_answer WHERE question_id =  ?', question_id, (err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}
CorrectAnswer.modifyCorrectAnswerByQuestionId = (question_id, newCorrectAnswer, result)=>{
    sql.query('UPDATE correct_answer SET correct_answer = ? WHERE question_id = ?', [newCorrectAnswer, question_id], (err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}

module.exports = CorrectAnswer 