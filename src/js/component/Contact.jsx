import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../store/appContext'

const Contact = (props) => {
    const { store, actions } = useContext(Context)
    const idx = props.idx;
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [editing, setEditing] = useState(false)
    const [id, setId] = useState(0)

    const imageUrl='https://placekitten.com/550'
    
    useEffect(() => {
        setName(props.contact.full_name)
        setAddress(props.contact.address)
        setPhone(props.contact.phone)
        setEmail(props.contact.email)
        setId(props.contact.id)
    },[])

    const clickHandler = () => {
        if(editing) {
            actions.editContact({
                full_name: name,
                email: email,
                phone: phone,
                address: address,
                id: id,
            }, idx);
        }
        setEditing(!editing)
    }

    return (
        <div className="contact p-3 m-3 rounded">
            <img className="contact-img" src={imageUrl} alt={props.contact.name}></img>
            <ul>
                <li><h4>{editing ? <input value={name} onChange={ev => setName(ev.target.value)} /> : <span>{props.contact.full_name}</span>}</h4></li>
                <li className="address contact-items m-1"><i className="fa-solid fa-location-dot m-1"></i>{editing ? <input value={address} onChange={ev => setAddress(ev.target.value)} /> : <span>{props.contact.address}</span>}</li>
                <li className="contact-items m-1"><i className="fa-solid fa-phone-flip m-1"></i>{editing ? <input value={phone} onChange={ev => setPhone(ev.target.value)} /> : <span>{props.contact.phone}</span>}</li>
                <li className="contact-items m-1"><i className="fa-solid fa-envelope m-1"></i>{editing ? <input value={email} onChange={ev => setEmail(ev.target.value)} /> : <span>{props.contact.email}</span>}</li>
            </ul>
            <ul className="horizontal-ul">
                <li>
                    <button className="btn btn-light" onClick={clickHandler}>{editing ? 'Save' : <i className="fa-solid fa-pencil"></i>}</button>
                </li>
                <li>
                    <button className="btn btn-light" data-bs-target={`#modal${idx}`} data-bs-toggle="modal"><i className="fa-regular fa-trash-can"></i></button>
                </li>
            </ul>
        </div>
            )
}

export default Contact