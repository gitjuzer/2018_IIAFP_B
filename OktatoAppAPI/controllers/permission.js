const Permission = require('../models/permission')

function hasWhiteSpace(s) {
    return /\s/g.test(s);
  }

exports.get_all_permission = (req,res,next)=>(
    Permission.getAllPermissions((err, result) =>{
        res.status(200).json({
            "status_code": "200",
            "description": "Jogok sikeresen lekérdezve!",
            "data":result
        });
    })
    
)

exports.create_permission = (req,res,next) =>{
    const newPermission = new Permission(req.body);

    if(hasWhiteSpace(newPermission.permission_name)){
       return res.status(400).send({
            "status_code": "400",
            "description": "Hibás jogosultság név!"
        });
    }
    if(!newPermission.permission_name)
    {
       return res.status(400).json({
            "status_code": "400",
            "description": "Hiányzó adatok!"
        });
    }
    else
    {      
        Permission.createPermission(newPermission,(err,result)=>{
            if(err || result === null)
            {
                res.status(409).json({
                    "status_code": "409",
                        "description": "Már létezik ilyen felhasználó!"
                })
            }
            else
            {
                Permission.getPermissionById(result,(err,result) =>{
                res.status(201).json({
                    "status_code": "201",
                    "description": "Jogosultság sikeresen létrehozva!",
                    "data":result
                })
                
            })
            }
        })
    }
  
}
exports.delete_permission = (req,res,next)=>{

    const permissionName = req.params.permission_name;
    Permission.selectByName(permissionName,(err,result)=>{
       
       if(err || result === null || Object.keys(result).length === 0)
       {
        
        return res.status(400).json({
            "status_code": "400",
                "description": "Nincs ilyen jogosultság!",
        })
       }
        Permission.DeleteByPermissionName(permissionName,(err,result)=>{
           return res.status(200).json({
                "status_code": "200",
                    "description": "Jogosultság sikeresen törölve!",
                    "data":{}
            })
            
       })
    
    })}


