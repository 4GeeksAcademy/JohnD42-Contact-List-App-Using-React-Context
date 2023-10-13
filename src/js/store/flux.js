import React, { useState, useEffect } from 'react'

const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			contacts: [
				
			]
		},
		actions: {
			asyncFetch: async (url, method, body) => {
				try {
					const response = await fetch(url, {
						method: method,    
						headers: {
							"Content-Type": "application/json",
						},
						body: body,
						json: true
					})
					if(method === 'GET') {
						const newApiContacts = await response.json();
						setStore({contacts: newApiContacts});
					}
				} catch (error) {console.log('error', error)};
			},
			asyncGet: async () => {
				const url = 'https://playground.4geeks.com/apis/fake/contact/agenda/jdurtka';
				const method = 'GET';
				const body = undefined;
				getActions().asyncFetch(url, method, body);
			},
			addContact: (contact) => {
				const currentContacts = getStore().contacts;
				const idx = currentContacts.length;
				const newContacts = currentContacts.toSpliced(idx,0,contact);
				setStore({contacts: newContacts});
				const url = 'https://playground.4geeks.com/apis/fake/contact/';
				const method = 'POST';
				const body = JSON.stringify({
					'full_name': contact.full_name,
					'email': contact.email,
					'phone': contact.phone,
					'address': contact.address,
					'agenda_slug': 'jdurtka',
				});
				getActions().asyncFetch(url, method, body);
			},
			editContact: async (contact, index) => {
				const tempContacts = getStore().contacts.toSpliced(index, 1, contact);
				await setStore({ contacts: tempContacts });
				const url = `https://playground.4geeks.com/apis/fake/contact/${contact.id}`;
				const method = 'PUT';
				const body = JSON.stringify({
					"full_name": contact.full_name,
					"email": contact.email,
					"agenda_slug": "jdurtka",
					"address": contact.address,
					"phone": contact.phone,
					})
				getActions().asyncFetch(url, method, body)
			  },
			 deleteContact: async (contactid) => {
				let currentContacts = getStore().contacts;
				let filterContacts = currentContacts.filter((item) => {
					return item.id !== contactid;
				})
				setStore({contacts: filterContacts})
				const url = `https://playground.4geeks.com/apis/fake/contact/${contactid}`;
				const method = 'DELETE';
				const body = JSON.stringify('');
				getActions().asyncFetch(url, method, body);
			},
			formSubmitHandler: (e, idx) => {
				if(idx === undefined) {
					getActions().addContact({
						'full_name':e.target.elements.full_name.value,
						'email': e.target.elements.email.value,
						'phone': e.target.elements.phone.value,
						'address': e.target.elements.address.value,
					})
				}
				else {
					getActions().editContact({
						'full_name': e.target.elements.full_name.value,
						'email': e.target.elements.email.value,
						'phone': e.target.elements.phone.value,
						'address': e.target.elements.address.value,
						'id': getStore().contacts[idx].id
					},idx)
				}
			}
		}
	}
};

export default getState;