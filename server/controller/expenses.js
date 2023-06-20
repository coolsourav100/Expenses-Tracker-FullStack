const Expenses = require('../model/expenses')
const User = require('../model/user')

exports.getAllExpenses = async(req,res,next)=>{
    try{
await Expenses.findAll({where:{userId:req.user.id}})
            .then(res1=>res.status(200).json(res1))
    }catch(err){
res.status(500).json(err)
    }

}

exports.addExpenses = async(req,res,next)=>{
    try{
    const des = req.body.des;
    const amount = req.body.amount ;
    const cata = req.body.cata
  const result = await Expenses.create({des:des,amount:amount , cata: cata , userId:req.user.id })
       const user = await User.findByPk(req.user.id)
       const newExpenses = Number(user.totalExpenses) + Number(amount)
       user.update({totalExpenses:Number(newExpenses)})
  res.status(203).json('Expenses Added')
    }catch(err){
        res.status(502).json(err)
    }
}

exports.deleteExpenses= async(req,res,next)=>{
    const id = req.params.id
    console.log(id)
    try{
        const user = await User.findByPk(req.user.id)
        await Expenses.findAll({where:{userId:req.user.id}}).then(rr=>{
            rr.map((item)=>{
                if(item.id == id){
                const newExpenses = Number(user.totalExpenses) - Number(item.amount)
                user.update({totalExpenses:Number(newExpenses)})
                item.destroy()
            }})
        }).then(result=>res.status(206).json('Expenses has been Deleted !!!'))
    }catch(err){
        res.status(500).json(err)
    }
}