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
    const [imageUrl, setImageUrl] = useState('')
    
    useEffect(() => {
        setName(props.contact.name)
        setAddress(props.contact.address)
        setPhone(props.contact.phone)
        setEmail(props.contact.email)
        setImageUrl(props.contact.imageUrl)
    },[])

    useEffect(() => {
        if(editing) {
            actions.editContact({
                name: name,
                email: email,
                phone: phone,
                address: address
              }, idx);
        }
    },[editing])

    return (
        <div className="contact p-3 m-3 rounded">
            <img className="contact-img" src={imageUrl}></img>
            <ul>
                <li><h4>{editing ? <input value={name} onChange={ev => setName(ev.target.value)} /> : <span>{store.contacts[idx].name}</span>}</h4></li>
                <li className="address contact-items"><i className="fa-solid fa-location-dot"></i>{editing ? <input value={address} onChange={ev => setAddress(ev.target.value)} /> : <span>{store.contacts[idx].address}</span>}</li>
                <li className="contact-items"><i className="fa-solid fa-phone-flip"></i>{editing ? <input value={phone} onChange={ev => setPhone(ev.target.value)} /> : <span>{store.contacts[idx].phone}</span>}</li>
                <li className="contact-items"><i className="fa-solid fa-envelope"></i>{editing ? <input value={email} onChange={ev => setEmail(ev.target.value)} /> : <span>{store.contacts[idx].email}</span>}</li>
            </ul>
            <ul className="horizontal-ul">
                <li>
                    <button className="btn btn-light" onClick={() => {setEditing(!editing)}}>{editing ? 'Save' : <i className="fa-solid fa-pencil"></i>}</button>
                </li>
                <li>
                    <button className="btn btn-light" onClick={() => {actions.deleteContact(idx)}}><i className="fa-regular fa-trash-can"></i></button>
                </li>
            </ul>
        </div>
            )
}

export default Contact