const jwt =require('jsonwebtoken')

exports.EncodedToken=(email,user_id)=>{
    let key = "123-ABC-XYZ";
    let expire = {expireIn:'24h'}
    payload ={
        email:email,
        user_id:user_id
    }
    return jwt.sign(payload,key,expire)

}

exports.DecodedToken = (token)=>{
    try {
        let key= "123-ABC-XYZ";
        return jwt.verify(token,key)
    } catch (error) {
        return null
        
    }

}