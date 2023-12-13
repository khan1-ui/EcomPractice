const EmailSend = require('../utility/EmailHelper')
const UserModel = require('../models/UserModel')
const userOTPService = async(req)=>{
    try {
        let email = req.params.email;
        let code = Math.floor(100000+Math.random()*900000);
        let EmailText = `Your Varification code is = ${code}`;
        let EmailSubject="Email Varification"
        await EmailSend(email,EmailText,EmailSubject);
        await UserModel.updateOne({email:email},{$set:{otp:code}},{upsert:true})
        return {status:"success",message:"6digit OTP has been send"}
    } catch (error) {
        return {status:"fail",message:"something has wrong"}
    }
}
const verifyOTPService = async(req,res)=>{
    try {
        let email = req.params.email;
        let OTP = req.params.otp;
        //user count
        let total = await UserModel.find({email:email,otp:OTP}).count('total')
        if(total===1){
            //user id read
            let user_id = await UserModel.find({email:email,otp:OTP}).select('_id')
            //user create token
            let token = EncodeToken(email,user_id[0]['_id'].toString())
            //user otp code upto 0
            await UserModel.updateOne({email:email},{$set:{otp:'0'}})
            return {status:"success",message:"valid OTP token",token:token}
        }
    } catch (error) {
      return {
        status:"fail",message:"Invalid OTP"
      }  
    }
}
module.exports ={userOTPService,verifyOTPService}