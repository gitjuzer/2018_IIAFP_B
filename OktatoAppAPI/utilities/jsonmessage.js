exports.compose = (statuscode, description, data)=>{
    var message = {
        "status_code":statuscode,
        "description":description
    }
    if(data != null){
        message.data = data
    }
    return message
}