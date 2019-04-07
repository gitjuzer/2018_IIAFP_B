const sql = require('./db')
const moment = require('moment')

const Statistic = function(gained_points, user_id, game_session_id){
    this.gained_points = gained_points
    this.user_id = user_id
    this.game_session_id = game_session_id
    this.created_at = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
}

Statistic.getAllStatistics=(result)=>{
    sql.query('SELECT statistic.id AS statistic_id, statistic.gained_points, game_session.max_points, statistic.created_at, user.id AS user_id, user.username, game_session.session_name, game_session.id AS session_id, game_session.difficulty_level FROM user INNER JOIN statistic ON user.id = statistic.user_id INNER JOIN game_session ON statistic.game_session_id = game_session.id', (err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}

Statistic.getStatisticsByUserId = (user_id, result)=>{
    sql.query('SELECT statistic.id AS statistic_id, statistic.gained_points, game_session.max_points, statistic.created_at, user.id AS user_id, user.username, game_session.session_name, game_session.id AS session_id, game_session.difficulty_level FROM user INNER JOIN statistic ON user.id = statistic.user_id INNER JOIN game_session ON statistic.game_session_id = game_session.id WHERE user.id = ?',user_id, (err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}

Statistic.getStatisticsByGameSessionId = (game_session_id, result)=>{
    sql.query('SELECT statistic.id AS statistic_id, statistic.gained_points, game_session.max_points, statistic.created_at, user.id AS user_id, user.username, game_session.session_name, game_session.id AS session_id, game_session.difficulty_level FROM user INNER JOIN statistic ON user.id = statistic.user_id INNER JOIN game_session ON statistic.game_session_id = game_session.id WHERE game_session.id = ?',game_session_id, (err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}

Statistic.addNewStatistic = (newStatistic, result)=>{
    sql.query('INSERT INTO statistic SET ?', newStatistic, (err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}

Statistic.deleteStatisticById = (id, result)=>{
    sql.query('DELETE FROM statistic WHERE id = ?',id, (err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}

Statistic.getStatisticById = (id, result)=>{
    sql.query('SELECT statistic.id AS statistic_id, statistic.gained_points, game_session.max_points, statistic.created_at, user.id AS user_id, user.username, game_session.session_name, game_session.id AS session_id, game_session.difficulty_level FROM user INNER JOIN statistic ON user.id = statistic.user_id INNER JOIN game_session ON statistic.game_session_id = game_session.id WHERE statistic.id = ?',id, (err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}

module.exports = Statistic