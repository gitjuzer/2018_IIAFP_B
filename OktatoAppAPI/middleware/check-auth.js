const jwt = require('jsonwebtoken')
const Token = require('../models/token')
const User = require('../models/user')
const message = require('../utilities/jsonmessage')

IsAuthorized = (role1, role2, req, res, next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY || "2018_19_II.FELEV_LABOR_B")
        req.user_data = decoded
        Token.getActiveTokensByUserId(decoded.user_id, (err,result)=>{
            if(result.length == 1){
                if(!role1 && !role2){
                    return next()
                }
                User.getUserById(decoded.user_id, (err, result1)=>{
                    try{
                        if(result1[0].account_type == role1 || role2){
                            console.log('itt alt meg')
                            next()
                        }
                        else{
                            throw new Error()
                        }
                    }catch(error){
                        console.log('vagy itt')
                        console.log(result1[0].account_type)
                        return res.status(401).json(message.compose('401','Jogosulatlan hozzáférés!'))
                    }
                })
            }
            else{
                console.log('asd alt meg')
                return res.status(401).json(message.compose('401','Jogosulatlan hozzáférés!'))
            }
        })
        
    } catch(error){
        console.log('qqq alt meg')
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