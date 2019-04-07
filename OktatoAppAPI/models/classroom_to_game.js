const sql = require('./db')

const ClassroomToGame = function(game_id_pk, classroom_id_pk){
    this.game_id_pk = game_id_pk
    this.classroom_id_pk = classroom_id_pk
    this.is_active = 1
}

ClassroomToGame.allGamesToAllClass=(result)=>{
    sql.query('SELECT game_mode.id AS game_id, game_mode.name AS game_name, game_mode.description, classroom_to_game.is_active, classroom.id AS classroom_id, classroom.name AS classroom_name FROM game_mode INNER JOIN classroom_to_game ON game_mode.id = classroom_to_game.game_id_pk INNER JOIN classroom ON classroom.id = classroom_to_game.classroom_id_pk', (err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}

ClassroomToGame.allGamesToClass = (classroom_id, result)=>{
    sql.query('SELECT game_mode.id AS game_id, game_mode.name AS game_name, game_mode.description, classroom_to_game.is_active, classroom.id AS classroom_id, classroom.name AS classroom_name FROM game_mode INNER JOIN classroom_to_game ON game_mode.id = classroom_to_game.game_id_pk INNER JOIN classroom ON classroom.id = classroom_to_game.classroom_id_pk WHERE classroom.id = ?',classroom_id, (err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}

ClassroomToGame.selectRecordByClassroomIdAndGameId = (game_id_pk, classroom_id_pk, result)=>{
    sql.query('SELECT game_mode.id AS game_id, game_mode.name AS game_name, game_mode.description, classroom.id AS classroom_id, classroom.name AS classroom_name, classroom_to_game.is_active FROM game_mode INNER JOIN classroom_to_game ON game_mode.id = classroom_to_game.game_id_pk INNER JOIN classroom ON classroom.id = classroom_to_game.classroom_id_pk WHERE classroom.id = ? AND game_mode.id = ?',[classroom_id_pk, game_id_pk], (err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}

ClassroomToGame.addGameToClass=(newClassroomToGame, result)=>{
    sql.query('INSERT INTO classroom_to_game SET ?',newClassroomToGame,(err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}

ClassroomToGame.deleteGameFromClassByGamename = (game_id_pk, classroom_id_pk, result)=>{
    sql.query('DELETE FROM classroom_to_game WHERE game_id_pk = ? AND classroom_id_pk = ?',[game_id_pk, classroom_id_pk], (err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}

ClassroomToGame.modifyGameStateGameFromClassByGameName = (is_active, game_id_pk, classroom_id_pk, result)=>{
    sql.query('UPDATE classroom_to_game SET is_active = ? WHERE game_id_pk = ? AND classroom_id_pk = ?', [is_active, game_id_pk, classroom_id_pk], (err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}

module.exports = ClassroomToGame