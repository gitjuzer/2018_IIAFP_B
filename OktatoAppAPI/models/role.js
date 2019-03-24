const sql = require('./db');

const Role = function(role){
    this.role_name = role.role_name;
    this.role_description = role.role_description;
}
Role.createRole = (newRole, result) =>{
    sql.query("INSERT INTO role SET ?", newRole, (err, res) =>{
        if (err){
            result(err, null);
        }
        else{
            result(null, res.insertId);
        }
    });
}
Role.getAllRoles = (result) =>{
    sql.query("SELECT * FROM role",(err, res)=>{
        if (err){
            result(err, null);
        }
        else{
            result(null, res)
        }
    })
};
Role.getRoleById = (id, result)=>{
    sql.query("SELECT * FROM role WHERE id = ?",id, (err, res)=>{
        if(err){
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
Role.getRoleByName = (role_name, result)=>{
    sql.query("SELECT * FROM role WHERE role_name = ?",role_name, (err, res)=>{
        if(err){
            result(err, null);
        }
        else{
            result(null, res);
        }
    });
};
Role.deleteRole = (roleName, result)=>{
    sql.query("DELETE FROM role WHERE role_name = ?", roleName, (err, res)=>{
        if(err){
            result(err, null);
        }
        else{
            result(null, res);
        }
    })
}
module.exports = Role;