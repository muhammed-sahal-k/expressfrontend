import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {

  const navigate = useNavigate()

  const [formdata, setformdata] = useState({
    email: '',
    pass: ''
  })

  const handlechange = (e) => {
    setformdata({
      ...formdata, [e.target.name]: e.target.value
    })
  }

  const handlelogin = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}login`, formdata)
      console.log(res);

      if (res.status == 200) {
        localStorage.setItem("token", res.data.token)
        alert("Login successful")

        navigate('/Addproduct')
      } else {
        alert("Login error")
      }

    } catch (error) {
      alert("Login error")
    }
  }

  return (
    <div className="login-container">


      <form className="login-form" onSubmit={handlelogin}>
        <h2 className="login-title">Login</h2>

        <input
          type="email"
          name="email"
          value={formdata.email}
          placeholder="Enter email"
          onChange={handlechange}
          className="login-input"
        />

        <input
          type="password"
          name="pass"
          value={formdata.pass}
          placeholder="Enter password"
          onChange={handlechange}
          className="login-input"
        />

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
