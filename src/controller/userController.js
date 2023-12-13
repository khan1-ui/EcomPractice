const {userOTPService,verifyOTPService} = require('../services/userService')
const UserModel = require('../models/UserModel')


exports.creatUser=async(req,res)=>{
    let reqBody = req.body;
try {
      await UserModel.create(reqBody)
      res.status(200).json({status:"success"})
    } catch (error) {
        res.status(400).json({status:"fail",data:error})

       }
                      }

exports.userOTP = async(req,res)=>{
let result = await userOTPService(req) 
if(result['status']==='success'){
    //cookieOption
    let cookieOption ={expire:new Date(Date.now()+24*60*60*1000),httponly:false}
    //cookie with response
    res.cookie('token',result['token'],cookieOption)
    return res.status(200).json(result)
}else{
    return res.status(200).json(result)
}
   

}
exports.verifyLogin= async(req,res)=>{
    let result = await verifyOTPService(req)
    return res.status(200).json(result) 

}
exports.userLogout = async(req,res)=>{

}
exports.creatProfile= async(req,res)=>{

}
exports.updateProfile =async(req,res)=>{

}
exports.readProfile =async(req,res)=>{

}