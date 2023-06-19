const { where } = require('sequelize');
const User = require('../model/user')
// bcrypt is for password encrypation 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
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
      bcrypt.compare(userPassword , user[0].password ,(err , result)=>{
        if(!err){
      res.status(200).json({response:"UserLoggedIn",token:generateToken(user[0].id)})
        }else{
          res.status(401).json('User Not Authorizes!')
        }
      })
    }else{
      res.status(404).json('User Not Found !')
    }
  
}catch(err){res.status(500).json(err)}

}