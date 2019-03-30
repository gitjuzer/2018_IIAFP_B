const sql = require('./db')
const Role = require('./role')
const Permission = require('./permission')


const RoleToPermission = function(role_id_pk, permission_id_pk){
    this.role_id_pk = role_id_pk
    this.permission_id_pk = permission_id_pk
}

RoleToPermission.getPermissionsForRole = (role_name, result) =>{
    //szerepkör megkeresése adatbázisból
    Role.getRoleByName(role_name, (err, res)=>{
        console.log(err, res)
        if(err || res.length < 1){
            return result(err, null)
        }
        else{
            var returnthis = { role_name : res[0].role_name }
            sql.query('SELECT permission.id ,permission.permission_name FROM permission LEFT JOIN role_to_permission ON permission.id = role_to_permission.permission_id_pk LEFT JOIN role ON role.id = role_to_permission.role_id_pk WHERE role.role_name = ?',role_name,(err,res)=>{
                if(err){
                    return result(err,null)
                }
                else{
                    returnthis.permissions = res
                    return result(null, returnthis)
                }
            })
        }
        
    })
}

RoleToPermission.AddPermissionToRole = (role_name, permission_name, result) =>{
    Role.getRoleByName(role_name, (err, res)=>{
        if(err || res.length < 1){
            return result(err, null)
        }
        const role_id = res[0].id
        Permission.selectByName(permission_name, (err1, res1)=>{
            if(err1 || res1.length < 1){
                return result(err1, null)
            }
            const permission_id = res1[0].id
            sql.query('INSERT INTO role_to_permission SET ?', {role_id_pk : role_id, permission_id_pk : permission_id}, (err2, res2)=>{
                if(err2 || res2.length < 1){
                    console.log(err2)
                    return result(err2, null)
                }
                else{
                    return result(null, res2);
                }
                //ne felejtsd el normálisra az insertet megcsinálni
            })
        })
    })
}

RoleToPermission.RemovePermissionFromRole =  (role_name, permission_name, result) =>{
    Role.getRoleByName(role_name, (err, res)=>{
        if(err || res.length < 1){
            return result(err, null)
        }
        const role_id = res[0].id
        Permission.selectByName(permission_name, (err1, res1)=>{
            if(err1 || res1.length < 1){
                const err1 = {type : 'PERMISSION_NOT_FOUND'}
                return result(err1, null)
            }
            const permission_id = res1[0].id
            sql.query('DELETE FROM role_to_permission WHERE role_id_pk = ? && permission_id_pk = ?', [role_id,permission_id], (err2, res2)=>{
                console.log(err2, res2)
                if(err2 || res2.affectedRows == 0){
                    return result(err2, null)
                }
                else{
                    return result(null, result);
                }
            })
        })
    })
}

module.exports = RoleToPermission