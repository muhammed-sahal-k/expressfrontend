import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Getdata() {
    const [data, setData] = useState([])
    const [editId, setEditId] = useState(null)
    const [editData, setEditData] = useState({ name: '', price: '' })
    const navigate = useNavigate()

    const getData = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}getdata`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setData(res.data)
        } catch (error) {
            alert('Error fetching data')
        }
    }

    useEffect(() => {
        getData()
    }, [])

    // DELETE
    const handleDelete = async (id) => {
        const token = localStorage.getItem('token')
        if (!window.confirm('Are you sure?')) return

        try {
            await axios.delete(
                `${import.meta.env.VITE_API_URL}deletedata/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            alert('Product deleted')
            getData()
        } catch (error) {
            alert('Delete failed')
        }
    }

    // START EDIT
    const handleEdit = (item) => {
        setEditId(item._id)
        setEditData({ name: item.name, price: item.price })
    }

    // UPDATE
    const handleUpdate = async (id) => {
        try {
            const token = localStorage.getItem('token')

            await axios.put(
                `${import.meta.env.VITE_API_URL}update/${id}`,
                editData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            alert('Product updated')
            setEditId(null)
            getData()
        } catch (error) {
            alert('Update failed')
        }
    }

    // LOGOUT
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/Login')
    }

    return (
        <div >
            <button onClick={handleLogout}>Logout</button>

            <h2 className="header">All Products</h2>

            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((item) => (
                        <tr key={item._id}>
                            <td>
                                <img src={item.image} alt="" width="50" />
                            </td>

                            <td>
                                {editId === item._id ? (
                                    <input
                                        type="text"
                                        value={editData.name}
                                        onChange={(e) =>
                                            setEditData({ ...editData, name: e.target.value })
                                        }
                                    />
                                ) : (
                                    item.name
                                )}
                            </td>

                            <td>
                                {editId === item._id ? (
                                    <input
                                        type="number"
                                        value={editData.price}
                                        onChange={(e) =>
                                            setEditData({ ...editData, price: e.target.value })
                                        }
                                    />
                                ) : (
                                    `₹ ${item.price}`
                                )}
                            </td>

                            <td>
                                {editId === item._id ? (
                                    <>
                                        <button onClick={() => handleUpdate(item._id)} >
                                            Update
                                        </button>
                                        <button onClick={() => setEditId(null)} >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(item)} >
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(item._id)} >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Getdata