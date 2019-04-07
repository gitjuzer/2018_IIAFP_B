const sql = require('./db')

const WrongAnswer = function(wronganswer)
{
    this.wrong_answer = wronganswer.wrong_answer
    this.question_id = wronganswer.question_id
}


WrongAnswer.SelectById = (id,result)=>{
    sql.query('Select * from wrong_answer WHERE id = ?',id,(err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else(
            result(null,res)
        )
    })
}

WrongAnswer.selectWrongAnswersByQuestionId =(question_id, result)=>{
    sql.query('SELECT question.id AS question_id, question.question, wrong_answer.wrong_answer, wrong_answer.id AS wrong_answer_id FROM question INNER JOIN wrong_answer ON wrong_answer.question_id = question.id WHERE question.id = ?',question_id, (err, res)=>{
        if(err)
        {
            result(err,null)
        }
        else(
            result(null,res)
        )
    })
}

WrongAnswer.SelectAll = (result)=>{
    sql.query('SELECT * from wrong_answer',(err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}

WrongAnswer.SeletByAnswer = (answer,result)=>{
    sql.query('Select * from wrong_answer WHERE wrong_answer = ?',answer,(err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}

WrongAnswer.InsertAnswer = (question_id,answer,result)=>{
    sql.query('INSERT INTO wrong_answer SET wrong_answer = ?, question_id = ?',[answer,question_id],(err,res)=>{
        if(err)
        {
            result(err,null)
        }     
        else{
            result(null,res)
        }
    })
}


WrongAnswer.UpdateAnswer = (answerid,answer,questionid,result)=>{
    sql.query('UPDATE wrong_answer SET wrong_answer = ?, question_id = ? WHERE id = ?',[answer,questionid,answerid],(err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}

WrongAnswer.DeleteAnswer = (id,result)=>{
    sql.query('DELETE FROM wrong_answer WHERE id = ?',id,(err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}
 
module.exports = WrongAnswer