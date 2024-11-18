import Contact from '../db/models/Contact.js';

export const getContacts = () => Contact.find();

export const getContact = (id) => Contact.findById(id);

export const createContact = async (payload) => await Contact.create(payload);

export const updateContact = async (id, payload) => {
  const result = await Contact.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

export const deleteContact = async (id) =>
  await Contact.findOneAndDelete({ _id: id });
