const sql = require('./db');
const Role = require('./role');
var moment = require('moment')

const User = function(user){
    this.username = user.username;
    this.email = user.email;
    this.password_hash = user.password;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.created_at = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
};

User.createUser = (newUser, result)=>{
    sql.query("INSERT INTO user SET ?", newUser, (err, res) =>{
        if (err){
            result(err, null);
        }
        else{
            result(null, res.insertId);
        };
    }); 
};
User.getAllUsers = (result) =>{
    sql.query("SELECT user.id, user.username, user.email, user.first_name, user.last_name, user.created_at, user.last_login, role.role_name AS account_type FROM user LEFT JOIN user_to_role ON user.id = user_to_role.user_id_pk LEFT JOIN role ON role.id = user_to_role.role_id_pk",(err, res)=>{
        if (err){
            result(err, null);
        }
        else{
            result(null, res)
        }
    })
};
User.getUserByUsername = (username, result)=>{
    sql.query("SELECT user.id, user.username, user.email, user.first_name, user.last_name, user.created_at, user.last_login, role.role_name AS account_type FROM user LEFT JOIN user_to_role ON user.id = user_to_role.user_id_pk LEFT JOIN role ON role.id = user_to_role.role_id_pk WHERE user.username = ?",username, (err, res)=>{
        if(err){
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
User.getUserByUsernameWithPassword = (username, result)=>{
    sql.query("SELECT user.id, user.username, user.email, user.password_hash, user.first_name, user.last_name, user.created_at, user.last_login, role.role_name FROM user LEFT JOIN user_to_role ON user.id = user_to_role.user_id_pk LEFT JOIN role ON role.id = user_to_role.role_id_pk WHERE user.username = ?",username, (err, res)=>{
        if(err){
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
User.getUserById = (id, result)=>{
    sql.query("SELECT user.id, user.username, user.email, user.first_name, user.last_name, user.created_at, user.last_login, role.role_name AS account_type FROM user LEFT JOIN user_to_role ON user.id = user_to_role.user_id_pk LEFT JOIN role ON role.id = user_to_role.role_id_pk WHERE user.id = ?",id, (err, res)=>{
        if(err){
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};

module.exports = User;