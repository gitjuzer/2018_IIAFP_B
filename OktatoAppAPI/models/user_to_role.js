const sql = require('./db');

const User_To_Role = function(user_id_pk, role_id_pk){
    this.user_id_pk = user_id_pk;
    this.role_id_pk = role_id_pk;
}

User_To_Role.createUserToRole = (newUserToRole, result) =>{
    sql.query("INSERT INTO user_to_role SET ?", newUserToRole, (err, res)=>{
        if(err){
            result(err, null);
        }
        else{
            result(null, res);
        }
    })
}

module.exports = User_To_Role;