const jwt = require('jsonwebtoken')
const User = require('../model/user')
exports.getUserId=(req,res,next)=>{
    try{
    const token = req.header('authorization')
    const user = jwt.verify(token,'secrectKey')
    User.findByPk(user.userId).then(user=>{
        req.user = user
       return next()
    })
    }catch(err){
        console.log(err)
        res.status(401).json({success: false})
    }
}