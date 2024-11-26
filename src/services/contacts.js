import Contact from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getContacts = async ({
  page = 1,
  perPage = 5,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  contactType,
  isFavourite,
}) => {

  const limit = perPage;
  const skip = (page - 1) * perPage;

  const filter = {};
  if (contactType) filter.contactType = { $in: contactType };
  if (isFavourite) filter.isFavourite = isFavourite;

  const contactsQuery = Contact.find(filter);
  const contactsCount = await Contact.find(filter)
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

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
