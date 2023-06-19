const { where } = require('sequelize');
const User = require('../model/user')
// Register User
exports.registerUser=((req,res,next)=>{
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  // console.log(User.findAll({where:{
  //   email:req.body.email
  // }}).then(result=>result))
  User.findAll({where:{
    email:email
  }}).then(result=>{
    if(result.length>0 == false){
      User.create({
        name , email , password
      }).then((result=>{
        res.status(200).json('User Created')})).catch(err=>console.log(err))
    }else{
      res.status(202).json('User already Exists')
    }
  }).catch(err=>console.log(err))
})

// Login

exports.loginUser=((req,res,next)=>{
  const email = req.body.email
  const userPassword = req.body.password
  User.findAll({where :{
    email:email
  }}).then(result =>{
    if(result.length>0 == true){
      if(result[0].password == userPassword){
res.status(200).json('user login successfully !')
      }else{
        res.status(401).json('password Invalid !')
      }
    }else{
      res.status(400).json('UserId InValid !')
    }
  })

})