import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../store/appContext'
import "../../styles/updatecontact.css";
import { Link, useNavigate, useParams } from "react-router-dom";

export const UpdateContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { idx } = useParams();

    const submitHandler = async e => {
        e.preventDefault();
        await actions.formSubmitHandler(e, idx);
        navigate('/');
    }

    return (
        <form className="container" onSubmit={submitHandler}>
            <div className="row">
                <div className="col-12 header">
                    <h2>{idx === undefined ? 'Add New Contact' : 'Update Contact'}</h2>
                </div>
                <label>Full Name</label>
                <div className="input-group col-12 my-3">
                    <input name="full_name" type="text" className="form-control" placeholder={idx === undefined ? "Full Name" : store.contacts[idx].full_name} aria-label="Full Name" aria-describedby="basic-addon2"/>
                </div>
                <label>Email</label>
                <div className="input-group col-12 my-3">
                    <input name="email" type="text" className="form-control" placeholder={idx === undefined ? "Enter Email" : store.contacts[idx].email} aria-label="Enter Email" aria-describedby="basic-addon2"/>
                </div>
                <label>Phone</label>
                <div className="input-group col-12 my-3">
                    <input name="phone" type="text" className="form-control" placeholder={idx === undefined ? "Enter Phone" : store.contacts[idx].phone} aria-label="Enter Phone" aria-describedby="basic-addon2"/>
                </div>
                <label>Email</label>
                <div className="input-group col-12 my-3">
                    <input name="address" type="text" className="form-control" placeholder={idx === undefined ? "Enter Address" : store.contacts[idx].address} aria-label="Enter Address" aria-describedby="basic-addon2"/>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary w-100 h-100" type='submit'>Save</button>
                </div>
                <div className="col-12">
                    <Link to="/">or get back to contacts</Link>
                </div>
            </div>
        </form>
    )
}
