import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../store/appContext'
import "../../styles/updatecontact.css";
import { Link, useNavigate } from "react-router-dom";

export const UpdateContact = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()

    const [newName, setNewName] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [adding, setAdding] = useState(false)

    const clickHandler = () => {
        setAdding(true)
        console.log(newName)
        console.log(newAddress)
        console.log(newPhone)
        console.log(newEmail)
    }

    useEffect(() => {
        const asyncUseEffect = async () => {
            if(adding) {
                const randId = Math.floor(Math.random()*10000000000)
                await actions.addContact({
                    'full_name': newName,
                    'email': newEmail,
                    'phone': newPhone,
                    'address': newAddress,
                    'imageUrl': 'http://placekitten.com/550',
                    'id': randId,
                    })
                navigate('/')
                }
        }
        asyncUseEffect()
    },[adding])

    // console.log('component rerendering')

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 header">
                    <h2>Add a new contact</h2>
                </div>
                <div className="col-12">
                    Full Name
                </div>
                <div className="input-group col-12 my-3">
                    <input type="text" className="form-control" placeholder="Full Name" aria-label="Full Name" aria-describedby="basic-addon2" onChange={ev => setNewName(ev.target.value)}/>
                </div>
                <div className="col-12">
                    Email
                </div>
                <div className="input-group col-12 my-3">
                    <input type="text" className="form-control" placeholder="Enter Email" aria-label="Enter Email" aria-describedby="basic-addon2" onChange={ev => setNewEmail(ev.target.value)}/>
                </div>
                <div className="col-12">
                    Phone
                </div>
                <div className="input-group col-12 my-3">
                    <input type="text" className="form-control" placeholder="Enter Phone" aria-label="Enter Phone" aria-describedby="basic-addon2" onChange={ev => setNewPhone(ev.target.value)}/>
                </div>
                <div className="col-12">
                    Address
                </div>
                <div className="input-group col-12 my-3">
                    <input type="text" className="form-control" placeholder="Enter Address" aria-label="Enter Address" aria-describedby="basic-addon2"onChange={ev => setNewAddress(ev.target.value)}/>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary w-100 h-100" onClick={clickHandler}>Save</button>
                </div>
                <div className="col-12">
                    <Link to="/">or get back to contacts</Link>
                </div>
            </div>
        </div>
    )
}
