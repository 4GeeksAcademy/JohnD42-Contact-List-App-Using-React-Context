import React, { useState, useEffect } from 'react'

const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			contacts: [
				
			]
		},
		actions: {
			asyncFetch: async () => {
						const response = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda/jdurtka");
						const newApiContacts = await response.json();
						setStore({contacts: newApiContacts})
					},
			addContact: async (contact) => {
				const currentContacts = getStore().contacts;
				const idx = currentContacts.length;
				const newContact = {
					'full_name': contact.full_name,
					'email': contact.email,
					'phone': contact.phone,
					'address': contact.address,
					'agenda_slug': 'jdurtka',
				}
				const asyncPost = async () => {
					console.log('running asyncPost')
					const response = await fetch('https://playground.4geeks.com/apis/fake/contact/', {
						method: 'POST',    
						cache: "no-cache",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(newContact),
						json: true
					})
					console.log(response.json())
				}
				await asyncPost()
				getActions().asyncFetch()
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
			 deleteContact: async (contactid) => {
				let currentContacts = getStore().contacts
				let filterContacts = currentContacts.filter((item) => {
					console.log(item.id,contactid)
					return item.id !== contactid
				})
				console.log(filterContacts)
				try {
						const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${contactid}`, {
						method: 'DELETE',    
						cache: "no-cache",
						headers: {
							"Content-Type": "application/json",
						},
						json: true
						})
					const data = await response.json()
					console.log(data)
					if(data.msg === "Contact deleted successfully") {
						setStore({contacts: filterContacts})
						console.log(getStore().contacts)
					}
				} catch (error) { console.log('error', error) }
			}
		}
	}
};

export default getState;
