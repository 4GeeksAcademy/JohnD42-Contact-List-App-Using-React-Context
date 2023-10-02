const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [
				{
					name: 'Example Name',
					email: 'example@example.co',
					phone: '+1 234 567-8910',
					address: '123 Nonesuch pl., Irving, TX',
					imageUrl: 'https://placekitten.com/550'
				}
			]
		},
		actions: {
			addContact: (newName, newEmail, newPhone, newAddress) => {
				const currentContacts = getStore().contacts;
				const idx = currentContacts.length;
				const newContact = {
					name: newName,
					email: newEmail,
					phone: newPhone,
					address: newAddress,
					imageUrl: 'https://placekitten.com/550'
				}
				const newContacts = currentContacts.toSpliced(idx, 0, newContact)
				setStore({contacts: newContacts})

			},
			editContact: (contact, index) => {
				const tempContacts = getStore().contacts.toSpliced(index, 1, contact);
				setStore({ contacts: tempContacts });
			  },
			 deleteContact: (index) => {
				setStore({contacts: getStore().contacts.toSpliced(index, 1) });
			 }
		}
	}
};

export default getState;
