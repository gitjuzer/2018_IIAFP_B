const sql = require('./db')

const Classroom = function(name){
    this.name = name
}

Classroom.getAllClassrooms = (result)=>{
    sql.query('SELECT * FROM classroom', (err, res)=>{
        if (err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}

Classroom.getClassroomByName = (name, result)=>{
    sql.query('SELECT * FROM classroom WHERE name = ?', name, (err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}

Classroom.getClassroomById = (id, result)=>{
    sql.query('SELECT * FROM classroom WHERE id = ?', id, (err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
    })
}

Classroom.createNewClassroom = (newClassroom, result)=>{
    sql.query('INSERT INTO classroom SET ?',newClassroom, (err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res.insertId)
        }
    })
}

Classroom.deleteClassroomByName = (name, result)=>{
    sql.query('DELETE FROM classroom WHERE name = ?',name,(err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
        
    })
}

Classroom.deleteClassroomById = (id, result)=>{
    sql.query('DELETE FROM classroom WHERE id = ?',id,(err, res)=>{
        if(err){
            result(err, null)
        }
        else{
            result(null, res)
        }
        
    })
}


module.exports = Classroom;