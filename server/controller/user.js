const { where } = require('sequelize');
const User = require('../model/user')
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