import React, { useEffect, useState } from 'react'
import axios  from'axios';
import PayButton from './PayButton';
// import FileSaver from 'file-saver';
import Learderboard from './Learderboard';
import apiData from './Api';
import Logout from './Logout';
const Etable = () => {
  const [expens , setExpense] = useState({des:"", amount:0,cata:""})
  const [expensData , setExpenseData] = useState([]);
  const [toggle , setToggle] = useState(false);
  const [userpro ,setUserpro] = useState(localStorage.getItem('isPro'))
  const [page , setPage] = useState({id:+1})

  useEffect(()=>{

axios.get(`${apiData}/expenses/allexpenses/?page=${page.id}`,{headers:{Authorization:localStorage.getItem('token')}}).then((res)=>{
  // console.log(res,'Allas')
  // console.log(userpro=='false')
  setExpenseData(res.data)
})
  },[toggle])

  const changeHandler=(e)=>{
setExpense({...expens,[e.target.name]:e.target.value})
  }

  const submitHandler= async(e)=>{
    e.preventDefault()
try{
let res = await axios.post(`${apiData}/expenses/addexpenses`,{...expens},{headers:{Authorization:localStorage.getItem('token')}})
// console.log(res)
if(res){
  setExpense({des:"", amount:0,cata:""})
  setToggle(!toggle)
}
}catch(err){
  // console.log(err)
}

  }

  const deleteHandler=async(id)=>{
    try{
      await axios.delete(`${apiData}/expenses/deleteexpenses/${id}`,{headers:{Authorization:localStorage.getItem('token')}}).then(res=>{
        // console.log(res)
        setToggle(!toggle)
      })
    }catch(err){
      // console.log(err)
    }

  }
  function pro(id){
    setUserpro(id)
  }
  
  const reportDownloader=()=>{
//     let blob = new Blob([expensData], {type: "text/csv;charset=utf-8"});
// FileSaver.saveAs(blob, "report.csv");
axios.get(`${apiData}/auth/download`,{headers:{Authorization:localStorage.getItem('token')}}).then(res=>{
  if(res.status==200){
    return window.open(res.data.fileurl)}
}).catch(err=>{
  // console.log(err)
})
  }

 
const pageNextHandler =(e)=>{
  // console.log(page.id)
  e.preventDefault()
  // console.log(page.id,'=======================================')
  setPage({id : page.id+1})
  setTimeout(()=> setToggle(!toggle),0)
}
const pagePrevHandler=(e)=>{
  // console.log(page.id)
  if(page.id >1){
    setPage({id : page.id-1})
  }
  setToggle(!toggle)
}
  return (
    <div className='row'>
      <div className='d-flex justify-content-between'>
       {userpro=='false' ?  <PayButton ispro={pro}/> :<h4>Welcome Premium User</h4>}
       
       <Logout/>
       </div>
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
        {userpro=='false' ? null :<Learderboard toggle={toggle}/>}
    
    {/* </div> */}
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
{userpro=='false' ? null :
          <button className='d-flex justify-content-center btn btn-light' onClick={reportDownloader}>Download Expenses Report</button>}
          <div>
    {page.id>1 && <button className='btn btn-primary m-2' onClick={pagePrevHandler}>Prev</button>}
    <button className='btn btn-primary m-2' onClick={pageNextHandler}>Next</button>
    </div>
    </div>
    </div>
  )
}

export default Etable