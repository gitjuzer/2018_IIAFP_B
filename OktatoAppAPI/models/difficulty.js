const sql = require('./db')

const Difficulty = function(diff)
{
    this.difficulty_level = diff.difficulty_level
    this.diffculty_name = diff.diffculty_name
}

Difficulty.selectAll = (result)=>{
    sql.query('Select * from difficulty',(err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}

Difficulty.selectByLevel = (level,result)=>{
    sql.query("select * from difficulty where difficulty_level = ?",level,(err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}


Difficulty.createDifficulty = (newDifficulty,result)=>{
    sql.query("INSERT INTO difficulty SET ?",newDifficulty,(err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}

Difficulty.deleteDiff = (level,result)=>{
    sql.query('Delete From difficulty Where difficulty_level = ?',level,(err,res)=>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}

module.exports = Difficulty