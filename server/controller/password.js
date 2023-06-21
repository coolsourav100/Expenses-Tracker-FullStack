const Sib = require('sib-api-v3-sdk');
require("dotenv").config();

exports.forgotpassword = async (req, res , next) =>{
    // console.log(req.body.email,'++++++++++++++')
    try{
const email = req.body.email
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
        htmlContent:"<html><head></head><body><p>Hello,</p>This is your Password Reset From.</p><input type='text' placeholder='enter your new password'/><button>Reset Password</button></body></html>"

})
console.log(responce)
// .then((result)=>{
//     console.log(result,'_===================>')
//    return res.status(200).json('Password Reset Link Send on your email Id')
// }).catch(err=>{
//     throw new Error(err)})
    }
    catch(err){
        res.status(500).json(err)
    }
}