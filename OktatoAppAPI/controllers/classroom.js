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

exports.createClassroom = (req, res, next)=>{
    Classroom.createNewClassroom(new Classroom(req.body.name), (err, result)=>{
        if(err){
            return res.status(409).json({
                "status_code":"409",
                "description":"Ilyen nevű osztály már létezik!”"
            })
        }
        else{
            const newClassroomId = result
            Classroom.getClassroomById(newClassroomId, (err, SelectResult)=>{
                return res.status(201).json({
                "status_code":"201",
                "description":"Osztály sikeresen létrehozva!",
                "data":SelectResult
                })
            })
        }
    })
}

exports.deleteClassroomById = (req, res, next)=>{
    Classroom.deleteClassroomById(req.params.id, (err, result)=>{
        if(Object.keys(result).length === 0){
            return res.status(404).json({
                "status_code":"404",
                "description":"Osztály nem található!",
            })
        }
        else{
            return res.status(200).json({
                "status_code":"200",
                "description":"Osztály sikeresen törölve!",
                "data":{
                    
                }
        })}
    })
}

