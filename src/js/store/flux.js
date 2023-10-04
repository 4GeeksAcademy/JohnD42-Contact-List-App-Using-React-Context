import React, { useState, useEffect } from 'react'

const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			contacts: [
				
			]
		},
		actions: {
			setContacts: (apiContacts) => {
				setStore({contacts: apiContacts})
			},
			addContact: async (contact) => {
				const currentContacts = getStore().contacts;
				const idx = currentContacts.length;
				const newContact = {
					'full_name': contact.full_name,
					'email': contact.email,
					'phone': contact.phone,
					'address': contact.address,
					'imageUrl': 'https://placekitten.com/550',
					'agenda_slug': 'jdurtka',
				}
				const newContacts = currentContacts.toSpliced(idx, 0, newContact)
				await setStore({contacts: newContacts})
				const asyncPost = async () => {
					console.log('running asyncPost')
					const response = await fetch('https://playground.4geeks.com/apis/fake/contact/', {
						method: 'POST',    
						cache: "no-cache",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							"full_name": getStore().contacts[idx].full_name,
							"email": getStore().contacts[idx].email,
							"agenda_slug": "jdurtka",
							"address": getStore().contacts[idx].address,
							"phone": getStore().contacts[idx].phone,
							}),
						json: true
					})
					console.log(response.json())
				}
				asyncPost()
			},
			editContact: async (contact, index) => {
				console.log('editing contact')
				const tempContacts = getStore().contacts.toSpliced(index, 1, contact);
				await setStore({ contacts: tempContacts });
				const asyncPut = async () => {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${contact.id}`, {
						method: 'PUT',    
						cache: "no-cache",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							"full_name": getStore().contacts[index].full_name,
							"email": getStore().contacts[index].email,
							"agenda_slug": "jdurtka",
							"address": getStore().contacts[index].address,
							"phone": getStore().contacts[index].phone,
							}),
						json: true
					})
				}
				asyncPut()
			  },
			 deleteContact: async (contact, index) => {
				const asyncDelete = async () => {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${contact.id}`, {
						method: 'DELETE',    
						cache: "no-cache",
						headers: {
							"Content-Type": "application/json",
						},
						json: true
					})
				}
				await asyncDelete()
				const asyncFetch = async () => {
					const response = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda/jdurtka");
					const apiContacts = await response.json();
					console.log(apiContacts)
					setStore({contacts: apiContacts})
					console.log(getStore().contacts)
				}
				asyncFetch()
			 }
		}
	}
};

export default getState;
