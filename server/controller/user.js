require("dotenv").config();
const User = require('../model/user')
// bcrypt is for password encrypation 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Expenses = require('../model/expenses');

const saltRounds = 10;
const userservices = require('../services/user')
const s3services = require('../services/s3services');
const FileDownload = require("../model/FileDownload");
// Register User

exports.registerUser= async(req,res,next)=>{
  try{
  let name = req.body.name;
  let email = req.body.email;
  let userpassword = req.body.password;
  const user = await User.findAll({where:{email:email}})
    if(user.length>0 == false){
      bcrypt.hash(userpassword, saltRounds, async(err, hash)=>{
        await User.create({
           name:name , email:email , password: hash
         }).then((result=>{
           res.status(200).json('User Created')})).catch(err=>console.log(err))
      })
    }else{
      res.status(202).json('User already Exists')
    } 
}catch(err){
  res.status(501).json(err)
}
}

// Login
function generateToken(userId){
let token = jwt.sign({userId:userId} ,'secrectKey')
// console.log(token,'==================>')
return token
}

exports.loginUser = async(req,res,next)=>{
  try{
  const email = req.body.email
  const userPassword = req.body.password
  const user = await User.findAll({where:{ email:email }})
    if(user.length>0 == true){
     const match = await bcrypt.compare(userPassword , user[0].password)
     console.log(match,'==============>')
     
        if(match){
      res.status(200).json({response:"UserLoggedIn",token:generateToken(user[0].id),isPro:user[0].ispremiumuser})
        }else{
          res.status(401).json('User Not Authorizes!')
        }
      
    }else{
      res.status(404).json('User Not Found !')
    }
  
}catch(err){res.status(500).json(err)}

}


exports.downloadReport = async(req,res,next)=>{
  const userid = req.user.id
  try{
    const expenses = await userservices.getExpenses(req)
    const stringfyExpenses = JSON.stringify(expenses)
    console.log(stringfyExpenses)
    const filename =`Expenses${userid}/${new Date()}.txt`
    const fileurl =await s3services.uploadToS3(stringfyExpenses ,filename)
   await FileDownload.create({filename:filename, location:fileurl , userId : userid}).then(result=>console.log(result,'9090999'))
    if(req.user.ispremiumuser){
res.status(200).json({fileurl, sucess:true})
    }else{
      res.status(401).json('Unauthorized')
    }

  }catch(err){
res.status(500).json({fileurl:'',sucess:false})
console.log(err)
  }
}

exports.listDownload = async(req,res,next)=>{
  const user = req.user.id
  console.log(user,'===========>')
  try{
const list = await FileDownload.findAll({where:{userId : user}})
return res.status(200).json(list)
  }catch(err){
    res.status(500).json(err)
  }
}