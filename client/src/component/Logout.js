import React from 'react'
import { useNavigate } from 'react-router'

const Logout = () => {
    const navigate = useNavigate()
    const clickHandler=()=>{
        localStorage.clear()
        navigate('/')
    }
  return (
    <button type="button" className="btn btn-info text-dark p-1 m-2" onClick={clickHandler}>Logout</button>
  )
}

export default Logout