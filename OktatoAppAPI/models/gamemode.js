const sql = require('./db')

const GameMode = function(gamemode)
{
    this.name = gamemode.name
    this.description = gamemode.description
}

GameMode.selectAll = (result) =>{
    sql.query('SELECT * FROM game_mode',(err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else
        {
            result(null,res)

        }
    })

}

GameMode.selectGameByname = (gamename,result) =>{
    sql.query('Select * from game_mode WHERE name = ?',gamename, (err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else
        {
            result(null,res)
        }
    })
}

GameMode.selectById = (id,result)=>
{
    sql.query('Select * from game_mode Where id = ?',id,(err,res) =>
    {
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}

GameMode.CreateGamemode = (newGameMode,result) =>{
    sql.query('INSERT INTO game_mode SET ?',newGameMode,(err,res) =>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res.insertId)
        }
    })
}


GameMode.DeleteGameMode = (gamename,result) =>{
    sql.query('Delete from game_mode Where name = ?',gamename,(err,res) =>
    {
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,err)
        }
    })
}

GameMode.modifyGameMode =(gamemode,gamename,result) =>{
    sql.query('UPDATE game_mode SET description = ? where name = ?',[gamemode.description,gamename],(err,res)=>{
       if(err)
       {
           result(err,null)
       } 
       else{
           result(null,res)
       }
    })
}

GameMode.allClassToGame = (id,result)=>{
    sql.query("SELECT game_mode.id as id, classroom.name, classroom.id as classroom_id , classroom_to_game.is_active FROM game_mode INNER JOIN classroom_to_game ON game_mode.id = classroom_to_game.game_id_pk INNER JOIN classroom ON classroom.id = classroom_to_game.classroom_id_pk WHERE game_mode.id = ?",id,(err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}

module.exports = GameMode;