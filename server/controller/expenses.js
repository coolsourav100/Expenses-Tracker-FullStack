const Expenses = require('../model/expenses')
const User = require('../model/user')
const sequelize = require('../util/dataBase')

const ITEM_PER_PAGE = 5
exports.getAllExpenses = async(req,res,next)=>{
    const page = +req.query.page || 1
    try{
await Expenses.findAll({
    offset: (page-1) * ITEM_PER_PAGE ,
    limit : ITEM_PER_PAGE
},{where:{userId:req.user.id}})
            .then(res1=>res.status(200).json(res1))
    }catch(err){
res.status(500).json(err)
    }

}

exports.addExpenses = async(req,res,next)=>{
    const t = await sequelize.transaction();
    try{
    const des = req.body.des;
    const amount = req.body.amount ;
    const cata = req.body.cata
    await Expenses.create({des:des,amount:amount , cata: cata , userId:req.user.id })
       const user = await User.findByPk(req.user.id)
       const newExpenses = Number(user.totalExpenses) + Number(amount)
      await user.update({totalExpenses:Number(newExpenses) , transaction : t})
      await t.commit();
  return res.status(203).json('Expenses Added')
    }catch(err){
      await  t.rollback()
        res.status(502).json(err)
    }
}

exports.deleteExpenses= async(req,res,next)=>{
    const t = await sequelize.transaction();
    const id = req.params.id
    console.log(id)
    try{
        const user = await User.findByPk(req.user.id)
       const expen = await Expenses.findAll({where:{userId:req.user.id}, transaction : t})
            expen.map((item)=>{
                if(item.id == id){
                const newExpenses = Number(user.totalExpenses) - Number(item.amount)
                user.update({totalExpenses:Number(newExpenses)})
                item.destroy()
            }})
            await t.commit();
        return res.status(206).json('Expenses has been Deleted !!!')
    }catch(err){
     await  t.rollback()
        res.status(500).json(err)
    }
}