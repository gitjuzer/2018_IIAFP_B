const sql = require('./db')

const UserToClassroom = function(user_id, classroom_id){
    this.user_id_pk = user_id
    this.classroom_id_pk = classroom_id
}

UserToClassroom.addUserToClassroom = (user_id, classroom_id, result)=>{
    sql.query('INSERT INTO user_to_classroom SET ?', {user_id_pk : user_id, classroom_id_pk : classroom_id}, (err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}

UserToClassroom.selectAllUsersFromClassroom = (classroom_id, result)=>{
    sql.query('SELECT user.id,user.username, user.email, user.first_name, user.last_name, user.created_at, user.last_login, classroom.id, classroom.name AS `classroom_name` FROM user INNER JOIN user_to_classroom ON user.id = user_to_classroom.user_id_pk INNER JOIN classroom ON classroom.id = user_to_classroom.classroom_id_pk WHERE user_to_classroom.classroom_id_pk = ?',classroom_id,(err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}

UserToClassroom.deleteUserFromClassroom = (classroom_id, user_id, result)=>{
    sql.query('DELETE FROM user_to_classroom WHERE classroom_id_pk = ? AND user_id_pk = ?', [classroom_id, user_id],(err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}

module.exports = UserToClassroom