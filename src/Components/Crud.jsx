import React, { useState } from 'react'

export default function Crud() {

    const [inputData, setInputData] = useState({
        name: '',
        email: '',
        src: ''
    })
    const [usersData, SetUserData] = useState([
        { name: 'sangavi', email: 'sangavi2002@gmail.com', src: 'https://cdn.pixabay.com/photo/2020/05/09/13/29/photographer-5149664_640.jpg' }]
    )
    const [editIndex, setEditIndex] = useState('');
    const [showEdit, setShowEdit] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData((prevData) => ({ ...prevData, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        SetUserData((prevData) => ([...prevData, inputData]))
        setInputData({
            name: '',
            email: '',
            src: ''
        })
    }

    const handleDelete = (index) => {
        let confirmDelete = window.confirm('Are You Want Surely Delete this')
        if (confirmDelete) {
            usersData.splice(index, 1) //index value first one second one lngth
            SetUserData([...usersData])
        }
    }

    const handleEdit = (value, index) => {
        setEditIndex(index);
        setShowEdit(true)
        setInputData({
            name: value.name,
            email: value.email,
            src: value.src
        })
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        usersData.splice(editIndex, 1, inputData);
        SetUserData([...usersData]);
        setInputData({
            name: '',
            email: '',
            src: ''
        })
        setEditIndex(0);
        setShowEdit(false);
        alert('upadted successfully');

    }


    const handleCanceld = (e) => {
        e.preventDefault();
        let cancelBtn = window.confirm('Are you want to cancel this');
        if (cancelBtn) {
            setEditIndex(0);
            setShowEdit(false);
            setInputData({
                name: '',
                email: '',
                src: ''
            })
        }
        e.stopPropagation()
    }
    return (
        <div className='crud-app tableStyle'>
            <h1>Crud App</h1>
            {showEdit && <p className='udpate'>{"Update Here Also"}</p>}
            <form onSubmit={showEdit ? handleUpdate : handleSubmit}>
                <div className="form">
                    <input type="text" className="input" value={inputData.name || ''} onChange={handleChange} name='name' placeholder="Enter Name" />
                    <span className="input-border"></span>
                </div>
                <div className="form">
                    <input type="email" className="input" value={inputData.email || ''} onChange={handleChange} name='email' placeholder="Enter Email" required />
                    <span className="input-border"></span>
                </div>
                <div className="form">
                    <input type="text" className="input" value={inputData.src || ''} onChange={handleChange} name='src' placeholder="Give Image Address" required />
                    <span className="input-border"></span>
                </div>
                <button>{showEdit ? 'Update' : 'Add'}</button>
                {showEdit && <button onClick={handleCanceld}>Cancel</button>}
            </form>

            <table className='table'>
                <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>Profile Image</th>
                    <th>Actions</th>
                </tr>
                {usersData.map((value, index) => (

                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{value.name}</td>
                        <td>{value.email}</td>
                        <td><img src={value.src} alt={value.src} /></td>
                        <td style={{textAlign:"center"}}>
                            <button style={{ marginRight: "15px" }} onClick={() => handleDelete(index)} disabled={showEdit}>Delete</button>
                            <button onClick={() => handleEdit(value, index)}  disabled={showEdit}>Update</button>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    )
}