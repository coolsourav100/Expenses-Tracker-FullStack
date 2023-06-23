const Sib = require('sib-api-v3-sdk');
const { v4: uuid } = require('uuid');
const User = require('../model/user');
const ForgotPasswordRequested = require('../model/ForgotPassWordRequesteds');
require("dotenv").config();
const bcrypt = require('bcrypt');
const saltRounds = 10;

// exports.forgotpassword = async (req, res , next) =>{
//     // console.log(req.body.email,'++++++++++++++')
//     try{
// const email = req.body.email
// const client = Sib.ApiClient.instance;
// // Instantiate the client
// const apiKey = client.authentications['api-key'];
// apiKey.apiKey = process.env.RESET_PASSWORD_API_KEY;
// const transEmailInstance = new Sib.TransactionalEmailsApi()
// Create Trans Email
// const responce = await transEmailInstance.sendTransacEmail({
//         name : "PassWord Reset",
//         subject : "Resst Your Password",
//         sender : {name: "Admin -n Expenses Tracker", email:"sourav.sarkar@hih7.com"},
//         to :[{email: email} ],
//         htmlContent:"<html><head></head><body><p>Hello,</p>This is your Password Reset From.</p><input type='text' placeholder='enter your new password'/><button>Reset Password</button></body></html>"

// })
// console.log(responce)
// .then((result)=>{
//     console.log(result,'_===================>')
//    return res.status(200).json('Password Reset Link Send on your email Id')
// }).catch(err=>{
//     throw new Error(err)})
//     }
//     catch(err){
//         res.status(500).json(err)
//     }
// }


exports.resetPassword = async (req,res,next)=>{
    const email = req.body.email
    try{
const user = await User.findAll({where:{email:email}})
if(user.length>0){
    let id = uuid();
    ForgotPasswordRequested.create({id:id , isActive:true , userId:user[0].id})

    const client = Sib.ApiClient.instance;
// Instantiate the client
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.RESET_PASSWORD_API_KEY;
const transEmailInstance = new Sib.TransactionalEmailsApi()
// Create Trans Email
const responce = await transEmailInstance.sendTransacEmail({
        name : "PassWord Reset",
        subject : "Resst Your Password",
        sender : {name: "Admin -n Expenses Tracker", email:"sourav.sarkar@hih7.com"},
        to :[{email: email} ],
        htmlContent:`<html><head></head><body><p>Click to set a new password : <a href="http://localhost:3000/password/reset/${id}">Reset password</a></p></body></html>`

})
console.log(responce)
return res.status(201).json('password rest send succesfully !')
}else{
    // const fuser = await ForgotPasswordRequested
    // ForgotPasswordRequested.update({where:{isActive:true,}})
    return res.status(404).send("email does not exist in our records")
}

    }
    catch(err){
        res.status(500).json(err)
    }
}

exports.verifyUser = async(req,res,next)=>{
const {id} = req.params
try{
const uid = await ForgotPasswordRequested.findAll({where:{id:id}})

    const user =await User.findByPk(uid[0].userId)
    const email = user.email
    if(uid[0].isActive == true){
        res.status(201).json(email)
    }else{
            res.status(400).json('reset link expire 😎')
    }

}
catch(err){
    res.status(500).json(err)
}
}

exports.updatepassword=async(req,res,next)=>{
    const {email , password } = req.body
    // console.log(email,'=============================>')
    try{

        const user = await User.findAll({where:{email:email}})
        const userid = user[0].id
        const uid = await ForgotPasswordRequested.findAll({where:{userId:userid}})

        if(uid[0].isActive == true && user.length>0){
            bcrypt.hash(password , saltRounds,async(err,hash)=>{
               return await User.update({password : hash },{where:{email:email}}).then(()=>{
                ForgotPasswordRequested.update({isActive : false},{where:{userId : userid}})
                return res.status(201).json('password reset successfully')
               }).catch(err=>{
                throw new Error(err)})
            })
        }else{
            res.status(400).json('reset link expire !')
        }

    }
    catch(err){
        res.status(500).json(err)
    }

}