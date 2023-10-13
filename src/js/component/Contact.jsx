import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from "react-router-dom";

const Contact = (props) => {
    const { store, actions } = useContext(Context)
    const idx = props.idx;
    const navigate = useNavigate()

    const imageUrl='https://placekitten.com/550'

    const clickHandler = () => {
        navigate(`/updateContact/${idx}`)
    }

    return (
        <div className="contact p-3 m-3 rounded">
            <img className="contact-img" src={imageUrl} alt={store.contacts[idx].full_name}></img>
            <ul>
                <li><h4><span>{store.contacts[idx].full_name}</span></h4></li>
                <li className="address contact-items m-1"><i className="fa-solid fa-location-dot m-1"></i><span>{store.contacts[idx].address}</span></li>
                <li className="contact-items m-1"><i className="fa-solid fa-phone-flip m-1"></i><span>{store.contacts[idx].phone}</span></li>
                <li className="contact-items m-1"><i className="fa-solid fa-envelope m-1"></i><span>{store.contacts[idx].email}</span></li>
            </ul>
            <ul className="horizontal-ul">
                <li>
                    <button className="btn btn-light" onClick={clickHandler}><i className="fa-solid fa-pencil"></i></button>
                </li>
                <li>
                    <button className="btn btn-light" data-bs-target={`#modal${idx}`} data-bs-toggle="modal"><i className="fa-regular fa-trash-can"></i></button>
                </li>
            </ul>
        </div>
            )
}

export default Contact