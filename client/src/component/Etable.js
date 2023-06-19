import React, { useEffect, useState } from 'react'
import axios  from'axios';
const Etable = () => {
  const [expens , setExpense] = useState({des:"", amount:0,cata:""})
  const [expensData , setExpenseData] = useState([]);
  const [toggle , setToggle] = useState(false)

  useEffect(()=>{
axios.get('http://localhost:4000/expenses/allexpenses').then((res)=>{
  console.log(res,'All')
  setExpenseData(res.data)
})
  },[toggle])

  const changeHandler=(e)=>{
setExpense({...expens,[e.target.name]:e.target.value})
  }

  const submitHandler= async(e)=>{
    e.preventDefault()
try{
let res = await axios.post('http://localhost:4000/expenses/addexpenses',{...expens})
console.log(res)
if(res){
  setExpense({des:"", amount:0,cata:""})
  setToggle(!toggle)
}
}catch(err){
  console.log(err)
}

  }

  const deleteHandler=async(id)=>{
    try{
      await axios.delete(`http://localhost:4000/expenses/deleteexpenses/${id}`).then(res=>{
        console.log(res)
        setToggle(!toggle)
      })
    }catch(err){
      console.log(err)
    }

  }
  return (
    <div className='row'>
    <div className='container h-50 col-3 border border-info rounded p-4 m-4'>
        <h3 className='text-secondary d-flex justify-content-center p-1'> Add Your Expenses</h3>
        <form onSubmit={submitHandler}>
        <div>
        <label className='form-label'>Expenses Descriptation</label>
        <input type='text' className='form-control' name='des' onChange={changeHandler} value={expens.des}/>
        </div>
        <div>
        <label className='form-label'>Expenses Amount</label>
        <input className='form-control' type='number' name='amount' onChange={changeHandler} value={expens.amount} />
        </div>
        <div>
        <label className='form-label'>Expenses Catagory</label>
        <select className='form-control' name='cata' onChange={changeHandler} value={expens.cata}>
            <option></option>
            <option value='Food'>Food</option>
            <option value='Transport'>Transport</option>
            <option value='Shopping'>Shopping</option>
            <option value='Payments'>Payments</option>
            <option value='Saving'>Saving</option>
        </select>
        </div>
        <div className='d-flex justify-content-center'>
        <button type='submit' className='btn btn-info border border-info  m-2'>Add</button>
        </div>
        </form>
    </div>
    <div className='container col-8 border border-info rounded p-4 m-4'>
        <h3 className='text-secondary d-flex justify-content-center p-1'>Your Expenses List</h3>
        <table className="table table-striped table-hover table-success">
  <thead>
    <tr>
      <th scope="col">Sl No.</th>
      <th scope="col">Descriptation</th>
      <th scope="col">Amount</th>
      <th scope="col">Catagory</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {expensData?.map((item,index)=>{
      return (
    <tr key={item.id +1}>
      <th scope="row">{index+1}</th>
      <td>{item.des}</td>
      <td>{item.amount}</td>
      <td>{item.cata}</td>
      <td>
        <button className='btn btn-danger' onClick={()=>deleteHandler(item.id)}>Delete</button>
      </td>
    </tr>
      )
})}
  </tbody>
</table>
    </div>
    </div>
  )
}

export default Etable