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

Question.selectAllBySessionName = (session_id, result)=>{
    sql.query('SELECT question.id AS question_id, question.question, question.points, game_session.id AS session_id, game_session.session_name FROM question INNER JOIN game_session ON question.game_session_id = game_session.id WHERE game_session.id = ?',session_id, (err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
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