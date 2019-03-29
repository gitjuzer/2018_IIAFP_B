const sql = require('./db');

const Permission = function(permission){
  this.permission_name = permission.permission_name;
}

Permission.getAllPermissions = (result) =>{
    sql.query("Select * FROM permission",(err,res)=>{
        if(err)
        {
            //console.log('error fut le')
            result(err,null);
        }
        else
        {
            //console.log('Hibatlan')
            result(null,res)
        }
    })
}

Permission.getPermissionById =(id,result) =>{
    sql.query("SELECT * FROM permission WHERE id = ?",id, (err, res)=>{
        if(err){
            console.log("Hiba");
            result(err, null);
        }
        else{
            console.log(res);
            result(null, res);
        }
    })
}

Permission.createPermission = (newPermission, result) =>{
    sql.query("INSERT INTO permission SET ?",newPermission ,(err,res) =>{
        if(err)
        {
            result(err,null);
        }
        else
        {
            result(null,res.insertId);
        }
    })
}


Permission.selectByName = (permissionName,result) =>{
    sql.query("Select * from permission where permission_name = ?",permissionName,(err,res) =>{
        if(err)
        {
            result(err,null)
        }
        else{
            result(null,res)
        }
    })
}

Permission.DeleteByPermissionName = (permissionName,result)=>{
    sql.query("Delete From permission Where permission_name = ?",permissionName,(err,res) =>{
        if(err)
        {
            console.log("error")
            result(err,null);
        }
        else{
            console.log("joo");
            result(null,res)
        }

    })
}
module.exports = Permission;