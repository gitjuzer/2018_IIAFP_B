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

module.exports = GameMode;