const Order = require('../model/order')
const RazorPay = require('razorpay')
require("dotenv").config();


exports.paymentreqint = async (req,res,next)=>{
    // console.log(process.env.RAZORPAY_KEY_ID , '=============================>')
    try{
        const instance = new RazorPay({
            key_id : process.env.RAZORPAY_KEY_ID,
            key_secret : process.env.RAZORPAY_SECRET
        })
        const amount = 500

        instance.orders.create({amount:amount,currency:'INR'},(err,order)=>{
            if(err){
                console.log(err , '==================>')
                // throw new Error(JSON.stringify(err))
            }
            req.user.createOrder({order_id:order.id , status : 'PENDING'}).then(()=>{
                return res.status(201).json({order , key_id :instance.key_id})
            })
        })
            }
            catch(err){
                res.status(500).json(err)
            }

}

exports.paymentStatus =async (req,res,next) =>{
    try{
        const {payment_id, order_id} = req.body ;
       const order = await Order.findOne({where:{order_id : order_id}})
          const promise1 =  order.update({paymentid : payment_id , status : 'SUCCESSFUL'})
              const promise2 =  req.user.update({ispremiumuser:true})
              Promise.all([promise1,promise2]).then(()=>{

                  return  res.status(202).json({sucess:true,message:'Transaction Successful !'})
              }).catch(err=>{
                throw new Error(err)}
              )
            
        
    }catch(err){
console.log(err)
res.status(403).json({error:err , message : 'Something went Wrong !'})
    }
}

exports.paymentStatusFailed =async (req,res,next) =>{
    try{
        const {payment_id, order_id} = req.body ;
       const order = await Order.findOne({where:{order_id : order_id}})
          const promise1 =  order.update({paymentid : payment_id , status : 'FAILED'})
              const promise2 =  req.user.update({ispremiumuser:false})
              Promise.all([promise1,promise2]).then(()=>{

                  return  res.status(202).json({sucess:true,message:'Transaction Failed !'})
              }).catch(err=>{
                throw new Error(err)}
              )
            
        
    }catch(err){
console.log(err)
res.status(403).json({error:err , message : 'Something went Wrong !'})
    }
        }