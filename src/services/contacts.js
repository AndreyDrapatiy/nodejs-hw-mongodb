import Contact from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find();
  const contactsCount = await Contact.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

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
