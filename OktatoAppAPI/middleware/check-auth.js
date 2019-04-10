const jwt = require('jsonwebtoken')
const Token = require('../models/token')
const User = require('../models/user')
const message = require('../utilities/jsonmessage')

IsAuthorized = (role1, role2, req, res, next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.user_data = decoded
        Token.getActiveTokensByUserId(decoded.user_id, (err,result)=>{
            if(result.length == 1){
                if(!role1 && !role2){
                    return next()
                }
                User.getUserById(decoded.user_id, (err, result1)=>{
                    try{
                        if(result1[0].role_name === (role1 || role2)){
                            next()
                        }
                        else{
                            throw new Error()
                        }
                    }catch(error){
                        return res.status(401).json(message.compose('401','Jogosulatlan hozzáférés!'))
                    }
                })
            }
            else{
                return res.status(401).json(message.compose('401','Jogosulatlan hozzáférés!'))
            }
        })
        
    } catch(error){
        return res.status(401).json(message.compose('401','Jogosulatlan hozzáférés!'))
    }
}
exports.IsLoggedIn = (req,res,next)=>{
    IsAuthorized(null,null, req, res,next)
}
exports.IsAdmin = (req,res,next)=>{
    IsAuthorized('ADMIN',null,req,res,next)
}
exports.IsTeacher = (req,res,next)=>{
    IsAuthorized('TEACHER',null, req,res,next)
}
exports.IsTeacherOrAdmin = (req,res,next)=>{
    IsAuthorized('ADMIN','TEACHER',req,res,next)
}