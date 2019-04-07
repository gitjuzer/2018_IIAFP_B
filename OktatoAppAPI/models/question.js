const sql = require('./db')

const Question = function(question)
{
    this.question = question.question
    this.points = question.points
    this.game_session_id = question.game_session_id
}


Question.SelectById = (id,result)=>{
    sql.query('SELECT * FROM question WHERE id = ?',id,(err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}


Question.get_by_guestion = (question,result)=>{
    sql.query('SELECT * FROM question WHERE question = ?',question,(err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}

Question.GetAllQuestion = (result) =>{
    sql.query('Select * from question',(err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}


Question.DeleteQuestion = (id,result)=>{
    sql.query('DELETE FROM question WHERE id = ?',id,(err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}

Question.InsertQuestion = (newQuestion,result)=>{
    sql.query('INSERT INTO question SET ?',newQuestion,(err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}


Question.updateQuestion = (id,point,sessionid,result)=>{
    sql.query('UPDATE question SET points = ?, game_session_id = ? WHERE id = ?',[point,sessionid,id],(err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}

module.exports = Question