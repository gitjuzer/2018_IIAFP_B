const jwt = require('jsonwebtoken')
const Token = require('../models/token')
const User = require('../models/user')

exports.IsLoggedIn = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.user_data = decoded
        console.log(decoded)
        next()
    } catch(error){
        return res.status(401).json({
            "status_code":"401",
            "description":"Jogosulatlan hozzáférés!"
        })
    }
}
exports.IsAdmin = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.user_data = decoded
        User.getUserById(decoded.user_id, (err, result)=>{
            try{
                if(result[0].role_name == 'ADMIN'){
                    next()
                }
                else{
                    throw new Error()
                }
            }catch(error){
                return res.status(401).json({
                    "status_code":"401",
                    "description":"Jogosulatlan hozzáférés!"
                })
            }
        })
    } catch(error){
        return res.status(401).json({
            "status_code":"401",
            "description":"Jogosulatlan hozzáférés!"
        })
    }
}

exports.IsTeacher = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.user_data = decoded
        User.getUserById(decoded.user_id, (err, result)=>{
            try{
                if(result[0].role_name == 'TEACHER'){
                    next()
                }
                else{
                    throw new Error()
                }
            }catch(error){
                return res.status(401).json({
                    "status_code":"401",
                    "description":"Jogosulatlan hozzáférés!"
                })
            }
        })
    } catch(error){
        return res.status(401).json({
            "status_code":"401",
            "description":"Jogosulatlan hozzáférés!"
        })
    }
}

exports.IsTeacherOrAdmin = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.user_data = decoded
        User.getUserById(decoded.user_id, (err, result)=>{
            try{
                if(result[0].role_name == 'ADMIN' || result[0].role_name == 'TEACHER'){
                    next()
                }
                else{
                    throw new Error()
                }
            }catch(error){
                return res.status(401).json({
                    "status_code":"401",
                    "description":"Jogosulatlan hozzáférés!"
                })
            }
        })
    } catch(error){
        return res.status(401).json({
            "status_code":"401",
            "description":"Jogosulatlan hozzáférés!"
        })
    }
}