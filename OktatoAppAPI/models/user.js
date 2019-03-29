const sql = require('./db');
const Role = require('./role');

const User = function(user){
    this.username = user.username;
    this.password = user.password;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.created_at = new Date();
};

User.createUser = (newUser, account_type, result)=>{
    sql.query("INSERT INTO user SET ?", newUser, (err, res) =>{
        if (err){
            result(err, null);
        }
        else{
            result(null, res.insertId);
            /*
            const user_id_pk = res.insertId;
            Role.getRoleByName(account_type, (err, res)=>{
                if(err){
                    result(err, null);
                }
                else{
                    role_id_pk = res[0].id;
                    sql.query("INSERT INTO user_to_role SET ?", {"role_id_pk": role_id_pk, "user_id_pk": user_id_pk }, (err, res)=>{
                        if(err){
                            result(err, null);
                        }
                        else{
                            result(null, user_id_pk);
                        }
                    })
                }
            })*/
        };
    }); 
};
User.getAllUsers = (result) =>{
    sql.query("SELECT user.id, user.username, user.first_name, user.last_name, user.created_at, user.last_login, role.role_name FROM user LEFT JOIN user_to_role ON user.id = user_to_role.user_id_pk LEFT JOIN role ON role.id = user_to_role.role_id_pk",(err, res)=>{
        if (err){
            result(err, null);
        }
        else{
            result(null, res)
        }
    })
};
User.getUserByUsername = (username, result)=>{
    sql.query("SELECT user.id, user.username, user.first_name, user.last_name, user.created_at, user.last_login, role.role_name FROM user LEFT JOIN user_to_role ON user.id = user_to_role.user_id_pk LEFT JOIN role ON role.id = user_to_role.role_id_pk WHERE user.username = ?",username, (err, res)=>{
        if(err){
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
User.getUserByUsernameWithPassword = (username, result)=>{
    sql.query("SELECT user.id, user.username, user.password, user.first_name, user.last_name, user.created_at, user.last_login, role.role_name FROM user LEFT JOIN user_to_role ON user.id = user_to_role.user_id_pk LEFT JOIN role ON role.id = user_to_role.role_id_pk WHERE user.username = ?",username, (err, res)=>{
        if(err){
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
User.getUserById = (id, result)=>{
    sql.query("SELECT user.id, user.username, user.first_name, user.last_name, user.created_at, user.last_login, role.role_name FROM user LEFT JOIN user_to_role ON user.id = user_to_role.user_id_pk LEFT JOIN role ON role.id = user_to_role.role_id_pk WHERE user.id = ?",id, (err, res)=>{
        if(err){
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

module.exports = User;