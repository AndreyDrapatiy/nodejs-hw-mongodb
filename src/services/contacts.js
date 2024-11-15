import Contact from '../db/models/Contact.js';

export const getContacts = () => Contact.find();
export const getContact = (id) => Contact.findById(id);
