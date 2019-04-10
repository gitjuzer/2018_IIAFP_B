const Permission = require('../models/permission')
const message = require('../utilities/jsonmessage')

function hasWhiteSpace(s) {
    return /\s/g.test(s);
  }

exports.get_all_permission = (req,res,next)=>(
    Permission.getAllPermissions((err, result) =>{
        res.status(200).json(message.compose('200','Jogok sikeresen lekérdezve!',result));
    })
    
)

exports.create_permission = (req,res,next) =>{
    const newPermission = new Permission(req.body);

    if(hasWhiteSpace(newPermission.permission_name)){
       return res.status(400).send(message.compose('400','Hibás jogosultság név!'));
    }
    if(!newPermission.permission_name)
    {
       return res.status(400).json(message.compose('400','Hiányzó adatok!'));
    }
    else
    {      
        Permission.createPermission(newPermission,(err,result)=>{
            if(err || result === null)
            {
                res.status(409).json(message.compose('409','Már létezik ilyen jogosultság!'))
            }
            else
            {
                Permission.getPermissionById(result,(err,result) =>{
                res.status(201).json(message.compose('201','Jogosultság sikeresen létrehozva!',result))
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
        
        return res.status(400).json(message.compose('400','Nincs ilyen jogosultság!'))
       }
        Permission.DeleteByPermissionName(permissionName,(err,result)=>{
           return res.status(200).json(message.compose('200','Jogosultság sikeresen törölve!'))
            
       })
    
    })}


