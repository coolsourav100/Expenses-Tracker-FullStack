const Expenses = require("../model/expenses")
const User = require("../model/user")
const sequelize = require("../util/dataBase")


exports.premiumLeaderboard = async (req,res,next)=>{
try{
//   const aggreationExpenses = await User.findAll({attributes:['id','name',[sequelize.fn('sum',sequelize.col('expenses.amount')),'totalamount']],
// include :[{
//   model : Expenses,
//   attributes :[]
// }
// ],
// group:['user.id'],
// order:[['totalamount','DESC']]
// })
const leaderboard = await User.findAll({
  attributes :['name' , 'totalExpenses'],
  order:[['totalExpenses', 'DESC']]
})

  res.status(201).json(leaderboard)


}catch(err){
 res.status(500).json(err)
}
}