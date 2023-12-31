import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from '../store/appContext'
import "../../styles/home.css";
import Contact from '../component/Contact.jsx'
import Modal from '../component/Modal.jsx'


export const Home = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	const [apiContacts, setApiContacts] = useState([]);

	return (
	<div className="container-fluid mt-5">
		<div className="row">
			<div className="col-2 offset-10">
				<button className="btn btn-success" onClick={() => navigate("/updateContact")}>
					Add New Contact
				</button>
			</div>
		</div>
		{store.contacts.sort().map((contact, idx) => <Contact idx={idx} key={idx}/>)}
		{store.contacts.sort().map((contact, idx) => <Modal id={contact.id} idx={idx}/>)}
	</div>
	)
};
