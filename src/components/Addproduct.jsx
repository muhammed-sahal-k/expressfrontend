import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"


function Addproduct() {

    const navigate = useNavigate()

    const [formdata, setformdata] = useState({
        name: '',
        price: '',
        image: ''
    })




    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }

    const handlechange = async (e) => {
        if (e.target.name === "image") {
            const file = e.target.files[0]
            const base64 = await convertBase64(file)
            setformdata({ ...formdata, [e.target.name]: base64 })
        }

        else {
            setformdata({
                ...formdata, [e.target.name]: e.target.value
            })
        }
    }


    const handlesubmit = async (e) => {
        e.preventDefault()

        try {

            const token = localStorage.getItem('token')
            if (!token) {
                alert("Authentication failed")
                return
            }

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}adddata`, formdata, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(res);


            if (res.status == 201) {
                alert('Product added successfully')
                navigate('/Getdata')
            } else {
                alert("Error")
            }

        } catch (error) {
            alert("Error adding data")
        }
    }

    return (
        <div className="product-container">
            <form className="product-form" onSubmit={handlesubmit}>
                <h2 className="product-title">Add Products</h2>

                <input
                    type="text"
                    name="name"
                    value={formdata.name}
                    placeholder="Name of the product"
                    onChange={handlechange}
                    className="product-input"
                />

                <input
                    type="number"
                    name="price"
                    value={formdata.price}
                    placeholder="Price"
                    onChange={handlechange}
                    className="product-input"
                />

                <input
                    type="file"
                    name="image"
                    onChange={handlechange}
                    className="product-file"
                />

                <button type="submit" className="product-button">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Addproduct
