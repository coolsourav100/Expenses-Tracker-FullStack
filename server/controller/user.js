// const { where } = require('sequelize');
const User = require('../model/user')
// bcrypt is for password encrypation 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Expenses = require('../model/expenses');
const AWS = require('aws-sdk')
const saltRounds = 10;
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

// exports.getLeaderBoard = async(req,res,next)=>{
//   try{
//     await User.findAll().then(result=>{
//       return res.status(200).json(result)
//     }).catch(err=>{
//       throw new Error(err)
//     })

//   }catch(err){
//     res.status(500).json(err)
//   }
// }
function uploadToS3(data , filename){
  const BUCKET_NAME ='souravexpenses';
  const IAM_USER_KEY ='AKIA32HNJJRSISHOWJRZ';
  const IAM_USER_SECRET='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'

  let s3bucket = new AWS.S3({
    accessKeyId : IAM_USER_KEY ,
    secretAccessKey : IAM_USER_SECRET,
  })
  s3bucket.createBucket(()=>{
    let params = {
      Bucket :BUCKET_NAME,
      Key : filename , 
      Body : data

    }
    s3bucket.upload(params ,(err,s3res)=>{
      if(err){
        console.log(err, 'something went wrong')
      }else{
        console.log(s3res , 'Success')
      }
    })
  })

}

exports.downloadReport = async(req,res,next)=>{
  try{
    const expenses = await req.user.getExpenses()
    const stringfyExpenses = JSON.stringify(expenses)
    console.log(stringfyExpenses)
    const filename ='Expenses.txt'
    const fileurl = uploadToS3(stringfyExpenses ,filename)
    if(req.user.ispremiumuser){
res.status(200).json({filename , sucess:true})
    }else{
      res.status(401).json('Unauthorized')
    }

  }catch(err){

  }
}