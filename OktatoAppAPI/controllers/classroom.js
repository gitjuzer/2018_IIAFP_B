const Classroom = require('../models/classroom')

exports.getAllClassrooms = (req, res, next)=>{
    Classroom.getAllClassrooms((err, result)=>{
        return res.status(200).json({
            "status_code":"200",
            "description":"Osztályok sikeresen lekérdezve!",
            "data":result
        })
    })
}

exports.getClassroomById = (req, res, next)=>{
    Classroom.getClassroomById(req.params.id,(err, result)=>{
        if(Object.keys(result).length === 0){
            return res.status(404).json({
                "status_code":"404",
                "description":"Osztály nem található!",
            })
        }
        else{
            return res.status(200).json({
                "status_code":"200",
                "description":"Osztály sikeresen lekérdezve!",
                "data":result
        })}
    })
}

exports.deleteClassroomById = (req, res, next)=>{
    Classroom.getClassroomById(req.params.id,(err, result)=>{
        /*if(Object.keys(result).length === 0){
            return res.status(404).json({
                "status_code":"404",
                "description":"Osztály nem található!",
            })
        }
        else{
            return res.status(200).json({
                "status_code":"200",
                "description":"Osztály sikeresen lekérdezve!",
                "data":result
        })}*/
        return res.json(result)
    })
}

