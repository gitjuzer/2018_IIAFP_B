const Classroom = require('../models/classroom')
const message = require('../utilities/jsonmessage')

exports.getAllClassrooms = (req, res, next)=>{
    Classroom.getAllClassrooms((err, result)=>{
        return res.status(200).json(message.compose('200','Osztályok sikeresen lekérdezve!',result))
    })
}

exports.getClassroomById = (req, res, next)=>{
    Classroom.getClassroomById(req.params.id,(err, result)=>{
        if(Object.keys(result).length === 0){
            return res.status(404).json(message.compose('404','Osztály nem található!'))
        }
        else{
            return res.status(200).json(message.compose('200','Osztály sikeresen lekérdezve!',result))
        }
    })
}

exports.createClassroom = (req, res, next)=>{
    Classroom.createNewClassroom(new Classroom(req.body.name), (err, result)=>{
        if(err){
            return res.status(409).json(message.compose('409','Ilyen nevű osztály már létezik!'))
        }
        else{
            const newClassroomId = result
            Classroom.getClassroomById(newClassroomId, (err, SelectResult)=>{
                return res.status(201).json(message.compose('201','Osztály sikeresen létrehozva!', SelectResult))
            })
        }
    })
}

exports.deleteClassroomById = (req, res, next)=>{
    Classroom.deleteClassroomById(req.params.id, (err, result)=>{
        if(Object.keys(result).length === 0){
            return res.status(404).json(message.compose('404','Osztály nem található!'))
        }
        else{
            return res.status(200).json(message.compose('200','Osztály sikeresen törölve!'))}
    })
}

