import React, { useState } from 'react'
import axios from 'axios'
// import "./Add.css"
import { useNavigate } from 'react-router-dom'

function Adduser() {

    const navigate=useNavigate()
const [formdata,setformdata]=useState({
    name:'',
    email:'',
    pass:'',
    cpass:''
})

const handlechange = (e)=>{
    setformdata({
        ...formdata,[e.target.name]:e.target.value
    })
}

const handlesubmit = async (e)=>{
    e.preventDefault()
    try{

        const res = await axios.post(`${import.meta.env.VITE_API_URL}adduser`,formdata)
        console.log(res);

        if(res.status==201){
            alert("Data added successfull")

            navigate('/Login')
        }



    }catch(error){
         alert("Failed Data adding")
        
    }
}

  return (

    <div className='reg'>
        <form onSubmit={handlesubmit}>
            <h2>User Registration</h2>
            <input type="text" name='name' value={formdata.name} placeholder='enter your name' onChange={handlechange} />
              <input type="email" name='email' value={formdata.email} placeholder='enter your email' onChange={handlechange} />
              <input type="password" name='pass' value={formdata.pass} placeholder='enter password' onChange={handlechange} />
                <input type="password" name='cpass' value={formdata.cpass} placeholder='confirm password' onChange={handlechange} />
                <button type='submit'>Submit</button>

        </form>
    </div>
  )
}

export default Adduser