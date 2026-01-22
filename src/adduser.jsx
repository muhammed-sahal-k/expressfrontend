import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Adduser() {

    const navigate = useNavigate()

    const [formdata, setformdata] = useState({
        name: '',
        email: '',
        pass: '',
        cpass: ''
    })

    const handlechange = (e) => {
        setformdata({
            ...formdata, [e.target.name]: e.target.value
        })
    }

    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}adduser`, formdata)
            console.log(res);

            if (res.status === 201) {
                alert("Data added successfully")

                navigate('/Login')
            }

        } catch (error) {
            alert("Failed Data adding")
        }
    }

    return (
        <div className="reg-container">
            <form className="reg-form" onSubmit={handlesubmit}>
                <h2 className="reg-title">User Registration</h2>

                <input
                    type="text"
                    name="name"
                    value={formdata.name}
                    placeholder="Enter your name"
                    onChange={handlechange}
                    className="reg-input"
                />

                <input
                    type="email"
                    name="email"
                    value={formdata.email}
                    placeholder="Enter your email"
                    onChange={handlechange}
                    className="reg-input"
                />

                <input
                    type="password"
                    name="pass"
                    value={formdata.pass}
                    placeholder="Enter password"
                    onChange={handlechange}
                    className="reg-input"
                />

                <input
                    type="password"
                    name="cpass"
                    value={formdata.cpass}
                    placeholder="Confirm password"
                    onChange={handlechange}
                    className="reg-input"
                />

                <button type="submit" className="reg-button">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Adduser
