import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

export const Newpassword = () => {
    const [ resEmail , setResEmail] = useState('')
    const [enterpassword , setEnterpassword] = useState('')
    const id = useParams().id
    console.log(id)
    useEffect(()=>{
      axios.get(`http://localhost:4000/password/verify_user/${id}`).then((res)=>{
        setResEmail(res.data)
        // console.log(res)
      }).catch(err=>{
        console.log(err)
      })
      
            
        
    },[])

    const newpasswordHandler=async(e)=>{
        e.preventDefault();
        try{
        const responce = await axios.post(`http://localhost:4000/password/updatepassword`,{email:resEmail,password:enterpassword})
        // console.log(responce)
        // if(responce.status==201){
        //   alert('Password Updated ')
        // }
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div>
        <section className="vh-100">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black rounded">
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
  
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Password Reset</p>
  
                  <form className="mx-1 mx-md-4" onSubmit={newpasswordHandler}>
  
  
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <input type="password" id="form3Example3c" className="form-control" onChange={(e)=>setEnterpassword(e.target.value)} required/>
                        <label className="form-label" for="form3Example3c">Your New Password</label>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="submit" className="btn btn-primary btn-lg">Conform</button>
                    </div>
  
                  </form>
                  <div className="form-check d-flex justify-content-center mb-5">
                      {/* <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" /> */}
                      
                    </div>
                </div>
                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
  
                  {/* <img src={img}
                    className="img-fluid" alt="Sample image"/> */}
  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    </div>
  )
}
