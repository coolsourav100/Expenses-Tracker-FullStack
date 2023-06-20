const Expenses = require("../model/expenses")
const User = require("../model/user")

exports.premiumLeaderboard = async (req,res,next)=>{
try{
  const users = await User.findAll()
  const expenses =await Expenses.findAll()
  const userAggreateExpenses = {}
  expenses.forEach(item => {
    if(userAggreateExpenses[item.userId]){
      userAggreateExpenses[item.userId] += item.amount
    }else{
    userAggreateExpenses[item.userId] = item.amount
    }
  });
  const userBoardDetails = []
  users.forEach((item)=>{
    userBoardDetails.push({name:item.name ,totalamount: userAggreateExpenses[item.id]})
  })
  console.log(userAggreateExpenses,userBoardDetails,'===============================>')
  res.status(201).json(userBoardDetails)

}catch(err){
 res.status(500).json(err)
}
}