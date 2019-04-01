const sql = require('./db')
var moment = require('moment')

const Token = function(token){
    this.token = token.token;
    this.created_at = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    this.expires_at = token.expires_at;
    this.is_active = token.is_active;
    this.user_id = token.user_id;
};

Token.createNewToken = (newToken, result)=>{
    sql.query('INSERT INTO token SET ?', newToken, (err,res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
};

Token.getTokenById = (id, result)=>{
    sql.query('SELECT token.id, token.token, token.created_at, token.expires_at, token.is_active, user.username FROM token INNER JOIN user ON user.id = token.user_id WHERE token.id = ?', id, (err,res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
};

Token.getTokenByToken = (token, result)=>{
    sql.query('SELECT * FROM token WHERE token = ?', token, (err,res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
};

Token.getTokenByUserId = (user_id, result)=>{
    sql.query('SELECT * FROM token WHERE user_id = ?', user_id, (err,res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
};

Token.getTokenByUsername = (username, result)=>{
    sql.query('SELECT token.id, token.token, token.created_at, token.expires_at, token.is_active FROM token INNER JOIN user ON user.id = token.user_id WHERE user.username = ?', username, (err,res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
};

Token.deactiveToken = (token, result)=>{
    sql.query('UPDATE token SET is_active = 0 WHERE token = ?', token, (err,res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
};

Token.deactiveTokenById = (token_id, result)=>{
    sql.query('UPDATE token SET is_active = 0 WHERE id = ?', token_id, (err,res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}

Token.getActiveTokensByUsername = (username, result)=>{
    sql.query('SELECT token.id, token.token, token.created_at, token.expires_at, token.is_active, user.username FROM token INNER JOIN user ON user.id = token.user_id WHERE user.username = ? AND token.is_active = 1 AND CAST(token.expires_at AS DATETIME) > ?',[username, moment(new Date()).format("YYYY-MM-DD HH:mm:ss")], (err,res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}

Token.getActiveTokensByUserId = (id, result)=>{
    sql.query('SELECT token.id, token.token, token.created_at, token.expires_at, token.is_active, user.username FROM token INNER JOIN user ON user.id = token.user_id WHERE token.user_id = ? AND token.is_active = 1 AND CAST(token.expires_at AS DATETIME) > ?',[id, moment(new Date()).format("YYYY-MM-DD HH:mm:ss")], (err,res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}

module.exports = Token;