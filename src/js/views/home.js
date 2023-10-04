import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from '../store/appContext'
import "../../styles/home.css";
import Contact from '../component/Contact.jsx'


export const Home = () => {
	const navigate = useNavigate();
	const { store, actions } = useContext(Context);
	const [apiContacts, setApiContacts] = useState([])

	console.log(store.contacts)

	return (
	<div className="container-fluid mt-5">
		<div className="row">
			<div className="col-2 offset-10">
				<button className="btn btn-success" onClick={() => navigate("/addContact")}>
					Add New Contact
				</button>
			</div>
		</div>
		{store.contacts.map((contact, idx) => <Contact contact={contact} idx={idx} key={idx}/>)}
	</div>
	)
};
