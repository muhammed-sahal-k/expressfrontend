import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {

    const navigate=useNavigate()

    const [formdata,setformdata] = useState({

        email :'',
        pass :''
    } )
    

    const handlechange = (e)=>{
        setformdata({
            ...formdata,[e.target.name]:e.target.value
        })
    }

    const handlelogin = async(e) =>{
        e.preventDefault()
      try{

        const res= await axios.post(`${import.meta.env.VITE_API_URL}login`,formdata)
        console.log(res);
        if(res.status==200){
            // alert('login successfully')

            navigate('/Addproduct')


            localStorage.setItem("token",res.data.token)
            alert("logined successfull")
        }else{
            alert("login error")
        }

      }catch(error){
        alert("login error")
      }

    }
  return (
    <div className='reg'>

   

    <form onSubmit={handlelogin}>
       <h2>Login</h2>
        <input type="email" name='email' value={formdata.email} placeholder='enter email' onChange={handlechange}/>
        <input type="password" name='pass' value={formdata.pass}  placeholder='enter password' onChange={handlechange}/>
    <button type='submit'>Login</button>
    </form>
    </div>
  )
}

export default Login