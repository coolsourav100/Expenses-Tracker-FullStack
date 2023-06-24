import axios from 'axios'
import React, { useEffect, useState } from 'react'
import apiData from './Api'
const Learderboard = ({toggle}) => {
    const [resData , setResData] = useState([])
  const [listdownload , setListdownload] = useState([])

    useEffect(()=>{
        axios.get(`${apiData}/premium/leaderboard`,{headers:{Authorization:localStorage.getItem('token')}}).then(res=>{
            // console.log(res ,'==================>')
            return setResData(res.data)
        }).catch(err=>console.log(err))

        axios.get(`${apiData}/auth/listdownload`,{headers:{Authorization:localStorage.getItem('token')}}).then(res=>{
            // console.log(res ,'==================>')
            return setListdownload(res.data)
        }).catch(err=>console.log(err))
    },[toggle])

    

  return (
    <div>
        <div >
        <h5 className='text-secondary d-flex justify-content-center p-1'>LeaderBoard</h5>
        <table className="table table-striped table-hover table-success">
  <thead>
    <tr>
      <th scope="col">Rank</th>
      <th scope="col">Name</th>
      <th scope="col">Expenses</th>
      
    </tr>
  </thead>
  <tbody>
    
      {
        resData?.map((item , ind)=>{
            return (

          
    <tr>
      <th scope="row">{ind+1}</th>
      <td>{item.name}</td>
      <td>{item.totalExpenses}</td>
      
    </tr>
      )
    })
}
      

  </tbody>
</table>
        <table className="table table-striped table-hover table-success">
  <thead>
    <tr>
      <th scope="col">sl</th>
      <th scope="col">Name</th>
      <th scope="col">Link</th>
      
    </tr>
  </thead>
  <tbody>
    
      {
        listdownload?.map((item , ind)=>{
            return (

          
    <tr>
      <th scope="row">{ind+1}</th>
      <td>{item.filename}</td>
      <td><a href={item.location}>Download Link</a></td>
      
    </tr>
      )
    })
}
      

  </tbody>
</table>
    </div>
    </div>
  )
}

export default Learderboard