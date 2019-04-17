const sql = require('./db')

const GameSession = function(gamesession)
{
    this.session_name = gamesession.session_name
    this.max_points = gamesession.max_points
    this.game_id = gamesession.game_id
    this.difficulty_level = gamesession.difficulty_level
}



GameSession.getAllGameSession = (result)=>{
    sql.query('Select * from game_session',(err,res) =>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}

GameSession.getGameSessionById = (sessionid,result)=>{
    sql.query('Select * from game_session WHERE id = ?',sessionid,(err,res) =>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}

GameSession.getGameSessionByName = (sessionName,result)=>{
    sql.query('Select * from game_session WHERE session_name = ?',sessionName,(err,res) =>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}


GameSession.createGameSession = (newGameSession,result)=>{
    sql.query('INSERT INTO game_session SET ?',newGameSession,(err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res.insertId)
        }
    })
}

GameSession.getGameID = (gameid,result)=>{
    sql.query('Select * from game_session Where game_id = ?',gameid,(err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}

GameSession.deleteGameSession = (sessionId,result)=>{
    sql.query('DELETE FROM game_session WHERE id = ?',sessionId,(err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}


GameSession.modifyGameSessionMaxPointOsszeada =(sessionid,max_point,question_point,result)=>{
    sql.query('UPDATE game_session SET max_points = ? WHERE id = ?',[parseInt(max_point)+parseInt(question_point),sessionid],(err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}

GameSession.modifyMaxPointKivonas =(sessionid,max_point,question_point,result)=>{
    sql.query('UPDATE game_session SET max_points = ? WHERE id = ?',[parseInt(max_point)-parseInt(question_point),sessionid],(err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}

GameSession.modifyGameSession = (sessionId,newGameSession,result)=>{
   
    sql.query('UPDATE game_session SET max_points = ?, game_id = ?, difficulty_level = ? WHERE id = ?', [newGameSession.max_points,newGameSession.game_id,newGameSession.difficulty_level,sessionId],(err,res)=>{
        if(err)
        {
           
            result(err,null)
        }
        else{
            
            result(null,res)
        }
    })
}
module.exports = GameSession